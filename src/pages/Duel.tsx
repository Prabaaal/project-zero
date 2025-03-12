
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DuelArena from '@/components/duel/DuelArena';
import { GameProvider } from '@/contexts/GameContext';

const Duel = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <DuelArena />
      </main>
      
      <Footer />
    </div>
  );
};

export default Duel;
