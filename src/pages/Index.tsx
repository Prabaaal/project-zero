
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import { Button } from '@/components/ui/button';
import { Swords, ChevronRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <Hero />
        <Features />
        
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Challenge Your Knowledge?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of students worldwide in educational duels that make learning fun and competitive.
              </p>
              <Button 
                size="lg" 
                onClick={() => navigate('/subjects')}
                className="rounded-full bg-gradient-to-r from-game-blue to-game-purple text-white hover:opacity-90 shadow-lg"
              >
                <Swords className="mr-2 h-4 w-4" />
                Start Dueling
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
