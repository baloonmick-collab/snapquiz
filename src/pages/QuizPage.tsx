/**
 * Quiz Page
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { QuizQuestion } from '@/types';
import { scienceQuestions } from '@/data/quizzes';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

interface QuizPageProps {
  categoryId?: string;
}

export default function QuizPage({ categoryId = 'science' }: QuizPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = scienceQuestions.slice(0, 10);
  const question = questions[currentQuestion];

  // Timer effect
  useEffect(() => {
    if (timeRemaining <= 0) {
      handleFinishQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const handleSelectAnswer = (answerIndex: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answerIndex);
      setShowExplanation(true);
      if (answerIndex === question.correctAnswer) {
        setScore((prev) => prev + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    setQuizComplete(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const accuracy = Math.round((score / questions.length) * 100);
  const xpEarned = Math.floor((accuracy / 100) * 100 + 50);
  const coinsEarned = Math.floor(accuracy / 10);

  if (quizComplete) {
    return (
      <div className="min-h-screen bg-dark-900 py-20 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <Card className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-24 h-24 bg-gradient-to-br from-success-500 to-success-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle size={48} className="text-white" />
            </motion.div>

            <h2 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
            <p className="text-white/60 mb-8">Great job! Check your results below.</p>

            <div className="space-y-4 mb-8">
              <div className="bg-dark-700 rounded-lg p-4">
                <p className="text-white/60 text-sm mb-1">Final Score</p>
                <p className="text-3xl font-bold text-white">
                  {score} / {questions.length}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-dark-700 rounded-lg p-3">
                  <p className="text-white/60 text-xs mb-1">Accuracy</p>
                  <p className="text-2xl font-bold text-primary-400">{accuracy}%</p>
                </div>
                <div className="bg-dark-700 rounded-lg p-3">
                  <p className="text-white/60 text-xs mb-1">XP Earned</p>
                  <p className="text-2xl font-bold text-gold-400">+{xpEarned}</p>
                </div>
                <div className="bg-dark-700 rounded-lg p-3">
                  <p className="text-white/60 text-xs mb-1">Coins</p>
                  <p className="text-2xl font-bold text-secondary-400">+{coinsEarned}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button fullWidth variant="primary">
                Play Again
              </Button>
              <Button fullWidth variant="ghost">
                Return Home
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">Science Quiz</h1>
            <p className="text-white/60">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-gold-400 font-semibold">
              <Clock size={20} />
              {formatTime(timeRemaining)}
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 h-2 bg-dark-700 rounded-full overflow-hidden"
        >
          <motion.div
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
          />
        </motion.div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card variant="gradient" className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-8">{question.question}</h2>

            <div className="space-y-3 mb-8">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correctAnswer;
                const showCorrect = showExplanation && isCorrect;
                const showIncorrect = showExplanation && isSelected && !isCorrect;

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    disabled={selectedAnswer !== null}
                    className={`w-full p-4 text-left rounded-lg font-medium transition-all duration-300 flex items-center gap-3 ${
                      showCorrect
                        ? 'bg-success-500/20 border border-success-500 text-success-200'
                        : showIncorrect
                        ? 'bg-error-500/20 border border-error-500 text-error-200'
                        : isSelected
                        ? 'bg-primary-500/20 border border-primary-500 text-primary-200'
                        : 'bg-dark-700 border border-dark-600 text-white hover:border-primary-500'
                    } ${selectedAnswer !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {showCorrect && <CheckCircle size={20} />}
                    {showIncorrect && <XCircle size={20} />}
                    <span>
                      {String.fromCharCode(65 + index)}. {option}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-8"
              >
                <p className="text-sm text-white/80">
                  <span className="font-semibold">Explanation:</span> {question.explanation}
                </p>
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* Action Buttons */}
        {selectedAnswer !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-4"
          >
            <Button
              fullWidth
              variant="primary"
              onClick={handleNextQuestion}
            >
              {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
