import React, { useState } from "react";

const StocksPercentageCalculator = () => {
  const [formData, setFormData] = useState({
    symbol: "",
    portfolioSize: "",
    sharePrice: "",
    stopPrice: "",
    riskAmount: "",
  });
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.symbol) newErrors.symbol = "Symbol is required";
    if (!formData.portfolioSize || formData.portfolioSize <= 0)
      newErrors.portfolioSize = "Portfolio size must be positive";
    if (!formData.sharePrice || formData.sharePrice <= 0)
      newErrors.sharePrice = "Share price must be positive";
    if (!formData.stopPrice || formData.stopPrice <= 0)
      newErrors.stopPrice = "Stop price must be positive";
    if (!formData.riskAmount || formData.riskAmount <= 0)
      newErrors.riskAmount = "Risk amount must be positive";
    if (
      formData.stopPrice &&
      formData.sharePrice &&
      parseFloat(formData.stopPrice) >= parseFloat(formData.sharePrice)
    ) {
      newErrors.stopPrice = "Must be less than share price";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateResults = () => {
    if (!validateForm()) return;
    const portfolioSize = parseFloat(formData.portfolioSize);
    const sharePrice = parseFloat(formData.sharePrice);
    const stopPrice = parseFloat(formData.stopPrice);
    const riskAmount = parseFloat(formData.riskAmount);
    const stopAmount = sharePrice - stopPrice;
    const sharesToBuy = Math.floor(riskAmount / stopAmount);
    const positionAmount = sharesToBuy * sharePrice;
    const positionSizePercent = (positionAmount / portfolioSize) * 100;
    const riskPercent = (riskAmount / portfolioSize) * 100;
    // Calculate tension table
    const tensionData = [];
    for (let i = 1; i <= 6; i++) {
      const profit = i * riskAmount;
      const targetPrice = sharePrice + profit / sharesToBuy;
      const percentGain = ((targetPrice - sharePrice) / sharePrice) * 100;
      tensionData.push({
        multiple: i,
        profit: profit.toFixed(2),
        targetPrice: targetPrice.toFixed(2),
        percentGain: percentGain.toFixed(2),
      });
    }
    setResults({
      stopAmount: stopAmount.toFixed(2),
      sharesToBuy,
      positionAmount: positionAmount.toFixed(2),
      positionSizePercent: positionSizePercent.toFixed(2),
      riskPercent: riskPercent.toFixed(2),
      tensionData,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearAll = () => {
    setFormData({
      symbol: "",
      portfolioSize: "",
      sharePrice: "",
      stopPrice: "",
      riskAmount: "",
    });
    setResults(null);
    setErrors({});
  };

  return (
    <div className="calculator-container bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">
        Risk Calculator
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Symbol:
            </label>
            <input
              type="text"
              name="symbol"
              value={formData.symbol}
              onChange={handleInputChange}
              className={`input-field w-full p-2 border rounded ${
                errors.symbol ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g. frvn"
            />
            {errors.symbol && (
              <p className="text-red-500 text-xs mt-1">{errors.symbol}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Portfolio Size $:
            </label>
            <input
              type="number"
              name="portfolioSize"
              value={formData.portfolioSize}
              onChange={handleInputChange}
              className={`input-field w-full p-2 border rounded ${
                errors.portfolioSize ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g. 25000"
            />
            {errors.portfolioSize && (
              <p className="text-red-500 text-xs mt-1">
                {errors.portfolioSize}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Share Price:
            </label>
            <input
              type="number"
              step="0.01"
              name="sharePrice"
              value={formData.sharePrice}
              onChange={handleInputChange}
              className={`input-field w-full p-2 border rounded ${
                errors.sharePrice ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g. 9.10"
            />
            {errors.sharePrice && (
              <p className="text-red-500 text-xs mt-1">{errors.sharePrice}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stop Price:
              {formData.sharePrice &&
                formData.stopPrice &&
                parseFloat(formData.stopPrice) >=
                  parseFloat(formData.sharePrice) && (
                  <span className="text-red-500 text-xs ml-2">
                    Must be less than share price
                  </span>
                )}
            </label>
            <input
              type="number"
              step="0.01"
              name="stopPrice"
              value={formData.stopPrice}
              onChange={handleInputChange}
              className={`input-field w-full p-2 border rounded ${
                errors.stopPrice ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g. 8.37"
            />
            {errors.stopPrice && (
              <p className="text-red-500 text-xs mt-1">{errors.stopPrice}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              $ Amount to Risk:
            </label>
            <input
              type="number"
              step="0.01"
              name="riskAmount"
              value={formData.riskAmount}
              onChange={handleInputChange}
              className={`input-field w-full p-2 border rounded ${
                errors.riskAmount ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g. 500"
            />
            {errors.riskAmount && (
              <p className="text-red-500 text-xs mt-1">{errors.riskAmount}</p>
            )}
          </div>
          <div className="flex space-x-4 pt-4">
            <button
              onClick={clearAll}
              className="clear-btn flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Clear All
            </button>
            <button
              onClick={calculateResults}
              className="calculate-btn flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Calculate
            </button>
          </div>
        </div>
        {/* Results Section */}
        <div className="space-y-6">
          {results && (
            <>
              {/* Results Table */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th colSpan="2" className="p-2 text-left font-semibold">
                        Results
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-medium">$ Stop Amount:</td>
                      <td className="p-2">{results.stopAmount}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium"># of Shares to Buy:</td>
                      <td className="p-2">{results.sharesToBuy}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">$ Amt Position:</td>
                      <td className="p-2">${results.positionAmount}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Position Size %:</td>
                      <td className="p-2">{results.positionSizePercent}%</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">
                        Risk as a % of Equity:
                      </td>
                      <td className="p-2">{results.riskPercent}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Tension Table */}
              <div className="mt-6">
                <h3 className="font-bold text-lg mb-2 text-center tension-header p-2 rounded-t-lg">
                  Tension
                </h3>
                <div className="border rounded-b-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-2">1-R (risk)</th>
                        <th className="p-2">2R</th>
                        <th className="p-2">3R</th>
                        <th className="p-2">4R</th>
                        <th className="p-2">5R</th>
                        <th className="p-2">6R</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        {results.tensionData.map((data, index) => (
                          <td key={index} className="p-2 text-center">
                            ${data.profit}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-t bg-gray-50">
                        <td colSpan="6" className="p-2 text-center font-medium">
                          Upside target based on R
                        </td>
                      </tr>
                      <tr className="border-t">
                        {results.tensionData.map((data, index) => (
                          <td key={index} className="p-2 text-center">
                            ${data.targetPrice}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-t bg-gray-50">
                        <td colSpan="6" className="p-2 text-center font-medium">
                          % Gain
                        </td>
                      </tr>
                      <tr className="border-t">
                        {results.tensionData.map((data, index) => (
                          <td key={index} className="p-2 text-center">
                            {data.percentGain}%
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
          {!results && (
            <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">
                Enter values and click Calculate to see results
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StocksPercentageCalculator;
