import React, { useEffect, useState } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar,Line } from "react-chartjs-2";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export const Nat3 = () => {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    getStock();  // fetch data when component mounts
  }, []);

  // function to fetch data from API
  const getStock = async () => {
    const response = await fetch('http://127.0.0.1:8000/Nat/');
    const data = await response.json();
    console.log(data);  // logging the fetched data to console for testing

    // Sort the data by date in descending order and then slice the latest 10 entries
    const sortedData = data.sort((a, b) => new Date(b.Date) - new Date(a.Date));
    const latestData = sortedData.slice(0, 70);

    setStock(latestData);
  }
  // flex flex-col items-center justify-center  bg-gray-100

  return (
    <div className=" min-h-screen">
      <p> hello</p>
      <div className="max-w-4xl w-full p-6 bg-white shadow-md rounded-lg">
        <div className="mb-6">
         
        </div>
        <div className="relative h-96">
          <Line
            data={{
              labels: stock.map((data) => data.Date),
              datasets: [
                {
                  label: "NoncommNet",
                  data: stock.map((data) => data.SpecDiff),
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
                  text:"NAT GAS ICE LD1 - ICE FUTURES ENERGY DIV",
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

export default Nat3;