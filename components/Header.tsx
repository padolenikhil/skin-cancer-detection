
import React from 'react';
import { StethoscopeIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <StethoscopeIcon className="h-8 w-8 text-sky-600" />
            <h1 className="text-xl font-bold text-slate-800">
              Skin Cancer AI System
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
