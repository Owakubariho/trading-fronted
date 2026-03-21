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

function Indices() {
  const [currencies,  setCurrencies] = useState([]);
  useEffect(() => {
      fetchCurrencies();
    }, []);
    
    const fetchCurrencies = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/indices/');
            const data = await response.json();
            setCurrencies(data);
            console.log(data);  // For debugging
          
          
          } catch (err) {
            console.log(err);
          }
        }
   
    
    return (
      <div className=" min-h-screen">
        <div className='bg-gradient-to-r from-teal-400 to-blue-500 max-w-96 p-2 rounded-md '> 
      <p className='text-neutral-800  uppercase text-xl'>
          
          Indices meter based on the <strong> 15 week rate of change </strong>
        </p>
      </div>
        <div className="max-w-4xl w-full p-6 bg-white shadow-md rounded-lg">
          <div className="mb-6">
           
          </div>
          <div className="relative h-96">
            <Bar
              data={{
                labels: currencies.map((data) => data.symbol),
                datasets: [
                  {
                    label: "Strength",
                    data: currencies.map((data) => data.strength),
                    backgroundColor: 'rgb(0, 0, 255)',
                    borderColor: 'rgb(0, 0, 255)',
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
                    text: "INDICES STRENGTH METER "
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

export default Indices
