
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import { Button } from '@/components/ui/button';
import { Swords, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <Features />
        
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 opacity-90" />
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIGN4PSIxMCIgY3k9IjEwIiByPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="inline-flex items-center rounded-full px-4 py-2 mb-6 text-sm font-bold bg-game-purple/30 text-gray-100 border border-game-purple/50 backdrop-blur-sm">
                <Sparkles className="mr-2 h-4 w-4" /> GET READY TO CHALLENGE YOURSELF
              </div>
              
              <h2 className="text-3xl font-extrabold mb-6 text-gray-100">Ready to Test Your Knowledge in Epic Duels?</h2>
              <p className="text-lg text-gray-300 mb-8">
                Join thousands of students worldwide in educational battles that make learning competitive and fun!
              </p>
              <Button 
                size="lg" 
                onClick={() => navigate('/subjects')}
                className="rounded-full bg-gradient-to-r from-game-blue to-game-purple text-gray-100 hover:opacity-90 shadow-lg border-2 border-gray-100/10 font-bold"
              >
                <Swords className="mr-2 h-5 w-5" />
                Start Dueling
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
