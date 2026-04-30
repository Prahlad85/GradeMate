// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, GraduationCap } from 'lucide-react';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm' 
        : 'bg-background border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 text-foreground hover:opacity-80 transition-opacity">
            <GraduationCap className="h-8 w-8 text-blue-500" />
            <span className="font-bold text-xl tracking-tight">GradeMate</span>
          </Link>
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-border hover:text-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Toggle theme"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;