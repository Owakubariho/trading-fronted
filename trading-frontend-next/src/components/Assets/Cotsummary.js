import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ChartDataLabels);

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = 'start';
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = 'black';

const Cotsummary = () => {
  const [currencies, setCurrencies] = useState([]);
  const [table, setTable] = useState([]);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/cotsummary1/');
      const data = await response.json();
      // Sort data by 'Short_Percentage' values in descending order
      data.sort((a, b) => b.Short_Percentage - a.Short_Percentage);
      setCurrencies(data);
    //   sort data by 'Long_Percentage' values in descending order
    data.sort((a, b) => b.Long_Percentage - a.Long_Percentage);
      setTable(data);
    } 
    catch (err) {
      console.log(err);
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
      <div className="relative h-96">
        <Bar
          data={{
            labels: currencies.map((data) => data.Name),
            datasets: [
              {
                label: 'Buy',
                data: currencies.map((data) => data.Long_Percentage),
                backgroundColor: 'rgb(0, 0, 255)',
                borderColor: 'rgb(0, 0, 255)',
              },
              {
                label: 'Sell',
                data: currencies.map((data) => data.Short_Percentage),
                backgroundColor: 'rgb(255, 0, 0)',
                borderColor: 'rgb(255, 0, 0)',
              },
            ],
          }}
          options={{
            elements: {
              bar: {
                borderWidth: 2,
              },
            },
            plugins: {
              title: {
                display: true,
                text: 'Cot smart money Analysis',
              },
              tooltip: {
                mode: 'index',
                intersect: false,
              },
              legend: {
                position: 'top',
              },
              datalabels: {
                color: 'white',
                anchor: 'end',
                align: 'start',
                formatter: (value) => `${value.toFixed(1)}%`,
              },
            },
            responsive: true,
            scales: {
              x: {
                stacked: true,
                beginAtZero: true,
              },
              y: {
                stacked: true,
              },
            },
          }}
        />
      </div>
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Latest Weekly COT Filling</h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Long Contracts</th>
              <th className="py-2 px-4 border-b">Short Contracts</th>
              <th className="py-2 px-4 border-b">Change Long</th>
              <th className="py-2 px-4 border-b">Change Short</th>
              <th className="py-2 px-4 border-b">Long Percentage</th>
              <th className="py-2 px-4 border-b">Short Percentage</th>
            </tr>
          </thead>
          <tbody>
            {table.map((data, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className={`py-2 px-4 border-b ${getBackgroundColor(index, 'name')}`}>{data.Name}</td>
                <td className={`py-2 px-4 border-b ${getBackgroundColor(index, 'date')}`}>{data.Date}</td>
                <td className={`py-2 px-4 border-b ${getBackgroundColor(index, 'long')}`}>{data.Long_Contracts}</td>
                <td className={`py-2 px-4 border-b ${getBackgroundColor(index, 'short')}`}>{data.Short_Contracts}</td>
                <td className="py-2 px-4 border-b">{data.Change_Long}</td>
                <td className="py-2 px-4 border-b">{data.Change_Short}</td>
                <td className={`py-2 px-4 border-b ${getBackgroundColor(index, 'longPercentage')}`}>{data.Long_Percentage}%</td>
                <td className={`py-2 px-4 border-b ${getBackgroundColor(index, 'shortPercentage')}`}>{data.Short_Percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cotsummary;