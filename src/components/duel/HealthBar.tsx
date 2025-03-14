
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

interface HealthBarProps {
  currentHealth: number;
  maxHealth: number;
  playerName: string;
  showDamage?: boolean;
  isOpponent?: boolean;
  avatar?: string;
  id?: string;
}

const HealthBar: React.FC<HealthBarProps> = ({
  currentHealth,
  maxHealth,
  playerName,
  showDamage = false,
  isOpponent = false,
  avatar = '/placeholder.svg',
  id
}) => {
  const [prevHealth, setPrevHealth] = useState(currentHealth);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const healthPercentage = Math.max((currentHealth / maxHealth) * 100, 0);
  const prevHealthPercentage = Math.max((prevHealth / maxHealth) * 100, 0);
  const damageTaken = prevHealth - currentHealth;
  
  useEffect(() => {
    if (prevHealth > currentHealth) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setPrevHealth(currentHealth);
      }, 500); // Match duration with animation
      return () => clearTimeout(timer);
    } else {
      setPrevHealth(currentHealth);
    }
  }, [currentHealth, prevHealth]);
  
  const getHealthColor = (percentage: number) => {
    if (percentage > 60) return 'bg-gradient-to-r from-emerald-500 to-green-600';
    if (percentage > 30) return 'bg-gradient-to-r from-amber-500 to-yellow-600';
    return 'bg-gradient-to-r from-red-600 to-rose-700';
  };
  
  return (
    <div className={cn(
      "relative w-full flex items-center space-x-4",
      isOpponent && "flex-row-reverse space-x-reverse"
    )}>
      <div className="relative">
        <motion.div 
          className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md"
          initial={{ scale: 0.9 }}
          animate={{ scale: isAnimating ? [1, 1.1, 0.95, 1] : 1 }}
          transition={{ duration: 0.5 }}
          id={id}
        >
          <img 
            src={avatar} 
            alt={playerName} 
            className="w-full h-full object-cover"
          />
        </motion.div>
        {/* Shield icon for visual effect */}
        <motion.div 
          className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <Shield className="h-3 w-3 text-blue-100" />
        </motion.div>
      </div>
      
      <div className="flex-grow">
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium text-sm text-purple-100">{playerName}</span>
          <span className="text-sm font-mono text-purple-200">{currentHealth} / {maxHealth}</span>
        </div>
        
        <div className="health-bar-container bg-gray-800 border border-gray-700">
          {/* Glowing effect */}
          <div className="absolute inset-0 blur-sm" aria-hidden="true">
            <div 
              className={cn(
                "h-full",
                getHealthColor(healthPercentage)
              )}
              style={{ width: `${healthPercentage}%` }}
            ></div>
          </div>
          
          {/* Background health bar */}
          <motion.div
            className={cn(
              "health-bar z-10",
              getHealthColor(healthPercentage)
            )}
            style={{ width: `${healthPercentage}%` }}
            animate={{ 
              width: `${healthPercentage}%`,
            }}
            transition={{ type: 'spring', damping: 15 }}
          >
            {/* Health bar pattern overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTAgMTVsMTUgMTVMMzAgMTUgMTUgMHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgo8L3N2Zz4=')] opacity-25"></div>
          </motion.div>
          
          {/* Previous health indicator (for damage animation) */}
          {isAnimating && showDamage && (
            <div
              className="absolute top-0 right-0 bottom-0 bg-white opacity-70"
              style={{
                width: `${prevHealthPercentage - healthPercentage}%`,
                right: `${100 - prevHealthPercentage}%`,
              }}
            ></div>
          )}
        </div>
      </div>
      
      {/* Damage indicator */}
      {showDamage && damageTaken > 0 && isAnimating && (
        <motion.div 
          className={cn(
            "absolute text-white font-bold text-lg",
            isOpponent ? "right-16" : "left-16"
          )}
          initial={{ y: 0, opacity: 1, scale: 1 }}
          animate={{ y: -30, opacity: 0, scale: 1.5 }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-red-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            -{damageTaken}
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default HealthBar;
