import React from "react";
import { FaTwitter, FaWhatsapp, FaTelegram, FaInstagram } from "react-icons/fa"; // Import the necessary icons

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year
  return (
    <footer className="bg-gray-800 p-4 text-center text-white mt-4">
      &copy; {currentYear} Aslaph Fund Management. All rights reserved.
      <div className="flex justify-center space-x-4 mt-2">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
          <FaTwitter size={24} />
        </a>
        <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
          <FaWhatsapp size={24} />
        </a>
        <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
          <FaTelegram size={24} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
          <FaInstagram size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
