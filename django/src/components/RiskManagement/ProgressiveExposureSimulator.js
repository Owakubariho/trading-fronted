import React, { useState, useCallback } from "react";

const ProgressiveExposureSimulator = () => {
  const [currentExposure, setCurrentExposure] = useState(25);
  const [positions, setPositions] = useState([]);
  const [activeTab, setActiveTab] = useState("strategy");

  const addPosition = (size) => {
    if (
      positions.reduce((sum, pos) => sum + pos.size, 0) + size >
      currentExposure
    ) {
      alert("Cannot exceed current exposure limit");
      return;
    }
    setPositions([
      ...positions,
      { size, stopLoss: 4, profitTarget: 2, outcome: "pending" },
    ]);
  };

  const removePosition = (index) => {
    const newPositions = [...positions];
    newPositions.splice(index, 1);
    setPositions(newPositions);
  };

  const updatePositionOutcome = (index, outcome) => {
    const newPositions = [...positions];
    newPositions[index].outcome = outcome;
    setPositions(newPositions);
  };

  // Calculate total allocated exposure
  const allocatedExposure = positions.reduce((sum, pos) => sum + pos.size, 0);

  return (
    <div className="max-w-6xl mx-auto p-4 font-sans">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Progressive Exposure Trading System
      </h1>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "strategy"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("strategy")}
        >
          Strategy Overview
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "positions"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("positions")}
        >
          Position Management
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "examples"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("examples")}
        >
          Visual Examples
        </button>
      </div>

      {activeTab === "strategy" && (
        <div className="space-y-8">
          {/* Core Principles */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Core Principles of Progressive Exposure
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-700">
                  Basic Rules
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-800 font-bold">1</span>
                    </div>
                    <span>Start with small "Pilot Buys" (6.25% positions)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-800 font-bold">2</span>
                    </div>
                    <span>
                      Only increase position size after successful trades
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-800 font-bold">3</span>
                    </div>
                    <span>Never increase exposure during losing streaks</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-700">
                  Exposure Progression
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-lg bg-green-100 flex items-center justify-center mr-4">
                      <span className="text-2xl font-bold text-green-800">
                        25%
                      </span>
                    </div>
                    <span>Start with 1-2 positions (6.25% or 12.5% each)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                      <span className="text-2xl font-bold text-blue-800">
                        50%
                      </span>
                    </div>
                    <span>Progress to 3-4 positions after initial success</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-lg bg-orange-100 flex items-center justify-center mr-4">
                      <span className="text-2xl font-bold text-orange-800">
                        100%
                      </span>
                    </div>
                    <span>
                      Full exposure only with consistent profitability
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Management */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Risk Management
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-700">
                  Position Sizing
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Total Exposure:</span>
                    <span className="font-medium">{currentExposure}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${currentExposure}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adjust Exposure Limit:
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="25"
                    value={currentExposure}
                    onChange={(e) =>
                      setCurrentExposure(parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-700">
                  Key Metrics
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Allocated Exposure:</span>
                    <span className="font-bold">
                      {allocatedExposure.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Available Exposure:</span>
                    <span className="font-bold text-blue-600">
                      {(currentExposure - allocatedExposure).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Risk Per Trade:</span>
                    <span className="font-bold">1-2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "positions" && (
        <div className="space-y-6">
          {/* Position Controls */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Manage Positions
            </h2>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <button
                onClick={() => addPosition(6.25)}
                disabled={allocatedExposure + 6.25 > currentExposure}
                className={`py-3 px-4 rounded-lg flex flex-col items-center ${
                  allocatedExposure + 6.25 > currentExposure
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-green-50 text-green-700 hover:bg-green-100"
                }`}
              >
                <span className="text-xl font-bold">6.25%</span>
                <span className="text-sm">Quarter Position</span>
              </button>
              <button
                onClick={() => addPosition(12.5)}
                disabled={allocatedExposure + 12.5 > currentExposure}
                className={`py-3 px-4 rounded-lg flex flex-col items-center ${
                  allocatedExposure + 12.5 > currentExposure
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                }`}
              >
                <span className="text-xl font-bold">12.5%</span>
                <span className="text-sm">Half Position</span>
              </button>
              <button
                onClick={() => addPosition(25)}
                disabled={allocatedExposure + 25 > currentExposure}
                className={`py-3 px-4 rounded-lg flex flex-col items-center ${
                  allocatedExposure + 25 > currentExposure
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-orange-50 text-orange-700 hover:bg-orange-100"
                }`}
              >
                <span className="text-xl font-bold">25%</span>
                <span className="text-sm">Full Position</span>
              </button>
            </div>

            {/* Current Positions */}
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Current Positions ({positions.length})
            </h3>
            {positions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No positions added yet. Start by adding quarter, half or full
                positions.
              </div>
            ) : (
              <div className="space-y-4">
                {positions.map((pos, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-gray-800">
                          Position {index + 1} - {pos.size}% Exposure
                        </h4>
                        <div className="flex space-x-4 mt-1">
                          <span className="text-sm text-gray-600">
                            Stop: {pos.stopLoss}%
                          </span>
                          <span className="text-sm text-gray-600">
                            Target: {pos.profitTarget}:1
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removePosition(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updatePositionOutcome(index, "winning")}
                        className={`flex-1 py-2 rounded-md ${
                          pos.outcome === "winning"
                            ? "bg-green-600 text-white font-bold"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                      >
                        Winning
                      </button>
                      <button
                        onClick={() => updatePositionOutcome(index, "losing")}
                        className={`flex-1 py-2 rounded-md ${
                          pos.outcome === "losing"
                            ? "bg-red-600 text-white font-bold"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                        }`}
                      >
                        Losing
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "examples" && (
        <div className="space-y-8">
          {/* Visual Examples Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Progressive Exposure Visual Guide
            </h2>

            {/* 25% Exposure Examples */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                25% Exposure Approaches
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-3">
                    Single Position Approach
                  </h4>
                  <div className="flex justify-center mb-3">
                    <div className="w-32 h-32 rounded-lg bg-orange-100 flex items-center justify-center">
                      <span className="text-2xl font-bold text-orange-800">
                        25%
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Start with one 25% position. If successful, add another 25%
                    position to reach 50% exposure.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-3">
                    Diversified Approach
                  </h4>
                  <div className="flex flex-wrap justify-center gap-2 mb-3">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-16 h-16 rounded-lg bg-green-100 flex items-center justify-center"
                      >
                        <span className="text-lg font-bold text-green-800">
                          6.25%
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">
                    Spread risk across 4 smaller positions (4 x 6.25% = 25%).
                    Allows testing multiple trades.
                  </p>
                </div>
              </div>
            </div>

            {/* 50% Exposure Examples */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                50% Exposure Approaches
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-3">
                    Concentrated Approach
                  </h4>
                  <div className="flex flex-wrap justify-center gap-2 mb-3">
                    {[...Array(2)].map((_, i) => (
                      <div
                        key={i}
                        className="w-24 h-24 rounded-lg bg-orange-100 flex items-center justify-center"
                      >
                        <span className="text-xl font-bold text-orange-800">
                          25%
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">
                    Two full positions (2 x 25% = 50%). Requires high confidence
                    after initial success.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-3">
                    Balanced Approach
                  </h4>
                  <div className="flex flex-wrap justify-center gap-2 mb-3">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center"
                      >
                        <span className="text-sm font-bold text-green-800">
                          6.25%
                        </span>
                      </div>
                    ))}
                    {[...Array(2)].map((_, i) => (
                      <div
                        key={i}
                        className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center"
                      >
                        <span className="text-sm font-bold text-blue-800">
                          12.5%
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">
                    Mix of positions (4 x 6.25% + 2 x 12.5% = 50%). Gradually
                    increases size on winners.
                  </p>
                </div>
              </div>
            </div>

            {/* 100% Exposure Examples */}
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                100% Exposure Approaches
              </h3>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-3">
                  Full Portfolio Deployment
                </h4>
                <div className="flex flex-wrap justify-center gap-2 mb-3">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-24 h-24 rounded-lg bg-orange-100 flex items-center justify-center"
                    >
                      <span className="text-xl font-bold text-orange-800">
                        25%
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-gray-600">
                  Maximum exposure with four full positions (4 x 25% = 100%).
                  Only after consistent profitability.
                </p>
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800 text-sm">
                    <span className="font-bold">Warning:</span> Full exposure
                    significantly increases risk. Only recommended when all
                    positions are high-probability trades with proper risk
                    management.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trade Sequence Example */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Progressive Trade Sequence Example
            </h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  1. Quarter Position (6.25%)
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Position Size</p>
                    <p className="font-bold">6.25%</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Stop Loss</p>
                    <p className="font-bold">4% ($250)</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Profit Target</p>
                    <p className="font-bold">2:1 ($500)</p>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-green-50 rounded-lg">
                  <p className="text-green-800 font-medium">
                    WINNING TRADE (+$500)
                  </p>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  2. Half Position (12.5%)
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Position Size</p>
                    <p className="font-bold">12.5%</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Stop Loss</p>
                    <p className="font-bold">4% ($500)</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Profit Target</p>
                    <p className="font-bold">2:1 ($1000)</p>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-green-50 rounded-lg">
                  <p className="text-green-800 font-medium">
                    WINNING TRADE (+$1000)
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  3. Full Position (25%)
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Position Size</p>
                    <p className="font-bold">25%</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Stop Loss</p>
                    <p className="font-bold">4% ($1000)</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Profit Target</p>
                    <p className="font-bold">2:1 ($2000)</p>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-red-50 rounded-lg">
                  <p className="text-red-800 font-medium">
                    LOSING TRADE (-$1000)
                  </p>
                </div>
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <p className="text-blue-800">
                    <span className="font-bold">Net Result:</span> +$500 (First
                    trade) + $1000 (Second trade) - $1000 (Third trade) ={" "}
                    <span className="font-bold">+$500</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressiveExposureSimulator;
