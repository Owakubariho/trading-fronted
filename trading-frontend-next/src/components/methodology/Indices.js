import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router';
const Indices = () => {
    const [Dxy, setDxy] = useState(0);
    const [France_40, setFrance_40] = useState(0);
    const [Jp_225, setJp_225] = useState(0);
    const [Eustocks_50, setEustocks_50] = useState(0);
    const [Uk_100, setUk_100] = useState(0);
    const [Us_30, setUs_30] = useState(0);
    const [Us500, setUs500] = useState(0);
    
  
  
    
    
    const addcurrency = async (event) => {
      event.preventDefault();
  
      const currencyData = {
        Dxy, 
        Uk_100, 
        Jp_225, 
        Us_30, 
        France_40, 
        Eustocks_50, 
        Us500, 
       
        
      };
  
      console.log('Sending data:', currencyData);  // Log data for debugging
  
      try {
          const response = await fetch("http://127.0.0.1:8000/indices1/create/", {
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
        <h2> Indices strength Meter</h2>
      <Link to="/currencychart" className="text-blue-500 hover:underline text-xl">
        Currency meter chart
      </Link>
      
      </div>
      
      
      
     
      
    </div>
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Indices Strength Meter</h1>
      <form className="space-y-4" onSubmit={addcurrency}>
    <input
      type="number"
      step="0.01"
      placeholder="Dxy..."
      onChange={(e) => setDxy(parseFloat(e.target.value))}
      className="border p-3 rounded w-full"
    />
    <input
      type="number"
      step="0.01"
      placeholder="Jp225..."
      onChange={(e) => setJp_225(parseFloat(e.target.value))}
      className="border p-3 rounded w-full"
    />
    <input
      type="number"
      step="0.01"
      placeholder="Uk_100..."
      onChange={(e) => setUk_100(parseFloat(e.target.value))}
      className="border p-3 rounded w-full"
    />
    <input
      type="number"
      step="0.01"
      placeholder="Us_30..."
      onChange={(e) => setUs_30(parseFloat(e.target.value))}
      className="border p-3 rounded w-full"
    />
    <input
      type="number"
      step="0.01"
      placeholder="France_40..."
      onChange={(e) => setFrance_40(parseFloat(e.target.value))}
      className="border p-3 rounded w-full"
    />
    <input
      type="number"
      step="0.01"
      placeholder="Eustocks..."
      onChange={(e) => setEustocks_50(parseFloat(e.target.value))}
      className="border p-3 rounded w-full"
    />
    <input
      type="number"
      step="0.01"
      placeholder="US500..."
      onChange={(e) => setUs500(parseFloat(e.target.value))}
      className="border p-3 rounded w-full"
    />
    
    <button type="submit" className="bg-blue-500 text-white p-3 rounded w-full hover:bg-blue-600">
      Add Indices
    </button>
  </form>
  
    </div>
  </div>
  
      
  
       
      </>
    );
}

export default Indices
