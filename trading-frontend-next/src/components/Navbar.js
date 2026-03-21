"use client";
import React, { useContext } from 'react';
import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';
import AuthContext from '../context/AuthContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <nav className="fixed top-0 z-50 w-full bg-blue-600 shadow-xl transition-colors duration-300 dark:bg-slate-900 dark:border-b dark:border-slate-800 backdrop-blur-md bg-opacity-90 dark:bg-opacity-90">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo / Title area */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex flex-col leading-tight group">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-lg font-extrabold tracking-wide text-white uppercase dark:text-gray-100 group-hover:text-blue-100 transition-colors"
            >
              Aslaph Management
            </motion.h1>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[10px] font-medium text-blue-100 dark:text-gray-400 group-hover:text-white transition-colors"
            >
              Stocks & Forex Analysis
            </motion.span>
          </Link>

          {/* Main Navigation - Only show if logged in or public links */}
          <ul className="hidden md:flex items-center space-x-6">
            <li>
              <Link to="/" className="text-sm font-medium text-white/90 hover:text-white transition-colors hover:scale-105 transform duration-200">Home</Link>
            </li>
            <li>
              <Link to="/about" className="text-sm font-medium text-white/90 hover:text-white transition-colors hover:scale-105 transform duration-200">About</Link>
            </li>
          </ul>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-6">
          {user ? (
            <div className="hidden lg:flex items-center space-x-6">
              <Link to="/currency" className="text-xs font-medium text-blue-50 hover:text-white dark:text-gray-400 dark:hover:text-white transition-colors">Currency meter</Link>
              <Link to="/currencytracker" className="text-xs font-medium text-blue-50 hover:text-white dark:text-gray-400 dark:hover:text-white transition-colors">Time trackerFx</Link>
              <button
                onClick={logoutUser}
                className="text-xs font-bold bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex items-center space-x-4">
              <Link to="/login" className="text-sm font-medium text-white hover:text-blue-100 transition-colors">Login</Link>
              <Link to="/signup" className="text-sm font-bold bg-white text-blue-600 px-4 py-2 rounded-full shadow-md hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-0.5">Sign Up</Link>
            </div>
          )}

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-blue-700 hover:bg-blue-800 dark:bg-slate-800 dark:hover:bg-slate-700 transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 dark:focus:ring-offset-slate-900 border border-transparent dark:border-slate-700"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
