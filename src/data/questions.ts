
import { Question, Subject } from '@/types/game';

export const questions: Question[] = [
  // Mathematics
  {
    id: 'math-1',
    subject: 'Mathematics',
    text: 'Solve for x: 2x + 5 = 15',
    options: ['x = 5', 'x = 10', 'x = 7.5', 'x = 5.5'],
    correctAnswer: 'x = 5',
    difficulty: 'Easy',
    timeLimit: 20
  },
  {
    id: 'math-2',
    subject: 'Mathematics',
    text: 'What is the square root of 144?',
    options: ['10', '12', '14', '16'],
    correctAnswer: '12',
    difficulty: 'Easy',
    timeLimit: 15
  },
  {
    id: 'math-3',
    subject: 'Mathematics',
    text: 'If a triangle has angles measuring 30° and 60°, what is the measure of the third angle?',
    options: ['30°', '60°', '90°', '120°'],
    correctAnswer: '90°',
    difficulty: 'Medium',
    timeLimit: 25
  },
  
  // Physics
  {
    id: 'phys-1',
    subject: 'Physics',
    text: 'What is the SI unit of force?',
    options: ['Watt', 'Joule', 'Newton', 'Pascal'],
    correctAnswer: 'Newton',
    difficulty: 'Easy',
    timeLimit: 15
  },
  {
    id: 'phys-2',
    subject: 'Physics',
    text: 'Which law of motion states that for every action, there is an equal and opposite reaction?',
    options: ['First Law', 'Second Law', 'Third Law', 'Law of Conservation'],
    correctAnswer: 'Third Law',
    difficulty: 'Medium',
    timeLimit: 20
  },
  
  // Literature
  {
    id: 'lit-1',
    subject: 'Literature',
    text: 'Who wrote "Romeo and Juliet"?',
    options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
    correctAnswer: 'William Shakespeare',
    difficulty: 'Easy',
    timeLimit: 15
  },
  {
    id: 'lit-2',
    subject: 'Literature',
    text: 'In which century did William Shakespeare live?',
    options: ['15th century', '16th century', '17th century', '18th century'],
    correctAnswer: '16th century',
    difficulty: 'Medium',
    timeLimit: 20
  },
  
  // History
  {
    id: 'hist-1',
    subject: 'History',
    text: 'In what year did World War II end?',
    options: ['1943', '1944', '1945', '1946'],
    correctAnswer: '1945',
    difficulty: 'Easy',
    timeLimit: 15
  },
  {
    id: 'hist-2',
    subject: 'History',
    text: 'Who was the first President of the United States?',
    options: ['Thomas Jefferson', 'John Adams', 'George Washington', 'Abraham Lincoln'],
    correctAnswer: 'George Washington',
    difficulty: 'Easy',
    timeLimit: 15
  },
  
  // Geography
  {
    id: 'geo-1',
    subject: 'Geography',
    text: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Madrid', 'Paris'],
    correctAnswer: 'Paris',
    difficulty: 'Easy',
    timeLimit: 15
  },
  {
    id: 'geo-2',
    subject: 'Geography',
    text: 'Which is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    correctAnswer: 'Pacific Ocean',
    difficulty: 'Easy',
    timeLimit: 15
  }
];

export const getRandomQuestionForSubject = (subject: Subject): Question => {
  const subjectQuestions = questions.filter(q => q.subject === subject);
  const randomIndex = Math.floor(Math.random() * subjectQuestions.length);
  return subjectQuestions[randomIndex];
};

export const getQuestionById = (id: string): Question | undefined => {
  return questions.find(q => q.id === id);
};
