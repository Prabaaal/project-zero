
import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Swords, Trophy, Brain, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';

// Simple 3D Avatar component
const Avatar = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#8B5CF6" />
      </mesh>
      <mesh position={[0, -0.5, 1]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#F97316" />
      </mesh>
      <mesh position={[0, 0.5, 1]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#0EA5E9" />
      </mesh>
      <mesh position={[0, 0, 0.8]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.5, 0.1, 16, 100]} />
        <meshStandardMaterial color="#D946EF" />
      </mesh>
    </>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      {/* Abstract background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-game-blue/20 to-game-purple/30 blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-game-purple/20 to-game-blue/20 blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 space-y-6 animation-delay-100 animate-fade-in">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full px-4 py-2 text-sm font-bold bg-game-purple/30 text-gray-100 border border-game-purple/50 backdrop-blur-sm"
            >
              <Gamepad2 className="mr-2 h-4 w-4" /> LEARN WHILE PLAYING
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
            >
              Learn. Duel.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-game-blue via-game-purple to-game-red drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                Conquer.
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 max-w-xl"
            >
              Challenge students from around the world to educational duels and rise through the global rankings. It's time to show what you've got!
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Button 
                onClick={() => navigate('/subjects')}
                size="lg" 
                className="rounded-full text-gray-100 bg-gradient-to-r from-game-blue to-game-purple hover:opacity-90 transition-all shadow-lg hover:shadow-xl border-2 border-gray-100/10 font-bold"
              >
                <Swords className="mr-2 h-5 w-5" />
                START DUELING
              </Button>
              
              <Button 
                onClick={() => navigate('/leaderboard')}
                variant="outline" 
                size="lg" 
                className="rounded-full border-2 border-gray-100/20 bg-gray-800/50 backdrop-blur-sm text-gray-100 hover:bg-gray-700/50 font-bold"
              >
                <Trophy className="mr-2 h-5 w-5" />
                LEADERBOARDS
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:w-1/2 animation-delay-300 relative"
          >
            <div className="w-full aspect-square max-w-md mx-auto">
              {/* 3D Avatar */}
              <div className="w-full h-full rounded-full bg-gradient-to-br from-game-blue/30 to-game-purple/30 p-1 backdrop-blur-sm border border-gray-100/20 shadow-2xl">
                <Canvas className="rounded-full overflow-hidden">
                  <Suspense fallback={null}>
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
                    <Avatar />
                  </Suspense>
                </Canvas>
              </div>
              
              {/* Floating badges */}
              <motion.div 
                initial={{ x: -20, y: -20 }}
                animate={{ x: -30, y: -30 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="absolute top-1/4 left-0 bg-game-blue/30 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-gray-100/20"
              >
                <GraduationCap className="h-8 w-8 text-gray-100" />
              </motion.div>
              
              <motion.div 
                initial={{ x: 20, y: 20 }}
                animate={{ x: 30, y: 30 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="absolute bottom-1/4 right-0 bg-game-purple/30 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-gray-100/20"
              >
                <Swords className="h-8 w-8 text-gray-100" />
              </motion.div>
              
              <motion.div 
                initial={{ x: 20, y: -20 }}
                animate={{ x: 30, y: -30 }}
                transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }}
                className="absolute top-1/4 right-1/4 bg-game-green/30 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-gray-100/20"
              >
                <Trophy className="h-8 w-8 text-gray-100" />
              </motion.div>
              
              <motion.div 
                initial={{ y: 0 }}
                animate={{ y: -10 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 py-2 px-4 rounded-full bg-gradient-to-r from-game-blue to-game-purple text-gray-100 font-bold text-sm shadow-xl border border-gray-100/20"
              >
                Your Avatar
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
