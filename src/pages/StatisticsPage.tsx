/**
 * Statistics Page
 */

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { BarChart3, TrendingUp, Target, Zap } from 'lucide-react';

interface CategoryStat {
  name: string;
  quizzes: number;
  accuracy: number;
  timeSpent: number;
  xpEarned: number;
}

const categoryStats: CategoryStat[] = [
  { name: 'Science', quizzes: 12, accuracy: 85, timeSpent: 4200, xpEarned: 1320 },
  { name: 'History', quizzes: 8, accuracy: 78, timeSpent: 2800, xpEarned: 880 },
  { name: 'Gaming', quizzes: 10, accuracy: 92, timeSpent: 3500, xpEarned: 1280 },
  { name: 'Movies', quizzes: 7, accuracy: 88, timeSpent: 2400, xpEarned: 840 },
  { name: 'Geography', quizzes: 5, accuracy: 75, timeSpent: 1800, xpEarned: 450 },
  { name: 'Technology', quizzes: 3, accuracy: 90, timeSpent: 1200, xpEarned: 360 },
];

export default function StatisticsPage() {
  const totalStats = {
    quizzes: categoryStats.reduce((sum, cat) => sum + cat.quizzes, 0),
    avgAccuracy:
      categoryStats.reduce((sum, cat) => sum + cat.accuracy, 0) / categoryStats.length,
    totalTime: categoryStats.reduce((sum, cat) => sum + cat.timeSpent, 0),
    totalXP: categoryStats.reduce((sum, cat) => sum + cat.xpEarned, 0),
  };

  const hours = Math.floor(totalStats.totalTime / 3600);
  const minutes = Math.floor((totalStats.totalTime % 3600) / 60);

  return (
    <div className="min-h-screen bg-dark-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="text-primary-400" size={32} />
            <h1 className="text-4xl font-bold text-white">Statistics</h1>
          </div>
          <p className="text-white/60">Track your learning progress and achievements</p>
        </motion.div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: 'Quizzes Completed',
              value: totalStats.quizzes,
              icon: Target,
              color: 'text-primary-400',
            },
            {
              label: 'Average Accuracy',
              value: `${Math.round(totalStats.avgAccuracy)}%`,
              icon: TrendingUp,
              color: 'text-success-400',
            },
            {
              label: 'Time Spent',
              value: `${hours}h ${minutes}m`,
              icon: Zap,
              color: 'text-gold-400',
            },
            {
              label: 'Total XP Earned',
              value: totalStats.totalXP.toLocaleString(),
              icon: BarChart3,
              color: 'text-secondary-400',
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center">
                <stat.icon className={`${stat.color} mx-auto mb-3`} size={32} />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <p className="text-sm text-white/60">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <h2 className="text-2xl font-bold text-white mb-6">Category Breakdown</h2>
            <div className="space-y-4">
              {categoryStats.map((stat, index) => (
                <motion.div
                  key={stat.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <div className="p-4 rounded-lg hover:bg-white/5 transition-colors border border-dark-600">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-white text-lg">{stat.name}</h3>
                      <Badge variant="success">{stat.accuracy}% Accuracy</Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-white/60 mb-1">Quizzes</p>
                        <p className="text-2xl font-bold text-primary-400">{stat.quizzes}</p>
                      </div>
                      <div>
                        <p className="text-white/60 mb-1">Time Spent</p>
                        <p className="text-2xl font-bold text-secondary-400">
                          {Math.round(stat.timeSpent / 60)}m
                        </p>
                      </div>
                      <div>
                        <p className="text-white/60 mb-1">XP Earned</p>
                        <p className="text-2xl font-bold text-gold-400">{stat.xpEarned}</p>
                      </div>
                    </div>

                    {/* Accuracy Bar */}
                    <div className="mt-4 h-2 bg-dark-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.accuracy}%` }}
                        transition={{ delay: 0.4 + index * 0.05 + 0.2 }}
                        className="h-full bg-gradient-to-r from-success-500 to-success-600"
                      />
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
