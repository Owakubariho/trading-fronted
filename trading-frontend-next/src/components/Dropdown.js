// src/components/Dropdown.js
import React, { useState } from "react";
import { Link } from "react-router";

const Dropdown = ({ label, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-2">
      <button
        className="w-full text-left py-2 px-4 bg-gray-300 rounded hover:bg-gray-400 dark:bg-slate-700 dark:text-gray-200 dark:hover:bg-slate-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
      </button>
      {isOpen && (
        <ul className="mt-2 bg-gray-200 rounded dark:bg-slate-800">
          {links.map((link) => (
            <li key={link.to} className="py-1 px-4 hover:bg-gray-300 dark:hover:bg-slate-700 transition-colors">
              <Link to={link.to} className="text-blue-500 hover:underline dark:text-blue-400">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
