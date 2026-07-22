/**
 * Timer Component
 */

import { motion } from 'framer-motion';
import { Clock, AlertTriangle } from 'lucide-react';

interface TimerProps {
  seconds: number;
  totalSeconds: number;
}

export default function Timer({ seconds, totalSeconds }: TimerProps) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const progress = (seconds / totalSeconds) * 100;
  const isWarning = progress < 20;
  const isCritical = progress < 10;

  return (
    <div className="flex items-center gap-4">
      <motion.div
        animate={{ scale: isCritical ? [1, 1.1, 1] : 1 }}
        transition={{ duration: 0.5, repeat: isCritical ? Infinity : 0 }}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold ${
          isCritical
            ? 'bg-error-500/20 border border-error-500 text-error-400'
            : isWarning
            ? 'bg-amber-500/20 border border-amber-500 text-amber-400'
            : 'bg-primary-500/20 border border-primary-500 text-primary-400'
        }`}
      >
        <Clock size={20} />
        <span>
          {minutes}:{secs.toString().padStart(2, '0')}
        </span>
      </motion.div>

      {isCritical && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-1 text-error-400 text-sm"
        >
          <AlertTriangle size={16} />
          <span>Time running out!</span>
        </motion.div>
      )}
    </div>
  );
}
