import React from 'react'
import { useEffect, useState } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import {  Link} from "react-router";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

function Currencymeterchart() {
  const [currencies,  setCurrencies] = useState([]);
  useEffect(() => {
      fetchCurrencies();
    }, []);
    
    const fetchCurrencies = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/currencies/');
            const data = await response.json();
            setCurrencies(data);
            console.log(data);  // For debugging
          
            if (data.length > 0) {
                setCurrencies([data[data.length - 1]]);
            }
          } catch (err) {
            console.log(err);
          }
        }
   
    
    return (
      <div className=" min-h-screen">
        <div className='bg-gradient-to-r from-teal-400 to-blue-500 max-w-96 p-2 rounded-md '> 
      <p className='text-neutral-800  uppercase text-xl'>
          
          Currency meter based on the <strong> 15 week rate of change </strong>
        </p>
      </div>
        <div className="max-w-4xl w-full p-6 bg-white shadow-md rounded-lg">
          <div className="mb-6">
           
          </div>
          <div className="relative h-96">
            <Bar
              data={{
                labels: currencies.map((data) => data.date),
                datasets: [
                  {
                    label: "Aud",
                    data: currencies.map((data) => data.Aud),
                    backgroundColor: 'rgb(0, 0, 255)',
                    borderColor: 'rgb(0, 0, 255)',
                  },
                  {
                    label: "Eur",
                    data: currencies.map((data) => data.Eur),
                    backgroundColor: 'rgba(255, 255, 0)',
                    borderColor: 'rgba(255, 255, 0)',
                  },
                  {
                    label: "Jpy",
                    data: currencies.map((data) => data.Jpy),
                    backgroundColor: 'rgba(255, 0, 0)',
                    borderColor: 'rgba(255, 0, 0)',
                  },
                  {
                    label: "Gbp",
                    data: currencies.map((data) => data.Gbp),
                    backgroundColor: 'rgba(0, 0, 255, 0.7)',
                    borderColor: 'rgba(0, 0, 255, 0.7)',
                  },
                  {
                    label: "Chf",
                    data: currencies.map((data) => data.Chf),
                    backgroundColor: 'rgba(0, 255, 0)',
                    borderColor: 'rgba(0, 255, 0)',
                  },
                  {
                    label: "Cad",
                    data: currencies.map((data) => data.Cad),
                    backgroundColor: 'rgba(0, 255, 255, 0.7)',
                    borderColor: 'rgba(0, 255, 255, 0.7)',
                  },
                  {
                    label: "Nzd",
                    data: currencies.map((data) => data.Nzd),
                    backgroundColor: 'rgba(255, 0, 255, 0.7)',
                    borderColor: 'rgba(255, 0, 255, 0.7)',
                  },
                  {
                    label: "Usd",
                    data: currencies.map((data) => data.Usd),
                    backgroundColor: 'rgba(192, 192, 192, 0.7)',
                    borderColor: 'rgba(192, 192, 192, 0.7)',
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
                    text: "CURRENCY STRENGTH METER ( ALL MAJOR CURRENCIES)"
                  },
                },
                scales: {
                  x: {
                    reverse: true,
                  },
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>
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
      </div>
    );
  };

export default Currencymeterchart
