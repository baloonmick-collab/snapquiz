/**
 * Recent Activity Component
 */

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Trophy, Zap, Target } from 'lucide-react';

interface Activity {
  id: string;
  type: 'quiz_completed' | 'achievement_unlocked' | 'level_up';
  title: string;
  description: string;
  timestamp: string;
  icon: React.ReactNode;
  reward?: { xp?: number; coins?: number };
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'quiz_completed',
    title: 'Completed Science Quiz',
    description: 'Scored 95% on Science Quiz',
    timestamp: '2 hours ago',
    icon: <Zap className="text-gold-400" size={20} />,
    reward: { xp: 145, coins: 47 },
  },
  {
    id: '2',
    type: 'achievement_unlocked',
    title: 'Speed Demon Unlocked',
    description: 'Completed a quiz in under 5 minutes',
    timestamp: '5 hours ago',
    icon: <Trophy className="text-primary-400" size={20} />,
  },
  {
    id: '3',
    type: 'level_up',
    title: 'Reached Level 12',
    description: 'You\'ve progressed to the next level!',
    timestamp: '1 day ago',
    icon: <Target className="text-success-400" size={20} />,
  },
  {
    id: '4',
    type: 'quiz_completed',
    title: 'Completed History Quiz',
    description: 'Scored 88% on History Quiz',
    timestamp: '2 days ago',
    icon: <Zap className="text-gold-400" size={20} />,
    reward: { xp: 132, coins: 44 },
  },
];

export default function RecentActivity() {
  return (
    <Card>
      <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
      <div className="space-y-3">
        {mockActivities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors"
          >
            <div className="mt-1">{activity.icon}</div>
            <div className="flex-1">
              <h3 className="font-semibold text-white">{activity.title}</h3>
              <p className="text-sm text-white/60">{activity.description}</p>
              <p className="text-xs text-white/40 mt-1">{activity.timestamp}</p>
            </div>
            {activity.reward && (
              <div className="text-right">
                {activity.reward.xp && (
                  <Badge variant="primary" size="sm">
                    +{activity.reward.xp} XP
                  </Badge>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
