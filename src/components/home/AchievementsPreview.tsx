/**
 * Achievements Preview Component
 */

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { Achievement } from '@/types';

interface AchievementsPreviewProps {
  achievements: Achievement[];
}

export default function AchievementsPreview({ achievements }: AchievementsPreviewProps) {
  const unlocked = achievements.filter((a) => a.unlockedAt);

  return (
    <Card>
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white mb-2">Achievements</h2>
        <p className="text-white/60 text-sm">
          {unlocked.length} / {achievements.length} unlocked
        </p>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {achievements.slice(0, 8).map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`h-16 rounded-lg flex items-center justify-center text-3xl ${
              achievement.unlockedAt ? 'bg-gold-500/20' : 'bg-dark-700 opacity-50'
            }`}
            title={achievement.name}
          >
            {achievement.icon}
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
