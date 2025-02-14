import { useState } from "react";
import 'tailwindcss/tailwind.css';

import {  Link} from "react-router";

function Form() {
 
  const [Aud, setAud] = useState(0);
  const [Eur, setEur] = useState(0);
  const [Chf, setChf] = useState(0);
  const [Cad, setCad] = useState(0);
  const [Gbp, setGbp] = useState(0);
  const [Nzd, setNzd] = useState(0);
  const [Jpy, setJpy] = useState(0);
  const [Usd, setUsd] = useState(0);


  
  
  const addcurrency = async (event) => {
    event.preventDefault();

    const currencyData = {
      Aud, 
      Eur, 
      Chf, 
      Cad, 
      Gbp, 
      Nzd, 
      Jpy, 
      Usd
      
    };

    console.log('Sending data:', currencyData);  // Log data for debugging

    try {
        const response = await fetch("http://127.0.0.1:8000/currencies/create/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(currencyData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // const data = await response.json();
        // setCurrencies((prev) => [...prev, data]);
        // // Reset form fields to 0
        // setAud(0);
        // setEur(0);
        // setChf(0);
        // setCad(0);
        // setGbp(0);
        // setNzd(0);
        // setJpy(0);
        // setUsd(0);

    } catch (err) {
        console.log(err);
    }
};

return (
    <>
    <div className="flex flex-col  bg-gray-100 py-10 px-6">
  <div className="flex flex-col  py-10 px-6">
    <Link to="/currencychart" className="text-blue-500 hover:underline text-xl">
      Currency meter chart
    </Link>
    <Link to="/currencylinechart" className="text-blue-500 hover:underline text-xl">
      Currency meter line chart
    </Link>
    <Link to="/currencytable" className="text-blue-500 hover:underline text-xl">
      Currency meter table
    </Link>
  </div>
  <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
    <h1 className="text-4xl font-bold mb-6 text-center">Currency Strength Meter</h1>
    <form className="space-y-4" onSubmit={addcurrency}>
  <input
    type="number"
    step="0.01"
    placeholder="AUD..."
    onChange={(e) => setAud(parseFloat(e.target.value))}
    className="border p-3 rounded w-full"
  />
  <input
    type="number"
    step="0.01"
    placeholder="EUR..."
    onChange={(e) => setEur(parseFloat(e.target.value))}
    className="border p-3 rounded w-full"
  />
  <input
    type="number"
    step="0.01"
    placeholder="CHF..."
    onChange={(e) => setChf(parseFloat(e.target.value))}
    className="border p-3 rounded w-full"
  />
  <input
    type="number"
    step="0.01"
    placeholder="CAD..."
    onChange={(e) => setCad(parseFloat(e.target.value))}
    className="border p-3 rounded w-full"
  />
  <input
    type="number"
    step="0.01"
    placeholder="GBP..."
    onChange={(e) => setGbp(parseFloat(e.target.value))}
    className="border p-3 rounded w-full"
  />
  <input
    type="number"
    step="0.01"
    placeholder="NZD..."
    onChange={(e) => setNzd(parseFloat(e.target.value))}
    className="border p-3 rounded w-full"
  />
  <input
    type="number"
    step="0.01"
    placeholder="JPY..."
    onChange={(e) => setJpy(parseFloat(e.target.value))}
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
    Add Currencies
  </button>
</form>

  </div>
</div>

    

     
    </>
  );
}

export default Form;
