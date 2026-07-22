-- ============================================================================
-- SnapQuiz Database Schema
-- Run this SQL in your Supabase SQL Editor
-- ============================================================================

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  xp INTEGER DEFAULT 0,
  coins INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak INTEGER DEFAULT 0,
  last_quiz_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Quiz Results table
CREATE TABLE IF NOT EXISTS quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category_id VARCHAR(50) NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  xp_earned INTEGER NOT NULL,
  coins_earned INTEGER NOT NULL,
  time_spent_seconds INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Leaderboard view (updated via trigger)
CREATE TABLE IF NOT EXISTS leaderboard (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- User Achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  achievement_id VARCHAR(50) NOT NULL,
  unlocked_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Battles table
CREATE TABLE IF NOT EXISTS battles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player1_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  player2_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category_id VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'waiting',
  winner_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Battle Scores table
CREATE TABLE IF NOT EXISTS battle_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  battle_id UUID NOT NULL REFERENCES battles(id) ON DELETE CASCADE,
  player_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  xp_earned INTEGER NOT NULL
);

-- AI Quizzes table
CREATE TABLE IF NOT EXISTS ai_quizzes (
  id VARCHAR(100) PRIMARY KEY,
  category_id VARCHAR(50) NOT NULL,
  topic VARCHAR(255) NOT NULL,
  questions JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================================================
-- INDEXES for performance
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_quiz_results_user_id ON quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_category_id ON quiz_results(category_id);
CREATE INDEX IF NOT EXISTS idx_battles_player1_id ON battles(player1_id);
CREATE INDEX IF NOT EXISTS idx_battles_player2_id ON battles(player2_id);
CREATE INDEX IF NOT EXISTS idx_battles_status ON battles(status);
CREATE INDEX IF NOT EXISTS idx_battle_scores_battle_id ON battle_scores(battle_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_quizzes_category_id ON ai_quizzes(category_id);
CREATE INDEX IF NOT EXISTS idx_leaderboard_xp ON leaderboard(xp DESC);

-- ============================================================================
-- TRIGGERS for automatic updates
-- ============================================================================

-- Update leaderboard when user XP changes
CREATE OR REPLACE FUNCTION update_leaderboard()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO leaderboard (user_id, xp, level)
  VALUES (NEW.id, NEW.xp, NEW.level)
  ON CONFLICT (user_id)
  DO UPDATE SET xp = NEW.xp, level = NEW.level, updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_leaderboard ON users;
CREATE TRIGGER trigger_update_leaderboard
AFTER UPDATE ON users
FOR EACH ROW
WHEN (OLD.xp IS DISTINCT FROM NEW.xp OR OLD.level IS DISTINCT FROM NEW.level)
EXECUTE FUNCTION update_leaderboard();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) Policies
-- ============================================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE battles ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- Users can read all user profiles
CREATE POLICY "Users can read all profiles" ON users
FOR SELECT USING (true);

-- Users can update only their own profile
CREATE POLICY "Users can update own profile" ON users
FOR UPDATE USING (auth.uid() = id);

-- Users can read their own quiz results
CREATE POLICY "Users can read own quiz results" ON quiz_results
FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own quiz results
CREATE POLICY "Users can insert quiz results" ON quiz_results
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Public leaderboard read
CREATE POLICY "Leaderboard is public" ON leaderboard
FOR SELECT USING (true);

-- Users can read their achievements
CREATE POLICY "Users can read own achievements" ON user_achievements
FOR SELECT USING (auth.uid() = user_id);

-- Users can read battles they participate in
CREATE POLICY "Users can read own battles" ON battles
FOR SELECT USING (auth.uid() = player1_id OR auth.uid() = player2_id);

-- ============================================================================
-- Sample Data (Optional)
-- ============================================================================

-- Uncomment to add sample achievements
-- INSERT INTO achievements (id, name, description, icon, xp_threshold) VALUES
-- ('first-quiz', 'First Quiz', 'Complete your first quiz', '🎯', 0),
-- ('level-5', 'Level 5', 'Reach level 5', '⭐', 5000),
-- ('100-xp', '100 XP', 'Earn 100 XP', '✨', 100);
