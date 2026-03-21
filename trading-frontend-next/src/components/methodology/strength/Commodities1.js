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

function Commodities1() {
  const [currencies,  setCurrencies] = useState([]);
  useEffect(() => {
      fetchCurrencies();
    }, []);
    
    const fetchCurrencies = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/commodity/');
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
          
          Commodities strength meter based on the <strong> 15 week rate of change </strong>
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
                    label: "Copper",
                    data: currencies.map((data) => data.Copper),
                    backgroundColor: 'rgb(0, 0, 255)',
                    borderColor: 'rgb(0, 0, 255)',
                  },
                  {
                    label: "Nickel",
                    data: currencies.map((data) => data.Nickel),
                    backgroundColor: 'rgba(255, 255, 0)',
                    borderColor: 'rgba(255, 255, 0)',
                  },
                  {
                    label: "Lead",
                    data: currencies.map((data) => data.Lead),
                    backgroundColor: 'rgba(255, 0, 0)',
                    borderColor: 'rgba(255, 0, 0)',
                  },
                  {
                    label: "Pallladium",
                    data: currencies.map((data) => data.Pallladium),
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    borderColor: 'rgba(0, 0, 0, 0.7)',
                  },
                  {
                    label: "platinum",
                    data: currencies.map((data) => data.platinum),
                    backgroundColor: 'rgba(0, 255, 0)',
                    borderColor: 'rgba(0, 255, 0)',
                  },
                  {
                    label: "Zinc",
                    data: currencies.map((data) => data.Zinc),
                    backgroundColor: 'rgba(0, 255, 255, 0.7)',
                    borderColor: 'rgba(0, 255, 255, 0.7)',
                  },
                  {
                    label: "Silver",
                    data: currencies.map((data) => data.Silver),
                    backgroundColor: 'rgba(255, 0, 255, 0.7)',
                    borderColor: 'rgba(255, 0, 255, 0.7)',
                  },
                  {
                    label: "Gold",
                    data: currencies.map((data) => data.Gold),
                    backgroundColor: 'rgba(192, 192, 192, 0.7)',
                    borderColor: 'rgba(192, 192, 192, 0.7)',
                  },
                  {
                    label: "Aluminium",
                    data: currencies.map((data) => data.Aluminium),
                    backgroundColor: 'rgba(192, 127, 192, 0.7)',
                    borderColor: 'rgba(192, 192, 192, 0.7)',
                  },
                  
                  {
                    label: "Usd",
                    data: currencies.map((data) => data.Usd),
                    backgroundColor: 'rgba(192, 185, 192, 0.7)',
                    borderColor: 'rgba(192, 192, 192, 0.7)',
                  }
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
                    text: "COMMODITIES STRENGTH METER "
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
        
      </div>
    );
  };

export default Commodities1
