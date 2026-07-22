/**
 * AI Quiz Generator Tests
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { aiQuizGenerator } from '@/features/aiQuizGenerator';
import * as openaiService from '@/services/openai';

vi.mock('@/services/openai');

describe('AIQuizGenerator', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    aiQuizGenerator.clearCache();
  });

  it('should generate a quiz', async () => {
    const mockQuestions = [
      {
        question: 'What is the capital of France?',
        options: ['Paris', 'London', 'Berlin', 'Madrid'],
        correctAnswer: 'Paris',
        explanation: 'Paris is the capital of France',
        difficulty: 'easy' as const,
      },
    ];

    vi.mocked(openaiService.openai.generateQuizTopic).mockResolvedValue(
      'European Capitals'
    );
    vi.mocked(openaiService.openai.generateQuestions).mockResolvedValue(
      mockQuestions
    );

    const quiz = await aiQuizGenerator.generateQuiz(
      'geography',
      'user-123',
      1,
      'easy'
    );

    expect(quiz).toBeDefined();
    expect(quiz.topic).toBe('European Capitals');
    expect(quiz.questions.length).toBe(1);
    expect(quiz.questions[0].question).toContain('capital');
  });

  it('should cache generated quiz', async () => {
    const mockQuestions = [
      {
        question: 'Test question?',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 'A',
        explanation: 'Test explanation',
        difficulty: 'medium' as const,
      },
    ];

    vi.mocked(openaiService.openai.generateQuizTopic).mockResolvedValue(
      'Test Topic'
    );
    vi.mocked(openaiService.openai.generateQuestions).mockResolvedValue(
      mockQuestions
    );

    const quiz1 = await aiQuizGenerator.generateQuiz(
      'science',
      'user-123',
      1
    );
    const quiz2 = await aiQuizGenerator.getQuiz(quiz1.id);

    expect(quiz2).toEqual(quiz1);
    expect(openaiService.openai.generateQuestions).toHaveBeenCalledTimes(1);
  });

  it('should handle custom topic', async () => {
    const mockQuestions = [
      {
        question: 'Custom quiz question?',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 'B',
        explanation: 'Custom explanation',
        difficulty: 'hard' as const,
      },
    ];

    vi.mocked(openaiService.openai.generateQuestions).mockResolvedValue(
      mockQuestions
    );

    const quiz = await aiQuizGenerator.generateQuiz(
      'history',
      'user-123',
      1,
      'hard',
      'World War II'
    );

    expect(quiz.topic).toBe('World War II');
    expect(
      vi.mocked(openaiService.openai.generateQuizTopic).mock.calls.length
    ).toBe(0);
  });
});
