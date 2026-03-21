"use client";

import React from 'react';

interface COTData {
    report_date: string;
    net_positions: number;
    net_change: number;
    noncomm_net_pct_change: number;
    noncommercial_long_positions: number;
    change_noncommercial_long: number;
    noncommercial_short_positions: number;
    change_noncommercial_short: number;
    open_interest: number;
}

interface COTTableProps {
    data: COTData[];
    isLoading: boolean;
}

const COTTable: React.FC<COTTableProps> = ({ data, isLoading }) => {
    if (isLoading) return <div className="p-8 text-center text-gray-500 animate-pulse">Loading market data...</div>;
    if (!data || data.length === 0) return <div className="p-8 text-center text-gray-500">No data available.</div>;

    const getColor = (val: number) => {
        if (val > 0) return 'text-green-600 font-bold';
        if (val < 0) return 'text-red-600 font-bold';
        return 'text-gray-600';
    };

    const fmt = (val: number | undefined | null) => val ? val.toLocaleString() : '-';

    return (
        <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-100 bg-white dark:bg-slate-800 dark:border-slate-700">
            <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-700 dark:text-gray-200">
                    <tr>
                        <th className="px-6 py-4 font-semibold">Report Date</th>
                        <th className="px-6 py-4 text-right font-semibold">Net Position</th>
                        <th className="px-6 py-4 text-right font-semibold">Net Change</th>
                        <th className="px-6 py-4 text-right font-semibold">% Change</th>
                        <th className="px-6 py-4 text-right font-semibold">Longs</th>
                        <th className="px-6 py-4 text-right font-semibold">Long Change</th>
                        <th className="px-6 py-4 text-right font-semibold">Shorts</th>
                        <th className="px-6 py-4 text-right font-semibold">Short Change</th>
                        <th className="px-6 py-4 text-right font-semibold">Open Interest</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                    {data.map((row, index) => (
                        <tr key={index} className="bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                {row.report_date}
                            </td>
                            <td className="px-6 py-4 text-right font-bold text-gray-800 dark:text-gray-100">
                                {fmt(row.net_positions)}
                            </td>
                            <td className={`px-6 py-4 text-right ${getColor(row.net_change)}`}>
                                {row.net_change > 0 ? '+' : ''}{fmt(row.net_change)}
                            </td>
                            <td className={`px-6 py-4 text-right ${getColor(row.noncomm_net_pct_change)}`}>
                                {row.noncomm_net_pct_change}%
                            </td>
                            <td className="px-6 py-4 text-right">{fmt(row.noncommercial_long_positions)}</td>
                            <td className="px-6 py-4 text-right text-gray-500 dark:text-gray-400">{fmt(row.change_noncommercial_long)}</td>
                            <td className="px-6 py-4 text-right">{fmt(row.noncommercial_short_positions)}</td>
                            <td className="px-6 py-4 text-right text-gray-500 dark:text-gray-400">{fmt(row.change_noncommercial_short)}</td>
                            <td className="px-6 py-4 text-right font-mono text-slate-500 dark:text-slate-400">{fmt(row.open_interest)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default COTTable;
