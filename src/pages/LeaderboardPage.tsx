/**
 * Leaderboard Page
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Trophy, Medal } from 'lucide-react';

interface LeaderboardUser {
  rank: number;
  username: string;
  xp: number;
  level: number;
  streak: number;
  avatar: string;
}

const mockLeaderboard: LeaderboardUser[] = [
  { rank: 1, username: 'AlexGamer', xp: 45230, level: 28, streak: 45, avatar: '🧠' },
  { rank: 2, username: 'SarahQuiz', xp: 42100, level: 26, streak: 38, avatar: '📚' },
  { rank: 3, username: 'MikeLearn', xp: 39850, level: 24, streak: 32, avatar: '🎓' },
  { rank: 4, username: 'EmilyBrain', xp: 37600, level: 23, streak: 28, avatar: '⭐' },
  { rank: 5, username: 'JohnMaster', xp: 35200, level: 21, streak: 25, avatar: '🏆' },
  { rank: 6, username: 'LisaGenius', xp: 33400, level: 20, streak: 22, avatar: '💡' },
  { rank: 7, username: 'DavidQuest', xp: 31200, level: 19, streak: 18, avatar: '🎯' },
  { rank: 8, username: 'SophiaWins', xp: 29800, level: 18, streak: 15, avatar: '🌟' },
  { rank: 9, username: 'ChrisLeader', xp: 28500, level: 17, streak: 12, avatar: '🔥' },
  { rank: 10, username: 'JessicaKnow', xp: 27300, level: 16, streak: 10, avatar: '✨' },
];

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'alltime'>('week');

  const getRankMedal = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return rank.toString();
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="text-gold-400" size={32} />
            <h1 className="text-4xl font-bold text-white">Leaderboard</h1>
          </div>
          <p className="text-white/60">Compete with other learners and climb the rankings</p>
        </motion.div>

        {/* Timeframe Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3 mb-8"
        >
          {(['week', 'month', 'alltime'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                timeframe === tf
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-glow-purple'
                  : 'bg-dark-700 text-white/60 hover:text-white'
              }`}
            >
              {tf === 'week' ? 'This Week' : tf === 'month' ? 'This Month' : 'All Time'}
            </button>
          ))}
        </motion.div>

        {/* Top 3 Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {mockLeaderboard.slice(0, 3).map((user, index) => (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <Card
                className={`text-center ${
                  index === 0
                    ? 'ring-2 ring-gold-400 md:order-2 md:scale-105'
                    : index === 1
                    ? 'md:order-1'
                    : 'md:order-3'
                }`}
              >
                <div className="text-5xl mb-4">{user.avatar}</div>
                <div className="text-4xl font-bold mb-2">{getRankMedal(user.rank)}</div>
                <h3 className="text-xl font-bold text-white mb-4">{user.username}</h3>
                <div className="space-y-2 text-sm text-white/70">
                  <div>Level {user.level}</div>
                  <div className="text-gold-400 font-semibold">{user.xp.toLocaleString()} XP</div>
                  <div className="flex items-center justify-center gap-1">
                    <span>🔥</span>
                    <span>{user.streak} day streak</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <h2 className="text-2xl font-bold text-white mb-6">Rankings</h2>
            <div className="space-y-2">
              {mockLeaderboard.map((user, index) => (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div className="text-2xl font-bold text-white/40 w-12 text-center">
                    {getRankMedal(user.rank)}
                  </div>
                  <div className="text-2xl w-8">{user.avatar}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">{user.username}</p>
                    <p className="text-sm text-white/60">Level {user.level}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gold-400">{user.xp.toLocaleString()} XP</div>
                    <div className="text-sm text-white/60">🔥 {user.streak} days</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
