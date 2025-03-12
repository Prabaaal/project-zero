
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Swords, Trophy, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Abstract background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-game-blue/20 to-game-purple/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-game-purple/10 to-game-blue/10 blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 space-y-6 animation-delay-100 animate-fade-in">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-game-purple/10 text-game-purple">
              <span className="mr-1">✨</span> Educational gaming reimagined
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Learn. Duel.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-game-blue to-game-purple">
                Conquer.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-xl">
              Challenge students from around the world to educational duels across multiple subjects and rise through the global rankings.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Button 
                onClick={() => navigate('/subjects')}
                size="lg" 
                className="rounded-full text-white bg-gradient-to-r from-game-blue to-game-purple hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
              >
                Start Dueling
              </Button>
              
              <Button 
                onClick={() => navigate('/leaderboard')}
                variant="outline" 
                size="lg" 
                className="rounded-full border-gray-300"
              >
                View Leaderboards
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 animation-delay-300 animate-fade-in">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative elements */}
              <div className="absolute top-1/4 right-1/4 w-20 h-20 rounded-lg bg-game-blue/20 blur-xl animate-float" style={{ animationDelay: '0s' }} />
              <div className="absolute bottom-1/4 left-1/4 w-16 h-16 rounded-lg bg-game-purple/20 blur-xl animate-float" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/3 left-1/3 w-24 h-24 rounded-lg bg-game-yellow/20 blur-xl animate-float" style={{ animationDelay: '2s' }} />
              
              {/* Feature cards */}
              <div className="absolute top-0 left-0 transform -translate-x-1/4 -translate-y-1/4 w-44 h-44 glass rounded-2xl p-4 flex flex-col justify-center items-center space-y-2 shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="w-10 h-10 rounded-full bg-game-purple/20 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-game-purple" />
                </div>
                <h3 className="font-semibold text-sm text-center">5 Academic Subjects</h3>
                <p className="text-xs text-gray-500 text-center">Math, Physics, Literature & more</p>
              </div>
              
              <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 w-44 h-44 glass rounded-2xl p-4 flex flex-col justify-center items-center space-y-2 shadow-lg animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="w-10 h-10 rounded-full bg-game-blue/20 flex items-center justify-center">
                  <Swords className="h-5 w-5 text-game-blue" />
                </div>
                <h3 className="font-semibold text-sm text-center">Real-time Duels</h3>
                <p className="text-xs text-gray-500 text-center">Battle with students worldwide</p>
              </div>
              
              <div className="absolute top-1/2 right-0 transform translate-x-1/3 -translate-y-1/2 w-44 h-44 glass rounded-2xl p-4 flex flex-col justify-center items-center space-y-2 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                <div className="w-10 h-10 rounded-full bg-game-green/20 flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-game-green" />
                </div>
                <h3 className="font-semibold text-sm text-center">Global Rankings</h3>
                <p className="text-xs text-gray-500 text-center">Climb from school to global ranks</p>
              </div>
              
              {/* Central element */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full glass shadow-xl flex items-center justify-center">
                <div className="w-44 h-44 rounded-full bg-gradient-to-br from-game-blue to-game-purple flex items-center justify-center">
                  <Brain className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
