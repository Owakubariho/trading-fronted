import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router';
const Commodities = () => {
    const [Copper, setCopper] = useState(0);
    const [Nickel, setNickel] = useState(0);
    const [Lead, setLead] = useState(0);
    const [Pallladium, setPallladium] = useState(0);
    const [platinum, setplatinum] = useState(0);
    const [Zinc, setZinc] = useState(0);
    const [Silver, setSilver] = useState(0);
    const [Gold, setGold] = useState(0);
    const [Aluminium, setAluminium] = useState(0);
    const [Usd, setUsd] = useState(0);

  
  
    
    
    const addcurrency = async (event) => {
      event.preventDefault();
  
      const currencyData = {
       
        Copper, 
        Nickel, 
    Aluminium, 
        platinum, 
        Lead, 
        Zinc,
        Silver,
        Pallladium,
        Gold, 
        Usd
        
      };
  
      console.log('Sending data:', currencyData);  // Log data for debugging
  
      try {
          const response = await fetch("http://127.0.0.1:8000/commodity1/create/", {
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
      
      <div>
        <h2> Commodities strength</h2>
      <Link to="/currencychart" className="text-blue-500 hover:underline text-xl">
        Currency meter chart
      </Link>
      
      
      
      
      </div>
      
    </div>
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Currency Strength Meter</h1>
      <form className="space-y-4" onSubmit={addcurrency}>
    <input
      type="number"
      step="0.01"
      placeholder="Copper..."
      onChange={(e) => setCopper(parseFloat(e.target.value))}
      className="border p-3 rounded w-full"
    />
    <input
      type="number"
      step="0.01"
      placeholder="Gold..."
      onChange={(e) => setGold(parseFloat(e.target.value))}
      className="border p-3 rounded w-full"
    />
    <input
      type="number"
      step="0.01"
      placeholder="Silver..."
      onChange={(e) => setSilver(parseFloat(e.target.value))}
      className="border p-3 rounded w-full"
    />
    <input
      type="number"
      step="0.01"
      placeholder="Plantinum..."
      onChange={(e) => setplatinum(parseFloat(e.target.value))}
      className="border p-3 rounded w-full"
    />
    <input
      type="number"
      step="0.01"
      placeholder="Lead..."
      onChange={(e) => setLead(parseFloat(e.target.value))}
      className="border p-3 rounded w-full"
    />
    <input
      type="number"
      step="0.01"
      placeholder="Nickel..."
      onChange={(e) => setNickel(parseFloat(e.target.value))}
      className="border p-3 rounded w-full"
    />
    <input
      type="number"
      step="0.01"
      placeholder="Palladium..."
      onChange={(e) => setPallladium(parseFloat(e.target.value))}
      className="border p-3 rounded w-full"
    />
    <input
      type="number"
      step="0.01"
      placeholder="Aluminium..."
      onChange={(e) => setAluminium(parseFloat(e.target.value))}
      className="border p-3 rounded w-full"
    />
    <input
      type="number"
      step="0.01"
      placeholder="Zinc..."
      onChange={(e) => setZinc(parseFloat(e.target.value))}
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
      Add Commodities
    </button>
  </form>
  
    </div>
  </div>
  
      
  
       
      </>
    );
}

export default Commodities
