
import React from 'react';
import { Subject } from '@/types/game';
import { cn } from '@/lib/utils';
import { 
  Calculator, 
  Atom, 
  BookOpen, 
  Clock, 
  Globe 
} from 'lucide-react';

interface SubjectCardProps {
  subject: Subject;
  onClick: (subject: Subject) => void;
  selected?: boolean;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ 
  subject, 
  onClick,
  selected = false
}) => {
  const getSubjectIcon = (subject: Subject) => {
    switch (subject) {
      case 'Mathematics':
        return <Calculator className="h-8 w-8" />;
      case 'Physics':
        return <Atom className="h-8 w-8" />;
      case 'Literature':
        return <BookOpen className="h-8 w-8" />;
      case 'History':
        return <Clock className="h-8 w-8" />;
      case 'Geography':
        return <Globe className="h-8 w-8" />;
      default:
        return <BookOpen className="h-8 w-8" />;
    }
  };

  const getSubjectColor = (subject: Subject) => {
    switch (subject) {
      case 'Mathematics':
        return 'from-blue-500 to-purple-500 text-gray-100';
      case 'Physics':
        return 'from-indigo-500 to-blue-500 text-gray-100';
      case 'Literature':
        return 'from-purple-500 to-pink-500 text-gray-100';
      case 'History':
        return 'from-amber-500 to-orange-500 text-gray-100';
      case 'Geography':
        return 'from-emerald-500 to-green-500 text-gray-100';
      default:
        return 'from-gray-500 to-gray-700 text-gray-100';
    }
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden group h-48 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer",
        selected ? "ring-4 ring-primary ring-offset-2 ring-offset-gray-800" : "hover:-translate-y-1"
      )}
      onClick={() => onClick(subject)}
    >
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br",
        getSubjectColor(subject)
      )} />
      
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-4 -top-4 w-32 h-32 rounded-full border-8 border-gray-100/20" />
        <div className="absolute -left-4 -bottom-4 w-24 h-24 rounded-full border-8 border-gray-100/20" />
      </div>
      
      <div className="relative z-10 h-full flex flex-col justify-between p-5">
        <div className="flex justify-between items-start">
          <div className="bg-gray-800/50 rounded-lg p-2 backdrop-blur-sm">
            {getSubjectIcon(subject)}
          </div>
          {selected && (
            <div className="bg-primary text-gray-900 rounded-full px-2 py-1 text-xs font-medium">
              Selected
            </div>
          )}
        </div>
        
        <div>
          <h3 className="font-bold text-xl mb-1">{subject}</h3>
          <p className="text-sm text-gray-200/80">Challenge your knowledge and compete globally</p>
          
          <div className="mt-4 flex items-center text-xs">
            <span className="px-2 py-1 rounded-full bg-gray-800/50">Start Duel</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
