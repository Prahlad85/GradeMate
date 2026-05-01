// src/components/Footer.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "CGPA", path: "/cgpa" },
    { name: "Aptitude", path: "/aptitude" },
    { name: "Internal 2nd Year", path: "/internal-2y" },
    { name: "Internal 3rd Year", path: "/internal-3y" }
  ];

  return (
    <footer className="w-full border-t border-border bg-background py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <div className="font-medium text-foreground">
            © {new Date().getFullYear()} GradeMate
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {links.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`transition-colors duration-200 hover:text-blue-500 ${
                  location.pathname === link.path ? 'text-blue-500 font-medium' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1">
            Developed by <span className="text-foreground font-medium">Prahlad Kumar</span> And Ankul Kumar
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
