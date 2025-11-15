// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import logo from '../assets/logo.jpg'; // Vite logo ko placeholder ki tarah istemal kar rahe hain

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src={logo} alt="Logo" />
        <span>GradeMate</span>
      </Link>
      <button onClick={toggleTheme} className="theme-toggle" title="Toggle theme">
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </nav>
  );
};

export default Navbar;