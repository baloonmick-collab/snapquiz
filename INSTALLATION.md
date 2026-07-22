/**
 * Comprehensive Installation and Setup Guide
 */

# 🚀 SnapQuiz Installation & Setup Guide

## Prerequisites

- **Node.js**: Version 16.x or higher ([Download](https://nodejs.org/))
- **npm**: Version 8.x or higher (comes with Node.js)
- **Git**: Version 2.0 or higher ([Download](https://git-scm.com/))

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/baloonmick-collab/snapquiz.git
cd snapquiz
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install

# Or using pnpm
pnpm install
```

### 3. Environment Setup

```bash
# Copy the example environment file
cp .env.example .env.local
```

Then edit `.env.local` with your values:

```env
# Supabase (optional, for backend integration)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# API Configuration
VITE_API_URL=http://localhost:3000

# App Configuration
VITE_APP_NAME=SnapQuiz
VITE_APP_VERSION=1.0.0
```

### 4. Start Development Server

```bash
npm run dev
```

The app will open in your browser at `http://localhost:5173`

## Building for Production

### Build the Application

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
snapquiz/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── ui/             # Basic UI components (Button, Card, etc.)
│   │   ├── layout/         # Layout components (Navbar, BottomNav)
│   │   ├── home/           # Home page components
│   │   └── quiz/           # Quiz-related components
│   ├── pages/              # Page components
│   │   ├── LandingPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── QuizPage.tsx
│   │   ├── LeaderboardPage.tsx
│   │   └── ProfilePage.tsx
│   ├── features/           # Feature hooks and utilities
│   │   ├── quiz.ts        # Quiz management
│   │   ├── user.ts        # User management
│   │   ├── rewards.ts     # Reward system
│   │   └── analytics.ts   # Analytics tracking
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── services/           # API services (Supabase, etc.)
│   ├── data/               # Mock data and constants
│   ├── types/              # TypeScript type definitions
│   ├── styles/             # Global styles
│   ├── App.tsx             # Root app component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── index.html              # HTML entry point
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite config
├── tailwind.config.js      # Tailwind CSS config
├── postcss.config.js       # PostCSS config
└── README.md               # Documentation
```

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

## Development Tips

### Hot Module Replacement (HMR)
Vite provides instant HMR during development. Just save your changes and they'll reflect immediately in the browser.

### TypeScript
The project uses strict TypeScript. All components should have proper type definitions.

### Tailwind CSS
Utility classes are available for styling. Check `tailwind.config.js` for custom theme values.

### Framer Motion
For animations, use Framer Motion components. Examples:
- `motion.div` - Animated div
- `motion.button` - Animated button
- `AnimatePresence` - For enter/exit animations

## Backend Integration (Supabase)

### Setting up Supabase

1. Go to [supabase.com](https://supabase.com) and create a project
2. Get your API URL and Anon Key from project settings
3. Add them to `.env.local`
4. Implement functions in `src/services/supabase.ts`

See `TODO` comments in the codebase for what needs to be implemented.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Tips

1. **Code Splitting**: Routes are automatically code-split by Vite
2. **Image Optimization**: Use optimized images in public folder
3. **Bundle Analysis**: Use `vite-plugin-compression` for compression
4. **Lazy Loading**: Use `React.lazy()` for route components

## Troubleshooting

### Port Already in Use

```bash
# Change the port in vite.config.ts or use:
npm run dev -- --port 3000
```

### Module Not Found

Make sure path aliases in `tsconfig.json` match those in `vite.config.ts`.

### Tailwind Classes Not Applying

Verify that:
1. The file is included in `tailwind.config.js` content paths
2. You're using the correct class names
3. Run `npm install` to ensure all dependencies are installed

### Build Fails

```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run build
```

## Next Steps

1. **Customize Theme**: Edit `tailwind.config.js` and `src/styles/index.css`
2. **Add More Questions**: Edit files in `src/data/quizzes.ts`
3. **Connect Backend**: Implement Supabase functions in `src/services/`
4. **Add Authentication**: Use Supabase Auth for user management
5. **Deploy**: Deploy to Vercel, Netlify, or your preferred hosting

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

1. Push to GitHub
2. Connect to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### GitHub Pages

```bash
# Build and deploy
npm run build
# Push dist folder to gh-pages branch
```

## Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Supabase Docs](https://supabase.com/docs)

## Getting Help

- Check existing [GitHub Issues](https://github.com/baloonmick-collab/snapquiz/issues)
- Create a new issue with detailed information
- Check the code comments (marked with TODO)

## License

MIT License - See LICENSE file for details

---

**Happy coding! 🚀**
