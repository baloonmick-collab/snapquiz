/**
 * Quiz Features - Advanced Quiz Management
 */

import { useState, useCallback } from 'react';
import { QuizQuestion, QuizAnswer } from '@/types';

interface QuizStats {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  skipped: number;
  timeSpent: number;
  accuracy: number;
}

/**
 * Hook for managing quiz progress and statistics
 */
export const useQuizManager = (questions: QuizQuestion[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [stats, setStats] = useState<QuizStats>({
    totalQuestions: questions.length,
    correctAnswers: 0,
    wrongAnswers: 0,
    skipped: 0,
    timeSpent: 0,
    accuracy: 0,
  });

  const submitAnswer = useCallback(
    (selectedIndex: number) => {
      const question = questions[currentIndex];
      const isCorrect = selectedIndex === question.correctAnswer;
      const timeSpent = Math.round((Date.now() - startTime) / 1000);

      const answer: QuizAnswer = {
        questionId: question.id,
        selectedAnswer: selectedIndex,
        isCorrect,
        timeSpent,
      };

      setAnswers((prev) => [...prev, answer]);
      setStats((prev) => ({
        ...prev,
        correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
        wrongAnswers: prev.wrongAnswers + (isCorrect ? 0 : 1),
      }));
    },
    [questions, currentIndex, startTime]
  );

  const skipQuestion = useCallback(() => {
    setStats((prev) => ({
      ...prev,
      skipped: prev.skipped + 1,
    }));
  }, []);

  const nextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setStartTime(Date.now());
    }
  }, [currentIndex, questions.length]);

  const previousQuestion = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const goToQuestion = useCallback((index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentIndex(index);
    }
  }, [questions.length]);

  const finishQuiz = useCallback(() => {
    const finalStats: QuizStats = {
      ...stats,
      timeSpent: Math.round((Date.now() - startTime) / 1000),
      accuracy: Math.round((stats.correctAnswers / stats.totalQuestions) * 100),
    };
    setStats(finalStats);
    return finalStats;
  }, [stats, startTime]);

  return {
    currentIndex,
    currentQuestion: questions[currentIndex],
    answers,
    stats,
    submitAnswer,
    skipQuestion,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    finishQuiz,
    isLastQuestion: currentIndex === questions.length - 1,
    progress: ((currentIndex + 1) / questions.length) * 100,
  };
};

/**
 * Calculate XP reward based on accuracy
 */
export const calculateXPReward = (accuracy: number, difficulty: 'easy' | 'medium' | 'hard'): number => {
  const baseXP = {
    easy: 50,
    medium: 100,
    hard: 150,
  };

  const accuracyBonus = Math.floor((accuracy / 100) * baseXP[difficulty]);
  return baseXP[difficulty] + accuracyBonus;
};

/**
 * Calculate coin reward
 */
export const calculateCoinReward = (accuracy: number): number => {
  if (accuracy === 100) return 50; // Perfect score bonus
  if (accuracy >= 80) return 30;
  if (accuracy >= 60) return 20;
  return 10;
};

/**
 * Check if achievement is unlocked
 */
export const checkAchievements = (
  stats: QuizStats,
  totalQuizzesCompleted: number,
  currentStreak: number
): string[] => {
  const unlockedAchievements: string[] = [];

  // Perfect score achievement
  if (stats.accuracy === 100) {
    unlockedAchievements.push('perfect-score');
  }

  // Speed demon achievement
  if (stats.timeSpent < 300 && stats.accuracy >= 80) {
    unlockedAchievements.push('speed-demon');
  }

  // First quiz achievement
  if (totalQuizzesCompleted === 1) {
    unlockedAchievements.push('first-quiz');
  }

  // Streak achievements
  if (currentStreak === 7) {
    unlockedAchievements.push('streak-7');
  }

  return unlockedAchievements;
};
