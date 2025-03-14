
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '@/contexts/GameContext';
import HealthBar from './HealthBar';
import QuestionCard from './QuestionCard';
import { Button } from '@/components/ui/button';
import { Swords, Trophy, RotateCcw, Clock, Zap, Shield, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DamageEffect from './DamageEffect';

const DuelArena = () => {
  const navigate = useNavigate();
  const { 
    currentDuel, 
    selectedSubject, 
    answerQuestion, 
    resetDuel, 
    createDuel,
    nextRound,
    isLoading
  } = useGame();
  
  const [showResults, setShowResults] = useState(false);
  const [showDamageEffect, setShowDamageEffect] = useState(false);
  const [damagePosition, setDamagePosition] = useState({ x: 0, y: 0 });
  const [attackingPlayer, setAttackingPlayer] = useState<0 | 1>(0);
  
  useEffect(() => {
    if (currentDuel?.winnerId) {
      setShowResults(true);
    }
  }, [currentDuel?.winnerId]);
  
  // Show damage effect when player health changes
  useEffect(() => {
    if (!currentDuel) return;
    
    const handlePlayerDamage = () => {
      const playerRect = document.getElementById('player-avatar')?.getBoundingClientRect();
      const opponentRect = document.getElementById('opponent-avatar')?.getBoundingClientRect();
      
      if (playerRect && opponentRect) {
        setDamagePosition({ 
          x: window.innerWidth / 2, 
          y: attackingPlayer === 0 ? opponentRect.top : playerRect.top 
        });
        setShowDamageEffect(true);
        
        setTimeout(() => {
          setShowDamageEffect(false);
        }, 1000);
      }
    };
    
    if (currentDuel.status === 'paused' && !currentDuel.winnerId) {
      handlePlayerDamage();
    }
  }, [currentDuel?.status, attackingPlayer]);
  
  const handleAnswer = (answer: string) => {
    // Determine who is attacking based on the answer
    const isCorrect = currentDuel?.currentQuestion?.correctAnswer === answer;
    setAttackingPlayer(isCorrect ? 0 : 1);
    
    // Call the real answer handler
    answerQuestion(answer);
  };
  
  const handleReset = () => {
    resetDuel();
    setShowResults(false);
  };
  
  const handleBackToSubjects = () => {
    resetDuel();
    navigate('/subjects');
  };
  
  // If no subject is selected, redirect to subjects page
  useEffect(() => {
    if (!selectedSubject && !currentDuel) {
      navigate('/subjects');
    }
  }, [selectedSubject, currentDuel, navigate]);
  
  if (isLoading) {
    return (
      <div className="min-h-[600px] flex flex-col items-center justify-center p-4">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          <div className="absolute inset-3 rounded-full border-4 border-t-transparent border-r-primary border-b-transparent border-l-transparent animate-spin animation-delay-150"></div>
          <div className="absolute inset-6 rounded-full border-4 border-t-transparent border-r-transparent border-b-primary border-l-transparent animate-spin animation-delay-300"></div>
        </div>
        <motion.p 
          className="mt-8 text-xl font-medium text-purple-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Preparing Duel...
        </motion.p>
        <motion.p 
          className="mt-2 text-purple-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Finding an opponent for you
        </motion.p>
      </div>
    );
  }
  
  if (!currentDuel) {
    return (
      <div className="min-h-[600px] flex flex-col items-center justify-center p-4">
        <motion.div 
          className="text-center space-y-4 max-w-md backdrop-blur-lg bg-gray-900/70 p-8 rounded-xl border border-purple-500/30"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Swords className="h-16 w-16 mx-auto text-purple-400" />
          <h2 className="text-2xl font-bold text-purple-100">Ready to Duel?</h2>
          <p className="text-purple-200">
            Start a new duel and test your knowledge against opponents from around the world.
          </p>
          
          {selectedSubject ? (
            <Button 
              className="mt-4 w-full bg-purple-600 hover:bg-purple-700 group relative overflow-hidden"
              size="lg"
              onClick={() => createDuel(selectedSubject)}
            >
              <span className="relative z-10 flex items-center">
                <Flame className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                Start Duel in {selectedSubject}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          ) : (
            <Button 
              className="mt-4 bg-purple-600 hover:bg-purple-700"
              onClick={() => navigate('/subjects')}
            >
              Select a Subject
            </Button>
          )}
        </motion.div>
      </div>
    );
  }
  
  if (showResults) {
    const playerWon = currentDuel.winnerId === currentDuel.players[0].id;
    const winner = currentDuel.players.find(p => p.id === currentDuel.winnerId);
    
    return (
      <motion.div 
        className="min-h-[600px] flex flex-col items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="backdrop-blur-lg bg-gray-900/70 text-center space-y-6 max-w-md w-full p-8 rounded-xl border border-purple-500/20"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div 
            className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mx-auto"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <Trophy className="h-10 w-10 text-yellow-100" />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-purple-100">
            {playerWon ? 'Victory!' : 'Defeat!'}
          </h2>
          
          <p className="text-purple-200">
            {playerWon 
              ? 'Congratulations! You have defeated your opponent.' 
              : 'You were defeated this time, but keep practicing!'}
          </p>
          
          <div className="py-4">
            <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg mb-2 border border-purple-500/10">
              <span className="text-purple-300">Winner</span>
              <span className="font-medium text-purple-100">{winner?.name}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg mb-2 border border-purple-500/10">
              <span className="text-purple-300">Subject</span>
              <span className="font-medium text-purple-100">{selectedSubject}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-purple-500/10">
              <span className="text-purple-300">Rounds</span>
              <span className="font-medium text-purple-100">{currentDuel.currentRound} / {currentDuel.maxRounds}</span>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Button 
              onClick={handleReset}
              variant="default"
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <RotateCcw className="mr-2 h-4 w-4" /> New Duel
            </Button>
            <Button 
              onClick={handleBackToSubjects}
              variant="outline"
              className="w-full border-purple-700 text-purple-100 hover:bg-purple-900/50"
            >
              Change Subject
            </Button>
          </div>
        </motion.div>
      </motion.div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 my-8 relative">
      <motion.div 
        className="mb-8 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center bg-purple-500/20 text-purple-300 rounded-full px-4 py-1 text-sm font-medium mb-2 border border-purple-500/30">
          <Swords className="mr-2 h-4 w-4" /> 
          Duel - Round {currentDuel.currentRound} of {currentDuel.maxRounds}
        </div>
        <h1 className="text-2xl font-bold text-purple-100">{selectedSubject} Challenge</h1>
        <div className="text-purple-300 flex items-center justify-center mt-1">
          <Flame className="h-5 w-5 mr-1 text-orange-500" />
          <span className="text-sm">Damage: <span className="font-mono text-orange-400">{currentDuel.roundDamage}</span></span>
        </div>
      </motion.div>
      
      {/* Damage Effect */}
      <AnimatePresence>
        {showDamageEffect && (
          <DamageEffect x={damagePosition.x} y={damagePosition.y} amount={currentDuel.roundDamage} />
        )}
      </AnimatePresence>
      
      <div className="max-w-3xl mx-auto space-y-8 backdrop-blur-lg bg-gray-900/40 p-6 rounded-xl border border-purple-500/20">
        {/* Player's health bar */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <HealthBar 
            currentHealth={currentDuel.players[0].health}
            maxHealth={5000}
            playerName={currentDuel.players[0].name}
            showDamage={true}
            avatar={currentDuel.players[0].avatar}
            id="player-avatar"
          />
        </motion.div>
        
        {/* Versus indicator */}
        <motion.div 
          className="relative h-12 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="absolute left-0 right-0 h-px bg-purple-500/30"></div>
          <span className="relative bg-gray-800 px-6 py-1 text-base font-bold text-purple-400 rounded-full border border-purple-500/30">VS</span>
        </motion.div>
        
        {/* Opponent's health bar */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <HealthBar 
            currentHealth={currentDuel.players[1].health}
            maxHealth={5000}
            playerName={currentDuel.players[1].name}
            showDamage={true}
            isOpponent={true}
            avatar={currentDuel.players[1].avatar}
            id="opponent-avatar"
          />
        </motion.div>
        
        {/* Question card */}
        <motion.div 
          className="mt-8 flex justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {currentDuel.currentQuestion && (
            <QuestionCard 
              question={currentDuel.currentQuestion}
              timeRemaining={currentDuel.timeRemaining}
              onAnswer={handleAnswer}
              disabled={currentDuel.status !== 'active'}
            />
          )}
        </motion.div>
        
        {/* Paused state info */}
        {currentDuel.status === 'paused' && !currentDuel.winnerId && (
          <motion.div 
            className="text-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-purple-300 mb-4">Preparing next round...</p>
            <Button
              onClick={nextRound}
              variant="outline"
              className="bg-purple-600/20 border-purple-500 text-purple-100 hover:bg-purple-700/30"
            >
              <Zap className="mr-2 h-4 w-4" />
              Continue to Next Round
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DuelArena;
