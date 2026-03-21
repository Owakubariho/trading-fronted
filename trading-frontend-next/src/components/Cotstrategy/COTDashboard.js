import React, { useState, useEffect, useMemo } from 'react';
import {
    ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Cell
} from 'recharts';
import {
    LuCircleArrowUp as ArrowUpCircle,
    LuCircleArrowDown as ArrowDownCircle,
    LuActivity as Activity,
    LuTrendingUp as TrendingUp,
    LuSearch as Search,
    LuLayers as Layers,
    LuLoader as Loader,
    LuFilter as Filter,
    LuArrowLeft as ArrowLeft,
} from 'react-icons/lu';

// --- 1. API FETCH ---
const fetchCOTData = async (symbol) => {
    try {
        // Determine if we need to search by full name or just symbol
        // The backend filters by report__symbol. The user might search "EUR" or "EURO FX..."
        // Ideally we search by exact symbol code if known, or let the backend handle partial search.
        // For now, let's assume the user enters the symbol code or we map it.
        // However, the `populate_cot44` script saves symbols like 'EURO FX', 'AUSTRALIAN DOLLAR'.
        // The dashboard currently defaults to 'EURO FX - CHICAGO MERCANTILE EXCHANGE'.
        // We should just pass the search term to the API.

        // Use absolute URL to avoid proxy issues, assuming backend is on 8000
        const response = await fetch(`http://127.0.0.1:8000/api/cot-analysis/?symbol=${encodeURIComponent(symbol)}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        // Map API response to frontend structure if needed (keys already match thanks to serializer)
        return data;
    } catch (error) {
        console.error("Error fetching COT data:", error);
        return [];
    }
};

// --- 2. METRIC CALCULATIONS ---
const calculateMetrics = (rawData, lookbackWeeks) => {
    if (!rawData || rawData.length === 0) return [];

    const getIndex = (val, min, max) => (max === min ? 50 : 100 * (val - min) / (max - min));

    // PASS 1: Calculate Indexes
    const processed = rawData.map((row, index, array) => {
        let cot_index = 50; // Main displayed index (Non-Comm)
        let comm_index_internal = 50; // Internal index for Movement/Stoch (Comm)

        if (index >= lookbackWeeks) {
            const slice = array.slice(index - lookbackWeeks + 1, index + 1);

            // 1. Non-Commercial Index (For Table Signals & Top Chart)
            const valsNonComm = slice.map(d => d.non_comm_net);
            cot_index = getIndex(row.non_comm_net, Math.min(...valsNonComm), Math.max(...valsNonComm));

            // 2. Commercial Index (For Movement Index & Stochastics)
            const valsComm = slice.map(d => d.comm_net);
            comm_index_internal = getIndex(row.comm_net, Math.min(...valsComm), Math.max(...valsComm));
        }

        return { ...row, cot_index, comm_index_internal };
    });

    // PASS 2: Calculate Momentum Indicators based on Indexes
    return processed.map((row, index, array) => {
        let movement_index = 0;
        let stoch_k = 50;
        let stoch_d = 50;
        let macd_hist = 0;

        // A. Movement Index -> Based on COMMERCIALS
        if (index >= 6) {
            movement_index = row.comm_index_internal - array[index - 6].comm_index_internal;
        }

        // B. Stochastics -> Based on COMMERCIALS (%K = Comm Index)
        stoch_k = row.comm_index_internal;
        if (index >= 2) {
            const sliceK = array.slice(index - 2, index + 1).map(d => d.comm_index_internal);
            stoch_d = sliceK.reduce((a, b) => a + b, 0) / sliceK.length;
        }

        // C. MACD -> Based on COMMERCIALS Net Position
        macd_hist = (row.comm_net / 1000) * 0.8;

        return {
            ...row,
            movement_index, // Comm
            stoch_k,        // Comm
            stoch_d,        // Comm
            macd_hist       // Comm
        };
    });
};

// --- COMPONENTS ---
const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm ${className}`}>
        {children}
    </div>
);

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/95 backdrop-blur border border-slate-200 p-3 rounded-lg shadow-xl text-xs z-50">
                <p className="font-bold text-slate-700 mb-2 border-b pb-1">{label}</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between gap-4 mb-1">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: entry.color || entry.fill }}></span>
                            <span className="text-slate-500 capitalize font-medium">{entry.name}:</span>
                        </div>
                        <span className="font-mono font-bold text-slate-700">
                            {typeof entry.value === 'number' ? entry.value.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : entry.value}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

// --- MAIN COMPONENT ---
function COTDashboard() {
    const [assetSearch, setAssetSearch] = useState('EURO FX');
    const [activeAsset, setActiveAsset] = useState('EURO FX');
    const [rawHistory, setRawHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [availableSymbols, setAvailableSymbols] = useState([]);

    // Fetch available symbols on mount
    useEffect(() => {
        const fetchSymbols = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/cot-analysis/symbols/');
                if (response.ok) {
                    const data = await response.json();
                    setAvailableSymbols(data);
                }
            } catch (err) {
                console.error("Error fetching symbols:", err);
            }
        };
        fetchSymbols();
    }, []);

    const [lookback, setLookback] = useState(52);

    // Date Range Logic
    const today = new Date().toISOString().split('T')[0];
    const defaultStart = new Date(new Date().setFullYear(new Date().getFullYear() - 5)).toISOString().split('T')[0];
    const [dateRange, setDateRange] = useState({ start: defaultStart, end: today });
    const [formDates, setFormDates] = useState({ start: defaultStart, end: today });

    // 1. Fetch
    const fetchData = async (symbol) => {
        setLoading(true);
        setRawHistory([]); // Clear previous data immediately to indicate change
        try {
            // Remove exchange name if present for cleaner searching, or pass as is
            // backend expects 'EURO FX', 'AUSTRALIAN DOLLAR' etc.
            // dashboard default is 'EURO FX - CHICAGO MERCANTILE EXCHANGE'
            // populate script saves 'EURO FX' (symbol_clean = asset_fullname.split('-')[0].strip())

            let querySymbol = symbol;
            if (symbol.includes('-')) {
                querySymbol = symbol.split('-')[0].trim();
            }

            const data = await fetchCOTData(querySymbol);
            setRawHistory(data);
            setActiveAsset(querySymbol);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData("EURO FX");
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchData(assetSearch);
    };

    // 2. Calculation (Full History)
    const fullHistoryMetrics = useMemo(() => {
        return calculateMetrics(rawHistory, lookback);
    }, [rawHistory, lookback]);

    // 3. Filtering (View Layer)
    const viewData = useMemo(() => {
        if (fullHistoryMetrics.length === 0) return [];
        const startTs = new Date(dateRange.start).getTime();
        const endTs = new Date(dateRange.end).getTime();

        return fullHistoryMetrics.filter(d => {
            const dTs = new Date(d.date).getTime();
            return dTs >= startTs && dTs <= endTs;
        });
    }, [fullHistoryMetrics, dateRange]);

    const handleDateFilter = (e) => {
        e.preventDefault();
        setDateRange({ ...formDates });
    };

    const latest = viewData.length > 0 ? viewData[viewData.length - 1] : null;

    if (loading) return <div className="h-screen flex items-center justify-center text-slate-500"><Loader className="animate-spin mr-2" /> Loading Data...</div>;
    if (!latest) return <div className="h-screen flex items-center justify-center text-slate-500">No Data Found for "{activeAsset}". Trying to fetch from: http://127.0.0.1:8000/api/cot-analysis/</div>;

    // Signal Logic
    const isBull = latest.cot_index >= 90; // Non-Commercial Index
    const isBear = latest.cot_index <= 5;  // Non-Commercial Index

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">

            {/* TOP BAR */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 mb-8">
                <div>
                    <button className="flex items-center text-indigo-600 hover:text-indigo-800 mb-2 text-sm font-semibold">
                        <ArrowLeft size={16} className="mr-1" /> Dashboard
                    </button>
                    <h1 className="text-3xl font-bold text-slate-800">{activeAsset} Analysis</h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Index: <span className="font-bold text-blue-600">Non-Comm</span> | Momentum: <span className="font-bold text-red-600">Comm</span>
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-3 w-full xl:w-auto">
                    {/* Search */}
                    <form onSubmit={handleSearch} className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            value={assetSearch}
                            onChange={(e) => {
                                const val = e.target.value.toUpperCase();
                                setAssetSearch(val);
                                // Auto-fetch if exact match found in list (e.g. user selected from dropdown)
                                if (availableSymbols.includes(val)) {
                                    fetchData(val);
                                }
                            }}
                            list="symbol-options"
                            className="pl-9 pr-4 py-2 w-full md:w-48 bg-white border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none uppercase text-sm"
                            placeholder="SEARCH SYMBOL..."
                        />
                        <datalist id="symbol-options">
                            {availableSymbols.map((sym) => (
                                <option key={sym} value={sym} />
                            ))}
                        </datalist>
                    </form>

                    {/* Lookback Buttons */}
                    <div className="bg-white p-1 rounded-lg border border-slate-200 flex shadow-sm">
                        {[13, 26, 52, 156].map(weeks => (
                            <button
                                key={weeks}
                                onClick={() => setLookback(weeks)}
                                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${lookback === weeks ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:bg-slate-50'}`}
                            >
                                {weeks === 156 ? '3Y' : `${weeks}W`}
                            </button>
                        ))}
                    </div>

                    {/* Date Range Picker */}
                    <form onSubmit={handleDateFilter} className="flex bg-white p-1 rounded-lg border border-slate-200 shadow-sm items-center">
                        <input
                            type="date"
                            value={formDates.start}
                            onChange={e => setFormDates({ ...formDates, start: e.target.value })}
                            className="text-xs p-1.5 outline-none text-slate-600 font-medium bg-transparent w-24"
                        />
                        <span className="text-slate-300 px-1">-</span>
                        <input
                            type="date"
                            value={formDates.end}
                            onChange={e => setFormDates({ ...formDates, end: e.target.value })}
                            className="text-xs p-1.5 outline-none text-slate-600 font-medium bg-transparent w-24"
                        />
                        <button type="submit" className="ml-1 p-1.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-600">
                            <Filter size={14} />
                        </button>
                    </form>
                </div>
            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 gap-6 mb-8">

                {/* 1. COT INDEX (Based on Non-Commercials) */}
                <Card className="p-5 pb-0">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-700 flex items-center gap-2 text-sm">
                            <Activity size={16} className="text-blue-500" />
                            Non-Commercial COT Index ({lookback}W)
                        </h3>
                    </div>
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer>
                            <ComposedChart data={viewData} syncId="cotSync" margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="date" hide />
                                <YAxis orientation="right" domain={[0, 100]} tick={{ fontSize: 10 }} stroke="#94a3b8" />
                                <Tooltip content={<CustomTooltip />} />
                                <ReferenceLine y={90} stroke="#f43f5e" strokeDasharray="3 3" />
                                <ReferenceLine y={5} stroke="#10b981" strokeDasharray="3 3" />
                                <Line type="monotone" dataKey="cot_index" stroke="#3b82f6" strokeWidth={2} dot={false} name="Non-Comm Index" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* 2. NET POSITIONS (Stacked) */}
                <Card className="p-5 pb-0">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-700 flex items-center gap-2 text-sm">
                            <TrendingUp size={16} className="text-slate-500" />
                            Net Positions
                        </h3>
                        <div className="flex gap-3 text-xs font-medium">
                            <div className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-sm"></span> Comm</div>
                            <div className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-sm"></span> Non-Comm</div>
                        </div>
                    </div>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer>
                            <ComposedChart data={viewData} syncId="cotSync" margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="date" hide />
                                <YAxis orientation="right" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                                <Tooltip content={<CustomTooltip />} />
                                <ReferenceLine y={0} stroke="#cbd5e1" />
                                <Bar dataKey="comm_net" fill="#ef4444" name="Commercials" barSize={3} />
                                <Bar dataKey="non_comm_net" fill="#3b82f6" name="Non-Commercials" barSize={3} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* 3. MOMENTUM (Stoch & MACD on Commercials) */}
                <Card className="p-5 pb-0">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-700 flex items-center gap-2 text-sm">
                            <Layers size={16} className="text-red-500" />
                            Commercial Momentum (Stoch & MACD)
                        </h3>
                    </div>
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer>
                            <ComposedChart data={viewData} syncId="cotSync" margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="date" hide />
                                <YAxis yAxisId="stoch" orientation="right" domain={[0, 100]} tick={{ fontSize: 10 }} stroke="#3b82f6" />
                                <YAxis yAxisId="macd" orientation="left" hide />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar yAxisId="macd" dataKey="macd_hist" fill="#cbd5e1" opacity={0.5} name="MACD Hist" barSize={3} />
                                <Line yAxisId="stoch" type="monotone" dataKey="stoch_k" stroke="#3b82f6" strokeWidth={1.5} dot={false} name="Stoch %K" />
                                <Line yAxisId="stoch" type="monotone" dataKey="stoch_d" stroke="#ef4444" strokeWidth={1.5} strokeDasharray="3 3" dot={false} name="Stoch %D" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* 4. MOVEMENT INDEX (On Commercials) */}
                <Card className="p-5 pb-0">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-700 flex items-center gap-2 text-sm">
                            <Activity size={16} className="text-red-500" />
                            Movement Index (Commercials)
                        </h3>
                    </div>
                    <div className="h-[150px] w-full">
                        <ResponsiveContainer>
                            <ComposedChart data={viewData} syncId="cotSync" margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#94a3b8" minTickGap={40} />
                                <YAxis orientation="right" domain={[-100, 100]} tick={{ fontSize: 10 }} stroke="#94a3b8" />
                                <Tooltip content={<CustomTooltip />} />
                                <ReferenceLine y={40} stroke="#10b981" strokeDasharray="2 2" />
                                <ReferenceLine y={-40} stroke="#f43f5e" strokeDasharray="2 2" />
                                <Bar dataKey="movement_index" name="Mov Index" barSize={3}>
                                    {viewData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.movement_index > 0 ? '#10b981' : '#f43f5e'} opacity={Math.abs(entry.movement_index) >= 40 ? 1 : 0.4} />
                                    ))}
                                </Bar>
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

            </div>

            {/* TABLE */}
            <Card className="overflow-hidden">
                <div className="p-4 border-b border-slate-200 bg-slate-50">
                    <h3 className="font-bold text-sm text-slate-700">Historical Signal Analysis</h3>
                </div>
                <div className="overflow-x-auto max-h-[400px]">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-white text-slate-500 font-semibold text-xs sticky top-0 z-10 shadow-sm">
                            <tr>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Non-Comm Net</th>
                                <th className="px-6 py-3 text-blue-600">Non-Comm Index</th>
                                <th className="px-6 py-3 text-red-600">Mov. Index (Comm)</th>
                                <th className="px-6 py-3 text-red-600">Comm Stoch %K</th>
                                <th className="px-6 py-3 text-right">Signal (Non-Comm)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {[...viewData].reverse().map((row, idx) => {
                                // Signals based on Non-Commercial Index
                                const idxVal = row.cot_index;
                                const isBull = idxVal >= 90;
                                const isBear = idxVal <= 5;

                                // Movement Index based on Commercials
                                const movIdx = row.movement_index;
                                const isSurge = movIdx >= 40;
                                const isPlunge = movIdx <= -40;

                                return (
                                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-3 font-mono text-xs">{row.date}</td>
                                        <td className="px-6 py-3 font-medium text-xs">{row.non_comm_net.toLocaleString()}</td>
                                        <td className="px-6 py-3 font-bold text-slate-800">{idxVal.toFixed(1)}%</td>
                                        <td className="px-6 py-3">
                                            <span className={`${movIdx > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                                {movIdx > 0 ? '+' : ''}{movIdx.toFixed(1)}
                                            </span>
                                            {isSurge && <span className="ml-2 text-[9px] bg-emerald-100 text-emerald-800 px-1 rounded font-bold">SURGE</span>}
                                            {isPlunge && <span className="ml-2 text-[9px] bg-rose-100 text-rose-800 px-1 rounded font-bold">PLUNGE</span>}
                                        </td>
                                        <td className="px-6 py-3 text-slate-400">{row.stoch_k.toFixed(1)}</td>
                                        <td className="px-6 py-3 text-right">
                                            {isBear ? <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded border border-blue-200">MAX LONG</span> :
                                                isBull ? <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-rose-100 text-rose-700 px-2 py-1 rounded border border-rose-200">MAX SHORT</span> :
                                                    <span className="text-slate-300">-</span>}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
export default COTDashboard;