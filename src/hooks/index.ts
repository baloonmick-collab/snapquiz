/**
 * Custom Hooks
 */

import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useBattle } from '@/context/BattleContext';
import { quizResults, userProfile, leaderboard } from '@/services/supabase';
import { aiQuizGenerator } from '@/features/aiQuizGenerator';
import type { GeneratedQuestion } from '@/services/openai';

/**
 * useQuiz - Manage quiz state and logic
 */
export function useQuiz(categoryId: string) {
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadQuiz = useCallback(async (useAI: boolean = false) => {
    try {
      setIsLoading(true);
      setError(null);

      if (useAI) {
        const quiz = await aiQuizGenerator.generateQuiz(
          categoryId,
          'current-user',
          10,
          'medium'
        );
        setQuestions(quiz.questions);
      } else {
        // Load from mock data
        const quizData = await import('@/data/quizzes').then(
          (m) => m.QUIZZES[categoryId]
        );
        setQuestions(quizData || []);
      }

      setCurrentQuestion(0);
      setScore(0);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [categoryId]);

  const answerQuestion = useCallback((isCorrect: boolean) => {
    if (isCorrect) {
      setScore((s) => s + 1);
    }
    setCurrentQuestion((c) => c + 1);
  }, []);

  const resetQuiz = useCallback(() => {
    setCurrentQuestion(0);
    setScore(0);
  }, []);

  return {
    questions,
    currentQuestion,
    score,
    isLoading,
    error,
    loadQuiz,
    answerQuestion,
    resetQuiz,
  };
}

/**
 * useUser - Manage user profile and stats
 */
export function useUser() {
  const { user, userProfile: profile } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadStats = useCallback(async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const userStats = await quizResults.getStats(user.id);
      setStats(userStats);
    } catch (err) {
      console.error('Failed to load stats:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const addXP = useCallback(
    async (amount: number) => {
      if (!user) return;
      try {
        await userProfile.addXP(user.id, amount);
        await loadStats();
      } catch (err) {
        console.error('Failed to add XP:', err);
      }
    },
    [user, loadStats]
  );

  const addCoins = useCallback(
    async (amount: number) => {
      if (!user) return;
      try {
        await userProfile.addCoins(user.id, amount);
      } catch (err) {
        console.error('Failed to add coins:', err);
      }
    },
    [user]
  );

  return {
    user,
    profile,
    stats,
    isLoading,
    addXP,
    addCoins,
    loadStats,
  };
}

/**
 * useLeaderboard - Fetch and manage leaderboard data
 */
export function useLeaderboard(
  timeframe: 'week' | 'month' | 'alltime' = 'alltime'
) {
  const [entries, setEntries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await leaderboard.getLeaderboard(timeframe);
        setEntries(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [timeframe]);

  return { entries, isLoading, error };
}

/**
 * useBattleQuiz - Manage quiz state during battles
 */
export function useBattleQuiz(questions: GeneratedQuestion[]) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [timePerQuestion, setTimePerQuestion] = useState<number[]>([]);

  const recordAnswer = useCallback(
    (isCorrect: boolean, timeSpent: number) => {
      setAnswers((a) => [...a, isCorrect]);
      setTimePerQuestion((t) => [...t, timeSpent]);
      setCurrentQuestion((c) => c + 1);
    },
    []
  );

  const getScore = useCallback(() => {
    return answers.filter((a) => a).length;
  }, [answers]);

  return {
    currentQuestion,
    answers,
    timePerQuestion,
    recordAnswer,
    getScore,
  };
}
