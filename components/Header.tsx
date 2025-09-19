
import React from 'react';
import Logo from './Logo';

const Header: React.FC = () => {
  return (
    <header className="py-6">
      <div className="container mx-auto flex items-center justify-center gap-4">
        <Logo />
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          AI Trip Planner
        </h1>
      </div>
    </header>
  );
};

export default Header;
