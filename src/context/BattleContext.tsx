/**
 * Battle Context
 * Manages real-time multiplayer battle state
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import { battleManager, BattleState } from '@/features/battleManager';

interface BattleContextType {
  activeBattle: BattleState | null;
  isLoading: boolean;
  error: string | null;
  startBattle: (
    player1Id: string,
    player1Name: string,
    player2Id: string,
    player2Name: string,
    categoryId: string
  ) => Promise<BattleState>;
  recordAnswer: (
    battleId: string,
    playerId: string,
    isCorrect: boolean,
    timeSpent: number
  ) => Promise<BattleState>;
  endBattle: (battleId: string) => Promise<void>;
  cancelBattle: (battleId: string) => Promise<void>;
}

const BattleContext = createContext<BattleContextType | undefined>(undefined);

export function BattleProvider({ children }: { children: React.ReactNode }) {
  const [activeBattle, setActiveBattle] = useState<BattleState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startBattle = useCallback(
    async (
      player1Id: string,
      player1Name: string,
      player2Id: string,
      player2Name: string,
      categoryId: string
    ) => {
      try {
        setIsLoading(true);
        setError(null);

        const battle = await battleManager.initializeBattle(
          player1Id,
          player1Name,
          player2Id,
          player2Name,
          categoryId
        );

        await battleManager.startBattle(battle.battleId);
        battleManager.setAutoCancel(battle.battleId);

        setActiveBattle(battle);
        return battle;
      } catch (err: any) {
        setError(err.message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const recordAnswer = useCallback(
    async (
      battleId: string,
      playerId: string,
      isCorrect: boolean,
      timeSpent: number
    ) => {
      try {
        setError(null);
        const updatedBattle = await battleManager.recordAnswer(
          battleId,
          playerId,
          isCorrect,
          timeSpent
        );

        setActiveBattle(updatedBattle);
        return updatedBattle;
      } catch (err: any) {
        setError(err.message);
        throw err;
      }
    },
    []
  );

  const endBattle = useCallback(async (battleId: string) => {
    try {
      setError(null);
      await battleManager.completeBattle(battleId);
      setActiveBattle(null);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, []);

  const cancelBattle = useCallback(async (battleId: string) => {
    try {
      setError(null);
      await battleManager.cancelBattle(battleId);
      setActiveBattle(null);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, []);

  return (
    <BattleContext.Provider
      value={{
        activeBattle,
        isLoading,
        error,
        startBattle,
        recordAnswer,
        endBattle,
        cancelBattle,
      }}
    >
      {children}
    </BattleContext.Provider>
  );
}

export function useBattle() {
  const context = useContext(BattleContext);
  if (context === undefined) {
    throw new Error('useBattle must be used within a BattleProvider');
  }
  return context;
}
