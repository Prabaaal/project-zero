
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Trophy, Swords, Home, List } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: <Home className="h-5 w-5" /> },
    { path: '/subjects', label: 'Subjects', icon: <GraduationCap className="h-5 w-5" /> },
    { path: '/duel', label: 'Duel', icon: <Swords className="h-5 w-5" /> },
    { path: '/leaderboard', label: 'Leaderboard', icon: <Trophy className="h-5 w-5" /> },
  ];
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gray-800/80 border-b border-gray-700 transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-game-purple" />
          <span className="text-xl font-semibold tracking-tight text-gray-100">Project ZERO</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                location.pathname === item.path 
                  ? "bg-primary/10 text-primary" 
                  : "hover:bg-primary/5 text-gray-300 hover:text-gray-100"
              )}
            >
              <div className="flex items-center space-x-2">
                {item.icon}
                <span>{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>
        
        <div className="md:hidden">
          <button className="p-2 rounded-md text-gray-300 hover:bg-gray-700">
            <List className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
