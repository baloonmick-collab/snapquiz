# SnapQuiz Backend Setup Guide

## 🚀 Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (free tier available)
- OpenAI API key (optional, for AI quiz generation)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/baloonmick-collab/snapquiz.git
cd snapquiz

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
```

## 🔧 Configuration

### 1. Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. In your project settings, copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **Anon Key** → `VITE_SUPABASE_ANON_KEY`

4. Go to the **SQL Editor** and run the migrations:
   - Copy all SQL from `supabase/migrations/001_create_schema.sql`
   - Paste and run in the SQL editor
   - This creates all tables, indexes, RLS policies, and triggers

### 2. OpenAI Setup (Optional - for AI Quiz Generator)

1. Go to [openai.com/api](https://platform.openai.com/api/keys)
2. Create a new API key
3. Add to `.env.local`:
   ```
   VITE_OPENAI_API_KEY=sk-your-key-here
   VITE_OPENAI_ORG_ID=org-your-org-id  # optional
   ```

### 3. Update `.env.local`

```bash
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# OpenAI (optional)
VITE_OPENAI_API_KEY=sk-your-key
VITE_OPENAI_ORG_ID=org-your-org

# App
VITE_APP_ENV=development
```

## 🚀 Running the App

```bash
# Development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🧪 Testing

```bash
# Run all tests
npm run test

# Watch mode
npm run test -- --watch

# Coverage report
npm run test:coverage

# UI dashboard
npm run test:ui
```

## 📚 Features

### ✅ Implemented

- **Authentication**
  - Email/password signup and signin
  - User profile creation
  - Session management
  - Auth context for app-wide state

- **Quiz System**
  - Traditional quizzes (70+ questions)
  - AI-generated quizzes (requires OpenAI API)
  - Quiz difficulty levels (easy, medium, hard)
  - Real-time scoring
  - XP and coin rewards

- **Multiplayer Battles**
  - Real-time quiz battles between players
  - Time-based scoring bonuses
  - Winner determination
  - Battle history
  - XP rewards for participants

- **Leaderboards**
  - Global rankings
  - Time-based filters (week, month, all-time)
  - User statistics
  - Real-time updates via triggers

- **Achievements**
  - Unlock badges and achievements
  - Customizable achievements
  - User achievement tracking

- **Testing**
  - Vitest for unit tests
  - React Testing Library for component tests
  - AuthContext tests
  - BattleManager tests
  - AIQuizGenerator tests
  - Rewards calculation tests

### 🚀 Future Features

- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Friend system and challenges
- [ ] Custom quiz creation
- [ ] Tournament mode
- [ ] Push notifications
- [ ] Social sharing

## 🏗️ Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/             # Page components
├── context/           # React contexts (Auth, Battle)
├── features/          # Business logic (battleManager, aiQuizGenerator)
├── hooks/             # Custom hooks
├── services/          # External services (Supabase, OpenAI)
├── data/              # Static data and configuration
├── lib/               # Utility functions
├── styles/            # Global styles
├── types/             # TypeScript types
├── __tests__/         # Test files
└── App.tsx            # Root component

supabase/
└── migrations/        # Database SQL migrations
```

## 🔐 Security

- All database tables have Row Level Security (RLS) enabled
- Users can only access their own data
- Leaderboard is public read-only
- Authentication via Supabase Auth
- API keys stored in environment variables (never committed)

## 📝 API Reference

### Authentication

```typescript
import { auth } from '@/services/supabase';

const { user } = await auth.signUp(email, password, displayName);
await auth.signIn(email, password);
await auth.signOut();
const user = await auth.getCurrentUser();
```

### User Profile

```typescript
import { userProfile } from '@/services/supabase';

const profile = await userProfile.getProfile(userId);
await userProfile.updateProfile(userId, { xp: 1000 });
await userProfile.addXP(userId, 100);
await userProfile.addCoins(userId, 50);
```

### Quiz Results

```typescript
import { quizResults } from '@/services/supabase';

await quizResults.saveResult(
  userId,
  categoryId,
  score,
  totalQuestions,
  xpEarned,
  coinsEarned,
  timeSpentSeconds
);
const results = await quizResults.getResults(userId);
const stats = await quizResults.getStats(userId);
```

### Battles

```typescript
import { battles } from '@/services/supabase';

const battle = await battles.createBattle(player1Id, player2Id, categoryId);
await battles.updateBattleStatus(battleId, 'in_progress');
await battles.recordBattleScore(battleId, playerId, score, xpEarned);
```

### Leaderboard

```typescript
import { leaderboard } from '@/services/supabase';

const rankings = await leaderboard.getLeaderboard('week');
const rank = await leaderboard.getUserRank(userId, 'alltime');
```

### AI Quizzes

```typescript
import { openai } from '@/services/openai';

const questions = await openai.generateQuestions(
  'History',
  'World War II',
  10,
  'medium'
);
```

## 🐛 Troubleshooting

### "Supabase environment variables not configured"
- Make sure `.env.local` exists and has `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

### "Failed to parse OpenAI response"
- Check that OpenAI API key is valid
- Ensure your OpenAI account has API access enabled

### "RLS policy violation"
- Make sure you're authenticated as the correct user
- Check that RLS policies are correctly set up in Supabase

### Database tables not found
- Run the SQL migrations in `supabase/migrations/001_create_schema.sql`
- Verify they completed without errors

## 📞 Support

For issues or questions:
1. Check the [Supabase docs](https://supabase.com/docs)
2. Check the [OpenAI docs](https://platform.openai.com/docs)
3. Create an issue in the repository

## 📄 License

MIT License - See LICENSE file for details
