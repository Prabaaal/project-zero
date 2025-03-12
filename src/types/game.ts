
export type Subject = 
  | 'Mathematics' 
  | 'Physics' 
  | 'Literature' 
  | 'History' 
  | 'Geography';

export type RankCategory = 
  | 'School'
  | 'District'
  | 'State'
  | 'Country'
  | 'Global';

export type QuestionDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface Question {
  id: string;
  subject: Subject;
  text: string;
  options: string[];
  correctAnswer: string;
  difficulty: QuestionDifficulty;
  timeLimit: number; // in seconds
}

export interface Player {
  id: string;
  name: string;
  avatar: string;
  health: number;
  school?: string;
  district?: string;
  state?: string;
  country: string;
}

export interface DuelState {
  id: string;
  players: [Player, Player];
  currentRound: number;
  maxRounds: number;
  currentQuestion?: Question;
  timeRemaining?: number;
  roundDamage: number;
  winnerId?: string;
  status: 'waiting' | 'active' | 'paused' | 'completed';
}

export interface LeaderboardEntry {
  playerId: string;
  playerName: string;
  playerAvatar: string;
  rank: number;
  wins: number;
  totalMatches: number;
  winRate: number;
  subject?: Subject;
  category: RankCategory;
  school?: string;
  district?: string;
  state?: string;
  country: string;
}
