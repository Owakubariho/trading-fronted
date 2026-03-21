import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import the dataLabels plugin
import Spy from "./Spy";

Chart.register(...registerables, ChartDataLabels);

const Stocksentiment = () => {
  const [sentimentData, setSentimentData] = useState([]); // State to store API data
  const barChartRef = useRef(null);
  const lineChartRef = useRef(null); // Ref for the Bullish-Bearish Difference line chart
  const bearishLineChartRef = useRef(null); // Ref for the Bearish line chart
  const bullishLineChartRef = useRef(null); // Ref for the Bullish line chart

  // Fetch data when the component mounts
  useEffect(() => {
    fetchSentimentData();
  }, []);

  const fetchSentimentData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/stocksentiment/");
      let data = await response.json();
      data = data.reverse(); // Reverse data to display the latest first
      setSentimentData(data);
      console.log(data); // For debugging
    } catch (error) {
      console.error("Error fetching sentiment data:", error);
    }
  };

  useEffect(() => {
    if (sentimentData.length > 0) {
      // Bar chart for Bullish, Neutral, and Bearish
      const combinedChart = new Chart(barChartRef.current, {
        type: "bar", // Keep the base chart type as bar
        data: {
          labels: sentimentData.map((item) => item.date), // Dates for x-axis
          datasets: [
            {
              label: "Bullish %",
              data: sentimentData.map((item) => item.bullish),
              backgroundColor: "blue",
              stack: "Sentiment",
              datalabels: {
                color: "white", // White data labels for bullish
                anchor: "down", // Position at the end of the bar
              align: "center",
              },
            },
            {
              label: "Neutral %",
              data: sentimentData.map((item) => item.neutral),
              backgroundColor: "white",
              stack: "Sentiment",
              datalabels: {
                color: "black", // Black data labels for neutral
                anchor: "down", // Position at the end of the bar
              align: "center",
              },
            },
            {
              label: "Bearish %",
              data: sentimentData.map((item) => item.bearish),
              backgroundColor: "red",
              stack: "Sentiment",
              datalabels: {
                color: "white", // White data labels for bearish
                anchor: "down", // Position at the end of the bar
              align: "center",
              },
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "top" },
            datalabels: {
              display: true, // Enable data labels
              font: {
                weight: "bold",
              },
            },
          },
          scales: {
            x: {
              stacked: true, // Stack bars on the x-axis
              ticks: {
                color: "white", // Set x-axis labels to white
              },
            },
            y: {
              stacked: true, // Stack bars on the y-axis
              beginAtZero: true,
              ticks: {
                color: "white", // Set x-axis labels to white
              },
            },
          },
        },
      });

      // Cleanup on component unmount
      return () => {
        combinedChart.destroy();
      };
    }
  }, [sentimentData]); // Dependency array ensures the chart updates when data changes

  useEffect(() => {
    if (sentimentData.length > 0) {
      // Line chart for Bullish-Bearish Difference
      const lineChart = new Chart(lineChartRef.current, {
        type: "line", // Line chart
        data: {
          labels: sentimentData.map((item) => item.date), // Dates for x-axis
          datasets: [
            {
              label: "Bullish-Bearish Difference %",
              data: sentimentData.map((item) => item.bullish - item.bearish),
              borderColor: "orange",
             
              fill: true,
              tension: 0.3,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "top" },
            datalabels: {
              display: true, // Enable data labels
              color: "yellow",
              anchor: "end", // Position slightly above
              align: "top",
              font: {
                weight: "bold",
              },
            },
          },
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                color: "white", // Set x-axis labels to white
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                color: "white", // Set y-axis labels to white
              },
            },
          },
        },
      });

      // Cleanup on component unmount
      return () => {
        lineChart.destroy();
      };
    }
  }, [sentimentData]); // Dependency array ensures the chart updates when data changes

  useEffect(() => {
    if (sentimentData.length > 0) {
      // Line chart for Bearish sentiment
      const bearishLineChart = new Chart(bearishLineChartRef.current, {
        type: "line",
        data: {
          labels: sentimentData.map((item) => item.date),
          datasets: [
            {
              label: "Bearish %",
              data: sentimentData.map((item) => item.bearish),
              borderColor: "red",
             
              fill: true,
              tension: 0.3,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "top" },
            datalabels: {
              display: true, // Enable data labels
              color: "red",
              anchor: "end", // Position slightly above
            align: "top",
              font: {
                weight: "bold",
              },
            }
          },
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                color: "white", // Set x-axis labels to white
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                color: "white", // Set y-axis labels to white
              },
            },
          },
        },
      });

      // Cleanup on component unmount
      return () => {
        bearishLineChart.destroy();
      };
    }
  }, [sentimentData]);

  useEffect(() => {
    if (sentimentData.length > 0) {
      // Line chart for Bullish sentiment
      const bullishLineChart = new Chart(bullishLineChartRef.current, {
        type: "line",
        data: {
          labels: sentimentData.map((item) => item.date),
          datasets: [
            {
              label: "Bullish %",
              data: sentimentData.map((item) => item.bullish),
              borderColor: "blue",
              
              fill: true,
              tension: 0.3,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "top" },
            datalabels: {
              display: true, // Enable data labels
              color: "blue",
              anchor: "end", // Position slightly above
            align: "top",
              font: {
                weight: "bold",
              },
            }
          },
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                color: "white", // Set x-axis labels to white
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                color: "white", // Set y-axis labels to white
              },
            },
          },
        },
      });

      // Cleanup on component unmount
      return () => {
        bullishLineChart.destroy();
      };
    }
  }, [sentimentData]);

  return (
    <div className="p-8 font-sans max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-600">AAII Sentiment Survey</h1>
      <p className="mb-6 text-gray-600">
        The American Association of Individual Investors (AAII) surveys individual investors
        and asks where they think the market will go in the next 6 months. This survey provides weekly data updated by Wednesday at 11:59 p.m. EST.OR 06:59 Am EAT
      </p>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {sentimentData.length > 0 && (
          <>
            <div className="bg-blue-500 p-4 rounded shadow">
              <h2 className="text-lg font-semibold text-white">
                Bullish: {sentimentData[sentimentData.length - 1].bullish}%
              </h2>
              <p className="text-gray-200">Change: {sentimentData[sentimentData.length - 1].bullish_change}%</p>
            </div>
            <div className="bg-gray-300 p-4 rounded shadow">
              <h2 className="text-lg font-semibold text-black">
                Neutral: {sentimentData[sentimentData.length - 1].neutral}%
              </h2>
              <p>Change: {sentimentData[sentimentData.length - 1].neutral_change}%</p>
            </div>
            <div className="bg-red-500 p-4 rounded shadow">
              <h2 className="text-lg font-semibold text-white">
                Bearish: {sentimentData[sentimentData.length - 1].bearish}%
              </h2>
              <p className="text-gray-200">Change: {sentimentData[sentimentData.length - 1].bearish_change}%</p>
            </div>
          </>
        )}
      </div>
      <h2 className="text-xl font-bold mb-4 text-gray-600">Weekly Sentiment Data</h2>
      <div className="mx-auto max-w-3xl h-96 bg-gray-800">
        <canvas ref={barChartRef}></canvas>
      </div>
      <h2 className="text-xl font-bold mt-8 mb-4 text-gray-600">Bullish-Bearish Difference</h2>
      <div className="mx-auto max-w-3xl h-96 bg-gray-800">
        <canvas ref={lineChartRef}></canvas>
      </div>
      <h2 className="text-xl font-bold mt-8 mb-4 text-gray-600">Bearish Sentiment</h2>
      <div className="mx-auto max-w-3xl h-96 bg-gray-800">
        <canvas ref={bearishLineChartRef}></canvas>
      </div>
      <h2 className="text-xl font-bold mt-8 mb-4 text-gray-600">Bullish Sentiment</h2>
      <div className="mx-auto max-w-3xl h-96 bg-gray-800">
        <canvas ref={bullishLineChartRef}></canvas>
      </div>
   
<div className="mx-auto max-w-3xl h-96 bg-gray-800 flex mt-8 items-center justify-center overflow-auto ">
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-full h-full max-w-full max-h-full overflow-auto">
      <Spy />
    </div>
  </div>
</div>
    </div>
  );
};

export default Stocksentiment;