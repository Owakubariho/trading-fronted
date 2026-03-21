// StockScreener.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// COMMAND: Configure base URL if not using a proxy
// You can also set this in your main App.js or via environment variables
const API_BASE_URL = 'http://127.0.0.1:8000';

const StockScreener = () => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [minRS, setMinRS] = useState(80); // Default filter
    const [minPrice, setMinPrice] = useState(0); // Price filter

    const fetchStocks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_BASE_URL}/api/stocks/`, {
                params: {
                    min_rs: minRS,
                    min_price: minPrice
                }
            });
            setStocks(response.data);
        } catch (err) {
            setError('Failed to fetch stocks. Please check your connection.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [minRS, minPrice]);

    useEffect(() => {
        fetchStocks();
    }, [fetchStocks]);

    const handleFilterChange = (rs) => {
        setMinRS(rs);
    };

    const getRSColorClass = (rsRating) => {
        if (rsRating >= 90) return 'bg-green-100 text-green-800 font-bold';
        if (rsRating >= 80) return 'bg-blue-100 text-blue-800 font-bold';
        return 'bg-gray-100 text-gray-800';
    };

    const formatPrice = (price) => {
        if (!price) return 'N/A';
        return `$${parseFloat(price).toFixed(2)}`;
    };

    const formatChange = (change) => {
        if (!change) return 'N/A';
        const num = parseFloat(change);
        const color = num > 0 ? 'text-green-600' : num < 0 ? 'text-red-600' : 'text-gray-600';
        return <span className={`font-bold ${color}`}>{num > 0 ? '+' : ''}{num.toFixed(2)}%</span>;
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Stock Screener</h1>
                    <p className="text-gray-600">Filter stocks by Relative Strength (RS) Rating</p>
                </header>

                {/* Filter Controls */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex items-center space-x-4">
                    <span className="font-semibold text-gray-700">Minimum RS Rating:</span>
                    <div className="flex space-x-2">
                        {[0, 80, 90, 95].map(rating => (
                            <button
                                key={rating}
                                onClick={() => handleFilterChange(rating)}
                                className={`px-4 py-2 rounded-lg transition-colors ${minRS === rating
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {rating === 0 ? 'All Stocks' : `> ${rating}`}
                            </button>
                        ))}
                    </div>

                    <div className="border-l border-gray-300 h-8 mx-4"></div>

                    <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-700">Min Price:</span>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                            <input
                                type="number"
                                min="0"
                                value={minPrice}
                                onChange={(e) => setMinPrice(Math.max(0, parseFloat(e.target.value) || 0))}
                                className="pl-6 pr-4 py-2 border border-gray-300 rounded-lg w-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <span className="text-sm text-gray-500 ml-auto">
                        Showing {stocks.length} results
                    </span>
                </div>

                {/* Data Table */}
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
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="p-4 font-semibold text-gray-600 uppercase text-xs">Symbol</th>
                                        <th className="p-4 font-semibold text-gray-600 uppercase text-xs">Company</th>
                                        <th className="p-4 font-semibold text-gray-600 uppercase text-xs">Industry</th>
                                        <th className="p-4 font-semibold text-gray-600 uppercase text-xs text-right">Price</th>
                                        <th className="p-4 font-semibold text-gray-600 uppercase text-xs text-center">RS Rating</th>
                                        <th className="p-4 font-semibold text-gray-600 uppercase text-xs text-right">3M Change</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {stocks.length > 0 ? (
                                        stocks.map(stock => (
                                            <tr key={stock.symbol} className="hover:bg-blue-50 transition-colors">
                                                <td className="p-4 font-bold text-gray-900">{stock.symbol}</td>
                                                <td className="p-4 text-gray-600 text-sm">{stock.company_name || 'N/A'}</td>
                                                <td className="p-4 text-gray-500 text-sm">
                                                    {stock.industry ? stock.industry.name : '-'}
                                                </td>
                                                <td className="p-4 text-right font-mono text-gray-700">
                                                    {formatPrice(stock.current_price)}
                                                </td>
                                                <td className="p-4 text-center">
                                                    <span className={`inline-block px-2 py-1 rounded text-xs ${getRSColorClass(stock.rs_rating_3m)}`}>
                                                        {stock.rs_rating_3m}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right font-mono">
                                                    {formatChange(stock.raw_3m_change)}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="p-8 text-center text-gray-500">
                                                No stocks found matching the criteria.
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

export default StockScreener;
