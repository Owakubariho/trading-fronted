// src/components/Navbar.js
import React from "react";
import {  Link} from "react-router";



const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 fixed w-full top-0 z-10">
     
      <div className="flex items-center justify-between">
        {/* logo text */}
       
    
      <ul className="flex space-x-4 ml-0">
        
        <li>
        <h1 className="text-xs font-bold tracking-tight text-white"> ASLAPH MANAGEMENT <br/>(STOCKS AND FOREX)</h1>
        </li>
        <li>
          <Link to="/" className="text-white hover:underline">Home</Link>
        </li>
        <li>
          <Link to="/about" className="text-white hover:underline">About</Link>
        </li>
        <li>
          <Link to="/contact" className="text-white hover:underline">Contact</Link>

        </li>
        <li>
          <Link to="/analysis" className="text-white hover:underline">  Extreme Analysis</Link>
        </li>
       
        

        </ul>
        <div className="flex items-center space-x-4">
        <Link to="/currency" className="text-white hover:underline">Currency meter </Link>
        <Link to="/currencytracker" className="text-white hover:underline">Time trackerFx </Link>
        <Link to="/fundermental" className="text-white hover:underline">Earnings</Link>
        




        </div>

      </div>
      
        
      
    </nav>
  );
};

export default Navbar;
