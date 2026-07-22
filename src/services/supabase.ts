/**
 * Supabase Service
 * Handles authentication, user data, quiz results, and real-time updates
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('Supabase environment variables not configured');
}

const supabase: SupabaseClient<Database> = createClient(
  SUPABASE_URL || '',
  SUPABASE_ANON_KEY || ''
);

// ============================================================================
// AUTHENTICATION
// ============================================================================

export const auth = {
  async signUp(email: string, password: string, displayName: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    });

    if (error) throw error;
    return data;
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  },

  async getCurrentSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  },

  onAuthStateChange(callback: (user: any) => void) {
    return supabase.auth.onAuthStateChange((_event, session) => {
      callback(session?.user || null);
    });
  },
};

// ============================================================================
// USER PROFILE
// ============================================================================

export const userProfile = {
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  },

  async createProfile(userId: string, displayName: string) {
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          id: userId,
          display_name: displayName,
          xp: 0,
          coins: 0,
          level: 1,
          streak: 0,
          last_quiz_date: null,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateProfile(
    userId: string,
    updates: {
      display_name?: string;
      xp?: number;
      coins?: number;
      level?: number;
      streak?: number;
      avatar_url?: string;
    }
  ) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async addXP(userId: string, amount: number) {
    const user = await this.getProfile(userId);
    const newXP = user.xp + amount;
    const newLevel = Math.floor(newXP / 1000) + 1;

    return this.updateProfile(userId, {
      xp: newXP,
      level: newLevel,
    });
  },

  async addCoins(userId: string, amount: number) {
    const user = await this.getProfile(userId);
    return this.updateProfile(userId, {
      coins: user.coins + amount,
    });
  },
};

// ============================================================================
// QUIZ RESULTS
// ============================================================================

export const quizResults = {
  async saveResult(
    userId: string,
    categoryId: string,
    score: number,
    totalQuestions: number,
    xpEarned: number,
    coinsEarned: number,
    timeSpentSeconds: number
  ) {
    const { data, error } = await supabase
      .from('quiz_results')
      .insert([
        {
          user_id: userId,
          category_id: categoryId,
          score,
          total_questions: totalQuestions,
          xp_earned: xpEarned,
          coins_earned: coinsEarned,
          time_spent_seconds: timeSpentSeconds,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getResults(userId: string, limit = 50) {
    const { data, error } = await supabase
      .from('quiz_results')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  async getResultsByCategory(userId: string, categoryId: string) {
    const { data, error } = await supabase
      .from('quiz_results')
      .select('*')
      .eq('user_id', userId)
      .eq('category_id', categoryId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getStats(userId: string) {
    const { data, error } = await supabase
      .from('quiz_results')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;

    const totalQuizzes = data.length;
    const totalXP = data.reduce((sum, r) => sum + r.xp_earned, 0);
    const totalCoins = data.reduce((sum, r) => sum + r.coins_earned, 0);
    const averageScore =
      totalQuizzes > 0
        ? data.reduce((sum, r) => sum + r.score / r.total_questions, 0) /
          totalQuizzes
        : 0;

    return {
      totalQuizzes,
      totalXP,
      totalCoins,
      averageScore,
    };
  },
};

// ============================================================================
// LEADERBOARD
// ============================================================================

export const leaderboard = {
  async getLeaderboard(timeframe: 'week' | 'month' | 'alltime', limit = 100) {
    let daysAgo = 7;
    if (timeframe === 'month') daysAgo = 30;
    else if (timeframe === 'alltime') daysAgo = 36500; // 100 years

    const since = new Date();
    since.setDate(since.getDate() - daysAgo);

    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .gte('updated_at', since.toISOString())
      .order('xp', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  async getUserRank(
    userId: string,
    timeframe: 'week' | 'month' | 'alltime'
  ) {
    const lb = await this.getLeaderboard(timeframe, 10000);
    const rank = lb.findIndex((entry) => entry.user_id === userId) + 1;
    return rank || null;
  },

  async updateLeaderboard(userId: string) {
    const user = await userProfile.getProfile(userId);
    const { data, error } = await supabase
      .from('leaderboard')
      .upsert(
        [
          {
            user_id: userId,
            xp: user.xp,
            level: user.level,
            updated_at: new Date().toISOString(),
          },
        ],
        { onConflict: 'user_id' }
      )
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

// ============================================================================
// ACHIEVEMENTS
// ============================================================================

export const achievements = {
  async getUserAchievements(userId: string) {
    const { data, error } = await supabase
      .from('user_achievements')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    return data;
  },

  async unlockAchievement(userId: string, achievementId: string) {
    const { data, error } = await supabase
      .from('user_achievements')
      .insert([
        {
          user_id: userId,
          achievement_id: achievementId,
          unlocked_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error && !error.message.includes('duplicate')) throw error;
    return data;
  },
};

// ============================================================================
// MULTIPLAYER BATTLES
// ============================================================================

export const battles = {
  async createBattle(
    player1Id: string,
    player2Id: string,
    categoryId: string
  ) {
    const { data, error } = await supabase
      .from('battles')
      .insert([
        {
          player1_id: player1Id,
          player2_id: player2Id,
          category_id: categoryId,
          status: 'waiting',
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getBattle(battleId: string) {
    const { data, error } = await supabase
      .from('battles')
      .select('*')
      .eq('id', battleId)
      .single();

    if (error) throw error;
    return data;
  },

  async updateBattleStatus(
    battleId: string,
    status: 'in_progress' | 'completed' | 'cancelled'
  ) {
    const { data, error } = await supabase
      .from('battles')
      .update({ status })
      .eq('id', battleId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async recordBattleScore(
    battleId: string,
    playerId: string,
    score: number,
    xpEarned: number
  ) {
    const { data, error } = await supabase
      .from('battle_scores')
      .insert([
        {
          battle_id: battleId,
          player_id: playerId,
          score,
          xp_earned: xpEarned,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getUserActiveBattles(userId: string) {
    const { data, error } = await supabase
      .from('battles')
      .select('*')
      .or(
        `player1_id.eq.${userId},player2_id.eq.${userId}`
      )
      .neq('status', 'completed')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  onBattleUpdate(battleId: string, callback: (battle: any) => void) {
    return supabase
      .from(`battles:id=eq.${battleId}`)
      .on('*', (payload) => {
        callback(payload.new);
      })
      .subscribe();
  },
};

export default supabase;
