# SnapQuiz - Learn Faster. Play Smarter.

A modern, gamified quiz platform built with React, TypeScript, Vite, and Tailwind CSS. Features XP system, daily streaks, achievements, leaderboards, and beautiful glass-morphism UI.

## 🚀 Features

- **XP System**: Earn experience points with every correct answer
- **Level Progression**: Unlock new levels as you gain XP
- **Daily Streaks**: Build consecutive day streaks for bonus rewards
- **Achievements**: Unlock special badges and achievements
- **Leaderboards**: Compete with friends and climb the rankings
- **Multiple Categories**: 8 different quiz categories to choose from
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Beautiful UI**: Glassmorphism cards with smooth animations
- **Gamification**: Coins, rewards, and progression system

## 📱 Quiz Categories

- 🔬 Science
- 📚 History
- 🎮 Gaming
- 🎬 Movies
- 🌍 Geography
- 💻 Technology
- ⚽ Sports

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **Supabase** - Backend (prepared for integration)

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── XPProgressBar.tsx
│   │   ├── Modal.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── SkeletonLoader.tsx
│   │   └── ToastContainer.tsx
│   ├── layout/
│   │   ├── MainLayout.tsx
│   │   ├── Navbar.tsx
│   │   └── BottomNav.tsx
│   ├── home/
│   │   ├── LevelCard.tsx
│   │   ├── StatsGrid.tsx
│   │   ├── CategoryGrid.tsx
│   │   └── AchievementsPreview.tsx
├── pages/
│   ├── LandingPage.tsx
│   ├── DashboardPage.tsx
│   ├── QuizPage.tsx
│   ├── LeaderboardPage.tsx
│   └── ProfilePage.tsx
├── features/
├── hooks/
│   └── index.ts
├── lib/
│   └── utils.ts
├── services/
│   └── [Supabase integration]
├── data/
│   ├── quizzes.ts
│   └── categories.ts
├── styles/
│   └── index.css
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```

## 🎨 Theme

**Colors:**
- Primary: Purple (#7C3AED)
- Secondary: Blue (#3B82F6)
- Success: Green
- Error: Red
- XP: Gold
- Background: Very dark (#09090B)

**Style:**
- Glassmorphism cards
- Smooth animations with Framer Motion
- Rounded corners and soft shadows
- Hover effects
- Mobile-first responsive design

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📊 Reward System

- **Correct Answer**: +10 XP + 5 Coins
- **Quiz Completion Bonus**: +50 XP
- **Perfect Score Bonus**: +100 XP
- **Daily Login**: +50 XP
- **Streak Bonus**: +10 XP per day in streak

## 🔐 Authentication & Backend

### TODO: Supabase Integration

```typescript
// TODO: Set up Supabase project
// TODO: Create authentication service
// TODO: Integrate user profiles
// TODO: Store quiz results
// TODO: Implement leaderboard queries
// TODO: Add achievement tracking
// TODO: Set up real-time multiplayer
```

## 🎯 Future Features

- ✨ **Multiplayer Battles**: Real-time quiz battles with friends
- 🤖 **AI Quiz Generator**: Auto-generated quizzes powered by AI
- 📱 **Mobile App**: Native iOS and Android apps
- 🌐 **Social Features**: Share scores and challenge friends
- 🏆 **Tournament Mode**: Organized competitions
- 📚 **Custom Quizzes**: Create your own quizzes

## 📝 Sample Data

The app includes 70+ pre-made questions across 7 categories:
- Science (10 questions)
- History (10 questions)
- Gaming (10 questions)
- Movies (10 questions)
- Geography (10 questions)
- Technology (10 questions)
- Sports (10 questions)

## 💡 Code Quality

- ✅ Strict TypeScript
- ✅ Component-based architecture
- ✅ Clean folder structure
- ✅ Reusable hooks
- ✅ Responsive design
- ✅ Accessible UI
- ✅ Well-commented code
- ✅ No code duplication

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Made with ❤️ for learners everywhere**
