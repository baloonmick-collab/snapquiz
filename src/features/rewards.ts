/**
 * Reward Features - Manage rewards and progression
 */

import { useState, useCallback } from 'react';

interface Reward {
  id: string;
  type: 'xp' | 'coins' | 'achievement';
  amount: number;
  reason: string;
  unlockedAt: string;
}

/**
 * Hook for managing rewards
 */
export const useRewards = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);

  const addReward = useCallback(
    (type: 'xp' | 'coins' | 'achievement', amount: number, reason: string) => {
      const reward: Reward = {
        id: Math.random().toString(36).substr(2, 9),
        type,
        amount,
        reason,
        unlockedAt: new Date().toISOString(),
      };

      setRewards((prev) => [reward, ...prev]);
      return reward;
    },
    []
  );

  const getRewardsSummary = useCallback(() => {
    const summary = {
      totalXP: 0,
      totalCoins: 0,
      achievements: 0,
    };

    rewards.forEach((reward) => {
      if (reward.type === 'xp') summary.totalXP += reward.amount;
      if (reward.type === 'coins') summary.totalCoins += reward.amount;
      if (reward.type === 'achievement') summary.achievements += 1;
    });

    return summary;
  }, [rewards]);

  return {
    rewards,
    addReward,
    getRewardsSummary,
  };
};

/**
 * Reward system constants
 */
export const REWARD_CONSTANTS = {
  CORRECT_ANSWER: {
    xp: 10,
    coins: 5,
  },
  QUIZ_COMPLETION_BONUS: {
    xp: 50,
    coins: 10,
  },
  PERFECT_SCORE_BONUS: {
    xp: 100,
    coins: 50,
  },
  DAILY_LOGIN_BONUS: {
    xp: 50,
    coins: 10,
  },
  STREAK_BONUS_MULTIPLIER: 1.1, // 10% bonus per day
};

/**
 * Calculate total reward for completing a quiz
 */
export const calculateQuizReward = (
  correctAnswers: number,
  totalQuestions: number,
  difficulty: 'easy' | 'medium' | 'hard',
  streak: number
) => {
  const accuracy = (correctAnswers / totalQuestions) * 100;
  const difficultyMultiplier = {
    easy: 1,
    medium: 1.5,
    hard: 2,
  };

  let xp = REWARD_CONSTANTS.CORRECT_ANSWER.xp * correctAnswers;
  let coins = REWARD_CONSTANTS.CORRECT_ANSWER.coins * correctAnswers;

  // Add completion bonus
  xp += REWARD_CONSTANTS.QUIZ_COMPLETION_BONUS.xp;
  coins += REWARD_CONSTANTS.QUIZ_COMPLETION_BONUS.coins;

  // Add perfect score bonus
  if (accuracy === 100) {
    xp += REWARD_CONSTANTS.PERFECT_SCORE_BONUS.xp;
    coins += REWARD_CONSTANTS.PERFECT_SCORE_BONUS.coins;
  }

  // Apply difficulty multiplier
  xp = Math.floor(xp * difficultyMultiplier[difficulty]);
  coins = Math.floor(coins * difficultyMultiplier[difficulty]);

  // Apply streak bonus
  const streakBonus = Math.pow(REWARD_CONSTANTS.STREAK_BONUS_MULTIPLIER, streak) - 1;
  xp = Math.floor(xp * (1 + streakBonus));
  coins = Math.floor(coins * (1 + streakBonus));

  return { xp, coins };
};
