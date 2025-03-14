
import React from 'react';
import { motion } from 'framer-motion';

interface DamageEffectProps {
  x: number;
  y: number;
  amount: number;
}

const DamageEffect: React.FC<DamageEffectProps> = ({ x, y, amount }) => {
  return (
    <div 
      className="fixed pointer-events-none z-50"
      style={{ 
        left: x, 
        top: y,
        transform: 'translate(-50%, -50%)'  
      }}
    >
      {/* Main impact circle */}
      <motion.div
        className="absolute rounded-full bg-orange-500 opacity-70"
        initial={{ width: 0, height: 0 }}
        animate={{ 
          width: 150, 
          height: 150,
          opacity: 0,
        }}
        transition={{
          duration: 0.6,
          ease: [0.32, 0.72, 0, 1]
        }}
        style={{ 
          left: '50%', 
          top: '50%',
          transform: 'translate(-50%, -50%)'  
        }}
      />
      
      {/* Damage number */}
      <motion.div
        className="absolute whitespace-nowrap"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ 
          scale: 1.2, 
          opacity: 1,
          y: -40, 
        }}
        transition={{ 
          duration: 0.3,
          y: { duration: 0.5, ease: "easeOut" }
        }}
        style={{ 
          left: '50%', 
          top: '50%',
          transform: 'translate(-50%, -50%)'  
        }}
      >
        <span className="font-bold text-3xl text-orange-400 drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
          -{amount}
        </span>
      </motion.div>
      
      {/* Small particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full bg-orange-500"
          initial={{ 
            x: 0, 
            y: 0, 
            opacity: 0.8 
          }}
          animate={{ 
            x: Math.cos(i * Math.PI / 4) * 60, 
            y: Math.sin(i * Math.PI / 4) * 60,
            opacity: 0,
            scale: 0.5
          }}
          transition={{ duration: 0.5 }}
          style={{ 
            left: '50%', 
            top: '50%',
            transform: 'translate(-50%, -50%)'  
          }}
        />
      ))}
    </div>
  );
};

export default DamageEffect;
