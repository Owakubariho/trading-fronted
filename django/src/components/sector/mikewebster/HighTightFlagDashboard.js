// HighTightFlagDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Configuration
const API_BASE_URL = 'http://127.0.0.1:8000';

const HighTightFlagDashboard = () => {
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
            const response = await axios.get(`${API_BASE_URL}/api/high-tight-flag/`);
            setResults(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch results. Ensure backend is running.');
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
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">High Tight Flag Scanner</h1>
                        <p className="text-gray-600">Stocks with &gt;80% gain in 3 months and consolidating (-5% to +5% today)</p>
                    </div>
                    <button
                        onClick={fetchResults}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        Refresh Data
                    </button>
                </header>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
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
                                        <th className="p-4 text-right">3M Change</th>
                                        <th className="p-4 text-right">Today's Change</th>
                                        <th className="p-4 text-right">% Off High</th>
                                        <th className="p-4 text-right">Avg Vol (50d)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm">
                                    {results.length > 0 ? (
                                        results.map((item, index) => (
                                            <tr key={index} className="hover:bg-purple-50 transition-colors">
                                                <td className="p-4 font-bold text-gray-900">{item.symbol}</td>
                                                <td className="p-4 text-right font-mono text-gray-700 text-base">{formatPrice(item.current_price)}</td>
                                                <td className="p-4 text-right font-bold text-green-600">
                                                    {formatPct(item.pct_change_3m)}
                                                </td>
                                                <td className="p-4 text-right font-medium">
                                                    <span className={`${item.today_change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                                                        {item.today_change > 0 ? '+' : ''}{formatPct(item.today_change)}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right text-gray-600">{formatPct(item.pct_off_high)}</td>
                                                <td className="p-4 text-right text-gray-600">{parseInt(item.avg_volume_50d).toLocaleString()}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="p-12 text-center text-gray-500">
                                                <p className="text-lg">No matches found.</p>
                                                <p className="text-sm mt-2">Run the scanner to update:</p>
                                                <code className="block mt-2 bg-gray-100 p-2 rounded mx-auto w-max text-xs">
                                                    python manage.py run_hightightflag
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

export default HighTightFlagDashboard;
