// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ASSETS } from './assetList';
import COTTable from './COTTable';

const Dashboard = () => {
  // Default to first asset (AUD)
  const [selectedAsset, setSelectedAsset] = useState(ASSETS[0].value);
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Encode the string because it contains spaces and special chars
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
  }, [selectedAsset]); // Re-run whenever selectedAsset changes

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          COT Report Analysis
        </h1>

        {/* The Dropdown Selector */}
        <div className="w-64">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Asset
          </label>
          <select
            value={selectedAsset}
            onChange={(e) => setSelectedAsset(e.target.value)}
            className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      {/* Render the Table */}
      <COTTable data={reportData} isLoading={loading} />
    </div>
  );
};

export default Dashboard;