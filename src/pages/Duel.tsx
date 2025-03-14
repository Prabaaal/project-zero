
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DuelArena from '@/components/duel/DuelArena';
import { GameProvider } from '@/contexts/GameContext';
import { AnimatePresence, motion } from 'framer-motion';
import { GradientBackground } from '@/components/duel/GradientBackground';

const Duel = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <GradientBackground />
      
      <Navbar />
      
      <AnimatePresence mode="wait">
        <motion.main 
          className="flex-grow pt-24 pb-16 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DuelArena />
        </motion.main>
      </AnimatePresence>
      
      <Footer />
    </div>
  );
};

export default Duel;
