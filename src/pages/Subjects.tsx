
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '@/contexts/GameContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SubjectCard from '@/components/ui/custom/SubjectCard';
import { Subject } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Swords } from 'lucide-react';

const Subjects = () => {
  const navigate = useNavigate();
  const { selectedSubject, setSubject, createDuel } = useGame();
  
  const subjects: Subject[] = [
    'Mathematics',
    'Physics',
    'Literature',
    'History',
    'Geography'
  ];
  
  const handleSelectSubject = (subject: Subject) => {
    setSubject(subject);
  };
  
  const handleStartDuel = () => {
    if (selectedSubject) {
      navigate('/duel');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl font-bold mb-4 text-gray-100">Choose Your Subject</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Select a subject to begin your educational duel. Each subject features unique questions and challenges to test your knowledge.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {subjects.map((subject, index) => (
              <div 
                key={subject} 
                className="animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <SubjectCard
                  subject={subject}
                  onClick={handleSelectSubject}
                  selected={selectedSubject === subject}
                />
              </div>
            ))}
          </div>
          
          {selectedSubject && (
            <div className="mt-12 text-center animate-fade-in">
              <Button 
                size="lg" 
                onClick={handleStartDuel}
                className="rounded-full bg-gradient-to-r from-game-blue to-game-purple text-gray-100 hover:opacity-90 shadow-lg"
              >
                <Swords className="mr-2 h-5 w-5" />
                Start {selectedSubject} Duel
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Subjects;
