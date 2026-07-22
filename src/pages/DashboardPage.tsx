/**
 * Updated Dashboard Page with Recent Activity
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import XPProgressBar from '@/components/ui/XPProgressBar';
import LevelCard from '@/components/home/LevelCard';
import StatsGrid from '@/components/home/StatsGrid';
import CategoryGrid from '@/components/home/CategoryGrid';
import AchievementsPreview from '@/components/home/AchievementsPreview';
import RecentActivity from '@/components/home/RecentActivity';
import { categories, achievements } from '@/data/categories';
import { QuizCategory } from '@/types';

export default function DashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | null>(null);

  // Mock user data
  const user = {
    level: 12,
    xp: 8500,
    coins: 2340,
    streak: 7,
    completedQuizzes: 45,
  };

  const handleStartQuiz = (category: QuizCategory) => {
    setSelectedCategory(category);
    // TODO: Navigate to quiz page with TanStack Router
    console.log(`Starting quiz in ${category.name}`);
  };

  return (
    <div className="min-h-screen bg-dark-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back!</h1>
          <p className="text-white/60">Keep your streak going and earn more XP today.</p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Level Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <LevelCard level={user.level} xp={user.xp} />
            </motion.div>

            {/* XP Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <h3 className="text-lg font-semibold text-white mb-4">XP Progress</h3>
                <XPProgressBar currentXP={user.xp} showLabel />
              </Card>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <StatsGrid
                coins={user.coins}
                streak={user.streak}
                completedQuizzes={user.completedQuizzes}
              />
            </motion.div>
          </div>

          {/* Right Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="sticky top-24">
                <h3 className="text-lg font-semibold text-white mb-4">Daily Login</h3>
                <div className="text-center">
                  <div className="text-5xl font-bold text-gold-400 mb-2">+50 XP</div>
                  <p className="text-white/60 text-sm mb-4">Claim your daily bonus</p>
                  <Button fullWidth variant="primary">
                    Claim Reward
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Categories Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Card>
            <h2 className="text-2xl font-bold text-white mb-6">Choose a Category</h2>
            <CategoryGrid categories={categories} onSelectCategory={handleStartQuiz} />
          </Card>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <AchievementsPreview achievements={achievements} />
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <RecentActivity />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
