
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LeaderboardTable from '@/components/leaderboard/LeaderboardTable';
import { Subject, RankCategory } from '@/types/game';
import { 
  getLeaderboardByCategory, 
  getLeaderboardBySubject, 
  getTopPlayers,
  leaderboardData
} from '@/data/leaderboard';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { Globe, Building, Map, User, Users } from 'lucide-react';

const Leaderboard = () => {
  const [categoryTab, setCategoryTab] = useState<RankCategory>('Global');
  const [subject, setSubject] = useState<Subject | 'All'>('All');
  
  const categories: RankCategory[] = [
    'Global',
    'Country',
    'State',
    'District',
    'School'
  ];
  
  const subjects: (Subject | 'All')[] = [
    'All',
    'Mathematics',
    'Physics',
    'Literature',
    'History',
    'Geography'
  ];
  
  const getFilteredLeaderboardData = () => {
    if (subject === 'All') {
      return getLeaderboardByCategory(categoryTab);
    } else {
      const bySubject = getLeaderboardBySubject(subject);
      return bySubject.filter(entry => entry.category === categoryTab);
    }
  };
  
  const getCategoryIcon = (category: RankCategory) => {
    switch (category) {
      case 'Global':
        return <Globe className="h-4 w-4" />;
      case 'Country':
        return <Map className="h-4 w-4" />;
      case 'State':
        return <Map className="h-4 w-4" />;
      case 'District':
        return <Users className="h-4 w-4" />;
      case 'School':
        return <Building className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl font-bold mb-4">Leaderboards</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how you rank against other students from your school to around the globe in various subjects.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
              <Tabs 
                defaultValue="Global" 
                value={categoryTab}
                onValueChange={(value) => setCategoryTab(value as RankCategory)}
                className="w-full md:w-auto"
              >
                <TabsList className="grid grid-cols-5 w-full md:w-auto">
                  {categories.map(category => (
                    <TabsTrigger key={category} value={category} className="flex items-center space-x-1">
                      {getCategoryIcon(category)}
                      <span>{category}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              
              <div className="w-full md:w-auto">
                <Select 
                  value={subject} 
                  onValueChange={(value) => setSubject(value as Subject | 'All')}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map(subj => (
                      <SelectItem key={subj} value={subj}>
                        {subj}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="animate-fade-in">
              <LeaderboardTable 
                entries={getFilteredLeaderboardData()} 
                category={categoryTab}
                subject={subject !== 'All' ? subject : undefined}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Leaderboard;
