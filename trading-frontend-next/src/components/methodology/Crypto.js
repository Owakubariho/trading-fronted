import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router';
const Crypto = () => {
    const [Btc, setBtc] = useState(0);
    const [Ether, setEther] = useState(0);
     const [Usd, setUsd] = useState(0);
  
  
    
    
    const addcurrency = async (event) => {
      event.preventDefault();
  
      const currencyData = {
        Btc, 
        Ether, 
        Usd
        
      };
  
      console.log('Sending data:', currencyData);  // Log data for debugging
  
      try {
          const response = await fetch("http://127.0.0.1:8000/crypto1/create/", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(currencyData)
          });
  
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
      } catch (err) {
          console.log(err);
      }
  };
  
  return (
      <>
      <div className="  bg-gray-100 py-10 px-6">
    <div className="flex   py-10 px-6">
      <div className="flex flex-col  py-10 px-6">
        <h2> Crypto strength meter</h2>
      <Link to="/crypto" className="text-blue-500 hover:underline text-xl">
        Crypto meter chart
      </Link>
      
      </div>
      
      
      
    </div>
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Crypto Strength Meter</h1>
      <form className="space-y-4" onSubmit={addcurrency}>
    <input
      type="number"
      step="0.01"
      placeholder="Btc..."
      onChange={(e) => setBtc(parseFloat(e.target.value))}
      className="border p-3 rounded w-full"
    />
    <input
      type="number"
      step="0.01"
      placeholder="Ether..."
      onChange={(e) => setEther(parseFloat(e.target.value))}
      className="border p-3 rounded w-full"
    />
    
    <input
      type="number"
      step="0.01"
      placeholder="USD..."
      onChange={(e) => setUsd(parseFloat(e.target.value))}
      className="border p-3 rounded w-full"
    />
    <button type="submit" className="bg-blue-500 text-white p-3 rounded w-full hover:bg-blue-600">
      Add Crypto
    </button>
  </form>
  
    </div>
  </div>
  
      
  
       
      </>
    );
}

export default Crypto
