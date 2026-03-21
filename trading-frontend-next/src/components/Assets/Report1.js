import React, { useEffect, useState } from 'react';

const Report1 = () => {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/cotsummary2/');
      const data = await response.json();

      // Create another copy of the data to sort by 'NoncommNet_Pct_Change'
      const sortedByNetPctChange = [...data].sort((a, b) => b.NoncommNet_Pct_Change - a.NoncommNet_Pct_Change);
      setCurrencies(sortedByNetPctChange);
    } catch (err) {
      console.error('Error fetching currencies:', err);
    }
  };

  const getBackgroundColor = (index, type) => {
    if (type === 'name') {
      if (index === 0) return 'bg-blue-500';
      if (index === 1) return 'bg-blue-400';
      if (index === 2) return 'bg-blue-300';
      if (index === currencies.length - 1) return 'bg-red-500';
      if (index === currencies.length - 2) return 'bg-red-400';
      if (index === currencies.length - 3) return 'bg-red-300';
    } else if (type === 'long') {
      return index % 2 === 0 ? 'bg-blue-700' : 'bg-blue-500';
    } else if (type === 'short') {
      return index % 2 === 0 ? 'bg-red-700' : 'bg-red-500';
    } else if (type === 'longPercentage') {
      return 'bg-blue-200';
    } else if (type === 'shortPercentage') {
      return 'bg-red-200';
    }
    return '';
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Latest Weekly COT Filling</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-2 border-b">Name</th>
                <th className="py-2 px-2 border-b">Date</th>
                <th className="py-2 px-2 border-b">Long </th>
                <th className="py-2 px-2 border-b">Short </th>
                <th className="py-2 px-2 border-b">Change Long</th>
                <th className="py-2 px-2 border-b">Change Short</th>
                <th className="py-2 px-2 border-b">Long%</th>
                <th className="py-2 px-2 border-b">Short%</th>
                <th className="py-2 px-2 border-b">Spec %change</th>
                <th className="py-2 px-2 border-b">SpecNet</th>
              </tr>
            </thead>
            <tbody>
              {currencies.map((data, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className={`py-2 px-4 border-b ${getBackgroundColor(index, 'name')}`}>{data.Name}</td>
                  <td className={`py-2 px-4 border-b ${getBackgroundColor(index, 'date')}`}>{data.Date}</td>
                  <td className={`py-2 px-4 border-b ${getBackgroundColor(index, 'long')}`}>{data.Long_Contracts}</td>
                  <td className={`py-2 px-4 border-b ${getBackgroundColor(index, 'short')}`}>{data.Short_Contracts}</td>
                  <td className="py-2 px-4 border-b">{data.Change_Long}</td>
                  <td className="py-2 px-4 border-b">{data.Change_Short}</td>
                  <td className={`py-2 px-4 border-b ${getBackgroundColor(index, 'longPercentage')}`}>{data.Long_Percentage}%</td>
                  <td className={`py-2 px-4 border-b ${getBackgroundColor(index, 'shortPercentage')}`}>{data.Short_Percentage}%</td>
                  <td className="py-2 px-4 border-b">{data.NoncommNet_Pct_Change}</td>
                  <td className="py-2 px-4 border-b">{data.NoncommNet}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Report1;