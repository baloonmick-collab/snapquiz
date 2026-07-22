/**
 * AI Quiz Generator
 * Generates dynamic quizzes using OpenAI
 */

import { openai, GeneratedQuestion } from '@/services/openai';
import { supabase } from '@/services/supabase';

export interface AIQuiz {
  id: string;
  categoryId: string;
  topic: string;
  questions: GeneratedQuestion[];
  createdAt: string;
  createdBy: string;
}

class AIQuizGenerator {
  private cache: Map<string, AIQuiz> = new Map();
  private CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  /**
   * Generate a new quiz for a category
   */
  async generateQuiz(
    categoryId: string,
    userId: string,
    questionCount: number = 10,
    difficulty: 'easy' | 'medium' | 'hard' = 'medium',
    topic?: string
  ): Promise<AIQuiz> {
    const categoryNames: { [key: string]: string } = {
      science: 'Science',
      history: 'History',
      gaming: 'Gaming',
      movies: 'Movies',
      geography: 'Geography',
      technology: 'Technology',
      sports: 'Sports',
    };

    const categoryName = categoryNames[categoryId] || categoryId;

    // Generate topic if not provided
    let quizTopic = topic;
    if (!quizTopic) {
      try {
        quizTopic = await openai.generateQuizTopic(categoryName);
      } catch (error) {
        console.error('Failed to generate topic:', error);
        quizTopic = `${categoryName} Quiz`;
      }
    }

    // Generate questions
    console.log(
      `Generating ${questionCount} ${difficulty} questions about "${quizTopic}" in ${categoryName}...`
    );
    const questions = await openai.generateQuestions(
      categoryName,
      quizTopic,
      questionCount,
      difficulty
    );

    // Create quiz object
    const quiz: AIQuiz = {
      id: `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      categoryId,
      topic: quizTopic,
      questions,
      createdAt: new Date().toISOString(),
      createdBy: userId,
    };

    // Cache locally
    this.cache.set(quiz.id, quiz);

    // Save to database
    try {
      await supabase.from('ai_quizzes').insert([
        {
          id: quiz.id,
          category_id: categoryId,
          topic: quizTopic,
          questions: questions as any,
          created_by: userId,
        },
      ]);
    } catch (error) {
      console.error('Failed to save quiz to database:', error);
      // Continue anyway - quiz is still usable from cache
    }

    return quiz;
  }

  /**
   * Get quiz by ID
   */
  async getQuiz(quizId: string): Promise<AIQuiz | null> {
    // Check cache first
    if (this.cache.has(quizId)) {
      return this.cache.get(quizId) || null;
    }

    // Check database
    try {
      const { data, error } = await supabase
        .from('ai_quizzes')
        .select('*')
        .eq('id', quizId)
        .single();

      if (error) throw error;

      const quiz: AIQuiz = {
        id: data.id,
        categoryId: data.category_id,
        topic: data.topic,
        questions: data.questions as GeneratedQuestion[],
        createdAt: data.created_at,
        createdBy: data.created_by,
      };

      // Cache it
      this.cache.set(quizId, quiz);
      return quiz;
    } catch (error) {
      console.error('Failed to fetch quiz from database:', error);
      return null;
    }
  }

  /**
   * Get recent AI quizzes for a category
   */
  async getRecentQuizzes(
    categoryId: string,
    limit: number = 10
  ): Promise<AIQuiz[]> {
    try {
      const { data, error } = await supabase
        .from('ai_quizzes')
        .select('*')
        .eq('category_id', categoryId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return data.map((row: any) => ({
        id: row.id,
        categoryId: row.category_id,
        topic: row.topic,
        questions: row.questions as GeneratedQuestion[],
        createdAt: row.created_at,
        createdBy: row.created_by,
      }));
    } catch (error) {
      console.error('Failed to fetch recent quizzes:', error);
      return [];
    }
  }

  /**
   * Generate multiple quiz variants
   */
  async generateQuizVariants(
    categoryId: string,
    userId: string,
    topic: string,
    variantCount: number = 3,
    difficulty: 'easy' | 'medium' | 'hard' = 'medium'
  ): Promise<AIQuiz[]> {
    const quizzes = await Promise.all(
      Array(variantCount)
        .fill(null)
        .map(() =>
          this.generateQuiz(
            categoryId,
            userId,
            10,
            difficulty,
            topic
          )
        )
    );

    return quizzes;
  }

  /**
   * Clear cache (manual cleanup)
   */
  clearCache(): void {
    this.cache.clear();
  }
}

export const aiQuizGenerator = new AIQuizGenerator();
export default aiQuizGenerator;
