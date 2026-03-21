import React, { useEffect, useState } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export const Pa3 = () => {
  const [stock, setStock] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    getStock(); // fetch data when component mounts
    getIndex(); // fetch index data when component mounts
  }, []);

  // function to fetch data from API
  const getStock = async () => {
    const response = await fetch("http://127.0.0.1:8000/Pa/");
    const data = await response.json();
    console.log(data); // logging the fetched data to console for testing

    // Sort the data by date in descending order and then slice the latest 10 entries
    const sortedData = data.sort((a, b) => new Date(b.Date) - new Date(a.Date));
    const latestData = sortedData.slice(0, 70);

    setStock(latestData);
  };
  const getIndex = async () => {
    const response = await fetch("http://127.0.0.1:8000/cotindex13/");
    const data1 = await response.json();
    console.log(data1); // logging the fetched data to console for testing
    setData(data1);
  };
  const swissfrac = data.find((item) => item.Asset === "SWISS FRANC");
  console.log(swissfrac);
  // Output:
  // {
  //   Asset: "AUSTRALIAN DOLLAR",
  //   DATE: "2025-06-24",
  //   CommercialWilliamsIndex: "71.41",
  //   NonCommercialWilliamsIndex: "12.01"
  // }
  const commercialIndex = swissfrac?.CommercialWilliamsIndex;
  console.log(commercialIndex); // "71.41"
  const nonCommercialIndex = swissfrac?.NonCommercialWilliamsIndex;
  console.log(nonCommercialIndex); // "12.01"
  // flex flex-col items-center justify-center  bg-gray-100

  return (
    <div className=" min-h-screen">
      <div className="flex flex-col items-center justify-center bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-600">
          SWISS FRANC COT Index
        </h1>
        <div className="flex space-x-4">
          <div className="bg-blue-100 p-4 rounded shadow-md">
            <h2 className="text-lg font-semibold">Commercial Index</h2>
            <p className="text-xl">{commercialIndex}</p>
          </div>
          <div className="bg-green-100 p-4 rounded shadow-md">
            <h2 className="text-lg font-semibold">Non-Commercial Index</h2>
            <p className="text-xl">{nonCommercialIndex}</p>
          </div>
        </div>
      </div>
      <div className="max-w-4xl w-full p-6 bg-white shadow-md rounded-lg">
        <div className="mb-6"></div>
        <div className="relative h-96">
          <Line
            data={{
              labels: stock.map((data) => data.Date),
              datasets: [
                {
                  label: "NoncommNet",
                  data: stock.map((data) => data.SpecDiff),
                  backgroundColor: "rgb(0, 0, 255)",
                  borderColor: "rgb(0, 0, 255)",
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
                  text: "PALLADIUM - NEW YORK MERCANTILE EXCHANGE",
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

export default Pa3;
