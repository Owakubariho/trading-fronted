import React, { useEffect, useState } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

function Cotindexchart13() {
  const [stock, setStock] = useState([]);
  const[stock1, setStock1] = useState([]);
  const[stock2, setStock2] = useState([]);
  
    useEffect(() => {
      getStock();  // fetch data when component mounts
    }, []);
    useEffect(() => {
        getStock1();  // fetch data when component mounts
      }, []);
      useEffect(() => {
        getStock2();  // fetch data when component mounts
      }, []);
    // function to fetch data from API
    const getStock = async () => {
      const response = await fetch('http://127.0.0.1:8000/cotindex13/');
      const data = await response.json();
      console.log(data);  // logging the fetched data to console for testing
  
      
      setStock1(data);
    }
    const getStock1 = async () => {
        const response = await fetch('http://127.0.0.1:8000/cotindex26/');
        const data = await response.json();
        console.log(data);  // logging the fetched data to console for testing
    
        
        setStock(data);
      }
      const getStock2 = async () => {
        const response = await fetch('http://127.0.0.1:8000/cotindex52/');
        const data = await response.json();
        console.log(data);  // logging the fetched data to console for testing
    
        
        setStock2(data);
      }
    // flex flex-col items-center justify-center  bg-gray-100
  
    return (
      <div className=" min-h-screen">
        <div className="p-8 bg-gray-50 rounded-lg shadow-lg mb-6">
  

  

  <h3 className="text-xl font-semibold mb-2 text-blue-600">Aslaph&apos;s Contrarian Strategy</h3>
  <p className="text-lg mb-4">
    Aslaph’s approach involves analyzing the COT Index to identify extremes in market positioning:
  </p>
  <ul className="list-disc list-inside text-lg mb-4">
    <li>When large speculators are extremely net short, it might indicate a potential <strong>buying opportunity</strong> as the market may reverse.</li>
    <li>When large speculators are extremely net long, it might indicate a potential <strong>selling opportunity</strong> as the market may be overbought and due for a correction.</li>
  </ul>
  <p className="text-lg mb-4">
    Aslaph emphasizes the importance of patience and risk management. By taking positions opposite to the majority, traders can potentially benefit from market reversals.
  </p>
 
</div>
        <div className="max-w-4xl w-full p-6 bg-white shadow-md rounded-lg">
          <div className="mb-6">
           
          </div>
          <div className="relative h-96">
            <Bar
              data={{
                labels: stock.map((data) => data.Asset),
                datasets: [
                  {
                    label: "CommercialWilliamsIndex",
                    data: stock.map((data) => data.CommercialWilliamsIndex),
                    backgroundColor: 'rgb(0, 0, 255)',
                    borderColor: 'rgb(0, 0, 255)',
                  },
                  {
                    label: "NonCommercialWilliamsIndex",
                    data: stock.map((data) => data.NonCommercialWilliamsIndex),
                    backgroundColor: 'rgba(255, 0, 0)',
                    borderColor: 'rgba(255, 0, 0)',
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
                    text: " commitment of traders index (13 weeks)",
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
          <div className="relative h-96">
            <Bar
              data={{
                labels: stock1.map((data) => data.Asset),
                datasets: [
                  {
                    label: "CommercialWilliamsIndex",
                    data: stock1.map((data) => data.CommercialWilliamsIndex),
                    backgroundColor: 'rgb(0, 0, 255)',
                    borderColor: 'rgb(0, 0, 255)',
                  },
                  {
                    label: "NonCommercialWilliamsIndex",
                    data: stock1.map((data) => data.NonCommercialWilliamsIndex),
                    backgroundColor: 'rgba(255, 0, 0)',
                    borderColor: 'rgba(255, 0, 0)',
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
                    text: " commitment of traders index(26 weeks)",
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
          <div className="relative h-96">
            <Bar
              data={{
                labels: stock2.map((data) => data.Asset),
                datasets: [
                  {
                    label: "CommercialWilliamsIndex",
                    data: stock2.map((data) => data.CommercialWilliamsIndex),
                    backgroundColor: 'rgb(0, 0, 255)',
                    borderColor: 'rgb(0, 0, 255)',
                  },
                  {
                    label: "NonCommercialWilliamsIndex",
                    data: stock2.map((data) => data.NonCommercialWilliamsIndex),
                    backgroundColor: 'rgba(255, 0, 0)',
                    borderColor: 'rgba(255, 0, 0)',
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
                    text: " commitment of traders index (52 weeks)",
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
        </div>
      </div>
    );
  };
  
export default Cotindexchart13
