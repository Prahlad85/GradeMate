// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-container">
      <Link to="/cgpa" className="card-link">
        <h2>CGPA Calculator</h2>
        <p>Calculate Your CGPA. Get your overall performance.</p>
        <span className="cta">Calculate CGPA &rarr;</span>
      </Link>

      <Link to="/internal-2y" className="card-link">
        <h2>Internal Marks (CSE/IT 2nd Year)</h2>
        <p>Calculate your internal marks for 2nd year subjects.</p>
        <span className="cta">Calculate Marks &rarr;</span>
      </Link>

      <Link to="/internal-3y" className="card-link">
        <h2>Internal Marks (CSE/IT 3rd Year)</h2>
        <p>Calculate your internal marks for 3rd year subjects.</p>
        <span className="cta">Calculate Marks &rarr;</span>
      </Link>
    </div>
  );
};

export default HomePage;