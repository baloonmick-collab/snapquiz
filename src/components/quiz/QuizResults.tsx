/**
 * Quiz Results Details Component
 */

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuestionReview {
  question: string;
  yourAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  accuracy: number;
  xpEarned: number;
  coinsEarned: number;
  timeSpent: number;
  questions: QuestionReview[];
}

export default function QuizResults({
  score,
  totalQuestions,
  accuracy,
  xpEarned,
  coinsEarned,
  timeSpent,
  questions,
}: QuizResultsProps) {
  const minutes = Math.floor(timeSpent / 60);
  const seconds = timeSpent % 60;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="text-center">
            <p className="text-white/60 text-sm mb-1">Final Score</p>
            <p className="text-4xl font-bold text-primary-400">
              {score}/{totalQuestions}
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="text-center">
            <p className="text-white/60 text-sm mb-1">Accuracy</p>
            <p className="text-4xl font-bold text-success-400">{accuracy}%</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="text-center">
            <p className="text-white/60 text-sm mb-1">XP Earned</p>
            <p className="text-4xl font-bold text-gold-400">+{xpEarned}</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="text-center">
            <p className="text-white/60 text-sm mb-1">Time Spent</p>
            <p className="text-2xl font-bold text-secondary-400">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </p>
          </Card>
        </motion.div>
      </div>

      {/* Questions Review */}
      <Card>
        <h3 className="text-2xl font-bold text-white mb-6">Review Your Answers</h3>
        <div className="space-y-3">
          {questions.map((q, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className={`p-4 rounded-lg border-l-4 transition-all ${
                q.isCorrect
                  ? 'bg-success-500/10 border-success-500'
                  : 'bg-error-500/10 border-error-500'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {q.isCorrect ? (
                    <CheckCircle className="text-success-400" size={24} />
                  ) : (
                    <XCircle className="text-error-400" size={24} />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white mb-2">{q.question}</p>
                  <p className="text-sm text-white/70 mb-1">
                    Your answer: <span className="text-white">{q.yourAnswer}</span>
                  </p>
                  {!q.isCorrect && (
                    <p className="text-sm text-success-300">
                      Correct answer: <span className="text-white">{q.correctAnswer}</span>
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
