// src/components/Dropdown.js
import React, { useState } from "react";
import {  Link} from "react-router";

const Dropdown = ({ label, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-2">
      <button
        className="w-full text-left py-2 px-4 bg-gray-300 rounded hover:bg-gray-400"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
      </button>
      {isOpen && (
        <ul className="mt-2 bg-gray-200 rounded">
          {links.map((link) => (
            <li key={link.to} className="py-1 px-4 hover:bg-gray-300">
              <Link to={link.to} className="text-blue-500 hover:underline">
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
