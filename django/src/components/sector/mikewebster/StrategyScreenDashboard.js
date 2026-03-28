
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'; // Assuming rechart is available based on context

// Configuration
const API_BASE_URL = 'http://127.0.0.1:8000';

const StrategyScreenDashboard = () => {
    const [activeStrategy, setActiveStrategy] = useState('all'); // 'all', 'zanger', 'minervini', 'tough_week', 'qullamagie_1m'
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchResults();
    }, [activeStrategy]);

    const fetchResults = async () => {
        setLoading(true);
        try {
            let url = `${API_BASE_URL}/api/strategy-results/`;
            if (activeStrategy !== 'all') {
                url += `?strategy=${activeStrategy}`;
            }
            const response = await axios.get(url);
            setResults(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch strategy results. Please ensure the backend is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const strategies = [
        { id: 'all', label: 'All Results', count: 0 },
        { id: 'zanger', label: 'Dan Zanger', count: 0 },
        { id: 'minervini', label: 'Minervini Trend', count: 0 },
        { id: 'tough_week', label: 'Tough Week', count: 0 },
        { id: 'qullamagie_1m', label: 'Qullamagie (1M)', count: 0 },
        { id: 'qullamagie_3m', label: 'Qullamagie (3M)', count: 0 },
        { id: 'qullamagie_6m', label: 'Qullamagie (6M)', count: 0 },
    ];

    const filteredResults = results.filter(item =>
        item.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStrategyBadge = (item) => {
        const badges = [];
        if (item.passed_zanger) badges.push({ initial: 'Z', bg: 'bg-blue-100 text-blue-800', label: 'Zanger' });
        if (item.passed_minervini) badges.push({ initial: 'M', bg: 'bg-green-100 text-green-800', label: 'Minervini' });
        if (item.passed_tough_week) badges.push({ initial: 'T', bg: 'bg-red-100 text-red-800', label: 'Tough Week' });
        if (item.passed_qullamagie_1m) badges.push({ initial: 'Q1', bg: 'bg-purple-100 text-purple-800', label: 'Qullamagie 1M' });

        return (
            <div className="flex space-x-1">
                {badges.map((b, i) => (
                    <span key={i} title={b.label} className={`px-2 py-1 text-xs font-bold rounded-full ${b.bg} cursor-help`}>
                        {b.initial}
                    </span>
                ))}
            </div>
        );
    };

    const formatPrice = (val) => val ? `$${parseFloat(val).toFixed(2)}` : '-';

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Pro Strategy Screener</h1>
                    <p className="text-gray-600">Multi-Strategy Analysis: Zanger, Minervini, Tough Week, Qullamagie</p>
                </header>

                {/* Strategy Filters */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {strategies.map(s => (
                        <button
                            key={s.id}
                            onClick={() => setActiveStrategy(s.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeStrategy === s.id
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>

                {/* Search & Actions */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div className="relative w-full md:w-96">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search ticker..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />
                    </div>
                    <button
                        onClick={fetchResults}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center font-medium shadow-sm transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Refresh Data
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200 text-center">
                        <p className="font-bold">Error</p>
                        <p>{error}</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                                        <th className="p-4">Symbol</th>
                                        <th className="p-4">Strategies</th>
                                        <th className="p-4 text-right">Price</th>
                                        <th className="p-4 text-right">RS 3M (Rank)</th>
                                        <th className="p-4 text-right">Vol (50d)</th>
                                        <th className="p-4 text-right">Wk Range %</th>
                                        <th className="p-4 text-right text-xs">% Off Low</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm">
                                    {filteredResults.length > 0 ? (
                                        filteredResults.map((item) => (
                                            <tr key={item.id} className="hover:bg-indigo-50 transition-colors group">
                                                <td className="p-4 font-bold text-gray-900 group-hover:text-indigo-600">
                                                    {item.symbol}
                                                </td>
                                                <td className="p-4">
                                                    {getStrategyBadge(item)}
                                                </td>
                                                <td className="p-4 text-right font-mono text-gray-700 text-base">
                                                    {formatPrice(item.last_price)}
                                                </td>
                                                <td className="p-4 text-right">
                                                    <div className="flex flex-col items-end">
                                                        <span className={`font-bold ${item.rs_rating_3m >= 80 ? 'text-green-600' : 'text-gray-600'}`}>
                                                            {item.rs_rating_3m ? item.rs_rating_3m.toFixed(0) : '-'}
                                                        </span>
                                                        <span className="text-xs text-gray-400">Rank</span>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-right text-gray-600">
                                                    {(item.avg_vol_50d / 1000).toFixed(0)}K
                                                </td>
                                                <td className="p-4 text-right">
                                                    <span className={`px-2 py-1 rounded text-xs font-bold ${item.weekly_close_range_pct >= 75 ? 'bg-green-100 text-green-800' : 'text-gray-500'}`}>
                                                        {item.weekly_close_range_pct.toFixed(0)}%
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right text-gray-500">
                                                    {item.pct_off_52w_low.toFixed(0)}%
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="p-12 text-center text-gray-500">
                                                <p className="text-lg">No stocks found for this strategy.</p>
                                                <p className="text-sm mt-2">Try running the screener backend command:</p>
                                                <code className="block mt-2 bg-gray-100 p-2 rounded mx-auto w-max text-xs">
                                                    python manage.py run_strategy_screens
                                                </code>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-xs text-gray-500 text-right">
                            Showing {filteredResults.length} results
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StrategyScreenDashboard;
