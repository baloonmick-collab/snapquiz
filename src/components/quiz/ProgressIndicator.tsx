/**
 * Progress Indicator Component
 */

import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  current: number;
  total: number;
  showLabel?: boolean;
}

export default function ProgressIndicator({ current, total, showLabel = true }: ProgressIndicatorProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="space-y-2">
      {showLabel && (
        <div className="flex justify-between items-center text-sm text-white/70">
          <span>Progress</span>
          <span>
            {current} / {total}
          </span>
        </div>
      )}
      <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden border border-dark-600">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
        />
      </div>
    </div>
  );
}
