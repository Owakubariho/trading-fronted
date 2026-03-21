"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ASSETS } from './assetList';
import COTTable from './COTTable';
import { motion } from 'framer-motion';

const COTAnalysis = () => {
    const [selectedAsset, setSelectedAsset] = useState(ASSETS[0].value);
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const encodedAsset = encodeURIComponent(selectedAsset);
                const url = `http://localhost:8000/api/cot-data/?asset=${encodedAsset}`;

                const response = await axios.get(url);
                setReportData(response.data);
            } catch (err) {
                console.error("Error fetching COT data:", err);
                setError("Failed to load data. Please ensure Django is running.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedAsset]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-6"
        >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        COT Report Analysis
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Detailed weekly commitment of traders data</p>
                </div>

                <div className="w-full sm:w-72">
                    <label className="block text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1.5 ml-1">
                        Select Asset
                    </label>
                    <select
                        value={selectedAsset}
                        onChange={(e) => setSelectedAsset(e.target.value)}
                        className="block w-full p-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                    >
                        {ASSETS.map((asset) => (
                            <option key={asset.value} value={asset.value}>
                                {asset.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {error && (
                <div className="p-4 text-sm text-red-700 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded shadow-sm">
                    {error}
                </div>
            )}

            <COTTable data={reportData} isLoading={loading} />
        </motion.div>
    );
};

export default COTAnalysis;
