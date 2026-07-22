/**
 * Profile Page
 */

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import XPProgressBar from '@/components/ui/XPProgressBar';
import { User, Mail, Calendar, Flame, Trophy, Target } from 'lucide-react';

export default function ProfilePage() {
  // Mock user data
  const user = {
    username: 'YourUsername',
    email: 'user@example.com',
    avatar: '🎮',
    level: 12,
    xp: 8500,
    coins: 2340,
    streak: 7,
    maxStreak: 45,
    completedQuizzes: 45,
    joinedDate: 'January 15, 2024',
    totalXP: 8500,
  };

  const stats = [
    { label: 'Quizzes Completed', value: user.completedQuizzes, icon: Target },
    { label: 'Current Streak', value: user.streak, icon: Flame },
    { label: 'Best Streak', value: user.maxStreak, icon: Trophy },
  ];

  const categoryStats = [
    { name: 'Science', quizzes: 12, accuracy: 85 },
    { name: 'History', quizzes: 8, accuracy: 78 },
    { name: 'Gaming', quizzes: 10, accuracy: 92 },
    { name: 'Movies', quizzes: 7, accuracy: 88 },
    { name: 'Geography', quizzes: 5, accuracy: 75 },
    { name: 'Technology', quizzes: 3, accuracy: 90 },
  ];

  return (
    <div className="min-h-screen bg-dark-900 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card variant="gradient" className="mb-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="text-8xl">{user.avatar}</div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold text-white mb-2">{user.username}</h1>
                <p className="text-white/60 mb-4">Level {user.level} • {user.totalXP.toLocaleString()} Total XP</p>
                <div className="space-y-2 text-sm text-white/70 mb-6">
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    {user.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    Joined {user.joinedDate}
                  </div>
                </div>
                <Button variant="secondary">Edit Profile</Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* XP Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">XP Progress</h2>
            <XPProgressBar currentXP={user.xp} showLabel />
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="grid md:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className="text-center">
                  <stat.icon className="text-primary-400 mx-auto mb-3" size={32} />
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <p className="text-sm text-white/60">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Category Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <h2 className="text-2xl font-bold text-white mb-6">Category Performance</h2>
            <div className="space-y-4">
              {categoryStats.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-white">{category.name}</h3>
                        <Badge variant="success" size="sm">
                          {category.accuracy}% accuracy
                        </Badge>
                      </div>
                      <p className="text-sm text-white/60">{category.quizzes} quizzes completed</p>
                    </div>
                    <div className="text-right">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center font-bold text-white">
                        {category.accuracy}%
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
