
import React, { createContext, useContext, useState, useEffect } from 'react';
import { GameState, UserStats } from '../types';

interface GameContextType extends GameState {
  addXP: (amount: number) => void;
  completeScenario: (id: string) => void;
  updateStats: (category: 'logic' | 'flexibility' | 'ethics', points: number) => void;
}

const GameStateContext = createContext<GameContextType | undefined>(undefined);

export const GameStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [xp, setXp] = useState(1250);
  const [streak, setStreak] = useState(4);
  const [unlockedScenarios, setUnlockedScenarios] = useState(['1', '2']);
  const [completedScenarios, setCompletedScenarios] = useState<string[]>([]);
  const [stats, setStats] = useState<UserStats>({
    logicProwess: 75,
    cognitiveFlexibility: 45,
    ethicalNuance: 60
  });

  const level = Math.floor(xp / 500) + 1;

  const addXP = (amount: number) => {
    setXp(prev => prev + amount);
  };

  const completeScenario = (id: string) => {
    if (!completedScenarios.includes(id)) {
      setCompletedScenarios(prev => [...prev, id]);
      // Potentially unlock next
      const nextId = (parseInt(id) + 1).toString();
      if (!unlockedScenarios.includes(nextId)) {
        setUnlockedScenarios(prev => [...prev, nextId]);
      }
    }
  };

  const updateStats = (category: keyof UserStats, points: number) => {
    setStats(prev => ({
      ...prev,
      [category]: Math.min(100, prev[category] + points)
    }));
  };

  return (
    <GameStateContext.Provider value={{
      xp, level, streak, stats, unlockedScenarios, completedScenarios,
      addXP, completeScenario, updateStats
    }}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) throw new Error('useGameState must be used within GameStateProvider');
  return context;
};
