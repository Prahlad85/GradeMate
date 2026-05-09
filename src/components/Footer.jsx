// src/components/Footer.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "CGPA", path: "/cgpa" },
    { name: "Aptitude", path: "/aptitude" },
    { name: "1st Year", path: "/internal-1y" },
    { name: "2nd Year", path: "/internal-2y" },
    { name: "3rd Year", path: "/internal-3y" },
  ];

  return (
    <footer className="w-full border-t border-border bg-background py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:flex-nowrap justify-between items-center gap-4 text-sm text-muted-foreground">
          {/* Copyright */}
          <div className="font-medium text-foreground whitespace-nowrap">
            © {new Date().getFullYear()} GradeMate
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-5">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors duration-200 hover:text-blue-500 whitespace-nowrap ${
                  location.pathname === link.path
                    ? "text-blue-500 font-medium"
                    : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Developer Section */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span>Developed by</span>

            <a
              href="https://www.linkedin.com/in/prahlad85"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-1 px-1 py-0 rounded-md
bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600
text-white font-semibold whitespace-nowrap overflow-hidden
shadow-[0_0_12px_rgba(59,130,246,0.6)]
transition-all duration-300 shrink-0 border border-blue-400/30"
            >
              {/* Shine Effect */}
              <span className="absolute inset-0 overflow-hidden rounded-md">
                <span
                  className="absolute top-0 -left-full w-full h-full 
                  bg-white/20 skew-x-12 animate-[shine_2s_linear_infinite]"
                ></span>
              </span>

              {/* LinkedIn Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="relative z-10"
              >
                <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8.34 17V10.66H6.16V17H8.34M7.25 9.73A1.27 1.27 0 1 0 7.25 7.19A1.27 1.27 0 0 0 7.25 9.73M17.84 17V13.5C17.84 11.63 16.84 10.56 15.5 10.56C14.42 10.56 13.94 11.16 13.67 11.58V10.66H11.5C11.53 11.27 11.5 17 11.5 17H13.67V13.46C13.67 13.27 13.68 13.08 13.74 12.94C13.89 12.56 14.23 12.16 14.81 12.16C15.57 12.16 15.88 12.74 15.88 13.59V17H17.84Z" />
              </svg>

              {/* Text */}
              <span className="relative z-10 whitespace-nowrap">
                Prahlad Kumar
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
