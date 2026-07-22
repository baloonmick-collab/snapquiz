/**
 * Reward System Tests
 */

import { describe, it, expect } from 'vitest';
import { calculateXPReward, calculateLevelFromXP, calculateLevelProgress } from '@/lib/utils';

describe('Reward System', () => {
  it('should calculate XP reward correctly', () => {
    const reward = calculateXPReward(true, 10, 1);
    expect(reward).toBeGreaterThan(0);
  });

  it('should calculate level from XP', () => {
    const level1 = calculateLevelFromXP(0);
    const level2 = calculateLevelFromXP(1000);
    const level3 = calculateLevelFromXP(2000);

    expect(level1).toBe(1);
    expect(level2).toBe(2);
    expect(level3).toBe(3);
  });

  it('should calculate level progress', () => {
    const progress = calculateLevelProgress(500);
    expect(progress).toBeGreaterThan(0);
    expect(progress).toBeLessThanOrEqual(100);
  });

  it('should apply difficulty multiplier', () => {
    const easyReward = calculateXPReward(true, 10, 1, 1);
    const hardReward = calculateXPReward(true, 10, 1, 1.5);

    expect(hardReward).toBeGreaterThan(easyReward);
  });
});
