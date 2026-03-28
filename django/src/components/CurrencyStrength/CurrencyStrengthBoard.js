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

function CurrencyStrengthBoard() {
    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        fetchCurrencies();
    }, []);

    const fetchCurrencies = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/currencies/");
            const data = await response.json();
            setCurrencies(data);
        } catch (err) {
            console.log("Error fetching currencies:", err);
        }
    };

    // Sort currencies: usually alphabetical for the top board, but chart might be sorted by value?
    // Screenshot shows alphabetical order at the top: AUD, CAD, CHF, EUR...
    const alphabeticalCurrencies = useMemo(() => {
        return [...currencies].sort((a, b) => a.symbol.localeCompare(b.symbol));
    }, [currencies]);

    // Chart data might be better sorted or just matching the top board?
    // Screenshot chart seems sorted by value? No, let's look at the screenshot again implicitly.
    // Screenshot chart Left to Right: Green columns (high), then Orange/Red/Grey (low/negative).
    // So the chart IS sorted by strength descending.
    const chartDataSorted = useMemo(() => {
        return [...currencies].sort((a, b) => b.strength - a.strength);
    }, [currencies]);

    // Color logic based on screenshot interpretation
    // High positive: Green
    // Low positive / Near zero: Light Green / Grey
    // Negative: Red / Orange / Yellow
    const getBarColor = (strength) => {
        const s = Number(strength);
        if (s >= 5) return "#16a34a"; // Green-600
        if (s >= 2) return "#84cc16"; // Lime-500
        if (s >= 0) return "#d9f99d"; // Lime-200 or similar
        if (s > -2) return "#e5e7eb"; // Gray-200 (Neutralish)
        if (s > -5) return "#facc15"; // Yellow-400
        return "#dc2626"; // Red-600
    };

    return (
        <div className="min-h-screen bg-white font-sans text-gray-800 p-8">
            <div className="max-w-7xl mx-auto">

                {/* Navigation / Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-700 uppercase tracking-wider">Currency Strength Board</h1>
                    <Link to="/currencychart" className="text-blue-500 hover:text-blue-700 font-semibold text-sm">
                        &larr; Back to Meter Chart
                    </Link>
                </div>

                {/* TOP BOARD SECTION */}
                <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-6 mb-10 overflow-x-auto">
                    <div className="flex justify-between min-w-[600px] text-center">
                        {alphabeticalCurrencies.map((curr) => (
                            <div key={curr.symbol} className="flex flex-col items-center gap-2 flex-1 px-2 border-r last:border-r-0 border-gray-100">
                                <span className="text-gray-500 font-bold text-lg uppercase">{curr.symbol}</span>
                                <span className="text-2xl font-bold text-gray-800">{Number(curr.strength).toFixed(0)}</span>

                                {/* Visual Indicator (Triangle) */}
                                <div className="mt-2">
                                    {Number(curr.strength) >= 0 ? (
                                        <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-green-600"></div>
                                    ) : (
                                        <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[15px] border-t-red-500"></div>
                                    )}
                                </div>

                                {/* Sub-values (Mocking history or just repeating for visual similarity if no extra data) */}
                                <div className="mt-3 text-xs text-gray-400 font-mono">
                                    {/* Just showing precise value here as 'sub-value' since screenshot has multiple rows */}
                                    {Number(curr.strength).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CHART SECTION */}
                <div className="bg-white p-4 h-[500px] w-full max-w-5xl mx-auto relative">
                    {/* Custom Grid Lines effect (Top 7, Mid 0, Bottom -7) is handled by chart scales usually, but we can style simply */}
                    <Bar
                        data={{
                            labels: chartDataSorted.map((c) => c.symbol),
                            datasets: [
                                {
                                    label: "Strength",
                                    data: chartDataSorted.map((c) => c.strength),
                                    backgroundColor: chartDataSorted.map((c) => getBarColor(c.strength)),
                                    borderRadius: 2,
                                    barPercentage: 0.6,
                                    categoryPercentage: 0.8,
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false },
                                tooltip: {
                                    backgroundColor: '#1f2937',
                                    padding: 12,
                                    titleFont: { size: 14 },
                                    bodyFont: { size: 14 },
                                    displayColors: false,
                                }
                            },
                            scales: {
                                y: {
                                    min: -9,
                                    max: 9,
                                    grid: {
                                        color: (context) => context.tick.value === 0 ? '#374151' : '#e5e7eb', // Darker line at 0
                                        lineWidth: (context) => context.tick.value === 0 ? 2 : 1,
                                    },
                                    ticks: {
                                        stepSize: 1,
                                        color: '#6b7280',
                                        font: { family: 'monospace' }
                                    },
                                    border: { display: false } // Hide y-axis main border line
                                },
                                x: {
                                    grid: { display: false },
                                    ticks: {
                                        color: '#6b7280',
                                        font: { weight: 'bold' }
                                    },
                                    border: { display: false }
                                }
                            }
                        }}
                    />
                </div>

            </div>
        </div>
    );
}

export default CurrencyStrengthBoard;
