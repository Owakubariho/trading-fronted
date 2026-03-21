import React from 'react';
import { Link } from 'react-router';

const Analysis = () => {
  return (
    <div className="p-8 grid grid-cols-3 bg-gray-100 text-gray-800">
      <div className=''>
      <div className="mb-4">
        <Link to="/currency-4" className="hover:underline block mb-2">Stock Trend Tools</Link>
      </div>
      <div className="mb-4">
        <Link to="/currency-1" className="hover:underline block mb-2">Methodologies & strategies</Link>
      </div>
      <div className="mb-4">
        <Link to="/currency-2" className="hover:underline block mb-2">Lessons</Link>
      </div>
      <div className="mb-4">
        <Link to="/lesson" className="hover:underline block mb-2">Mental toughness</Link>
      </div>
      <div className="mb-4">
        <Link to="/math" className="hover:underline block mb-2">Mind blowing math</Link>
      </div>
      <div className="mb-4">
        <Link to="/routine" className="hover:underline block mb-2">Trading Routine</Link>
      </div>
      <div className="mb-4">
        <Link to="/aud32" className="hover:underline block mb-2">currency- fundermentals</Link>
      </div>
      <div className="mb-4">
        <Link to="/aud34" className="hover:underline block mb-2">currency-fundermentals2</Link>
      </div>
      <div className="mb-4">
        <Link to="/currency-55" className="hover:underline block mb-2">Stock analysis upload</Link>
      </div>
      <div className="mb-4">
        <Link to="/currency-45" className="hover:underline block mb-2">currency analysis upload</Link>
      </div>

      </div>
      <div>
      <div className="mb-4">
        <Link to="/crypto" className="hover:underline block mb-2">Crypto strength meter</Link>
      </div>
      <div className="mb-4">
        <Link to="/commodities" className="hover:underline block mb-2">Commodities strength meter</Link>
      </div>
      <div className="mb-4">
        <Link to="/indices" className="hover:underline block mb-2">Indices strength meter</Link>
      </div>
      </div>
      
     
      
    </div>
  )
}

export default Analysis;
