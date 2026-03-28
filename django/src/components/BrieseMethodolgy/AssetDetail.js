// src/components/AssetDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import HistoricalSignalsTable from './HistoricalSignalsTable';
import AssetSelector from './AssetSelector';
import ChartWrapper from './ChartWrapper';

// Register all necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);
const API_URL = 'http://127.0.0.1:8000/api';

function AssetDetail() {
    const { assetName } = useParams();
    const [historicalData, setHistoricalData] = useState([]);
    const [lookback, setLookback] = useState(52);
    const [loading, setLoading] = useState(true);

    const today = new Date().toISOString().split('T')[0];
    const oneYearAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0];

    const [dateRange, setDateRange] = useState({ start: oneYearAgo, end: today });
    const [formDates, setFormDates] = useState({ start: oneYearAgo, end: today });

    // useEffect for historical chart and table data
    useEffect(() => {
        setLoading(true);
        axios.get(`${API_URL}/reports/?asset=${assetName}&start_date=${dateRange.start}&end_date=${dateRange.end}`)
            .then(res => {
                setHistoricalData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching asset data:", err);
                setLoading(false);
            });
    }, [assetName, dateRange]);

    const handleFilter = (e) => {
        e.preventDefault();
        setDateRange(formDates);
    };

    const labels = historicalData.map(d => d.report_date);

    const netPositionChartData = {
        labels,
        datasets: [
            { label: 'NON-COMM NET', data: historicalData.map(d => d.non_comm_net), backgroundColor: 'rgb(53, 162, 235)' },
            { label: 'COMM NET', data: historicalData.map(d => d.comm_net), backgroundColor: 'rgb(255, 99, 132)' }
        ]
    };

    const createIndexChartData = (indexPrefix, color) => ({
        labels,
        datasets: [{
            label: `${indexPrefix.replace('_', ' ')} Index (${lookback} wk)`.toUpperCase(),
            data: historicalData.map(d => d[`${indexPrefix}_index_${lookback}`]),
            borderColor: color,
            backgroundColor: `${color}40`,
            tension: 0.1,
            borderWidth: 2,
            pointRadius: 0,
            fill: true
        }]
    });

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="mb-6">
                <Link to="/sentimentcot" className="text-blue-600 hover:underline mb-4 block">&larr; Back to Dashboard</Link>
                <Link to="/documentation" className="text-sm font-medium text-blue-600 hover:text-white transition-colors">&larr;
                    Strategy Guide
                </Link>
                <h1 className="text-3xl font-bold text-gray-800 break-words">{decodeURIComponent(assetName)}</h1>
            </div>

            <AssetSelector currentAsset={decodeURIComponent(assetName)} />

            {/* --- CONTROLS SECTION --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Lookback Period Selector */}
                <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
                    <h3 className="font-semibold text-lg mb-3 text-gray-700">Chart & Signal Period</h3>
                    <div className="flex space-x-2">
                        {[13, 26, 52].map(period => (
                            <button key={period} onClick={() => setLookback(period)} className={`px-4 py-2 rounded-md font-medium text-sm transition ${lookback === period ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                                {period} Weeks
                            </button>
                        ))}
                    </div>
                </div>

                {/* Date Filter Form */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <form onSubmit={handleFilter} className="space-y-4">
                        <h3 className="font-semibold text-lg text-gray-700">Filter Data by Date</h3>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-grow">
                                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date</label>
                                <input type="date" id="start_date" value={formDates.start} onChange={e => setFormDates({ ...formDates, start: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                            </div>
                            <div className="flex-grow">
                                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">End Date</label>
                                <input type="date" id="end_date" value={formDates.end} onChange={e => setFormDates({ ...formDates, end: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                            </div>
                        </div>
                        <button type="submit" className="w-full px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Apply Filter
                        </button>
                    </form>
                </div>
            </div>

            {loading ? (
                <div className="text-center p-8 text-gray-600">Loading chart data...</div>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-12">
                        <ChartWrapper title="Commercial vs Non-Commercial Net Positions">
                            <Bar options={{ responsive: true, maintainAspectRatio: false }} data={netPositionChartData} />
                        </ChartWrapper>

                        <ChartWrapper title={`COT Index (${lookback} Weeks)`}>
                            <Line options={{ responsive: true, maintainAspectRatio: false, scales: { y: { min: 0, max: 100 } } }} data={createIndexChartData('cot', 'rgb(75, 192, 192)')} />
                        </ChartWrapper>

                        <ChartWrapper title={`Speculator Ratio Index (${lookback} Weeks)`}>
                            <Line options={{ responsive: true, maintainAspectRatio: false, scales: { y: { min: 0, max: 100 } } }} data={createIndexChartData('spec_ratio', 'rgb(153, 102, 255)')} />
                        </ChartWrapper>

                        <ChartWrapper title={`Commercial Ratio Index (${lookback} Weeks)`}>
                            <Line options={{ responsive: true, maintainAspectRatio: false, scales: { y: { min: 0, max: 100 } } }} data={createIndexChartData('comm_ratio', 'rgb(255, 159, 64)')} />
                        </ChartWrapper>
                    </div>

                    <HistoricalSignalsTable data={historicalData} lookback={lookback} />
                </>
            )}
        </div>
    );
}

export default AssetDetail;
