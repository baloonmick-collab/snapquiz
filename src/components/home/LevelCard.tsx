/**
 * Level Card Component
 */

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Star } from 'lucide-react';

interface LevelCardProps {
  level: number;
  xp: number;
}

export default function LevelCard({ level, xp }: LevelCardProps) {
  return (
    <Card variant="gradient" className="text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 bg-gradient-to-br from-gold-400 to-gold-500 rounded-full flex items-center justify-center">
            <Star size={48} className="text-dark-900" />
          </div>
        </div>
        <h3 className="text-3xl font-bold text-white mb-2">Level {level}</h3>
        <Badge variant="primary" size="lg">
          {xp.toLocaleString()} Total XP
        </Badge>
      </motion.div>
    </Card>
  );
}
