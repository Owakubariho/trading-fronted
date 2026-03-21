import React, { useState, useEffect } from "react";
import { Chart } from "chart.js/auto";

const Metrics = () => {
  // State for all application data
  const [openPositions, setOpenPositions] = useState([]);
  const [closedPositions, setClosedPositions] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showReduceForm, setShowReduceForm] = useState(false);
  const [currentSymbol, setCurrentSymbol] = useState("");
  const [newTrade, setNewTrade] = useState({
    symbol: "",
    shares: "",
    entryPrice: "",
    date: new Date().toISOString().split("T")[0],
    commission: "",
    notes: "",
  });
  const [reduceTrade, setReduceTrade] = useState({
    symbol: "",
    sharesToSell: "",
    exitPrice: "",
    date: new Date().toISOString().split("T")[0],
    commission: "",
    notes: "",
    allocation: [],
  });
  const [activeTab, setActiveTab] = useState("positions");

  // Load sample data (in a real app, this would come from an API)
  useEffect(() => {
    // Initialize with some sample data
    setOpenPositions([
      {
        id: 1,
        symbol: "FIVN",
        shares: 2000,
        entryPrice: 9.13,
        entryDate: "2023-05-18",
      },
      {
        id: 2,
        symbol: "AAPL",
        shares: 100,
        entryPrice: 150.25,
        entryDate: "2023-06-01",
      },
    ]);

    setClosedPositions([
      {
        id: 1,
        symbol: "NUAN",
        shares: 450,
        entryPrice: 26.15,
        exitPrice: 28.3,
        entryDate: "2012-01-05",
        exitDate: "2012-01-11",
        commission: 9.0,
      },
      {
        id: 2,
        symbol: "ACAT",
        shares: 500,
        entryPrice: 22.66,
        exitPrice: 29.44,
        entryDate: "2012-01-13",
        exitDate: "2012-01-26",
        commission: 0.0,
      },
    ]);
  }, []);

  // Calculate performance metrics
  const calculateMetrics = () => {
    const winners = closedPositions.filter((t) => t.exitPrice > t.entryPrice);
    const losers = closedPositions.filter((t) => t.exitPrice < t.entryPrice);

    const avgGain =
      winners.length > 0
        ? winners.reduce(
            (sum, t) =>
              sum + ((t.exitPrice - t.entryPrice) / t.entryPrice) * 100,
            0
          ) / winners.length
        : 0;

    const avgLoss =
      losers.length > 0
        ? losers.reduce(
            (sum, t) =>
              sum + ((t.entryPrice - t.exitPrice) / t.entryPrice) * 100,
            0
          ) / losers.length
        : 0;

    const winRate =
      closedPositions.length > 0
        ? (winners.length / closedPositions.length) * 100
        : 0;

    const winLossRatio = avgLoss !== 0 ? avgGain / avgLoss : 0;
    const adjustedRatio =
      winRate >= 50 ? winLossRatio : winLossRatio * (winRate / 100) * 2;

    return {
      avgGain,
      avgLoss,
      winRate,
      winLossRatio,
      adjustedRatio,
      largestGain:
        winners.length > 0
          ? Math.max(
              ...winners.map(
                (t) => ((t.exitPrice - t.entryPrice) / t.entryPrice) * 100
              )
            )
          : 0,
      largestLoss:
        losers.length > 0
          ? Math.min(
              ...losers.map(
                (t) => ((t.exitPrice - t.entryPrice) / t.entryPrice) * 100
              )
            )
          : 0,
      totalTrades: closedPositions.length,
      winningTrades: winners.length,
      losingTrades: losers.length,
    };
  };

  const metrics = calculateMetrics();

  // Handle adding a new position
  const handleAddPosition = () => {
    const newPosition = {
      id: Date.now(),
      symbol: newTrade.symbol.toUpperCase(),
      shares: parseInt(newTrade.shares),
      entryPrice: parseFloat(newTrade.entryPrice),
      entryDate: newTrade.date,
      commission: newTrade.commission ? parseFloat(newTrade.commission) : 0,
      notes: newTrade.notes,
    };

    setOpenPositions([...openPositions, newPosition]);
    setShowAddForm(false);
    setNewTrade({
      symbol: "",
      shares: "",
      entryPrice: "",
      date: new Date().toISOString().split("T")[0],
      commission: "",
      notes: "",
    });
  };

  // Handle reducing/closing a position
  const handleReducePosition = () => {
    const positionIndex = openPositions.findIndex(
      (p) => p.symbol === reduceTrade.symbol
    );
    if (positionIndex === -1) return;

    const position = openPositions[positionIndex];
    const sharesToClose = parseInt(reduceTrade.sharesToSell);

    if (sharesToClose >= position.shares) {
      // Close entire position
      const closedTrade = {
        ...position,
        exitPrice: parseFloat(reduceTrade.exitPrice),
        exitDate: reduceTrade.date,
        commission: reduceTrade.commission
          ? parseFloat(reduceTrade.commission)
          : 0,
        notes: reduceTrade.notes,
      };

      setClosedPositions([...closedPositions, closedTrade]);
      setOpenPositions(openPositions.filter((p) => p.id !== position.id));
    } else {
      // Partial reduction (FIFO logic)
      const closedTrade = {
        ...position,
        shares: sharesToClose,
        exitPrice: parseFloat(reduceTrade.exitPrice),
        exitDate: reduceTrade.date,
        commission: reduceTrade.commission
          ? parseFloat(reduceTrade.commission)
          : 0,
        notes: reduceTrade.notes,
      };

      setClosedPositions([...closedPositions, closedTrade]);
      setOpenPositions(
        openPositions.map((p) =>
          p.id === position.id ? { ...p, shares: p.shares - sharesToClose } : p
        )
      );
    }

    setShowReduceForm(false);
  };

  // Initialize chart when component mounts
  useEffect(() => {
    if (closedPositions.length > 0 && activeTab === "performance") {
      const ctx = document.getElementById("performanceChart");

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: closedPositions.map((t) => t.symbol),
          datasets: [
            {
              label: "Profit/Loss %",
              data: closedPositions.map(
                (t) => ((t.exitPrice - t.entryPrice) / t.entryPrice) * 100
              ),
              backgroundColor: closedPositions.map((t) =>
                t.exitPrice > t.entryPrice
                  ? "rgba(75, 192, 192, 0.6)"
                  : "rgba(255, 99, 132, 0.6)"
              ),
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: false,
            },
          },
        },
      });
    }
  }, [closedPositions, activeTab]);

  return (
    <div className="trading-journal font-sans max-w-[1200px] mx-auto p-5">
      <header className="mb-8 border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold">
          Trading Journal & Risk Management System
        </h1>
        <nav className="flex gap-2 mt-5">
          <button
            className={`px-4 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors ${
              activeTab === "positions"
                ? "bg-blue-600 text-white border-blue-600"
                : ""
            }`}
            onClick={() => setActiveTab("positions")}
          >
            Positions
          </button>
          <button
            className={`px-4 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors ${
              activeTab === "performance"
                ? "bg-blue-600 text-white border-blue-600"
                : ""
            }`}
            onClick={() => setActiveTab("performance")}
          >
            Performance
          </button>
          <button
            className={`px-4 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors ${
              activeTab === "history"
                ? "bg-blue-600 text-white border-blue-600"
                : ""
            }`}
            onClick={() => setActiveTab("history")}
          >
            Trade History
          </button>
        </nav>
      </header>

      <main>
        {activeTab === "positions" && (
          <div className="positions-tab">
            <section className="open-positions">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-semibold">Open Positions</h2>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Add New Trade
                </button>
              </div>

              <table className="w-full border-collapse my-5">
                <thead>
                  <tr>
                    <th className="bg-gray-100 p-2 border-b">Symbol</th>
                    <th className="bg-gray-100 p-2 border-b">Shares</th>
                    <th className="bg-gray-100 p-2 border-b">Entry Price</th>
                    <th className="bg-gray-100 p-2 border-b">Current Price</th>
                    <th className="bg-gray-100 p-2 border-b">P&L ($)</th>
                    <th className="bg-gray-100 p-2 border-b">P&L (%)</th>
                    <th className="bg-gray-100 p-2 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {openPositions.map((position) => {
                    // In a real app, fetch current price. For now, use entryPrice as currentPrice.
                    const currentPrice = position.entryPrice;
                    const pl =
                      (currentPrice - position.entryPrice) * position.shares -
                      (position.commission || 0);
                    const plPercent =
                      ((currentPrice - position.entryPrice) /
                        position.entryPrice) *
                      100;
                    return (
                      <tr key={position.id}>
                        <td>{position.symbol}</td>
                        <td>{position.shares}</td>
                        <td>${position.entryPrice.toFixed(2)}</td>
                        <td>${currentPrice.toFixed(2)}</td>
                        <td
                          className={
                            pl >= 0 ? "text-green-600" : "text-red-600"
                          }
                        >
                          ${pl.toFixed(2)}
                        </td>
                        <td
                          className={
                            plPercent >= 0 ? "text-green-600" : "text-red-600"
                          }
                        >
                          {plPercent.toFixed(2)}%
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              setCurrentSymbol(position.symbol);
                              setReduceTrade({
                                ...reduceTrade,
                                symbol: position.symbol,
                                allocation: position.shares,
                              });
                              setShowReduceForm(true);
                            }}
                            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                          >
                            Reduce/Close
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>

            {showAddForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
                <div className="bg-white p-6 rounded-lg w-[500px] max-w-[90%]">
                  <h3 className="text-lg font-semibold mb-4">Add New Trade</h3>
                  <div className="mb-4">
                    <label className="block mb-1 font-bold">Symbol*</label>
                    <input
                      type="text"
                      value={newTrade.symbol}
                      onChange={(e) =>
                        setNewTrade({ ...newTrade, symbol: e.target.value })
                      }
                      required
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1 font-bold">Shares*</label>
                    <input
                      type="number"
                      value={newTrade.shares}
                      onChange={(e) =>
                        setNewTrade({ ...newTrade, shares: e.target.value })
                      }
                      required
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1 font-bold">Entry Price*</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newTrade.entryPrice}
                      onChange={(e) =>
                        setNewTrade({ ...newTrade, entryPrice: e.target.value })
                      }
                      required
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1 font-bold">Date</label>
                    <input
                      type="date"
                      value={newTrade.date}
                      onChange={(e) =>
                        setNewTrade({ ...newTrade, date: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1 font-bold">Commission</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newTrade.commission}
                      onChange={(e) =>
                        setNewTrade({ ...newTrade, commission: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1 font-bold">Notes</label>
                    <textarea
                      value={newTrade.notes}
                      onChange={(e) =>
                        setNewTrade({ ...newTrade, notes: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-5">
                    <button
                      onClick={handleAddPosition}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {showReduceForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
                <div className="bg-white p-6 rounded-lg w-[500px] max-w-[90%]">
                  <h3 className="text-lg font-semibold mb-4">
                    Reduce/Close Position: {currentSymbol}
                  </h3>
                  <div className="mb-4">
                    <label className="block mb-1 font-bold">
                      Shares to Sell*
                    </label>
                    <input
                      type="number"
                      value={reduceTrade.sharesToSell}
                      onChange={(e) =>
                        setReduceTrade({
                          ...reduceTrade,
                          sharesToSell: e.target.value,
                        })
                      }
                      required
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1 font-bold">Exit Price*</label>
                    <input
                      type="number"
                      step="0.01"
                      value={reduceTrade.exitPrice}
                      onChange={(e) =>
                        setReduceTrade({
                          ...reduceTrade,
                          exitPrice: e.target.value,
                        })
                      }
                      required
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1 font-bold">Date</label>
                    <input
                      type="date"
                      value={reduceTrade.date}
                      onChange={(e) =>
                        setReduceTrade({ ...reduceTrade, date: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1 font-bold">Commission</label>
                    <input
                      type="number"
                      step="0.01"
                      value={reduceTrade.commission}
                      onChange={(e) =>
                        setReduceTrade({
                          ...reduceTrade,
                          commission: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1 font-bold">Notes</label>
                    <textarea
                      value={reduceTrade.notes}
                      onChange={(e) =>
                        setReduceTrade({
                          ...reduceTrade,
                          notes: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold">Allocation</h4>
                    <p>Shares to allocate: {reduceTrade.sharesToSell || 0}</p>
                    {/* In a full implementation, you would have allocation logic here */}
                  </div>
                  <div className="flex justify-end gap-2 mt-5">
                    <button
                      onClick={handleReducePosition}
                      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setShowReduceForm(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "performance" && (
          <div className="performance-tab">
            <section className="key-metrics">
              <h2 className="text-xl font-semibold">Performance Metrics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-5">
                <div className="border rounded-lg p-4 text-center">
                  <h3 className="font-semibold">Win Rate</h3>
                  <p className="text-2xl font-bold my-2">
                    {metrics.winRate.toFixed(2)}%
                  </p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <h3 className="font-semibold">Avg Gain</h3>
                  <p className="text-2xl font-bold my-2">
                    {metrics.avgGain.toFixed(2)}%
                  </p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <h3 className="font-semibold">Avg Loss</h3>
                  <p className="text-2xl font-bold my-2">
                    {metrics.avgLoss.toFixed(2)}%
                  </p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <h3 className="font-semibold">Win/Loss Ratio</h3>
                  <p className="text-2xl font-bold my-2">
                    {metrics.winLossRatio.toFixed(2)}
                  </p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <h3 className="font-semibold">Adjusted Ratio</h3>
                  <p className="text-2xl font-bold my-2">
                    {metrics.adjustedRatio.toFixed(2)}
                  </p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <h3 className="font-semibold">Largest Gain</h3>
                  <p className="text-2xl font-bold my-2 text-green-600">
                    {metrics.largestGain.toFixed(2)}%
                  </p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <h3 className="font-semibold">Largest Loss</h3>
                  <p className="text-2xl font-bold my-2 text-red-600">
                    {metrics.largestLoss.toFixed(2)}%
                  </p>
                </div>
              </div>
            </section>

            <section className="risk-indicators">
              <h2 className="text-xl font-semibold">
                Risk Management Indicators
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-5">
                <div
                  className={`border rounded-lg p-4 ${
                    metrics.avgGain > metrics.avgLoss * 2
                      ? "border-l-4 border-green-600"
                      : "border-l-4 border-red-600"
                  }`}
                >
                  <h3 className="font-semibold">Avg Gain vs Loss</h3>
                  <p>
                    {metrics.avgGain.toFixed(2)}% vs{" "}
                    {metrics.avgLoss.toFixed(2)}%
                  </p>
                  <p>
                    {metrics.avgGain > metrics.avgLoss * 2
                      ? "✓ Healthy"
                      : "✗ Needs Improvement"}
                  </p>
                </div>
                <div
                  className={`border rounded-lg p-4 ${
                    metrics.largestGain > Math.abs(metrics.largestLoss)
                      ? "border-l-4 border-green-600"
                      : "border-l-4 border-red-600"
                  }`}
                >
                  <h3 className="font-semibold">Largest Gain vs Loss</h3>
                  <p>
                    {metrics.largestGain.toFixed(2)}% vs{" "}
                    {Math.abs(metrics.largestLoss).toFixed(2)}%
                  </p>
                  <p>
                    {metrics.largestGain > Math.abs(metrics.largestLoss)
                      ? "✓ Healthy"
                      : "✗ Needs Improvement"}
                  </p>
                </div>
                <div
                  className={`border rounded-lg p-4 ${
                    metrics.adjustedRatio >= 2
                      ? "border-l-4 border-green-600"
                      : "border-l-4 border-red-600"
                  }`}
                >
                  <h3 className="font-semibold">Adjusted Ratio</h3>
                  <p>{metrics.adjustedRatio.toFixed(2)}</p>
                  <p>
                    {metrics.adjustedRatio >= 2
                      ? "✓ Healthy"
                      : "✗ Needs Improvement"}
                  </p>
                </div>
              </div>
            </section>

            <section className="performance-chart">
              <h2 className="text-xl font-semibold">Trade Performance</h2>
              <canvas
                id="performanceChart"
                width="800"
                height="400"
                className="w-full max-w-3xl mx-auto"
              ></canvas>
            </section>
          </div>
        )}

        {activeTab === "history" && (
          <div className="history-tab">
            <section className="closed-positions">
              <h2 className="text-xl font-semibold">Closed Positions</h2>
              <table className="w-full border-collapse my-5">
                <thead>
                  <tr>
                    <th className="bg-gray-100 p-2 border-b">Symbol</th>
                    <th className="bg-gray-100 p-2 border-b">Shares</th>
                    <th className="bg-gray-100 p-2 border-b">Entry Price</th>
                    <th className="bg-gray-100 p-2 border-b">Exit Price</th>
                    <th className="bg-gray-100 p-2 border-b">Entry Date</th>
                    <th className="bg-gray-100 p-2 border-b">Exit Date</th>
                    <th className="bg-gray-100 p-2 border-b">P/L ($)</th>
                    <th className="bg-gray-100 p-2 border-b">P/L (%)</th>
                    <th className="bg-gray-100 p-2 border-b">Days Held</th>
                  </tr>
                </thead>
                <tbody>
                  {closedPositions.map((trade) => {
                    const pl =
                      (trade.exitPrice - trade.entryPrice) * trade.shares -
                      (trade.commission || 0);
                    const plPercent =
                      ((trade.exitPrice - trade.entryPrice) /
                        trade.entryPrice) *
                      100;
                    const entryDate = new Date(trade.entryDate);
                    const exitDate = new Date(trade.exitDate);
                    const daysHeld = Math.round(
                      (exitDate - entryDate) / (1000 * 60 * 60 * 24)
                    );

                    return (
                      <tr key={trade.id}>
                        <td>{trade.symbol}</td>
                        <td>{trade.shares}</td>
                        <td>${trade.entryPrice.toFixed(2)}</td>
                        <td>${trade.exitPrice.toFixed(2)}</td>
                        <td>{trade.entryDate}</td>
                        <td>{trade.exitDate}</td>
                        <td
                          className={
                            pl >= 0 ? "text-green-600" : "text-red-600"
                          }
                        >
                          ${pl.toFixed(2)}
                        </td>
                        <td
                          className={
                            plPercent >= 0 ? "text-green-600" : "text-red-600"
                          }
                        >
                          {plPercent.toFixed(2)}%
                        </td>
                        <td>{daysHeld}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          </div>
        )}
      </main>

      {/* Tailwind CSS replaces all inline and JSX styles */}
    </div>
  );
};

export default Metrics;
