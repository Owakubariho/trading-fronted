import React, { useState } from "react";

export default function PositionSizingCalculator() {
  const [totalEquity, setTotalEquity] = useState(100000);
  const [riskPercent, setRiskPercent] = useState(1.25);
  const [stops, setStops] = useState([10, 5, 2.5]);
  const [newStop, setNewStop] = useState("");

  const riskAmount = (totalEquity * riskPercent) / 100;

  const addStop = () => {
    const stopVal = parseFloat(newStop);
    if (!isNaN(stopVal) && stopVal > 0) {
      setStops([...stops, stopVal]);
      setNewStop("");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Guidelines Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-bold text-blue-700 mb-2">
          Position Sizing Guidelines
        </h2>
        <ul className="list-disc list-inside text-blue-900 mb-4">
          <li>1.25% - 2.50% risk of total equity</li>
          <li>10% maximum stop per trade</li>
          <li>Average loss no more than 5-6% per trade</li>
          <li>Shoot for optimal 25% positions</li>
        </ul>
        <h3 className="text-lg font-semibold text-blue-600 mb-1">
          Example Calculations:
        </h3>
        <div className="grid gap-4 sm:grid-cols-3 text-sm text-blue-800">
          <div className="bg-white shadow-sm rounded p-3 border">
            <p>
              <strong>1.25% risk | 10% stop</strong>
            </p>
            <p>1.25% = $1,250</p>
            <p>100K × 12.5% = $12,500</p>
            <p>$12,500 × 10% = $1,250</p>
            <p className="font-semibold">→ 12.5% Position</p>
          </div>
          <div className="bg-white shadow-sm rounded p-3 border">
            <p>
              <strong>1.25% risk | 5% stop</strong>
            </p>
            <p>1.25% = $1,250</p>
            <p>100K × 25% = $25,000</p>
            <p>$25,000 × 5% = $1,250</p>
            <p className="font-semibold">→ 25% Position</p>
          </div>
          <div className="bg-white shadow-sm rounded p-3 border">
            <p>
              <strong>1.25% risk | 2.5% stop</strong>
            </p>
            <p>1.25% = $1,250</p>
            <p>100K × 50% = $50,000</p>
            <p>$50,000 × 2.5% = $1,250</p>
            <p className="font-semibold">→ 50% Position</p>
          </div>
        </div>
      </div>

      {/* Calculator */}
      <h1 className="text-2xl font-bold mb-4">Position Sizing Calculator</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium">Total Equity ($)</label>
          <input
            type="number"
            value={totalEquity}
            onChange={(e) => setTotalEquity(Number(e.target.value))}
            className="mt-1 block w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Risk %</label>
          <input
            type="number"
            value={riskPercent}
            onChange={(e) => setRiskPercent(Number(e.target.value))}
            className="mt-1 block w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Add Stop %</label>
          <div className="flex">
            <input
              type="number"
              value={newStop}
              onChange={(e) => setNewStop(e.target.value)}
              className="mt-1 block w-full border rounded p-2"
            />
            <button
              onClick={addStop}
              className="ml-2 mt-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Stop %</th>
              <th className="border px-4 py-2 text-left">Risk Amount ($)</th>
              <th className="border px-4 py-2 text-left">Position Size ($)</th>
              <th className="border px-4 py-2 text-left">Position %</th>
            </tr>
          </thead>
          <tbody>
            {stops.map((stop, i) => {
              const positionSize = riskAmount / (stop / 100);
              const positionPercent = (positionSize / totalEquity) * 100;

              return (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{stop}%</td>
                  <td className="border px-4 py-2">${riskAmount.toFixed(2)}</td>
                  <td className="border px-4 py-2">
                    ${positionSize.toFixed(2)}
                  </td>
                  <td className="border px-4 py-2">
                    {positionPercent.toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
