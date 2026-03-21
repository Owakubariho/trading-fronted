import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Spy = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/spyweeklyclose/")
      .then((res) => res.json())
      .then((data) => {
        // Assuming data is an array of objects with Date and Close
        const labels = data.map((item) => item.Date);
        const closes = data.map((item) => item.Close);
        // reverse the arrays to have the most recent date on the right
        labels.reverse();
        closes.reverse();

        setChartData({
          labels,
          datasets: [
            {
              label: "Close",
              data: closes,
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.2)",
              fill: true,
              tension: 0.1,
            },
          ],
        });
      });
  }, []);

  if (!chartData) return <div>Loading...</div>;

  return (
    <div className="w-full h-full">
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false, // Ensures chart fills parent container
          plugins: {
            legend: { display: true },
            title: { display: true, text: "SPY Weekly Close Prices" },
          },
          scales: {
            x: {
              ticks: { color: "white" },
              grid: { color: "rgba(255,255,255,0.1)" },
            },
            y: {
              ticks: { color: "white" },
              grid: { color: "rgba(255,255,255,0.1)" },
            },
          },
        }}
        className="w-full h-full"
      />
    </div>
  );
};

export default Spy;