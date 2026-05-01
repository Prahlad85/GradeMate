// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, BookOpen, GraduationCap, ArrowRight, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    title: "CGPA Calculator",
    description: "Calculate Your CGPA easily and get an overview of your academic performance.",
    icon: GraduationCap,
    path: "/cgpa",
    gradient: "from-blue-500/20 to-purple-500/20",
    iconColor: "text-blue-500",
    hoverBorder: "hover:border-blue-500/50"
  },

  {
    title: "Aptitude Internal Marks",
    description: "Calculate your aptitude internal marks from MST, Assignments, Surprise Tests, Quiz & Attendance — out of 40.",
    icon: Brain,
    path: "/aptitude",
    gradient: "from-amber-500/20 to-yellow-400/20",
    iconColor: "text-amber-500",
    hoverBorder: "hover:border-amber-500/50"
  },

  {
    title: "Internal Marks (2nd Year)",
    description: "Quickly compute your internal marks for 2nd year CSE/IT subjects.",
    icon: Calculator,
    path: "/internal-2y",
    gradient: "from-red-500/20 to-orange-500/20",
    iconColor: "text-red-500",
    hoverBorder: "hover:border-red-500/50"
  },
  {
    title: "Internal Marks (3rd Year)",
    description: "Accurately calculate your internal marks for 3rd year CSE/IT subjects.",
    icon: BookOpen,
    path: "/internal-3y",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-500",
    hoverBorder: "hover:border-emerald-500/50"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const HomePage = () => {
  return (
    <div className="w-full flex flex-col items-center pt-16 pb-24">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-3xl px-4 mb-20"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-foreground">
          Track Your Academic <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Performance Easily
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          The ultimate productivity tool for students. Accurately calculate your CGPA and internal marks with our intuitive, modern dashboard.
        </p>
        <button 
          onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-semibold hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl cursor-pointer"
        >
          Get Started <ArrowRight className="w-5 h-5" />
        </button>
      </motion.section>

      {/* Feature Cards Section */}
      <section id="features" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div key={index} variants={itemVariants} className="h-full">
                <Link 
                  to={feature.path} 
                  className={`block h-full group bg-card border border-border rounded-[18px] sm:rounded-[24px] p-4 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden ${feature.hoverBorder}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center bg-muted mb-3 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-5 h-5 sm:w-7 sm:h-7 ${feature.iconColor}`} />
                    </div>
                    <h3 className="text-sm sm:text-2xl font-bold mb-1 sm:mb-3 text-foreground group-hover:text-blue-500 transition-colors leading-tight">
                      {feature.title}
                    </h3>
                    <p className="hidden sm:block text-xs sm:text-base text-muted-foreground mb-8 flex-1">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-[10px] sm:text-sm font-semibold text-foreground group-hover:text-blue-500 transition-colors mt-auto">
                      <span className="sm:inline">Calculate Now</span>
                      <ArrowRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;