/**
 * Stats Grid Component
 */

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { Flame, Trophy, Target } from 'lucide-react';

interface StatsGridProps {
  coins: number;
  streak: number;
  completedQuizzes: number;
}

export default function StatsGrid({ coins, streak, completedQuizzes }: StatsGridProps) {
  const stats = [
    { label: 'Coins', value: coins, icon: Target, color: 'text-gold-400' },
    { label: 'Streak', value: streak, icon: Flame, color: 'text-orange-400' },
    { label: 'Quizzes', value: completedQuizzes, icon: Trophy, color: 'text-primary-400' },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="text-center">
            <stat.icon className={`${stat.color} mx-auto mb-2`} size={32} />
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-white/60 mt-1">{stat.label}</div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
