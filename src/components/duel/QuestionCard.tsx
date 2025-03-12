
import React, { useState } from 'react';
import { Question } from '@/types/game';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  
  const handleSelectOption = (option: string) => {
    if (disabled) return;
    setSelectedAnswer(option);
    onAnswer(option);
  };
  
  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Mathematics':
        return 'bg-blue-100 text-blue-800';
      case 'Physics':
        return 'bg-indigo-100 text-indigo-800';
      case 'Literature':
        return 'bg-purple-100 text-purple-800';
      case 'History':
        return 'bg-amber-100 text-amber-800';
      case 'Geography':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getTimeColor = () => {
    if (!timeRemaining) return 'text-gray-500';
    if (timeRemaining > 10) return 'text-green-500';
    if (timeRemaining > 5) return 'text-yellow-500';
    return 'text-red-500 animate-pulse';
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-2xl w-full border border-gray-200 animate-scale-in">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className={cn(
            "px-3 py-1 rounded-full text-xs font-medium",
            getSubjectColor(question.subject)
          )}>
            {question.subject}
          </span>
          
          {timeRemaining !== undefined && (
            <div className={cn(
              "flex items-center space-x-1",
              getTimeColor()
            )}>
              <Clock className="w-4 h-4" />
              <span className="font-mono">{timeRemaining}s</span>
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-bold mb-6">{question.text}</h3>
        
        <div className="space-y-3 mb-4">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant={selectedAnswer === option ? "default" : "outline"}
              className={cn(
                "w-full justify-start text-left py-4 h-auto",
                selectedAnswer === option ? "bg-primary text-white" : "hover:bg-gray-50",
                disabled && "opacity-70 cursor-not-allowed"
              )}
              onClick={() => handleSelectOption(option)}
              disabled={disabled || selectedAnswer !== null}
            >
              <span className="font-medium">{option}</span>
            </Button>
          ))}
        </div>
        
        {timeRemaining !== undefined && timeRemaining < 5 && (
          <div className="flex items-center space-x-2 text-red-500 text-sm mt-4">
            <AlertTriangle className="h-4 w-4" />
            <span>Time running out!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
