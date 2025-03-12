
import React, { useState } from 'react';
import { LeaderboardEntry, RankCategory, Subject } from '@/types/game';
import { Trophy, Users, Building, Map, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  category?: RankCategory;
  subject?: Subject;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  entries,
  category,
  subject
}) => {
  const getCategoryIcon = (category: RankCategory) => {
    switch (category) {
      case 'School':
        return <Building className="h-4 w-4" />;
      case 'District':
        return <Users className="h-4 w-4" />;
      case 'State':
        return <Map className="h-4 w-4" />;
      case 'Country':
        return <Trophy className="h-4 w-4" />;
      case 'Global':
        return <Globe className="h-4 w-4" />;
      default:
        return <Trophy className="h-4 w-4" />;
    }
  };
  
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-500';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-amber-600';
    return 'text-gray-700';
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {category && getCategoryIcon(category)}
            <h3 className="font-semibold text-lg">
              {category || 'All'} {subject ? `- ${subject}` : ''} Leaderboard
            </h3>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-full table-auto">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
              {category !== 'Global' && (
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {category === 'Country' ? 'Country' : 
                   category === 'State' ? 'State' : 
                   category === 'District' ? 'District' : 'School'}
                </th>
              )}
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Wins</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Win Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {entries.map((entry, index) => (
              <tr 
                key={index}
                className={cn(
                  "hover:bg-gray-50 transition-colors",
                  index < 3 ? "bg-gray-50/50" : ""
                )}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={cn(
                    "font-bold",
                    getRankColor(entry.rank)
                  )}>
                    {entry.rank <= 3 ? (
                      <div className="flex items-center justify-center w-8 h-8 rounded-full border border-current">
                        {entry.rank}
                      </div>
                    ) : (
                      <span>{entry.rank}</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden border border-gray-200">
                      <img 
                        src={entry.playerAvatar} 
                        alt={entry.playerName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">{entry.playerName}</div>
                      {entry.subject && (
                        <div className="text-xs text-gray-500">{entry.subject}</div>
                      )}
                    </div>
                  </div>
                </td>
                {category !== 'Global' && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {category === 'Country' ? entry.country : 
                     category === 'State' ? entry.state : 
                     category === 'District' ? entry.district : entry.school}
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                  {entry.wins}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    {entry.winRate}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;
