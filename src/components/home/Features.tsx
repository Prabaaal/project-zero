
import React from 'react';
import { GraduationCap, Trophy, Swords, Users, BarChart, Clock } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <GraduationCap className="h-8 w-8 text-game-purple" />,
      title: 'Diverse Subjects',
      description: 'Challenge yourself in Mathematics, Physics, Literature, History, Geography and more.'
    },
    {
      icon: <Swords className="h-8 w-8 text-game-blue" />,
      title: 'Real-time Duels',
      description: 'Face off against other students in real-time educational battles with increasing difficulty.'
    },
    {
      icon: <Trophy className="h-8 w-8 text-game-yellow" />,
      title: 'Global Rankings',
      description: 'Climb the ranks from your school all the way to global leaderboards.'
    },
    {
      icon: <Users className="h-8 w-8 text-game-green" />,
      title: 'Worldwide Community',
      description: 'Connect with students from around the world who share your passion for learning.'
    },
    {
      icon: <BarChart className="h-8 w-8 text-game-red" />,
      title: 'Track Progress',
      description: 'Monitor your performance across different subjects and identify areas for improvement.'
    },
    {
      icon: <Clock className="h-8 w-8 text-game-indigo" />,
      title: 'Time-Based Challenges',
      description: 'Test your knowledge under time pressure to improve your quick thinking skills.'
    }
  ];
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Features that Make Learning Exciting
          </h2>
          <p className="text-lg text-gray-600">
            EduDuel combines education with competitive gaming to create an engaging learning experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 p-3 rounded-full w-16 h-16 flex items-center justify-center bg-gray-50">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
