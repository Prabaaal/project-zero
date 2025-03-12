
import { LeaderboardEntry, Subject } from '@/types/game';

export const leaderboardData: LeaderboardEntry[] = [
  // Global Math Leaders
  {
    playerId: 'player1',
    playerName: 'Alex Chen',
    playerAvatar: '/placeholder.svg',
    rank: 1,
    wins: 152,
    totalMatches: 180,
    winRate: 84.4,
    subject: 'Mathematics',
    category: 'Global',
    country: 'United States'
  },
  {
    playerId: 'player2',
    playerName: 'Emma Watson',
    playerAvatar: '/placeholder.svg',
    rank: 2,
    wins: 143,
    totalMatches: 175,
    winRate: 81.7,
    subject: 'Mathematics',
    category: 'Global',
    country: 'United Kingdom'
  },
  {
    playerId: 'player3',
    playerName: 'Hiroshi Tanaka',
    playerAvatar: '/placeholder.svg',
    rank: 3,
    wins: 138,
    totalMatches: 170,
    winRate: 81.2,
    subject: 'Mathematics',
    category: 'Global',
    country: 'Japan'
  },
  
  // Global Physics Leaders
  {
    playerId: 'player4',
    playerName: 'Maria Rodriguez',
    playerAvatar: '/placeholder.svg',
    rank: 1,
    wins: 145,
    totalMatches: 160,
    winRate: 90.6,
    subject: 'Physics',
    category: 'Global',
    country: 'Spain'
  },
  {
    playerId: 'player5',
    playerName: 'Raj Patel',
    playerAvatar: '/placeholder.svg',
    rank: 2,
    wins: 138,
    totalMatches: 157,
    winRate: 87.9,
    subject: 'Physics',
    category: 'Global',
    country: 'India'
  },
  
  // Country Leaders - USA
  {
    playerId: 'player6',
    playerName: 'Sarah Johnson',
    playerAvatar: '/placeholder.svg',
    rank: 1,
    wins: 98,
    totalMatches: 120,
    winRate: 81.7,
    category: 'Country',
    country: 'United States'
  },
  {
    playerId: 'player7',
    playerName: 'Michael Brown',
    playerAvatar: '/placeholder.svg',
    rank: 2,
    wins: 95,
    totalMatches: 118,
    winRate: 80.5,
    category: 'Country',
    country: 'United States'
  },
  
  // State Leaders - California
  {
    playerId: 'player8',
    playerName: 'Jessica Lee',
    playerAvatar: '/placeholder.svg',
    rank: 1,
    wins: 87,
    totalMatches: 100,
    winRate: 87.0,
    category: 'State',
    state: 'California',
    country: 'United States'
  },
  
  // District Leaders
  {
    playerId: 'player9',
    playerName: 'David Wilson',
    playerAvatar: '/placeholder.svg',
    rank: 1,
    wins: 45,
    totalMatches: 50,
    winRate: 90.0,
    category: 'District',
    district: 'San Francisco',
    state: 'California',
    country: 'United States'
  },
  
  // School Leaders
  {
    playerId: 'player10',
    playerName: 'Kevin Zhang',
    playerAvatar: '/placeholder.svg',
    rank: 1,
    wins: 42,
    totalMatches: 45,
    winRate: 93.3,
    category: 'School',
    school: 'Lincoln High School',
    district: 'San Francisco',
    state: 'California',
    country: 'United States'
  }
];

export const getLeaderboardByCategory = (category: string): LeaderboardEntry[] => {
  return leaderboardData.filter(entry => entry.category === category);
};

export const getLeaderboardBySubject = (subject: Subject): LeaderboardEntry[] => {
  return leaderboardData.filter(entry => entry.subject === subject);
};

export const getTopPlayers = (limit: number = 10): LeaderboardEntry[] => {
  return [...leaderboardData].sort((a, b) => b.winRate - a.winRate).slice(0, limit);
};
