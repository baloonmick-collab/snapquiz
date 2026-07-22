export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          display_name: string;
          avatar_url: string | null;
          xp: number;
          coins: number;
          level: number;
          streak: number;
          last_quiz_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name: string;
          avatar_url?: string | null;
          xp?: number;
          coins?: number;
          level?: number;
          streak?: number;
          last_quiz_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string;
          avatar_url?: string | null;
          xp?: number;
          coins?: number;
          level?: number;
          streak?: number;
          last_quiz_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      quiz_results: {
        Row: {
          id: string;
          user_id: string;
          category_id: string;
          score: number;
          total_questions: number;
          xp_earned: number;
          coins_earned: number;
          time_spent_seconds: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          category_id: string;
          score: number;
          total_questions: number;
          xp_earned: number;
          coins_earned: number;
          time_spent_seconds: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          category_id?: string;
          score?: number;
          total_questions?: number;
          xp_earned?: number;
          coins_earned?: number;
          time_spent_seconds?: number;
          created_at?: string;
        };
      };
      leaderboard: {
        Row: {
          id: string;
          user_id: string;
          xp: number;
          level: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          xp: number;
          level: number;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          xp?: number;
          level?: number;
          updated_at?: string;
        };
      };
      user_achievements: {
        Row: {
          id: string;
          user_id: string;
          achievement_id: string;
          unlocked_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          achievement_id: string;
          unlocked_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          achievement_id?: string;
          unlocked_at?: string;
        };
      };
      battles: {
        Row: {
          id: string;
          player1_id: string;
          player2_id: string;
          category_id: string;
          status: 'waiting' | 'in_progress' | 'completed' | 'cancelled';
          winner_id: string | null;
          created_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          player1_id: string;
          player2_id: string;
          category_id: string;
          status?: 'waiting' | 'in_progress' | 'completed' | 'cancelled';
          winner_id?: string | null;
          created_at?: string;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          player1_id?: string;
          player2_id?: string;
          category_id?: string;
          status?: 'waiting' | 'in_progress' | 'completed' | 'cancelled';
          winner_id?: string | null;
          created_at?: string;
          completed_at?: string | null;
        };
      };
      battle_scores: {
        Row: {
          id: string;
          battle_id: string;
          player_id: string;
          score: number;
          xp_earned: number;
        };
        Insert: {
          id?: string;
          battle_id: string;
          player_id: string;
          score: number;
          xp_earned: number;
        };
        Update: {
          id?: string;
          battle_id?: string;
          player_id?: string;
          score?: number;
          xp_earned?: number;
        };
      };
      ai_quizzes: {
        Row: {
          id: string;
          category_id: string;
          topic: string;
          questions: Json;
          created_at: string;
          created_by: string;
        };
        Insert: {
          id?: string;
          category_id: string;
          topic: string;
          questions: Json;
          created_at?: string;
          created_by: string;
        };
        Update: {
          id?: string;
          category_id?: string;
          topic?: string;
          questions?: Json;
          created_at?: string;
          created_by?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}
