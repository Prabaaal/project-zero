
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DuelState, Player, Question, Subject } from '@/types/game';
import { getRandomQuestionForSubject } from '@/data/questions';
import { toast } from 'sonner';

interface GameContextType {
  currentDuel: DuelState | null;
  selectedSubject: Subject | null;
  currentPlayer: Player | null;
  isLoading: boolean;
  createDuel: (subject: Subject) => void;
  answerQuestion: (answer: string) => void;
  nextRound: () => void;
  resetDuel: () => void;
  setSubject: (subject: Subject) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [currentDuel, setCurrentDuel] = useState<DuelState | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number | null>(null);

  // Initialize player on first load
  useEffect(() => {
    // In a real app, this would be fetched from a user session/authentication
    const player: Player = {
      id: 'current-player',
      name: 'You',
      avatar: '/placeholder.svg',
      health: 5000,
      country: 'United States'
    };
    setCurrentPlayer(player);
  }, []);

  // Timer for questions
  useEffect(() => {
    if (!currentDuel || currentDuel.status !== 'active' || !currentDuel.timeRemaining) return;
    
    let countdown = currentDuel.timeRemaining;
    
    const interval = setInterval(() => {
      countdown -= 1;
      
      if (countdown <= 0) {
        clearInterval(interval);
        handleTimeExpired();
      } else {
        setCurrentDuel(prev => prev ? { ...prev, timeRemaining: countdown } : null);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [currentDuel?.id, currentDuel?.status, currentDuel?.currentQuestion]);

  const handleTimeExpired = () => {
    if (!currentDuel) return;
    
    toast.error("Time's up! Moving to next round...");
    
    // Both players lose some health for timeout
    const updatedPlayers = currentDuel.players.map(player => ({
      ...player,
      health: Math.max(player.health - 500, 0)
    }));
    
    setCurrentDuel(prev => {
      if (!prev) return null;
      return {
        ...prev,
        players: updatedPlayers as [Player, Player],
        status: 'paused'
      };
    });
    
    // Wait before starting next round
    setTimeout(() => {
      nextRound();
    }, 2000);
  };

  const createDuel = (subject: Subject) => {
    if (!currentPlayer) return;
    
    setIsLoading(true);
    
    // Create AI opponent
    const opponent: Player = {
      id: 'ai-opponent',
      name: 'AI Opponent',
      avatar: '/placeholder.svg',
      health: 5000,
      country: 'AI World'
    };
    
    // Get initial question
    const initialQuestion = getRandomQuestionForSubject(subject);
    
    // Create new duel
    const newDuel: DuelState = {
      id: `duel-${Date.now()}`,
      players: [currentPlayer, opponent],
      currentRound: 1,
      maxRounds: 5,
      currentQuestion: initialQuestion,
      timeRemaining: initialQuestion.timeLimit,
      roundDamage: 1000, // 1000 damage for first round
      status: 'active'
    };
    
    setTimeout(() => {
      setCurrentDuel(newDuel);
      setIsLoading(false);
      toast.success('Duel started! Answer correctly to deal damage!');
    }, 1000);
  };

  const answerQuestion = (answer: string) => {
    if (!currentDuel || !currentDuel.currentQuestion) return;
    
    const isCorrect = answer === currentDuel.currentQuestion.correctAnswer;
    const updatedPlayers = [...currentDuel.players] as [Player, Player];
    
    if (isCorrect) {
      // Player 1 (user) answered correctly, damage opponent
      updatedPlayers[1].health = Math.max(updatedPlayers[1].health - currentDuel.roundDamage, 0);
      toast.success('Correct answer! You dealt damage to your opponent!');
    } else {
      // Simulate AI answering correctly and dealing damage to player
      const aiAnswersCorrectly = Math.random() > 0.3; // 70% chance AI gets it right
      
      if (aiAnswersCorrectly) {
        updatedPlayers[0].health = Math.max(updatedPlayers[0].health - currentDuel.roundDamage, 0);
        toast.error('Wrong answer! Your opponent answered correctly and dealt damage to you!');
      } else {
        toast.info('Both players answered incorrectly. No damage dealt.');
      }
    }
    
    // Check if anyone has been defeated
    let winnerId: string | undefined = undefined;
    if (updatedPlayers[0].health <= 0) {
      // Player lost
      winnerId = updatedPlayers[1].id;
      toast.error('You have been defeated!');
    } else if (updatedPlayers[1].health <= 0) {
      // AI lost
      winnerId = updatedPlayers[0].id;
      toast.success('Victory! You defeated your opponent!');
    }
    
    setCurrentDuel(prev => {
      if (!prev) return null;
      return {
        ...prev,
        players: updatedPlayers,
        status: 'paused',
        winnerId
      };
    });
    
    // If no winner yet, proceed to next round after a short delay
    if (!winnerId) {
      setTimeout(() => {
        nextRound();
      }, 2000);
    }
  };

  const nextRound = () => {
    if (!currentDuel || !selectedSubject) return;
    
    // If there's a winner or we've reached max rounds, don't continue
    if (currentDuel.winnerId || currentDuel.currentRound >= currentDuel.maxRounds) {
      return;
    }
    
    // Get next question
    const nextQuestion = getRandomQuestionForSubject(selectedSubject);
    
    // Increase damage for next round
    const newRoundDamage = currentDuel.roundDamage + 500; // Increase by 500 each round
    
    setCurrentDuel(prev => {
      if (!prev) return null;
      return {
        ...prev,
        currentRound: prev.currentRound + 1,
        currentQuestion: nextQuestion,
        timeRemaining: nextQuestion.timeLimit,
        roundDamage: newRoundDamage,
        status: 'active'
      };
    });
    
    toast.info(`Round ${currentDuel.currentRound + 1}! Damage increased to ${newRoundDamage}!`);
  };

  const resetDuel = () => {
    setCurrentDuel(null);
    // Reset player health
    if (currentPlayer) {
      setCurrentPlayer({
        ...currentPlayer,
        health: 5000
      });
    }
  };

  const setSubject = (subject: Subject) => {
    setSelectedSubject(subject);
  };

  return (
    <GameContext.Provider
      value={{
        currentDuel,
        selectedSubject,
        currentPlayer,
        isLoading,
        createDuel,
        answerQuestion,
        nextRound,
        resetDuel,
        setSubject
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
