import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

const Usd = () => {
  const [currencies, setCurrencies] = useState([]);
  const [itemAtIndexSix, setItemAtIndexSix] = useState(null);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/datavital2/');
      const data = await response.json();
      setCurrencies(data);
      console.log(data); 

      // Grab the item at index six
      if (data.length > 6) {
        setItemAtIndexSix(data[6]);
      } else {
        console.log('Array does not have an item at index six.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Normalize values for the chart
  const normalizeValues = (values) => {
    const maxValue = Math.max(...values.map(value => parseFloat(value)));
    return values.map(value => parseFloat(value) / maxValue);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">USD Data</h1>
      <table className="min-w-full bg-white border border-gray-300 mb-8 shadow-lg rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border-b">Indicator</th>
            <th className="px-4 py-2 border-b">AUD</th>
            <th className="px-4 py-2 border-b">CAD</th>
            <th className="px-4 py-2 border-b">CHF</th>
            <th className="px-4 py-2 border-b">EUR</th>
            <th className="px-4 py-2 border-b">GBP</th>
            <th className="px-4 py-2 border-b">JPY</th>
            <th className="px-4 py-2 border-b">NZD</th>
            <th className="px-4 py-2 border-b">USD</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map((currency, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b">{currency.indicator}</td>
              <td className="px-4 py-2 border-b">{currency.AUD}</td>
              <td className="px-4 py-2 border-b">{currency.CAD}</td>
              <td className="px-4 py-2 border-b">{currency.CHF}</td>
              <td className="px-4 py-2 border-b">{currency.EUR}</td>
              <td className="px-4 py-2 border-b">{currency.GBP}</td>
              <td className="px-4 py-2 border-b">{currency.JPY}</td>
              <td className="px-4 py-2 border-b">{currency.NZD}</td>
              <td className="px-4 py-2 border-b">{currency.USD}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Another div container for item at index six */}
      {itemAtIndexSix && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">Summation of Key Fundamental Data</h2>
          <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border-b">Indicator</th>
                <th className="px-4 py-2 border-b">AUD</th>
                <th className="px-4 py-2 border-b">CAD</th>
                <th className="px-4 py-2 border-b">CHF</th>
                <th className="px-4 py-2 border-b">EUR</th>
                <th className="px-4 py-2 border-b">GBP</th>
                <th className="px-4 py-2 border-b">JPY</th>
                <th className="px-4 py-2 border-b">NZD</th>
                <th className="px-4 py-2 border-b">USD</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">{itemAtIndexSix.indicator}</td>
                <td className="px-4 py-2 border-b">{itemAtIndexSix.AUD}</td>
                <td className="px-4 py-2 border-b">{itemAtIndexSix.CAD}</td>
                <td className="px-4 py-2 border-b">{itemAtIndexSix.CHF}</td>
                <td className="px-4 py-2 border-b">{itemAtIndexSix.EUR}</td>
                <td className="px-4 py-2 border-b">{itemAtIndexSix.GBP}</td>
                <td className="px-4 py-2 border-b">{itemAtIndexSix.JPY}</td>
                <td className="px-4 py-2 border-b">{itemAtIndexSix.NZD}</td>
                <td className="px-4 py-2 border-b">{itemAtIndexSix.USD}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {/* Bar chart */}
      {itemAtIndexSix && (
        <div className="relative h-96 mb-8">
          <Bar
            data={{
              labels: ['AUD', 'CAD', 'CHF', 'EUR', 'GBP', 'JPY', 'NZD', 'USD'],
              datasets: [
                {
                  label: "Currency Values",
                  data: normalizeValues([
                    itemAtIndexSix.AUD,
                    itemAtIndexSix.CAD,
                    itemAtIndexSix.CHF,
                    itemAtIndexSix.EUR,
                    itemAtIndexSix.GBP,
                    itemAtIndexSix.JPY,
                    itemAtIndexSix.NZD,
                    itemAtIndexSix.USD
                  ]),
                  backgroundColor: [
                    'rgb(0, 0, 255)',
                    'rgba(0, 255, 255, 0.7)',
                    'rgba(0, 255, 0)',
                    'rgba(255, 255, 0)',
                    'rgba(0, 0, 0, 0.7)',
                    'rgba(255, 0, 0)',
                    'rgba(255, 0, 255, 0.7)',
                    'rgba(192, 192, 192, 0.7)'
                  ],
                  borderColor: [
                    'rgb(0, 0, 255)',
                    'rgba(0, 255, 255, 0.7)',
                    'rgba(0, 255, 0)',
                    'rgba(255, 255, 0)',
                    'rgba(0, 0, 0, 0.7)',
                    'rgba(255, 0, 0)',
                    'rgba(255, 0, 255, 0.7)',
                    'rgba(192, 192, 192, 0.7)'
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              elements: {
                line: {
                  tension: 0.5,
                },
              },
              plugins: {
                title: {
                  text: "CURRENCY STRENGTH METER (ALL MAJOR CURRENCIES)",
                  display: true,
                },
              },
              scales: {
                
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Usd;