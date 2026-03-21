// MinerviniDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Configuration
const API_BASE_URL = 'http://127.0.0.1:8000';

const MinerviniDashboard = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data on mount
    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/api/minervini-results/`);
            setResults(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch results. Ensure backend is running and migration is applied.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (val) => val ? `$${parseFloat(val).toFixed(2)}` : '-';
    const formatPct = (val) => val ? `${parseFloat(val).toFixed(2)}%` : '-';

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mike  webster Trend Leaders</h1>
                        <p className="text-gray-600">Stocks matching the "Trend Template" criteria </p>
                    </div>
                    <button
                        onClick={fetchResults}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Refresh Data
                    </button>
                </header>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">
                        {error}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 border-b border-gray-200 text-xs uppercase text-gray-600 font-semibold">
                                        <th className="p-4">Symbol</th>
                                        <th className="p-4 text-right">Price</th>
                                        <th className="p-4 text-right">Trend Strength</th>
                                        <th className="p-4 text-right">SMA 50</th>
                                        <th className="p-4 text-right">SMA 150</th>
                                        <th className="p-4 text-right">SMA 200</th>
                                        <th className="p-4 text-right">DS Ratio</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm">
                                    {results.length > 0 ? (
                                        results.map((item, index) => (
                                            <tr key={index} className="hover:bg-blue-50 transition-colors">
                                                <td className="p-4 font-bold text-gray-900">{item.symbol}</td>
                                                <td className="p-4 text-right font-mono text-gray-700 text-base">{formatPrice(item.current_price)}</td>
                                                <td className="p-4 text-right font-bold text-green-700 bg-green-50">
                                                    {formatPct(item.trend_strength)}
                                                    <span className="block text-xs font-normal text-gray-500">above 200d MA</span>
                                                </td>
                                                <td className="p-4 text-right text-gray-600">{formatPrice(item.sma50)}</td>
                                                <td className="p-4 text-right text-gray-600">{formatPrice(item.sma150)}</td>
                                                <td className="p-4 text-right text-gray-600">{formatPrice(item.sma200)}</td>
                                                <td className="p-4 text-right">
                                                    <span className={`px-2 py-1 rounded text-xs font-bold ${item.ds_ratio > 1 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                        {item.ds_ratio ? item.ds_ratio.toFixed(2) : '-'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="p-12 text-center text-gray-500">
                                                <p className="text-lg">No results found.</p>
                                                <p className="text-sm mt-2">Run the screening command to populate data:</p>
                                                <code className="block mt-2 bg-gray-100 p-2 rounded mx-auto w-max text-xs">
                                                    python manage.py run_minervini
                                                </code>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MinerviniDashboard;
