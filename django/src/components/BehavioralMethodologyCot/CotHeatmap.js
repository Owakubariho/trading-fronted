import React, { useState, useEffect } from 'react';

const CotHeatmap = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Static Sector Mapping
    const sectorMap = {
        'UST 10Y NOTE': 'Fixed Income',
        '30-Year Bonds': 'Fixed Income',
        'NASDAQ-100 Consolidated': 'Equities',
        'E-MINI S&P 500': 'Equities',
        'DJIA Consolidated': 'Equities',
        'RUSSELL E-MINI': 'Equities',
        'GOLD': 'Metals',
        'SILVER': 'Metals',
        'COPPER': 'Metals',
        'PALLADIUM': 'Metals',
        'WTI FINANCIAL CRUDE OIL': 'Energies',
        'NAT GAS ICE LD1': 'Energies',
        'AUSTRALIAN DOLLAR': 'Currencies',
        'EURO FX': 'Currencies',
        'BRITISH POUND': 'Currencies',
        'JAPANESE YEN': 'Currencies',
        'CANADIAN DOLLAR': 'Currencies',
        'SWISS FRANC': 'Currencies',
        'BITCOIN': 'Crypto',
        'ETHER CASH SETTLED': 'Crypto',
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Replace with your actual Django API URL
                const response = await fetch('http://localhost:8000/api/cot-signals/latest/');
                const result = await response.json();
                // Assuming the API returns a list, you might need to filter for the latest date here
                setData(result);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching COT data:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // 2. Dynamic Tailwind Classes for Variance (Dark Green/Red)
    const getVarianceClass = (val) => {
        if (val > 0) return 'bg-[#6aa84f] text-black'; // Specific Green from screenshot
        if (val < 0) return 'bg-[#cc0000] text-white'; // Specific Red from screenshot
        return 'bg-[#b7b7b7] text-black'; // Grey
    };

    // 3. Dynamic Tailwind Classes for Index (Light Green/Red)
    const getIndexClass = (val) => {
        if (val >= 90) return 'bg-[#d9ead3] text-black font-bold'; // Light Green
        if (val <= 10) return 'bg-[#f4cccc] text-black font-bold'; // Light Red
        return 'bg-white text-black';
    };

    if (loading) return <div className="p-4 text-center font-bold">Loading Market Data...</div>;

    return (
        <div className="overflow-x-auto p-5 font-sans text-sm">
            <table className="min-w-full border-collapse border-2 border-black">
                <thead>
                    {/* Top Header Row */}
                    <tr className="bg-white border-b-2 border-black">
                        <th rowSpan="2" className="border border-gray-800 bg-gray-100 px-3 py-2 text-center font-extrabold text-black">Contract</th>
                        <th rowSpan="2" className="border border-gray-800 bg-gray-100 px-3 py-2 text-center font-extrabold text-black">Sector</th>

                        {/* Section Headers */}
                        <th colSpan="3" className="border border-gray-800 bg-gray-300 px-3 py-2 text-center font-bold text-black border-b-2">Weekly Variance</th>
                        <th colSpan="3" className="border border-gray-800 bg-gray-300 px-3 py-2 text-center font-bold text-black border-b-2">Current Week (Index)</th>
                        <th colSpan="3" className="border border-gray-800 bg-gray-300 px-3 py-2 text-center font-bold text-black border-b-2">Previous Week (Index)</th>
                    </tr>

                    {/* Sub Header Row */}
                    <tr className="bg-white border-b-2 border-black">
                        {/* Variance Columns */}
                        <th className="border border-gray-800 bg-gray-100 px-2 py-1 text-center font-bold">Comm</th>
                        <th className="border border-gray-800 bg-gray-100 px-2 py-1 text-center font-bold">LG Spec</th>
                        <th className="border border-gray-800 bg-gray-100 px-2 py-1 text-center font-bold">SM Spec</th>

                        {/* Current Columns */}
                        <th className="border border-gray-800 bg-gray-100 px-2 py-1 text-center font-bold">Comm</th>
                        <th className="border border-gray-800 bg-gray-100 px-2 py-1 text-center font-bold">Lg Spec</th>
                        <th className="border border-gray-800 bg-gray-100 px-2 py-1 text-center font-bold">Sm Spec</th>

                        {/* Previous Columns */}
                        <th className="border border-gray-800 bg-gray-100 px-2 py-1 text-center font-bold">Comm</th>
                        <th className="border border-gray-800 bg-gray-100 px-2 py-1 text-center font-bold">Lg Spec</th>
                        <th className="border border-gray-800 bg-gray-100 px-2 py-1 text-center font-bold">Sm Spec</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => {
                        const assetName = row.asset.split('-')[0].trim();
                        const sector = sectorMap[row.asset] || 'Other';

                        // Calculate Previous Week
                        const prevComm = (row.commercials - row.comm_variance).toFixed(0);
                        const prevLg = (row.large_specs - row.lg_spec_variance).toFixed(0);
                        const prevSm = (row.small_specs - row.sm_spec_variance).toFixed(0);

                        return (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="border border-gray-800 px-2 py-1 text-left font-bold text-black whitespace-nowrap">{assetName}</td>
                                <td className="border border-gray-800 px-2 py-1 text-left text-black whitespace-nowrap">{sector}</td>

                                {/* --- VARIANCES --- */}
                                <td className={`border border-gray-800 px-2 py-1 text-center ${getVarianceClass(row.comm_variance)}`}>
                                    {row.comm_variance}
                                </td>
                                <td className={`border border-gray-800 px-2 py-1 text-center ${getVarianceClass(row.lg_spec_variance)}`}>
                                    {row.lg_spec_variance}
                                </td>
                                <td className={`border border-gray-800 px-2 py-1 text-center ${getVarianceClass(row.sm_spec_variance)}`}>
                                    {row.sm_spec_variance}
                                </td>

                                {/* --- CURRENT WEEK INDICES --- */}
                                <td className={`border border-gray-800 px-2 py-1 text-center ${getIndexClass(row.commercials)}`}>
                                    {row.commercials.toFixed(0)}
                                </td>
                                <td className={`border border-gray-800 px-2 py-1 text-center ${getIndexClass(row.large_specs)}`}>
                                    {row.large_specs.toFixed(0)}
                                </td>
                                <td className={`border border-gray-800 px-2 py-1 text-center ${getIndexClass(row.small_specs)}`}>
                                    {row.small_specs.toFixed(0)}
                                </td>

                                {/* --- PREVIOUS WEEK INDICES --- */}
                                <td className={`border border-gray-800 px-2 py-1 text-center ${getIndexClass(prevComm)}`}>
                                    {prevComm}
                                </td>
                                <td className={`border border-gray-800 px-2 py-1 text-center ${getIndexClass(prevLg)}`}>
                                    {prevLg}
                                </td>
                                <td className={`border border-gray-800 px-2 py-1 text-center ${getIndexClass(prevSm)}`}>
                                    {prevSm}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default CotHeatmap;