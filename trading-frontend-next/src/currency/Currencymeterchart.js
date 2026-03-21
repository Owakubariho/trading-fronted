import React, { useEffect, useState, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  defaults,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.font.family = "'Inter', sans-serif";

// Standard Forex Pairing Hierarchy (Base Currency Priority)
const PAIR_PRIORITY = {
  EUR: 1,
  GBP: 2,
  AUD: 3,
  NZD: 4,
  USD: 5,
  CAD: 6,
  CHF: 7,
  JPY: 8,
};

function Currencymeterchart() {
  const [currencies, setCurrencies] = useState([]);
  const [minSpread, setMinSpread] = useState(1.5);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/currencies/");
      const data = await response.json();
      setCurrencies(data);
    } catch (err) {
      console.log(err);
    }
  };

  // --- CHART DATA PREPARATION ---
  const sortedChartData = useMemo(() => {
    return [...currencies].sort((a, b) => b.strength - a.strength);
  }, [currencies]);

  const chartColors = sortedChartData.map((c) =>
    c.strength >= 0 ? "rgba(34, 197, 94, 0.8)" : "rgba(239, 68, 68, 0.8)"
  );

  const chartBorders = sortedChartData.map((c) =>
    c.strength >= 0 ? "rgb(21, 128, 61)" : "rgb(185, 28, 28)"
  );

  // --- PAIR GENERATION LOGIC ---
  const { buyPairs, sellPairs } = useMemo(() => {
    if (!currencies || currencies.length === 0) {
      return { buyPairs: [], sellPairs: [] };
    }

    const validPairs = [];
    const processedPairs = new Set();

    for (let i = 0; i < currencies.length; i++) {
      for (let j = 0; j < currencies.length; j++) {
        if (i === j) continue;

        const c1 = currencies[i];
        const c2 = currencies[j];

        // Ensure strengths are treated as Numbers
        const s1 = Number(c1.strength);
        const s2 = Number(c2.strength);

        // 1. Determine Standard Base vs Quote using Hierarchy
        const p1 = PAIR_PRIORITY[c1.symbol] || 99;
        const p2 = PAIR_PRIORITY[c2.symbol] || 99;

        let base, quote, baseStrength, quoteStrength;

        // Lower number = Higher Priority (Base)
        if (p1 < p2) {
          base = c1;
          quote = c2;
          baseStrength = s1;
          quoteStrength = s2;
        } else {
          base = c2;
          quote = c1;
          baseStrength = s2;
          quoteStrength = s1;
        }

        const pairName = `${base.symbol}/${quote.symbol}`;

        if (processedPairs.has(pairName)) continue;
        processedPairs.add(pairName);

        // 2. Calculate Differential
        const diff = baseStrength - quoteStrength;

        // 3. FILTER BY SPREAD
        if (Math.abs(diff) >= minSpread) {
          validPairs.push({
            pair: pairName,
            strengthDiff: diff,
            base: base.symbol,
            quote: quote.symbol,
            baseStrength: baseStrength, // Stored as a strict Number
            quoteStrength: quoteStrength, // Stored as a strict Number
          });
        }
      }
    }

    const sortedPairs = validPairs.sort(
      (a, b) => Math.abs(b.strengthDiff) - Math.abs(a.strengthDiff)
    );

    const buys = sortedPairs.filter((p) => p.strengthDiff > 0);
    const sells = sortedPairs.filter((p) => p.strengthDiff < 0);

    return { buyPairs: buys, sellPairs: sells };
  }, [currencies, minSpread]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 max-w-fit px-6 py-3 rounded-r-full my-6 shadow-md">
        <p className="text-white uppercase tracking-wider font-bold text-lg">
          15-Week Rate of Change Meter
        </p>
      </div>

      {/* --- CHART SECTION --- */}
      <div className="max-w-5xl w-full p-6 bg-white shadow-lg rounded-xl mx-auto border border-gray-100 mb-8">
        <div className="relative h-[400px]">
          <Bar
            data={{
              labels: sortedChartData.map((data) => data.symbol),
              datasets: [
                {
                  label: "Strength",
                  data: sortedChartData.map((data) => data.strength),
                  backgroundColor: chartColors,
                  borderColor: chartBorders,
                  borderWidth: 1,
                  borderRadius: 4,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                title: {
                  display: true,
                  text: "CURRENCY STRENGTH DISTRIBUTION",
                  font: { size: 18, weight: "bold" },
                  padding: { bottom: 20 },
                  color: "#374151",
                },
              },
              scales: {
                x: {
                  grid: { display: false },
                  ticks: { font: { weight: "bold" }, color: "#4b5563" },
                },
                y: {
                  beginAtZero: true,
                  grid: {
                    color: (ctx) =>
                      ctx.tick.value === 0 ? "#000000" : "#f3f4f6",
                    lineWidth: (ctx) => (ctx.tick.value === 0 ? 2 : 1),
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/* --- FILTER CONTROL --- */}
      <div className="max-w-6xl mx-auto px-4 mb-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-600 mb-1">
              Filter by Spread Strength
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={minSpread}
                onChange={(e) => setMinSpread(parseFloat(e.target.value))}
                className="w-64 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <span className="text-blue-600 font-mono font-bold text-lg">
                {minSpread.toFixed(1)}
              </span>
            </div>
          </div>
          <div className="h-10 w-px bg-gray-200 mx-4"></div>
          <p className="text-xs text-gray-500 max-w-md">
            Adjust the slider to filter out low-volatility pairs. Higher values
            show only the strongest trends (Strongest vs Weakest).
          </p>
        </div>
      </div>

      {/* --- TABLES SECTION --- */}
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        {/* BUY TABLE */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col h-[600px] border border-gray-100">
          <div className="bg-green-50 p-4 border-b border-green-100 shrink-0 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-green-800">
                Buy Opportunities
              </h3>
              <p className="text-xs text-green-600 uppercase tracking-wide">
                Base Stronger than Quote (Spread &gt; {minSpread})
              </p>
            </div>
            <div className="bg-green-200 text-green-800 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 005.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                />
              </svg>
            </div>
          </div>

          <div className="overflow-y-auto flex-grow custom-scrollbar">
            {buyPairs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <p>No pairs match spread &gt; {minSpread}</p>
                <button
                  onClick={() => setMinSpread(0)}
                  className="text-blue-500 text-sm mt-2 hover:underline"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-gray-50 shadow-sm z-10">
                  <tr className="text-xs font-bold uppercase text-gray-500 tracking-wider">
                    <th className="p-4">Pair</th>
                    <th className="p-4 text-right">Spread</th>
                    <th className="p-4 text-center">Breakdown</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {buyPairs.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-green-50 transition-colors duration-150"
                    >
                      <td className="p-4 font-bold text-gray-700">
                        {item.pair}
                      </td>
                      <td className="p-4 text-right font-mono text-green-600 font-bold">
                        +{Number(item.strengthDiff).toFixed(2)}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center items-center gap-2 text-xs">
                          <span className="text-gray-700 font-semibold">
                            {item.base}: {Number(item.baseStrength).toFixed(1)}
                          </span>
                          <span className="text-gray-400">&gt;</span>
                          <span className="text-gray-500">
                            {item.quote}: {Number(item.quoteStrength).toFixed(1)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* SELL TABLE */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col h-[600px] border border-gray-100">
          <div className="bg-red-50 p-4 border-b border-red-100 shrink-0 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-red-800">
                Sell Opportunities
              </h3>
              <p className="text-xs text-red-600 uppercase tracking-wide">
                Base Weaker than Quote (Spread &gt; {minSpread})
              </p>
            </div>
            <div className="bg-red-200 text-red-800 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 0111.818 11.818M13.5 6.375l2.25 5.941 5.94-2.28"
                />
              </svg>
            </div>
          </div>

          <div className="overflow-y-auto flex-grow custom-scrollbar">
            {sellPairs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <p>No pairs match spread &gt; {minSpread}</p>
                <button
                  onClick={() => setMinSpread(0)}
                  className="text-blue-500 text-sm mt-2 hover:underline"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-gray-50 shadow-sm z-10">
                  <tr className="text-xs font-bold uppercase text-gray-500 tracking-wider">
                    <th className="p-4">Pair</th>
                    <th className="p-4 text-right">Spread</th>
                    <th className="p-4 text-center">Breakdown</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sellPairs.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-red-50 transition-colors duration-150"
                    >
                      <td className="p-4 font-bold text-gray-700">
                        {item.pair}
                      </td>
                      <td className="p-4 text-right font-mono text-red-600 font-bold">
                        {Number(item.strengthDiff).toFixed(2)}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center items-center gap-2 text-xs">
                          <span className="text-gray-700 font-semibold">
                            {item.base}: {Number(item.baseStrength).toFixed(1)}
                          </span>
                          <span className="text-gray-400">&lt;</span>
                          <span className="text-gray-500">
                            {item.quote}: {Number(item.quoteStrength).toFixed(1)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-8 py-10">
        <Link
          to="/currencyboard"
          className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 transition-all border border-blue-100 flex items-center gap-2"
        >
          <span>View Strength Board</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default Currencymeterchart;