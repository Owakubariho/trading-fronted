import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
    LuArrowUpRight,
    LuArrowDownRight,
    LuRefreshCw,
    LuCalendar,
    LuFilter,
    LuTrendingUp,
    LuClock,
    LuLoader
} from 'react-icons/lu';
import {
    LineChart, Line, ResponsiveContainer, YAxis
} from 'recharts';

// --- COMPONENTS ---

const SignalBadge = ({ value }) => {
    if (value >= 60) return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <LuArrowUpRight className="mr-1" /> STRONG BUY
        </span>
    );
    if (value <= -60) return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
            <LuArrowDownRight className="mr-1" /> STRONG SELL
        </span>
    );
    return <span className="text-slate-400 text-xs font-medium border border-slate-200 px-2 py-0.5 rounded-full">NEUTRAL</span>;
};

const MovementIndicator = ({ value }) => {
    // Safety check for null
    if (value === null || value === undefined) return <span className="text-slate-300">-</span>;

    const isSurge = value >= 40;
    const isPlunge = value <= -40;

    if (isSurge) return <span className="text-emerald-600 font-bold text-xs flex items-center bg-emerald-50 px-1 rounded border border-emerald-100">ΓÜí SURGE (+{value.toFixed(0)})</span>;
    if (isPlunge) return <span className="text-rose-600 font-bold text-xs flex items-center bg-rose-50 px-1 rounded border border-rose-100">ΓÜí PLUNGE ({value.toFixed(0)})</span>;

    return <span className={`text-xs ${value > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{value > 0 ? '+' : ''}{value.toFixed(0)}</span>;
};

// --- MAIN DASHBOARD ---
function CrossRateDashboard() {
    const [rawData, setRawData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL'); // ALL, SIGNALS
    const [lookback, setLookback] = useState('52w'); // '13w', '26w', '52w', '3y'

    // Backtesting State
    // Default to today, but allow user to change
    const today = new Date().toISOString().split('T')[0];
    const [analysisDate, setAnalysisDate] = useState(today);

    // 1. Fetch Real Data
    const loadData = async () => {
        setLoading(true);
        try {
            // Adjust URL to your actual Django endpoint
            const response = await axios.get('http://127.0.0.1:8000/api/cross-rates/');
            setRawData(response.data);
        } catch (error) {
            console.error("Error fetching cross rates:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // fixed order requested by user
    const ORDERED_PAIRS = [
        "EUR/GBP", "EUR/JPY", "EUR/AUD", "EUR/NZD", "EUR/CAD", "EUR/CHF",
        "GBP/JPY", "GBP/AUD", "GBP/NZD", "GBP/CAD", "GBP/CHF",
        "AUD/JPY", "AUD/NZD", "AUD/CAD", "AUD/CHF",
        "NZD/JPY", "NZD/CAD", "NZD/CHF",
        "CAD/JPY", "CAD/CHF",
        "CHF/JPY"
    ];

    // 2. Process Data for the Selected Date & Lookback
    const processedMatrix = useMemo(() => {
        if (!rawData.length) return [];

        const matrix = [];
        const targetTs = new Date(analysisDate).getTime();

        // Use Set for fast lookup of available data
        const availableRecords = new Map();
        rawData.forEach(r => {
            if (!availableRecords.has(r.symbol)) {
                availableRecords.set(r.symbol, []);
            }
            availableRecords.get(r.symbol).push(r);
        });

        // Loop through our FIXED order list
        ORDERED_PAIRS.forEach(pair => {
            if (!availableRecords.has(pair)) return;

            // Get all records for this pair, sorted by date ASC
            const pairRecords = availableRecords.get(pair)
                .sort((a, b) => new Date(a.date) - new Date(b.date));

            // Find the record closest to (but not after) the analysisDate
            let currentRecord = null;
            let currentIndex = -1;

            for (let i = pairRecords.length - 1; i >= 0; i--) {
                const rTs = new Date(pairRecords[i].date).getTime();
                if (rTs <= targetTs) {
                    currentRecord = pairRecords[i];
                    currentIndex = i;
                    break;
                }
            }

            if (currentRecord) {
                // Get History for Sparklines
                const startIndex = Math.max(0, currentIndex - 12);
                const historySlice = pairRecords.slice(startIndex, currentIndex + 1);

                const historyGraph = historySlice.map(h => ({
                    val: h[`pseudo_index_${lookback}`]
                }));

                const [base, quote] = pair.split('/');

                matrix.push({
                    id: pair,
                    symbol: pair,
                    base,
                    quote,
                    pseudoIndex: currentRecord[`pseudo_index_${lookback}`],
                    movement: currentRecord[`movement_index_${lookback}`],
                    history: historyGraph
                });
            }
        });

        return matrix;

    }, [rawData, analysisDate, lookback]);

    // 3. Filter Logic
    const displayData = useMemo(() => {
        if (filter === 'SIGNALS') {
            return processedMatrix
                .filter(d => Math.abs(d.pseudoIndex) >= 60 || Math.abs(d.movement) >= 40)
                .sort((a, b) => Math.abs(b.pseudoIndex) - Math.abs(a.pseudoIndex));
        }
        // For ALL, return strictly in the ORDERED_PAIRS order (which processedMatrix already is)
        return processedMatrix;
    }, [processedMatrix, filter]);

    const formatLookback = (val) => val === '3y' ? '3 Years' : `${val.replace('w', '')} Weeks`;

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans text-slate-900">

            {/* HEADER */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                        <LuTrendingUp className="text-indigo-600" />
                        Cross-Currency Matrix
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Briese Pseudo-COT Divergence Model (Non-Commercials)
                    </p>
                </div>

                {/* CONTROLS BAR */}
                <div className="flex flex-col md:flex-row gap-3 w-full xl:w-auto">

                    {/* Lookback Selector */}
                    <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm flex">
                        {['13w', '26w', '52w', '3y'].map((pd) => (
                            <button
                                key={pd}
                                onClick={() => setLookback(pd)}
                                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${lookback === pd
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                <LuClock size={14} className={lookback === pd ? "opacity-100" : "opacity-50"} />
                                {formatLookback(pd)}
                            </button>
                        ))}
                    </div>

                    {/* Backtesting Date Picker */}
                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm">
                        <LuCalendar className="text-slate-400" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-400 uppercase leading-none">Analysis Date</span>
                            <input
                                type="date"
                                value={analysisDate}
                                onChange={(e) => setAnalysisDate(e.target.value)}
                                className="text-sm font-bold text-slate-700 bg-transparent outline-none cursor-pointer h-5 p-0"
                            />
                        </div>
                    </div>

                    <button
                        onClick={loadData}
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition shadow-sm"
                    >
                        <LuRefreshCw className={loading ? "animate-spin" : ""} />
                    </button>
                </div>
            </div>

            {/* FILTER TABS */}
            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => setFilter('ALL')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition ${filter === 'ALL' ? 'bg-slate-800 text-white' : 'bg-white text-slate-500 border border-slate-200'}`}
                >
                    All Pairs
                </button>
                <button
                    onClick={() => setFilter('SIGNALS')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition ${filter === 'SIGNALS' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200' : 'bg-white text-slate-500 border border-slate-200'}`}
                >
                    <LuFilter size={14} /> Active Signals ({formatLookback(lookback)})
                </button>
            </div>

            {/* MATRIX TABLE */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">Cross Pair</th>
                                <th className="px-6 py-4 w-56">
                                    Pseudo Index ({formatLookback(lookback)})
                                </th>
                                <th className="px-6 py-4">Context (12w)</th>
                                <th className="px-6 py-4">Momentum (6w)</th>
                                <th className="px-6 py-4 text-right">Forecast</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr><td colSpan="5" className="p-12 text-center text-slate-400"><LuLoader className="animate-spin inline mr-2" /> Loading Market Data...</td></tr>
                            ) : displayData.length === 0 ? (
                                <tr><td colSpan="5" className="p-12 text-center text-slate-400">No data available for {analysisDate}. Try a more recent date.</td></tr>
                            ) : (
                                displayData.map((row) => (
                                    <tr key={row.id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-xs font-bold text-indigo-600 border border-indigo-100">
                                                    {row.base}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-800 text-base">{row.symbol}</div>
                                                    <div className="text-[10px] text-slate-400 uppercase tracking-wide">vs {row.quote}</div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Visual Bar */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <span className={`font-mono font-bold w-8 text-right ${row.pseudoIndex > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                                    {row.pseudoIndex?.toFixed(0)}
                                                </span>
                                                <div className="w-24 h-2 bg-slate-100 rounded-full relative overflow-visible">
                                                    {/* Center Line */}
                                                    <div className="absolute left-1/2 top-[-3px] bottom-[-3px] w-0.5 bg-slate-300"></div>
                                                    {/* Bar */}
                                                    <div
                                                        className={`absolute h-full rounded-full transition-all duration-500 ${row.pseudoIndex > 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                                                        style={{
                                                            left: '50%',
                                                            width: `${Math.abs(row.pseudoIndex) / 2}%`,
                                                            transform: row.pseudoIndex < 0 ? 'translateX(-100%)' : 'none'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </td>

                                        {/* Sparkline (Mini Trend) */}
                                        <td className="px-6 py-4">
                                            <div className="h-10 w-28 opacity-70 group-hover:opacity-100 transition-opacity">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart data={row.history}>
                                                        <Line
                                                            type="monotone"
                                                            dataKey="val"
                                                            stroke={row.pseudoIndex > 0 ? '#10b981' : '#f43f5e'}
                                                            strokeWidth={2}
                                                            dot={false}
                                                        />
                                                        <YAxis domain={[-100, 100]} hide />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </td>

                                        {/* Momentum */}
                                        <td className="px-6 py-4">
                                            <MovementIndicator value={row.movement} />
                                        </td>

                                        {/* Signal */}
                                        <td className="px-6 py-4 text-right">
                                            <SignalBadge value={row.pseudoIndex} />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default CrossRateDashboard
