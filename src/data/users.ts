/**
 * Mock user data for development
 */

import { User, Leaderboard } from '@/types';

export const mockCurrentUser: User = {
  id: 'user-001',
  username: 'YourUsername',
  email: 'user@example.com',
  level: 12,
  xp: 8500,
  coins: 2340,
  streak: 7,
  totalQuizzesCompleted: 45,
  createdAt: '2024-01-15T10:00:00Z',
};

export const mockLeaderboardUsers: Leaderboard[] = [
  {
    rank: 1,
    userId: 'user-002',
    username: 'AlexGamer',
    xp: 45230,
    level: 28,
    streak: 45,
  },
  {
    rank: 2,
    userId: 'user-003',
    username: 'SarahQuiz',
    xp: 42100,
    level: 26,
    streak: 38,
  },
  {
    rank: 3,
    userId: 'user-004',
    username: 'MikeLearn',
    xp: 39850,
    level: 24,
    streak: 32,
  },
  {
    rank: 4,
    userId: 'user-005',
    username: 'EmilyBrain',
    xp: 37600,
    level: 23,
    streak: 28,
  },
  {
    rank: 5,
    userId: 'user-006',
    username: 'JohnMaster',
    xp: 35200,
    level: 21,
    streak: 25,
  },
];
