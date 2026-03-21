
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Configuration
const API_BASE_URL = 'http://127.0.0.1:8000';

const MultiExchangeDashboard = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'ud_ratio_50d', direction: 'desc' });

    // Fetch data on mount
    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/api/multiexchange-results/`);
            setResults(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch results. Ensure backend is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSort = (key) => {
        let direction = 'desc';
        if (sortConfig.key === key && sortConfig.direction === 'desc') {
            direction = 'asc';
        }
        setSortConfig({ key, direction });
    };

    const sortedResults = React.useMemo(() => {
        if (!results) return [];
        let sortableItems = [...results];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                let aVal = a[sortConfig.key];
                let bVal = b[sortConfig.key];

                // Handle strings properly (though most fields here are numeric)
                if (typeof aVal === 'string') {
                    aVal = aVal.toLowerCase();
                    bVal = bVal.toLowerCase();
                }

                if (aVal < bVal) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aVal > bVal) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [results, sortConfig]);

    const formatPrice = (val) => val ? `$${parseFloat(val).toFixed(2)}` : '-';
    // const formatPct = (val) => val ? `${parseFloat(val).toFixed(2)}%` : '-';

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Multi-Exchange Screener</h1>
                        <p className="text-gray-600">Strong volume & U/D ratio analysis (NASDAQ & NYSE)</p>
                    </div>
                    <div className="flex space-x-4">
                        <button
                            onClick={fetchResults}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                        >
                            Refresh Data
                        </button>
                    </div>
                </header>

                {/* KPI Cards */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-gray-500 text-sm font-medium uppercase">Total Matches</h3>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{results.length}</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-gray-500 text-sm font-medium uppercase">Avg U/D Ratio</h3>
                            <p className="text-3xl font-bold text-indigo-600 mt-2">
                                {results.length > 0
                                    ? (results.reduce((acc, curr) => acc + curr.ud_ratio_50d, 0) / results.length).toFixed(2)
                                    : '0.00'}
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-gray-500 text-sm font-medium uppercase">At New High</h3>
                            <p className="text-3xl font-bold text-green-600 mt-2">
                                {results.filter(r => r.at_new_high).length}
                            </p>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
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
                                        <th
                                            className="p-4 cursor-pointer hover:bg-gray-200 transition-colors"
                                            onClick={() => handleSort('symbol')}
                                        >
                                            Symbol {sortConfig.key === 'symbol' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th
                                            className="p-4 text-right cursor-pointer hover:bg-gray-200 transition-colors"
                                            onClick={() => handleSort('last_price')}
                                        >
                                            Price {sortConfig.key === 'last_price' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th
                                            className="p-4 text-right cursor-pointer hover:bg-gray-200 transition-colors"
                                            onClick={() => handleSort('ud_ratio_50d')}
                                        >
                                            U/D Ratio (50d) {sortConfig.key === 'ud_ratio_50d' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th
                                            className="p-4 text-right cursor-pointer hover:bg-gray-200 transition-colors"
                                            onClick={() => handleSort('up_day_pct')}
                                        >
                                            Up Day % {sortConfig.key === 'up_day_pct' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th
                                            className="p-4 text-right cursor-pointer hover:bg-gray-200 transition-colors"
                                            onClick={() => handleSort('avg_vol_50d')}
                                        >
                                            Avg Vol {sortConfig.key === 'avg_vol_50d' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th
                                            className="p-4 text-right cursor-pointer hover:bg-gray-200 transition-colors"
                                            onClick={() => handleSort('fifty_two_week_high')}
                                        >
                                            52W High {sortConfig.key === 'fifty_two_week_high' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th className="p-4 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm">
                                    {sortedResults.length > 0 ? (
                                        sortedResults.map((item, index) => (
                                            <tr key={index} className="hover:bg-indigo-50 transition-colors">
                                                <td className="p-4 font-bold text-gray-900">{item.symbol}</td>
                                                <td className="p-4 text-right font-mono text-gray-700 text-base">{formatPrice(item.last_price)}</td>
                                                <td className="p-4 text-right">
                                                    <span className={`px-2 py-1 rounded text-xs font-bold ${item.ud_ratio_50d >= 1.5 ? 'bg-green-100 text-green-800' :
                                                        item.ud_ratio_50d >= 1.2 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {item.ud_ratio_50d.toFixed(2)}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right font-medium text-gray-700">
                                                    {item.up_day_pct.toFixed(1)}%
                                                </td>
                                                <td className="p-4 text-right text-gray-600">{item.avg_vol_50d.toLocaleString()}</td>
                                                <td className="p-4 text-right text-gray-600">{formatPrice(item.fifty_two_week_high)}</td>
                                                <td className="p-4 text-center">
                                                    {item.at_new_high && (
                                                        <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                                                            NEW HIGH
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="p-12 text-center text-gray-500">
                                                <p className="text-lg">No results found.</p>
                                                <p className="text-sm mt-2">Run the multi-exchange screener to populate data:</p>
                                                <code className="block mt-2 bg-gray-100 p-2 rounded mx-auto w-max text-xs">
                                                    python manage.py run_multiexchange
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

export default MultiExchangeDashboard;
