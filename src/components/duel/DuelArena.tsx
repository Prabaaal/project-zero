
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '@/contexts/GameContext';
import HealthBar from './HealthBar';
import QuestionCard from './QuestionCard';
import { Button } from '@/components/ui/button';
import { Swords, Trophy, RotateCcw, Clock } from 'lucide-react';

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
  
  useEffect(() => {
    if (currentDuel?.winnerId) {
      setShowResults(true);
    }
  }, [currentDuel?.winnerId]);
  
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
        <p className="mt-8 text-xl font-medium">Preparing Duel...</p>
        <p className="mt-2 text-gray-500">Finding an opponent for you</p>
      </div>
    );
  }
  
  if (!currentDuel) {
    return (
      <div className="min-h-[600px] flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <Swords className="h-16 w-16 mx-auto text-primary" />
          <h2 className="text-2xl font-bold">Ready to Duel?</h2>
          <p className="text-gray-600">
            Start a new duel and test your knowledge against opponents from around the world.
          </p>
          
          {selectedSubject ? (
            <Button 
              className="mt-4 w-full"
              size="lg"
              onClick={() => createDuel(selectedSubject)}
            >
              Start Duel in {selectedSubject}
            </Button>
          ) : (
            <Button 
              className="mt-4"
              onClick={() => navigate('/subjects')}
            >
              Select a Subject
            </Button>
          )}
        </div>
      </div>
    );
  }
  
  if (showResults) {
    const playerWon = currentDuel.winnerId === currentDuel.players[0].id;
    const winner = currentDuel.players.find(p => p.id === currentDuel.winnerId);
    
    return (
      <div className="min-h-[600px] flex flex-col items-center justify-center p-4">
        <div className="glass text-center space-y-6 max-w-md w-full p-8 rounded-xl">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Trophy className="h-10 w-10 text-primary" />
          </div>
          
          <h2 className="text-2xl font-bold">
            {playerWon ? 'Victory!' : 'Defeat!'}
          </h2>
          
          <p className="text-gray-600">
            {playerWon 
              ? 'Congratulations! You have defeated your opponent.' 
              : 'You were defeated this time, but keep practicing!'}
          </p>
          
          <div className="py-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg mb-2">
              <span className="text-gray-700">Winner</span>
              <span className="font-medium">{winner?.name}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg mb-2">
              <span className="text-gray-700">Subject</span>
              <span className="font-medium">{selectedSubject}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Rounds</span>
              <span className="font-medium">{currentDuel.currentRound} / {currentDuel.maxRounds}</span>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Button 
              onClick={handleReset}
              variant="default"
              className="w-full"
            >
              <RotateCcw className="mr-2 h-4 w-4" /> New Duel
            </Button>
            <Button 
              onClick={handleBackToSubjects}
              variant="outline"
              className="w-full"
            >
              Change Subject
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 my-8 animate-fade-in">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium mb-2">
          <Swords className="mr-2 h-4 w-4" /> 
          Duel - Round {currentDuel.currentRound} of {currentDuel.maxRounds}
        </div>
        <h1 className="text-2xl font-bold">{selectedSubject} Challenge</h1>
        <div className="text-gray-500 flex items-center justify-center mt-1">
          <Clock className="h-4 w-4 mr-1" />
          <span className="text-sm">Current Round Damage: {currentDuel.roundDamage}</span>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Player's health bar */}
        <HealthBar 
          currentHealth={currentDuel.players[0].health}
          maxHealth={5000}
          playerName={currentDuel.players[0].name}
          showDamage={true}
          avatar={currentDuel.players[0].avatar}
        />
        
        {/* Versus indicator */}
        <div className="relative h-8 flex items-center justify-center">
          <div className="absolute left-0 right-0 h-px bg-gray-200"></div>
          <span className="relative bg-white px-4 text-sm font-medium text-gray-500">VS</span>
        </div>
        
        {/* Opponent's health bar */}
        <HealthBar 
          currentHealth={currentDuel.players[1].health}
          maxHealth={5000}
          playerName={currentDuel.players[1].name}
          showDamage={true}
          isOpponent={true}
          avatar={currentDuel.players[1].avatar}
        />
        
        {/* Question card */}
        <div className="mt-8 flex justify-center">
          {currentDuel.currentQuestion && (
            <QuestionCard 
              question={currentDuel.currentQuestion}
              timeRemaining={currentDuel.timeRemaining}
              onAnswer={answerQuestion}
              disabled={currentDuel.status !== 'active'}
            />
          )}
        </div>
        
        {/* Paused state info */}
        {currentDuel.status === 'paused' && !currentDuel.winnerId && (
          <div className="text-center p-4">
            <p className="text-gray-500 mb-4">Preparing next round...</p>
            <Button
              onClick={nextRound}
              variant="outline"
            >
              Continue to Next Round
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DuelArena;
