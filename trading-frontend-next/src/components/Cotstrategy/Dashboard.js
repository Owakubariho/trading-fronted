// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const getSignalType = (report, lookback) => {
    const cotIndex = report[`cot_index_${lookback}`];
    const specIndex = report[`spec_ratio_index_${lookback}`];
    const commIndex = report[`comm_ratio_index_${lookback}`];

    if (cotIndex >= 90 && specIndex >= 90 && commIndex <= 10) return 'Top';
    if (cotIndex <= 10 && specIndex <= 10 && commIndex >= 90) return 'Bottom';
    return 'Hold';
};

// Updated SignalBadge to also display a 'Hold' badge when needed
const SignalBadge = ({ type }) => {
    if (type === 'Bottom') {
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Potential Bottom</span>;
    }
    if (type === 'Top') {
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Potential Top</span>;
    }
    if (type === 'Hold') {
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Hold</span>;
    }
    return null;
};

function Dashboard() {
    const [recentData, setRecentData] = useState([]);
    const [lookback, setLookback] = useState(52);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    // --- NEW: State for the toggle switch, on by default ---
    const [showActiveOnly, setShowActiveOnly] = useState(true);

    useEffect(() => {
        setLoading(false);
        axios.get(`${API_URL}/recent-signals/`)
            .then(res => {
                setRecentData(res.data.sort((a, b) => a.asset_name.localeCompare(b.asset_name)));
                setLoading(false);
            })
            .catch(err => { console.error("Error fetching recent data:", err); setLoading(false); });
    }, []);

    // --- REVISED: Corrected filtering logic ---
    const displayData = recentData
        // 1. First, always filter by the search term on the FULL list of data.
        .filter(report =>
            report.asset_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        // 2. THEN, if the checkbox is ticked, filter out the "Hold" signals.
        .filter(report => {
            // If showActiveOnly is false, this condition is always true, so nothing is filtered.
            if (!showActiveOnly) {
                return true;
            }
            // If showActiveOnly is true, only let non-"Hold" signals pass.
            return getSignalType(report, lookback) !== 'Hold';
        });

    if (loading) return <div className="p-8 text-center text-gray-600">Loading data...</div>;

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold text-gray-800">Market Dashboard</h1>

                <div className="w-full md:w-1/3">
                    <input type="text" placeholder="Search for any asset..." value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
                    />
                </div>

                <div className="bg-white p-2 rounded-lg shadow-sm">
                    {/* ... (Lookback period buttons are unchanged) ... */}
                </div>
            </div>

            {/* --- NEW: Toggle Switch for filtering --- */}
            <div className="flex justify-end items-center mb-4">
                <label htmlFor="active-toggle" className="flex items-center cursor-pointer">
                    <div className="relative">
                        <input id="active-toggle" type="checkbox" className="sr-only"
                            checked={showActiveOnly}
                            onChange={() => setShowActiveOnly(!showActiveOnly)}
                        />
                        <div className="block bg-gray-200 w-14 h-8 rounded-full"></div>
                        <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                    </div>
                    <div className="ml-3 text-gray-700 font-medium">
                        Show Active Signals Only
                    </div>
                </label>
            </div>

            {/* The rest of the table logic is updated to use the new 'displayData' */}
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        {/* ... (table headers are unchanged) ... */}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {displayData.length > 0 ? (
                            displayData.map(report => {
                                const signalType = getSignalType(report, lookback);
                                return (
                                    <tr key={report.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.asset_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.report_date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <SignalBadge type={signalType} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <Link to={`/asset/${encodeURIComponent(report.asset_name)}`} className="text-blue-600 hover:text-blue-900 font-semibold">
                                                View Charts &rarr;
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-8 px-6 text-gray-500">
                                    No assets found for the current criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard;
