import React, { useState } from "react";

const Minervini = () => {
  const [form, setForm] = useState({
    profitLoss: "",
    entryDate: "",
    exitDate: "",
    symbol: "",
    lotsize: "",
    riskAmount: "",
  });
  const [accountSize, setAccountSize] = useState(100);
  const [rows, setRows] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateHoldingDays = (entry, exit) => {
    const entryDate = new Date(entry);
    const exitDate = new Date(exit);
    const diffTime = Math.abs(exitDate - entryDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const profitLossNum = parseFloat(form.profitLoss) || 0;
    // Use the latest accountSize for calculation and round off

    const currentAccountSize = accountSize + profitLossNum;

    const avgGainLoss =
      ((currentAccountSize - accountSize) / accountSize) * 100;
    const holdingDays = calculateHoldingDays(form.entryDate, form.exitDate);

    const newRow = {
      profitLoss: profitLossNum,
      currentAccountSize: currentAccountSize,
      avgGainLoss: avgGainLoss.toFixed(2),
      entryDate: form.entryDate,
      exitDate: form.exitDate,
      symbol: form.symbol,
      lotsize: form.lotsize,
      riskAmount: form.riskAmount,
      holdingDays: holdingDays,
    };
    setRows([...rows, newRow]);
    // Update accountSize for next entry
    // ROUND the account size to two decimal places FOR  currentAccountSize

    setAccountSize(currentAccountSize);
    setForm({
      profitLoss: "",
      entryDate: "",
      exitDate: "",
      symbol: "",
      lotsize: "",
      riskAmount: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Minervini Risk Management Form
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
        >
          <div className="flex flex-col">
            <label htmlFor="profitLoss" className="mb-1 text-sm text-gray-600">
              Profits/Losses
            </label>
            <input
              id="profitLoss"
              name="profitLoss"
              type="number"
              step="any"
              placeholder="Profits/Losses"
              value={form.profitLoss}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="entryDate" className="mb-1 text-sm text-gray-600">
              Entry Date
            </label>
            <input
              id="entryDate"
              name="entryDate"
              type="date"
              value={form.entryDate}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="exitDate" className="mb-1 text-sm text-gray-600">
              Exit Date
            </label>
            <input
              id="exitDate"
              name="exitDate"
              type="date"
              value={form.exitDate}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="symbol" className="mb-1 text-sm text-gray-600">
              Symbol
            </label>
            <input
              id="symbol"
              name="symbol"
              type="text"
              placeholder="Symbol"
              value={form.symbol}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lotsize" className="mb-1 text-sm text-gray-600">
              Lotsize
            </label>
            <input
              id="lotsize"
              name="lotsize"
              type="number"
              step="any"
              placeholder="Lotsize"
              value={form.lotsize}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="riskAmount" className="mb-1 text-sm text-gray-600">
              Risk Amount
            </label>
            <input
              id="riskAmount"
              name="riskAmount"
              type="number"
              step="any"
              placeholder="Risk Amount"
              value={form.riskAmount}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="md:col-span-2 bg-blue-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200"
          >
            Add Entry
          </button>
        </form>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow border border-gray-200">
            <thead>
              <tr className="bg-blue-100 text-gray-700">
                <th className="py-3 px-4 text-left">Profits/Losses</th>
                <th className="py-3 px-4 text-left">Current Account Size</th>
                <th className="py-3 px-4 text-left">Avg Gain/Loss (%)</th>
                <th className="py-3 px-4 text-left">Entry Date</th>
                <th className="py-3 px-4 text-left">Exit Date</th>
                <th className="py-3 px-4 text-left">Holding Days</th>
                <th className="py-3 px-4 text-left">Symbol</th>
                <th className="py-3 px-4 text-left">Lotsize</th>
                <th className="py-3 px-4 text-left">Risk Amount</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-6 text-gray-400">
                    No entries yet.
                  </td>
                </tr>
              ) : (
                rows.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-gray-200 hover:bg-blue-50"
                  >
                    <td className="py-2 px-4">{row.profitLoss}</td>
                    <td className="py-2 px-4">{row.currentAccountSize}</td>
                    <td className="py-2 px-4">{row.avgGainLoss}</td>
                    <td className="py-2 px-4">{row.entryDate}</td>
                    <td className="py-2 px-4">{row.exitDate}</td>
                    <td className="py-2 px-4">{row.holdingDays}</td>
                    <td className="py-2 px-4">{row.symbol}</td>
                    <td className="py-2 px-4">{row.lotsize}</td>
                    <td className="py-2 px-4">{row.riskAmount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Minervini;
