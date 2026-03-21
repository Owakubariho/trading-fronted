import React, { useState } from "react";

const StocksDollarRiskCalculator = () => {
  // Initial state
  const [inputs, setInputs] = useState({
    symbol: "frm",
    sharePrice: 5.1,
    portfolioSize: 10000,
    positionSizePercent: 25,
    stopPercent: 8,
  });

  const [results, setResults] = useState(null);
  const [calculated, setCalculated] = useState(false);

  // Calculate function
  const calculateResults = () => {
    // Perform calculations
    const amtPosition =
      (inputs.portfolioSize * inputs.positionSizePercent) / 100;
    const sharesToBuy = Math.floor(amtPosition / inputs.sharePrice);
    const riskPerShare = inputs.sharePrice * (inputs.stopPercent / 100);
    const stopAmount = sharesToBuy * riskPerShare;
    const riskPercent = (stopAmount / inputs.portfolioSize) * 100;
    const stopPrice = inputs.sharePrice - riskPerShare;

    // R multiples for the table
    const rMultiples = [2.8, 3.8, 4.8, 5.8, 6.8];
    const rTableData = rMultiples.map((multiple) => {
      const profitPerShare = riskPerShare * multiple;
      const targetPrice = inputs.sharePrice + profitPerShare;
      const gainPercent = (profitPerShare / inputs.sharePrice) * 100;

      return {
        multiple,
        profitPerShare,
        targetPrice,
        gainPercent,
      };
    });

    setResults({
      amtPosition,
      sharesToBuy,
      stopAmount,
      riskPercent,
      stopPrice,
      rTableData,
    });

    setCalculated(true);
  };

  // Clear function
  const clearAll = () => {
    setInputs({
      symbol: "frm",
      sharePrice: 5.1,
      portfolioSize: 10000,
      positionSizePercent: 25,
      stopPercent: 8,
    });
    setResults(null);
    setCalculated(false);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Format number
  const formatNumber = (value) => {
    return new Intl.NumberFormat("en-US").format(value);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md font-sans">
      <header className="text-center mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">
          ASLAPH FUND ( Trading System)
        </h1>
        <h2 className="text-lg text-gray-600 mt-1">Risk Calculator</h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-1">Symbol:</label>
          <input
            type="text"
            name="symbol"
            value={inputs.symbol}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-1">Share Price:</label>
          <input
            type="number"
            step="0.01"
            name="sharePrice"
            value={inputs.sharePrice}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-1">
            Portfolio Size $:
          </label>
          <input
            type="number"
            name="portfolioSize"
            value={inputs.portfolioSize}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-1">
            Position Size %:
          </label>
          <input
            type="number"
            name="positionSizePercent"
            value={inputs.positionSizePercent}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-1">% Stop:</label>
          <input
            type="number"
            name="stopPercent"
            value={inputs.stopPercent}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <button
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          onClick={clearAll}
        >
          Clear All
        </button>
        <button
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          onClick={calculateResults}
        >
          Calculate
        </button>
      </div>

      {calculated && results && (
        <>
          <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              Calculation Results
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium text-gray-600">
                  $ Amt Position:
                </span>
                <span className="font-bold text-gray-800">
                  {formatCurrency(results.amtPosition)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium text-gray-600">
                  # of Share to Buy:
                </span>
                <span className="font-bold text-gray-800">
                  {formatNumber(results.sharesToBuy)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium text-gray-600">
                  $ Stop Amount:
                </span>
                <span className="font-bold text-gray-800">
                  {formatCurrency(results.stopAmount)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium text-gray-600">Stop Price:</span>
                <span className="font-bold text-gray-800">
                  {formatCurrency(results.stopPrice)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium text-gray-600">
                  Risk as a % of Equity:
                </span>
                <span className="font-bold text-gray-800">
                  {results.riskPercent.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm mb-6 overflow-x-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              R-Multiple Analysis
            </h3>
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-2 border border-gray-300">1-R (risk)</th>
                  {results.rTableData.map((data) => (
                    <th
                      key={data.multiple}
                      className="p-2 border border-gray-300"
                    >
                      {data.multiple}R
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-gray-300 font-medium">
                    {formatCurrency(results.stopAmount / results.sharesToBuy)}
                  </td>
                  {results.rTableData.map((data) => (
                    <td
                      key={data.multiple}
                      className="p-2 border border-gray-300 text-center"
                    >
                      {formatCurrency(data.profitPerShare)}
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-2 border border-gray-300 font-medium">
                    Upside target based on R:
                  </td>
                  {results.rTableData.map((data) => (
                    <td
                      key={data.multiple}
                      className="p-2 border border-gray-300 text-center"
                    >
                      {formatCurrency(data.targetPrice)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-2 border border-gray-300 font-medium">
                    % Gain
                  </td>
                  {results.rTableData.map((data) => (
                    <td
                      key={data.multiple}
                      className="p-2 border border-gray-300 text-center"
                    >
                      {data.gainPercent.toFixed(0)}%
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}

      <footer className="text-center pt-4 mt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          2009-2015 Copyright © International Private Access LLC. All rights
          reserved.
        </p>
        <p className="text-sm text-gray-500">
          Do not duplicate or redistribute in any form.
        </p>
      </footer>
    </div>
  );
};

export default StocksDollarRiskCalculator;
