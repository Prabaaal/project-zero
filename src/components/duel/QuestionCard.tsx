import React, { useState, useEffect } from 'react';
import { Question } from '@/types/game';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Clock, Brain, CheckCircle, XCircle } from 'lucide-react';
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

  // Reset selected answer when question changes
  useEffect(() => {
    setSelectedAnswer(null);
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

  const handleSelectOption = (option: string) => {
    if (disabled || selectedAnswer) return;
    setSelectedAnswer(option);
    onAnswer(option);
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
              <Button variant={selectedAnswer === option ? "default" : "outline"} className={cn("w-full justify-start text-left py-4 h-auto group transition-all", selectedAnswer === option ? "bg-gradient-to-r from-purple-700 to-purple-900 text-white border-purple-500" : "hover:bg-gray-800 hover:border-purple-500 text-purple-100 border-gray-700", disabled && "opacity-70 cursor-not-allowed")} onClick={() => handleSelectOption(option)} disabled={disabled || selectedAnswer !== null}>
                <span className="font-medium flex items-center">
                  <span className="h-6 w-6 rounded-full flex items-center justify-center border border-current mr-2 transition-colors">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </span>
                
                {selectedAnswer === option && <motion.span className="ml-auto" initial={{
              scale: 0
            }} animate={{
              scale: 1
            }} transition={{
              type: "spring"
            }}>
                    {option === question.correctAnswer ? <CheckCircle className="h-5 w-5 text-green-400" /> : <XCircle className="h-5 w-5 text-red-400" />}
                  </motion.span>}
                
                <span className="absolute inset-0 rounded-md bg-gradient-to-r from-purple-600/0 via-purple-600/40 to-purple-900/0 opacity-0 group-hover:opacity-100 transition-opacity text-base text-slate-950" />
              </Button>
            </motion.div>)}
        </div>
        
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
