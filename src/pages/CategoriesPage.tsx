/**
 * Categories Browsing Page
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import CategoryGrid from '@/components/home/CategoryGrid';
import { categories } from '@/data/categories';
import { QuizCategory } from '@/types';
import { BookOpen, Zap } from 'lucide-react';

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | null>(null);

  const handleSelectCategory = (category: QuizCategory) => {
    setSelectedCategory(category);
    // TODO: Navigate to quiz page with selected category
    console.log(`Selected category: ${category.name}`);
  };

  const handleStartQuiz = () => {
    if (selectedCategory) {
      console.log(`Starting quiz: ${selectedCategory.name}`);
      // TODO: Navigate to quiz page
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="text-primary-400" size={32} />
            <h1 className="text-4xl font-bold text-white">Quiz Categories</h1>
          </div>
          <p className="text-white/60 text-lg">Choose a category and test your knowledge</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Categories Grid */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <CategoryGrid
                categories={categories}
                onSelectCategory={handleSelectCategory}
              />
            </motion.div>
          </div>

          {/* Selected Category Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {selectedCategory ? (
              <Card className="sticky top-24">
                <div className="text-center">
                  <div className="text-7xl mb-4">{selectedCategory.icon}</div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {selectedCategory.name}
                  </h2>
                  <p className="text-white/60 mb-4">{selectedCategory.description}</p>

                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60">Questions:</span>
                      <span className="font-bold text-white">
                        {selectedCategory.questionCount}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/60">Difficulty:</span>
                      <span className="font-bold text-amber-400 capitalize">
                        {selectedCategory.difficulty}
                      </span>
                    </div>
                  </div>

                  <Button
                    fullWidth
                    variant="primary"
                    onClick={handleStartQuiz}
                    className="group"
                  >
                    <Zap className="group-hover:animate-pulse" size={18} />
                    Start Quiz
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="sticky top-24 text-center py-12">
                <div className="text-6xl mb-4">👆</div>
                <h3 className="text-xl font-bold text-white mb-2">Select a Category</h3>
                <p className="text-white/60">Pick a category to see details and start a quiz</p>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
