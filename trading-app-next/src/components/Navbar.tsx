"use client";

import React from 'react';
import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, LogOut } from 'lucide-react';

const Navbar = () => {
    const { darkMode, toggleDarkMode } = useTheme();
    // Safe access to AuthContext
    const authContext = useContext(AuthContext);
    const user = authContext?.user;
    const logoutUser = authContext?.logoutUser;

    return (
        <nav className="fixed top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 transition-colors duration-300">
            <div className="max-w-[1920px] mx-auto px-6 py-3 flex items-center justify-between">
                {/* Logo / Title area */}
                <div className="flex items-center space-x-8">
                    <Link href="/" className="flex flex-col group no-underline">
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                        >
                            Aslaph Management
                        </motion.h1>
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase"
                        >
                            Stocks & Forex Analysis
                        </motion.span>
                    </Link>

                    {/* Main Navigation - Only show if logged in or public links */}
                    <ul className="hidden md:flex items-center space-x-6">
                        <li>
                            <Link href="/" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors">Home</Link>
                        </li>
                        <li>
                            <Link href="/about" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors">About</Link>
                        </li>
                    </ul>
                </div>

                {/* Right Actions */}
                <div className="flex items-center space-x-6">
                    {user ? (
                        <div className="hidden lg:flex items-center space-x-6">
                            <Link href="/currency" className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors">Currency Meter</Link>
                            <Link href="/currencytracker" className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors">Time TrackerFx</Link>
                            <button
                                onClick={logoutUser}
                                className="flex items-center space-x-2 text-xs font-bold bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                <LogOut size={14} />
                                <span>Logout</span>
                            </button>
                        </div>
                    ) : (
                        <div className="hidden lg:flex items-center space-x-4">
                            <Link href="/login" className="text-sm font-semibold text-slate-700 dark:text-white hover:text-blue-600 transition-colors">Login</Link>
                            <Link href="/signup" className="text-sm font-bold bg-blue-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-blue-700 hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5">
                                Sign Up
                            </Link>
                        </div>
                    )}

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Toggle Dark Mode"
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </motion.button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
