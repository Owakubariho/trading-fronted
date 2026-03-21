import React, { useState } from "react";

const ForexLotCalculator = () => {
  const [accountSize, setAccountSize] = useState(1000);
  const [riskPercent, setRiskPercent] = useState(2);
  const [stopLossPips, setStopLossPips] = useState(20);
  const [pipValue, setPipValue] = useState(1);
  const [leverage, setLeverage] = useState(100);

  // Core calculations
  const riskAmount = (accountSize * riskPercent) / 100;
  const positionSizeLots = riskAmount / (pipValue * stopLossPips); // in lots based on pipValue
  const exposure =
    positionSizeLots *
    (pipValue === 10 ? 100000 : pipValue === 1 ? 10000 : 1000);
  const requiredMargin = exposure / leverage;

  // Lot breakdown
  const standardLots = exposure / 100000;
  const miniLots = exposure / 10000;
  const microLots = exposure / 1000;

  // Detect lot type from pip value
  let detectedLotType = "";
  if (pipValue === 10) detectedLotType = "Standard Lot";
  else if (pipValue === 1) detectedLotType = "Mini Lot";
  else if (pipValue === 0.1) detectedLotType = "Micro Lot";
  else detectedLotType = "Custom or Unknown Lot Type";

  return (
    <div className="max-w-xl mx-auto my-10 p-8 bg-white rounded-2xl shadow-2xl border border-blue-100 font-sans">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 flex items-center gap-2">
        <span role="img" aria-label="chart">
          📊
        </span>{" "}
        Forex Position Size Calculator
      </h2>
      <form className="grid grid-cols-1 gap-5 mb-8">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Account Size ($)
          </label>
          <input
            type="number"
            value={accountSize}
            onChange={(e) => setAccountSize(+e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Risk per Trade (%)
          </label>
          <input
            type="number"
            value={riskPercent}
            onChange={(e) => setRiskPercent(+e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            min="0"
            max="100"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Stop Loss (pips)
          </label>
          <input
            type="number"
            value={stopLossPips}
            onChange={(e) => setStopLossPips(+e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Pip Value ($)
          </label>
          <input
            type="number"
            step="0.01"
            value={pipValue}
            onChange={(e) => setPipValue(+e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Leverage{" "}
            <span className="text-xs text-gray-400">(e.g. 100 for 100:1)</span>
          </label>
          <input
            type="number"
            value={leverage}
            onChange={(e) => setLeverage(+e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            min="1"
          />
        </div>
      </form>
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">Results</h3>
        <div className="grid grid-cols-1 gap-3 bg-blue-50 rounded-lg p-4 border border-blue-100">
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Risk Amount:</span>
            <span className="font-mono">${riskAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Position Size:</span>
            <span className="font-mono">
              {positionSizeLots.toFixed(2)} lots ({exposure.toFixed(0)} units)
            </span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Required Margin:</span>
            <span className="font-mono">${requiredMargin.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Detected Lot Type:</span>
            <span className="font-mono">{detectedLotType}</span>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
          <span role="img" aria-label="magnifier">
            🔍
          </span>{" "}
          Lot Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg shadow p-4 flex flex-col items-center">
            <h4 className="text-lg font-bold text-blue-700 mb-1">
              🧮 Standard Lots
            </h4>
            <p className="font-mono text-xl">{standardLots.toFixed(2)}</p>
            <p className="text-xs text-gray-500">
              1 standard lot = 100,000 units
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow p-4 flex flex-col items-center">
            <h4 className="text-lg font-bold text-blue-700 mb-1">
              📦 Mini Lots
            </h4>
            <p className="font-mono text-xl">{miniLots.toFixed(2)}</p>
            <p className="text-xs text-gray-500">1 mini lot = 10,000 units</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow p-4 flex flex-col items-center">
            <h4 className="text-lg font-bold text-blue-700 mb-1">
              🔹 Micro Lots
            </h4>
            <p className="font-mono text-xl">{microLots.toFixed(2)}</p>
            <p className="text-xs text-gray-500">1 micro lot = 1,000 units</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForexLotCalculator;
