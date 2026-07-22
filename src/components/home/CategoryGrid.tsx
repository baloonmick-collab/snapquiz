/**
 * Category Grid Component
 */

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { QuizCategory } from '@/types';

interface CategoryGridProps {
  categories: QuizCategory[];
  onSelectCategory: (category: QuizCategory) => void;
}

export default function CategoryGrid({ categories, onSelectCategory }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onSelectCategory(category)}
          className="group"
        >
          <Card className={`h-32 flex flex-col items-center justify-center cursor-pointer hover:shadow-glow-purple transition-all duration-300 bg-gradient-to-br ${category.color}`}>
            <div className="text-5xl mb-2 group-hover:scale-110 transition-transform">{category.icon}</div>
            <h3 className="text-sm font-semibold text-white text-center">{category.name}</h3>
          </Card>
        </motion.button>
      ))}
    </div>
  );
}
