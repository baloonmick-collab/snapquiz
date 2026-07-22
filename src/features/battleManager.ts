/**
 * Multiplayer Battle Manager
 * Handles real-time battle logic, scoring, and state management
 */

import { battles, userProfile, quizResults } from '@/services/supabase';
import { REWARD_MULTIPLIERS } from '@/lib/rewards';

export interface BattlePlayer {
  userId: string;
  displayName: string;
  avatar?: string;
  score: number;
  questionsAnswered: number;
  correctAnswers: number;
  xpEarned: number;
}

export interface BattleState {
  battleId: string;
  player1: BattlePlayer;
  player2: BattlePlayer;
  categoryId: string;
  status: 'waiting' | 'in_progress' | 'completed' | 'cancelled';
  currentQuestionIndex: number;
  totalQuestions: number;
  winnerId?: string;
  createdAt: string;
}

class BattleManager {
  private battleState: Map<string, BattleState> = new Map();
  private battleTimers: Map<string, NodeJS.Timeout> = new Map();

  /**
   * Initialize a new battle between two players
   */
  async initializeBattle(
    player1Id: string,
    player1Name: string,
    player2Id: string,
    player2Name: string,
    categoryId: string
  ): Promise<BattleState> {
    const battle = await battles.createBattle(player1Id, player2Id, categoryId);

    const battleState: BattleState = {
      battleId: battle.id,
      player1: {
        userId: player1Id,
        displayName: player1Name,
        score: 0,
        questionsAnswered: 0,
        correctAnswers: 0,
        xpEarned: 0,
      },
      player2: {
        userId: player2Id,
        displayName: player2Name,
        score: 0,
        questionsAnswered: 0,
        correctAnswers: 0,
        xpEarned: 0,
      },
      categoryId,
      status: 'waiting',
      currentQuestionIndex: 0,
      totalQuestions: 10,
      createdAt: battle.created_at,
    };

    this.battleState.set(battle.id, battleState);
    return battleState;
  }

  /**
   * Start the battle
   */
  async startBattle(battleId: string): Promise<BattleState> {
    const state = this.battleState.get(battleId);
    if (!state) throw new Error('Battle not found');

    await battles.updateBattleStatus(battleId, 'in_progress');
    state.status = 'in_progress';

    return state;
  }

  /**
   * Record an answer from a player
   */
  async recordAnswer(
    battleId: string,
    playerId: string,
    isCorrect: boolean,
    timeSpent: number
  ): Promise<BattleState> {
    const state = this.battleState.get(battleId);
    if (!state) throw new Error('Battle not found');

    const player = state.player1.userId === playerId ? state.player1 : state.player2;
    const opponent =
      state.player1.userId === playerId ? state.player2 : state.player1;

    player.questionsAnswered += 1;

    if (isCorrect) {
      player.correctAnswers += 1;
      const baseScore = 10;
      const timeBonus = Math.max(0, 10 - Math.floor(timeSpent / 2));
      const questionScore = baseScore + timeBonus;
      player.score += questionScore;

      // Calculate XP
      const difficulty =
        timeSpent > 20 ? 1 : timeSpent > 10 ? 1.2 : 1.5;
      player.xpEarned += Math.floor(10 * difficulty);
    }

    // Check if battle is complete
    if (
      player.questionsAnswered === state.totalQuestions &&
      opponent.questionsAnswered === state.totalQuestions
    ) {
      await this.completeBattle(battleId);
    }

    return state;
  }

  /**
   * Complete the battle and reward winners
   */
  async completeBattle(battleId: string): Promise<BattleState> {
    const state = this.battleState.get(battleId);
    if (!state) throw new Error('Battle not found');

    await battles.updateBattleStatus(battleId, 'completed');
    state.status = 'completed';

    // Determine winner
    const winner =
      state.player1.score >= state.player2.score
        ? state.player1
        : state.player2;
    const loser =
      state.player1.score >= state.player2.score
        ? state.player2
        : state.player1;

    state.winnerId = winner.userId;

    // Apply winner bonus
    const winnerBonus = 50;
    const loserBonus = 10;

    winner.xpEarned += winnerBonus;
    loser.xpEarned += loserBonus;

    // Update player profiles
    await userProfile.addXP(winner.userId, winner.xpEarned);
    await userProfile.addXP(loser.userId, loser.xpEarned);

    // Record battle results in quiz_results table
    await battles.recordBattleScore(
      battleId,
      winner.userId,
      winner.score,
      winner.xpEarned
    );
    await battles.recordBattleScore(
      battleId,
      loser.userId,
      loser.score,
      loser.xpEarned
    );

    // Update leaderboard
    const leaderboard = await import('@/services/supabase').then(
      (m) => m.leaderboard
    );
    await leaderboard.updateLeaderboard(winner.userId);
    await leaderboard.updateLeaderboard(loser.userId);

    return state;
  }

  /**
   * Get battle state
   */
  getBattleState(battleId: string): BattleState | undefined {
    return this.battleState.get(battleId);
  }

  /**
   * Cancel a battle
   */
  async cancelBattle(battleId: string): Promise<void> {
    await battles.updateBattleStatus(battleId, 'cancelled');
    this.battleState.delete(battleId);

    const timer = this.battleTimers.get(battleId);
    if (timer) clearTimeout(timer);
    this.battleTimers.delete(battleId);
  }

  /**
   * Auto-cancel battle after 30 minutes of inactivity
   */
  setAutoCancel(battleId: string, timeoutMinutes: number = 30): void {
    if (this.battleTimers.has(battleId)) {
      clearTimeout(this.battleTimers.get(battleId)!);
    }

    const timer = setTimeout(async () => {
      await this.cancelBattle(battleId);
      console.log(`Battle ${battleId} auto-cancelled due to inactivity`);
    }, timeoutMinutes * 60 * 1000);

    this.battleTimers.set(battleId, timer);
  }

  /**
   * Clean up resources
   */
  cleanup(battleId: string): void {
    this.battleState.delete(battleId);
    const timer = this.battleTimers.get(battleId);
    if (timer) clearTimeout(timer);
    this.battleTimers.delete(battleId);
  }
}

export const battleManager = new BattleManager();
export default battleManager;
