/**
 * Advanced Quiz Question Card Component
 */

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { QuizQuestion } from '@/types';
import { Zap, Clock } from 'lucide-react';

interface QuestionCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  showExplanation: boolean;
  onSelectAnswer: (index: number) => void;
}

const difficultyColors = {
  easy: 'from-success-500 to-success-600',
  medium: 'from-amber-500 to-amber-600',
  hard: 'from-error-500 to-error-600',
};

const difficultyLabels = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  showExplanation,
  onSelectAnswer,
}: QuestionCardProps) {
  return (
    <Card variant="gradient" className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">{question.question}</h2>
          <p className="text-white/60 text-sm">
            Question {questionNumber} of {totalQuestions}
          </p>
        </div>
        <Badge variant="info" size="lg">
          {difficultyLabels[question.difficulty]}
        </Badge>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correctAnswer;
          const showCorrect = showExplanation && isCorrect;
          const showIncorrect = showExplanation && isSelected && !isCorrect;

          return (
            <motion.button
              key={index}
              onClick={() => !selectedAnswer && onSelectAnswer(index)}
              disabled={selectedAnswer !== null}
              whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
              whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
              className={`w-full p-4 text-left rounded-lg font-medium transition-all duration-300 flex items-center gap-3 ${
                showCorrect
                  ? 'bg-success-500/20 border-2 border-success-500 text-success-200'
                  : showIncorrect
                  ? 'bg-error-500/20 border-2 border-error-500 text-error-200'
                  : isSelected
                  ? 'bg-primary-500/20 border-2 border-primary-500 text-primary-200'
                  : 'bg-dark-700 border-2 border-dark-600 text-white hover:border-primary-500 cursor-pointer'
              } ${selectedAnswer !== null ? 'cursor-not-allowed' : ''}`}
            >
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-semibold text-sm">
                {String.fromCharCode(65 + index)}
              </div>
              <span className="flex-1">{option}</span>
              {showCorrect && <span className="text-xl">✓</span>}
              {showIncorrect && <span className="text-xl">✗</span>}
            </motion.button>
          );
        })}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-500/10 border-l-4 border-blue-500 rounded-lg p-4 mb-6"
        >
          <p className="text-sm text-blue-200">
            <span className="font-semibold">💡 Explanation:</span> {question.explanation}
          </p>
        </motion.div>
      )}
    </Card>
  );
}
