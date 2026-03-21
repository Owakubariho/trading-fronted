"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DropdownProps {
    label: string;
    links: { label: string; to: string }[];
}

const Dropdown: React.FC<DropdownProps> = ({ label, links }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-2">
            <button
                className="w-full flex items-center justify-between text-left py-2 px-4 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-200 text-sm font-medium text-gray-700 dark:text-gray-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{label}</span>
                {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <ul className="mt-1 ml-2 border-l-2 border-gray-200 dark:border-slate-700 pl-2 space-y-1">
                            {links.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        href={link.to}
                                        className="block py-1.5 px-3 rounded-md text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dropdown;
