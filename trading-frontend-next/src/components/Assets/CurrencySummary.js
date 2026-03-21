import React, { useState, useEffect } from 'react';

const CurrencySummary = () => {
  const [finalScores, setFinalScores] = useState([]);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/currencies/');
      const data = await response.json();
      computeFinalScores(data);
    } catch (err) {
      console.log(err);
    }
  };

  const computeFinalScores = (data) => {
    const currencies = Object.keys(data[0]).filter(key => key !== 'date');
    const finalScores = {};

    currencies.forEach(currency => {
      const posCount = data.reduce((count, record) => count + (record[currency] > 0 ? 1 : 0), 0);
      const negCount = data.reduce((count, record) => count + (record[currency] < 0 ? 1 : 0), 0);
      finalScores[currency] = posCount - negCount;
    });

    const sortedFinalScores = Object.entries(finalScores)
      .sort(([, a], [, b]) => b - a)
      .map(([currency, score], index) => ({
        currency,
        score,
        bias: index < 4 ? 'bullish' : 'bearish'
      }));

    setFinalScores(sortedFinalScores);
  };

  const getBackgroundColor = (index) => {
    if (index === 0) return 'bg-blue-500';
    if (index === 1) return 'bg-blue-400';
    if (index === 2) return 'bg-blue-300';
    if (index === finalScores.length - 1) return 'bg-red-500';
    if (index === finalScores.length - 2) return 'bg-red-400';
    if (index === finalScores.length - 3) return 'bg-red-300';
    return '';
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Currency strength Scoring system</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Currency</th>
            <th className="py-2 px-4 border-b">Score</th>
            <th className="py-2 px-4 border-b">Bias</th>
          </tr>
        </thead>
        <tbody>
          {finalScores.map((item, index) => (
            <tr key={index} className={`hover:bg-gray-100 ${getBackgroundColor(index)}`}>
              <td className="py-2 px-4 border-b">{item.currency}</td>
              <td className="py-2 px-4 border-b">{item.score}</td>
              <td className="py-2 px-4 border-b">{item.bias}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencySummary;