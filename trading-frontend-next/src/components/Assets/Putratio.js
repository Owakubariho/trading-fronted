import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Putratio = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Put-Call Ratio (PCR)",
        data: [],
        borderColor: "#FFFFFF",
        borderWidth: 2,
        tension: 0.3,
        backgroundColor: "transparent",
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/putratio/");
        let data = await response.json();
        // reverse the data to display the latest first
        data = data.reverse();

        // Assume the API returns data in the format: { labels: [...], values: [...] }
        setChartData({
          labels: data.map((item) => item.date), // X-axis labels from API
          datasets: [
            {
              label: "Put-Call Ratio (PCR)",
              data: data.map((item) => item.put_ratio_value), // PCR values from API
              borderColor: "#FFFFFF",
              borderWidth: 2,
              tension: 0.3,
              backgroundColor: "transparent",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#FFFFFF",
        },
      },
      y: {
        grid: {
          color: "#444",
        },
        ticks: {
          color: "#FFFFFF",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Put-Call Ratio Analysis",
        color: "#FFD700",
        font: {
          size: 16,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 10,
        },
      },
    },
  };

  return (
    <div className="p-4">
      <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
       
        <div className="w-full  h-[300px] mx-auto">
          <Line data={chartData} options={options} />
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-white p-4 mt-6 rounded-lg shadow-md text-gray-700">
        <h3 className="text-lg font-bold mb-2">How Does the Put-Call Ratio Work?</h3>
        <p>
          The put/call ratio is a measure of investor sentiment in the options market. It compares the total amount of calls and puts purchased in a given time period. For this indicator, it shows how many contracts are being purchased daily. 
          A larger number of puts than calls indicates cautious or risk-averse sentiment, while more calls than puts suggest bullish sentiment.
        </p>
        <p>
          A high ratio implies bearish sentiment, while a low ratio indicates optimism in the market. Traders can use this as a sentiment indicator or even a contrarian indicator during extreme readings. For example:
        </p>
        <ul className="list-disc ml-5">
          <li>Higher value: Bearish sentiment (more puts than calls-) <span className="text-blue-500"> Above 1.0</span></li>
          <li>Lower value: Bullish sentiment (more calls than puts-)<span className="text-blue-500"> Below 1.0</span></li>
          <li>Puts = bearish bets, Calls = bullish bets-<span className="text-blue-500"> Below 1.0</span></li>
        </ul>
        <h4 className="text-md font-semibold mt-4">Applications</h4>
        <p>
          The put-call ratio can indicate market sentiment, potential market reversals, and aid in risk management. A trader might use it to align their positions with the prevailing sentiment or hedge their risks during extreme readings.
        </p>
        <p>
          For example, an excessively high ratio might suggest that investors are overly pessimistic, signaling a potential market bounce. Conversely, a very low ratio might indicate excessive optimism, suggesting a possible downturn.
        </p>
      </div>
    </div>
  );
};

export default Putratio;