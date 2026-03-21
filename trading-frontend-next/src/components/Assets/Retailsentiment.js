import React, { useEffect, useState } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ChartDataLabels);

const Retailsentiment = () => {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/retail1/');
      const data = await response.json();
      // Sort data by 'buy' values in descending order
      data.sort((a, b) => b.buy - a.buy);
      setCurrencies(data);
      console.log(data); // For debugging
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="relative h-96">
        <Bar
          data={{
            labels: currencies.map((data) => data.symbol),
            datasets: [
              {
                label: 'Buy',
                data: currencies.map((data) => data.buy),
                backgroundColor: 'rgb(0, 0, 255)',
                borderColor: 'rgb(0, 0, 255)',
              },
              {
                label: 'Sell',
                data: currencies.map((data) => data.sell),
                backgroundColor: 'rgb(255, 0, 0)',
                borderColor: 'rgb(255, 0, 0)',
              },
            ],
          }}
          options={{
            indexAxis: 'y', // This makes the chart horizontal
            elements: {
              bar: {
                borderWidth: 2,
              },
            },
            plugins: {
              title: {
                display: true,
                text: 'Retail Sentiment Analysis',
              },
              tooltip: {
                mode: 'index',
                intersect: false,
              },
              legend: {
                position: 'top',
              },
              datalabels: {
                display: true, // Enable data labels for this chart only
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
    </div>
  );
};

export default Retailsentiment;