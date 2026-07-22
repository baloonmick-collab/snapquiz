/**
 * Main App Component with Providers
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { BattleProvider } from '@/context/BattleContext';
import MainLayout from '@/components/layout/MainLayout';
import LandingPage from '@/pages/LandingPage';
import DashboardPage from '@/pages/DashboardPage';
import QuizPage from '@/pages/QuizPage';
import LeaderboardPage from '@/pages/LeaderboardPage';
import ProfilePage from '@/pages/ProfilePage';
import LoginPage from '@/pages/LoginPage';
import BattlePage from '@/pages/BattlePage';
import ToastContainer from '@/components/ui/ToastContainer';
import '@/styles/index.css';

type PageType = 'landing' | 'login' | 'dashboard' | 'quiz' | 'battle' | 'leaderboard' | 'profile';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    // Redirect to landing if not authenticated and trying to access protected pages
    if (!isAuthenticated && ['dashboard', 'quiz', 'battle', 'leaderboard', 'profile'].includes(currentPage)) {
      return <LandingPage onNavigate={handleNavigate} />;
    }

    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} onToast={addToast} />;
      case 'dashboard':
        return (
          <MainLayout onNavigate={handleNavigate}>
            <DashboardPage onNavigate={handleNavigate} />
          </MainLayout>
        );
      case 'quiz':
        return (
          <MainLayout onNavigate={handleNavigate}>
            <QuizPage onNavigate={handleNavigate} onToast={addToast} />
          </MainLayout>
        );
      case 'battle':
        return (
          <MainLayout onNavigate={handleNavigate}>
            <BattlePage onNavigate={handleNavigate} onToast={addToast} />
          </MainLayout>
        );
      case 'leaderboard':
        return (
          <MainLayout onNavigate={handleNavigate}>
            <LeaderboardPage />
          </MainLayout>
        );
      case 'profile':
        return (
          <MainLayout onNavigate={handleNavigate}>
            <ProfilePage onNavigate={handleNavigate} />
          </MainLayout>
        );
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-900 text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {renderPage()}
      </motion.div>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BattleProvider>
        <AppContent />
      </BattleProvider>
    </AuthProvider>
  );
}

export default App;
