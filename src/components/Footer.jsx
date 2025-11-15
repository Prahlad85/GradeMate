// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <span>© {new Date().getFullYear()} GradeMate</span>
      </div>

      <div className="footer-links">
        <Link  to="/">Home</Link>
        <Link to="/cgpa">CGPA</Link>
        <Link to="/internal-2y">Internal 2nd Year</Link>
        <Link to="/internal-3y">Internal 3rd Year</Link>
      </div>

      <div className="footer-credit">
        <span>Developed by Prahlad Kumar</span>
      </div>
    </footer>
  );
};

export default Footer;
