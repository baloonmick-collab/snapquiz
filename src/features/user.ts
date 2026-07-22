/**
 * User Features - User Management and Analytics
 */

import { useState, useCallback } from 'react';
import { User } from '@/types';
import { calculateLevel, getXPForCurrentLevel } from '@/lib/utils';

/**
 * Hook for managing user data and progress
 */
export const useUserManager = (initialUser: User) => {
  const [user, setUser] = useState<User>(initialUser);

  const addXP = useCallback(
    (xp: number) => {
      setUser((prev) => ({
        ...prev,
        xp: prev.xp + xp,
        level: calculateLevel(prev.xp + xp),
      }));
    },
    []
  );

  const addCoins = useCallback((coins: number) => {
    setUser((prev) => ({
      ...prev,
      coins: prev.coins + coins,
    }));
  }, []);

  const updateStreak = useCallback((increment: boolean) => {
    setUser((prev) => ({
      ...prev,
      streak: increment ? prev.streak + 1 : 0,
    }));
  }, []);

  const incrementQuizzesCompleted = useCallback(() => {
    setUser((prev) => ({
      ...prev,
      totalQuizzesCompleted: prev.totalQuizzesCompleted + 1,
    }));
  }, []);

  const getStats = useCallback(() => {
    const { current, needed, level } = getXPForCurrentLevel(user.xp);
    return {
      level,
      currentXP: current,
      nextLevelXP: needed,
      totalXP: user.xp,
      coins: user.coins,
      streak: user.streak,
      quizzesCompleted: user.totalQuizzesCompleted,
    };
  }, [user]);

  return {
    user,
    setUser,
    addXP,
    addCoins,
    updateStreak,
    incrementQuizzesCompleted,
    getStats,
  };
};

/**
 * Calculate user level from XP
 */
export const getUserLevel = (xp: number) => {
  return calculateLevel(xp);
};

/**
 * Format user statistics for display
 */
export const formatUserStats = (user: User) => {
  const stats = {
    level: calculateLevel(user.xp),
    xp: user.xp,
    coins: user.coins,
    streak: user.streak,
    quizzesCompleted: user.totalQuizzesCompleted,
    joinDate: user.createdAt,
  };

  return stats;
};

/**
 * Calculate daily login bonus
 */
export const getDailyBonus = (): { xp: number; coins: number } => {
  // TODO: Check if user already claimed today's bonus
  return {
    xp: 50,
    coins: 10,
  };
};

/**
 * Calculate streak bonus
 */
export const getStreakBonus = (streak: number): number => {
  return Math.min(streak * 10, 100); // Max 100 XP bonus
};
