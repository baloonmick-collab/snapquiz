/**
 * Main App Component with Router
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import LandingPage from '@/pages/LandingPage';
import DashboardPage from '@/pages/DashboardPage';
import QuizPage from '@/pages/QuizPage';
import LeaderboardPage from '@/pages/LeaderboardPage';
import ProfilePage from '@/pages/ProfilePage';
import ToastContainer from '@/components/ui/ToastContainer';
import '@/styles/index.css';

type PageType = 'landing' | 'dashboard' | 'quiz' | 'leaderboard' | 'profile';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // TODO: Integrate with Supabase for authentication
  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
    addToast('Logged in successfully!', 'success');
  };

  // TODO: Integrate with Supabase for logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('landing');
    addToast('Logged out successfully!', 'info');
  };

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
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return isAuthenticated ? (
          <MainLayout>
            <DashboardPage />
          </MainLayout>
        ) : (
          <LandingPage />
        );
      case 'quiz':
        return (
          <MainLayout>
            <QuizPage />
          </MainLayout>
        );
      case 'leaderboard':
        return (
          <MainLayout>
            <LeaderboardPage />
          </MainLayout>
        );
      case 'profile':
        return (
          <MainLayout>
            <ProfilePage />
          </MainLayout>
        );
      default:
        return <LandingPage />;
    }
  };

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

export default App;
