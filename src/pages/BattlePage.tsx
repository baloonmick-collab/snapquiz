/**
 * Battle Page Component
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useBattle } from '@/context/BattleContext';
import { useAuth } from '@/context/AuthContext';
import { useBattleQuiz } from '@/hooks';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { QUIZZES } from '@/data/quizzes';

interface BattlePageProps {
  onNavigate: (page: string) => void;
  onToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export default function BattlePage({ onNavigate, onToast }: BattlePageProps) {
  const { user, userProfile } = useAuth();
  const { activeBattle, startBattle, recordAnswer } = useBattle();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [gameState, setGameState] = useState<'setup' | 'waiting' | 'in_progress' | 'complete'>('setup');
  const [opponentName, setOpponentName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!user || !userProfile) {
    return (
      <div className="p-4">
        <p>Loading...</p>
      </div>
    );
  }

  const handleStartBattle = async () => {
    if (!selectedCategory || !opponentName) {
      onToast('Please select a category and enter opponent name', 'error');
      return;
    }

    setIsLoading(true);
    try {
      // For demo, use mock opponent ID
      await startBattle(
        user.id,
        userProfile.displayName,
        'opponent-' + Math.random(),
        opponentName,
        selectedCategory
      );
      setGameState('in_progress');
      onToast('Battle started!', 'success');
    } catch (error: any) {
      onToast(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (gameState === 'setup') {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">🏆 Multiplayer Battles</h1>
          <p className="text-gray-400">Challenge opponents in real-time quiz battles</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Category Selection */}
          <Card variant="glass" className="p-6">
            <h2 className="text-2xl font-bold mb-4">Select Category</h2>
            <div className="space-y-2">
              {Object.keys(QUIZZES).map((categoryId) => (
                <button
                  key={categoryId}
                  onClick={() => setSelectedCategory(categoryId)}
                  className={`w-full p-4 rounded-lg border-2 transition ${
                    selectedCategory === categoryId
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-gray-600 hover:border-purple-400'
                  }`}
                >
                  {categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}
                </button>
              ))}
            </div>
          </Card>

          {/* Opponent Setup */}
          <Card variant="glass" className="p-6">
            <h2 className="text-2xl font-bold mb-4">Opponent</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  value={userProfile.displayName}
                  disabled
                  className="w-full px-4 py-2 bg-dark-800 border border-gray-600 rounded-lg text-white opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Opponent Name</label>
                <input
                  type="text"
                  value={opponentName}
                  onChange={(e) => setOpponentName(e.target.value)}
                  placeholder="Enter opponent name"
                  className="w-full px-4 py-2 bg-dark-800 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>
              <Button
                onClick={handleStartBattle}
                disabled={isLoading || !selectedCategory || !opponentName}
                className="w-full"
              >
                {isLoading ? 'Starting...' : 'Start Battle'}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (!activeBattle) {
    return (
      <div className="p-4">
        <p>No active battle</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid md:grid-cols-2 gap-6 mb-8"
      >
        {/* Player 1 */}
        <Card variant="glass" className="p-6 border-l-4 border-blue-500">
          <h3 className="text-xl font-bold mb-4">{activeBattle.player1.displayName}</h3>
          <div className="space-y-2">
            <Badge variant="info">Score: {activeBattle.player1.score}</Badge>
            <Badge variant="success">Correct: {activeBattle.player1.correctAnswers}/{activeBattle.player1.questionsAnswered}</Badge>
            <Badge variant="warning">XP: {activeBattle.player1.xpEarned}</Badge>
          </div>
        </Card>

        {/* Player 2 */}
        <Card variant="glass" className="p-6 border-l-4 border-purple-500">
          <h3 className="text-xl font-bold mb-4">{activeBattle.player2.displayName}</h3>
          <div className="space-y-2">
            <Badge variant="info">Score: {activeBattle.player2.score}</Badge>
            <Badge variant="success">Correct: {activeBattle.player2.correctAnswers}/{activeBattle.player2.questionsAnswered}</Badge>
            <Badge variant="warning">XP: {activeBattle.player2.xpEarned}</Badge>
          </div>
        </Card>
      </motion.div>

      <Card variant="glass" className="p-6 text-center">
        <p className="text-gray-400 mb-4">Battle Status: {activeBattle.status}</p>
        <p className="text-2xl font-bold">Waiting for opponent...</p>
      </Card>
    </div>
  );
}
