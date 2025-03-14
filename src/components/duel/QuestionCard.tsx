
import React, { useState, useEffect } from 'react';
import { Question } from '@/types/game';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Clock, Brain, CheckCircle, XCircle, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface QuestionCardProps {
  question: Question;
  timeRemaining?: number;
  onAnswer: (answer: string) => void;
  disabled?: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  timeRemaining,
  onAnswer,
  disabled = false
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeFlash, setTimeFlash] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // Reset selected answer when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setConfirmed(false);
  }, [question.id]);

  // Flash effect when time is low
  useEffect(() => {
    if (timeRemaining !== undefined && timeRemaining <= 5) {
      const interval = setInterval(() => {
        setTimeFlash(prev => !prev);
      }, 500);
      return () => clearInterval(interval);
    } else {
      setTimeFlash(false);
    }
  }, [timeRemaining]);

  // Handle keyboard shortcuts (spacebar for lock in)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && selectedAnswer && !confirmed && !disabled) {
        e.preventDefault();
        handleConfirmAnswer();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedAnswer, confirmed, disabled]);

  const handleSelectOption = (option: string) => {
    if (disabled || confirmed) return;
    setSelectedAnswer(option);
  };

  const handleConfirmAnswer = () => {
    if (!selectedAnswer || confirmed) return;
    setConfirmed(true);
    onAnswer(selectedAnswer);
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Mathematics':
        return 'bg-blue-900/60 text-blue-300 border-blue-700';
      case 'Physics':
        return 'bg-indigo-900/60 text-indigo-300 border-indigo-700';
      case 'Literature':
        return 'bg-purple-900/60 text-purple-300 border-purple-700';
      case 'History':
        return 'bg-amber-900/60 text-amber-300 border-amber-700';
      case 'Geography':
        return 'bg-emerald-900/60 text-emerald-300 border-emerald-700';
      default:
        return 'bg-gray-900/60 text-gray-300 border-gray-700';
    }
  };

  const getTimeColor = () => {
    if (!timeRemaining) return 'text-gray-400';
    if (timeRemaining > 10) return 'text-green-500';
    if (timeRemaining > 5) return 'text-yellow-500';
    return cn('text-red-500', timeFlash ? 'animate-pulse' : '');
  };

  return <motion.div className="bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden max-w-2xl w-full border border-purple-500/30" initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className={cn("px-3 py-1 rounded-full text-xs font-medium border", getSubjectColor(question.subject))}>
            <span className="flex items-center">
              <Brain className="w-3 h-3 mr-1" />
              {question.subject}
            </span>
          </span>
          
          {timeRemaining !== undefined && <motion.div className={cn("flex items-center space-x-1 px-3 py-1 rounded-full border border-gray-700", getTimeColor())} animate={{
          scale: timeFlash ? 1.1 : 1
        }} transition={{
          duration: 0.2
        }}>
              <Clock className="w-4 h-4" />
              <span className="font-mono text-sm">{timeRemaining}s</span>
            </motion.div>}
        </div>
        
        <h3 className="text-xl font-bold mb-6 text-purple-100">{question.text}</h3>
        
        <div className="space-y-3 mb-4">
          {question.options.map((option, index) => <motion.div key={index} initial={{
          opacity: 0,
          x: index % 2 === 0 ? -10 : 10
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: index * 0.1,
          duration: 0.3
        }}>
              <Button variant={selectedAnswer === option ? "default" : "outline"} className={cn("w-full justify-start text-left py-4 h-auto group transition-all", 
                selectedAnswer === option 
                  ? "bg-gradient-to-r from-purple-700 to-purple-900 text-black font-medium border-purple-500" 
                  : "hover:bg-gray-800 hover:border-purple-500 text-black border-gray-700 bg-gray-200", 
                (disabled || confirmed) && "opacity-70 cursor-not-allowed"
              )} onClick={() => handleSelectOption(option)} disabled={disabled || confirmed}>
                <span className="font-medium flex items-center">
                  <span className="h-6 w-6 rounded-full flex items-center justify-center border border-current mr-2 text-black bg-white">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </span>
                
                {confirmed && selectedAnswer === option && <motion.span className="ml-auto" initial={{
              scale: 0
            }} animate={{
              scale: 1
            }} transition={{
              type: "spring"
            }}>
                    {option === question.correctAnswer ? <CheckCircle className="h-5 w-5 text-green-600" /> : <XCircle className="h-5 w-5 text-red-600" />}
                  </motion.span>}
                
                <span className="absolute inset-0 rounded-md bg-gradient-to-r from-purple-600/0 via-purple-600/40 to-purple-900/0 opacity-0 group-hover:opacity-100 transition-opacity text-base text-slate-950" />
              </Button>
            </motion.div>)}
        </div>
        
        {/* Lock In Button */}
        <AnimatePresence>
          {selectedAnswer && !confirmed && !disabled && (
            <motion.div 
              className="mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Button 
                variant="default" 
                className="w-full bg-green-600 hover:bg-green-700 py-2 font-medium group relative overflow-hidden"
                onClick={handleConfirmAnswer}
              >
                <span className="relative z-10 flex items-center justify-center">
                  <Lock className="mr-2 h-5 w-5" />
                  Lock In Answer <span className="ml-2 opacity-70">(or press Spacebar)</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {timeRemaining !== undefined && timeRemaining < 5 && <AnimatePresence>
            <motion.div className="flex items-center space-x-2 text-red-500 text-sm mt-4" initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -10
        }} transition={{
          duration: 0.2
        }}>
              <AlertTriangle className="h-4 w-4" />
              <span>Time running out!</span>
            </motion.div>
          </AnimatePresence>}
      </div>
    </motion.div>;
};

export default QuestionCard;
