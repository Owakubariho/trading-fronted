import React, { useEffect, useState } from 'react';

const Nzd = () => {
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('dataaud1');

  const data = [
    'dataaud1',
    'datacad',
    'datachf',
    'dataeur',
    'datagbp',
    'datajpy',
    'datanzd',
    'datausd',
  ];

  useEffect(() => {
    fetchCurrencies();
  }, [selectedCurrency]);

  const fetchCurrencies = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/${selectedCurrency}/`);
      const data = await response.json();
      setCurrencies(data);
      console.log(data);  // For debugging
    } catch (err) {
      console.log(err);
    }
  }



  return (
    <div className="p-4">
      
      <div className="mb-4">
        <label htmlFor="currency-select" className="block text-lg font-medium mb-2">Select Currency:</label>
        <select
          id="currency-select"
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md"
        >
          {data.map((key) => (
            <option key={key} value={key}>
              {key.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      <table className="min-w-full bg-white border border-gray-300 mb-8">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Indicator</th>
           
            <th className="px-4 py-2 border-b">Last</th>
            <th className="px-4 py-2 border-b">Months</th>
            <th className="px-4 py-2 border-b">percentage_or_points</th>
            <th className="px-4 py-2 border-b">Previous</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map((currency, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b">{currency.indicator}</td>
              
              <td className="px-4 py-2 border-b">{currency.Last}</td>
              <td className="px-4 py-2 border-b">{currency.Months}</td>
              <td className="px-4 py-2 border-b">{currency.percentage_or_points}</td>
              <td className="px-4 py-2 border-b">{currency.Previous}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Another div container for filtered information */}
      
    </div>
  );
}

export default Nzd;