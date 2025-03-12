
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface HealthBarProps {
  currentHealth: number;
  maxHealth: number;
  playerName: string;
  showDamage?: boolean;
  isOpponent?: boolean;
  avatar?: string;
}

const HealthBar: React.FC<HealthBarProps> = ({
  currentHealth,
  maxHealth,
  playerName,
  showDamage = false,
  isOpponent = false,
  avatar = '/placeholder.svg'
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
    if (percentage > 50) return 'bg-green-500';
    if (percentage > 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  return (
    <div className={cn(
      "relative w-full flex items-center space-x-4",
      isOpponent && "flex-row-reverse space-x-reverse"
    )}>
      <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
        <img 
          src={avatar} 
          alt={playerName} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-grow">
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium text-sm">{playerName}</span>
          <span className="text-sm">{currentHealth} / {maxHealth}</span>
        </div>
        
        <div className="health-bar-container">
          {/* Background health bar */}
          <div
            className={cn(
              "health-bar",
              getHealthColor(healthPercentage)
            )}
            style={{ width: `${healthPercentage}%` }}
          ></div>
          
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
        <div 
          className={cn(
            "absolute text-white font-bold text-lg damage-animation",
            isOpponent ? "right-16" : "left-16"
          )}
        >
          -{damageTaken}
        </div>
      )}
    </div>
  );
};

export default HealthBar;
