
import React from 'react';
import { GraduationCap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-6 mt-auto bg-white border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <GraduationCap className="h-6 w-6 text-game-purple mr-2" />
            <span className="text-lg font-semibold">EduDuel</span>
          </div>
          
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} EduDuel. All rights reserved.
          </div>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
