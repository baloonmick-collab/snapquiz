/**
 * Battle Manager Tests
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { battleManager } from '@/features/battleManager';
import * as supabaseService from '@/services/supabase';

vi.mock('@/services/supabase');

describe('BattleManager', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize a battle', async () => {
    vi.mocked(supabaseService.battles.createBattle).mockResolvedValue({
      id: 'battle-123',
      player1_id: 'player1',
      player2_id: 'player2',
      category_id: 'science',
      status: 'waiting' as const,
      created_at: new Date().toISOString(),
    } as any);

    const battle = await battleManager.initializeBattle(
      'player1',
      'Player One',
      'player2',
      'Player Two',
      'science'
    );

    expect(battle).toBeDefined();
    expect(battle.player1.displayName).toBe('Player One');
    expect(battle.player2.displayName).toBe('Player Two');
    expect(battle.status).toBe('waiting');
  });

  it('should record correct answer', async () => {
    vi.mocked(supabaseService.battles.createBattle).mockResolvedValue({
      id: 'battle-123',
      player1_id: 'player1',
      player2_id: 'player2',
      category_id: 'science',
      status: 'in_progress' as const,
      created_at: new Date().toISOString(),
    } as any);

    const battle = await battleManager.initializeBattle(
      'player1',
      'Player One',
      'player2',
      'Player Two',
      'science'
    );

    await battleManager.startBattle(battle.battleId);

    const updatedBattle = await battleManager.recordAnswer(
      battle.battleId,
      'player1',
      true,
      5
    );

    expect(updatedBattle.player1.correctAnswers).toBe(1);
    expect(updatedBattle.player1.score).toBeGreaterThan(0);
  });

  it('should calculate time bonus', async () => {
    vi.mocked(supabaseService.battles.createBattle).mockResolvedValue({
      id: 'battle-123',
      player1_id: 'player1',
      player2_id: 'player2',
      category_id: 'science',
      status: 'in_progress' as const,
      created_at: new Date().toISOString(),
    } as any);

    const battle = await battleManager.initializeBattle(
      'player1',
      'Player One',
      'player2',
      'Player Two',
      'science'
    );

    await battleManager.startBattle(battle.battleId);

    // Fast answer (5 seconds) should have more bonus
    const fastAnswer = await battleManager.recordAnswer(
      battle.battleId,
      'player1',
      true,
      5
    );
    const fastScore = fastAnswer.player1.score;

    // Reset for another test
    vi.mocked(supabaseService.battles.createBattle).mockResolvedValue({
      id: 'battle-456',
      player1_id: 'player1',
      player2_id: 'player2',
      category_id: 'science',
      status: 'in_progress' as const,
      created_at: new Date().toISOString(),
    } as any);

    const battle2 = await battleManager.initializeBattle(
      'player1',
      'Player One',
      'player2',
      'Player Two',
      'science'
    );

    await battleManager.startBattle(battle2.battleId);

    // Slow answer (25 seconds) should have less bonus
    const slowAnswer = await battleManager.recordAnswer(
      battle2.battleId,
      'player1',
      true,
      25
    );
    const slowScore = slowAnswer.player1.score;

    expect(fastScore).toBeGreaterThan(slowScore);
  });
});
