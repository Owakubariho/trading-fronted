// COTTable.jsx
import React from 'react';

const COTTable = ({ data, isLoading }) => {
  if (isLoading) return <div className="p-4">Loading market data...</div>;
  if (!data || data.length === 0) return <div className="p-4">No data available.</div>;

  // Helper for conditional styling (Green for positive, Red for negative)
  const getColor = (val) => {
    if (val > 0) return 'text-green-600 font-medium';
    if (val < 0) return 'text-red-600 font-medium';
    return 'text-gray-600';
  };

  // Helper to format large numbers with commas (e.g., 10,000)
  const fmt = (val) => val ? val.toLocaleString() : '-';

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th className="px-6 py-3">Report Date</th>
            <th className="px-6 py-3 text-right">Net Position</th>
            <th className="px-6 py-3 text-right">Net Change</th>
            <th className="px-6 py-3 text-right">% Change</th>
            <th className="px-6 py-3 text-right">Longs</th>
            {/*  long change */}
            <th className="px-6 py-3 text-right">Long Change</th>

            <th className="px-6 py-3 text-right">Shorts</th>
            {/*  short change */}
            <th className="px-6 py-3 text-right">Short Change</th>
            <th className="px-6 py-3 text-right">Open Interest</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {row.report_date}
              </td>

              {/* Net Positions */}
              <td className="px-6 py-4 text-right font-bold text-gray-800">
                {fmt(row.net_positions)}
              </td>

              {/* Net Change (Colored) */}
              <td className={`px-6 py-4 text-right ${getColor(row.net_change)}`}>
                {row.net_change > 0 ? '+' : ''}{fmt(row.net_change)}
              </td>

              {/* % Change (Colored) */}
              <td className={`px-6 py-4 text-right ${getColor(row.noncomm_net_pct_change)}`}>
                {row.noncomm_net_pct_change}%
              </td>

              <td className="px-6 py-4 text-right">{fmt(row.noncommercial_long_positions)}</td>
              {/* change_noncommercial_long*/}
              <td className="px-6 py-4 text-right">{fmt(row.change_noncommercial_long)}</td>


              <td className="px-6 py-4 text-right">{fmt(row.noncommercial_short_positions)}</td>
              <td className="px-6 py-4 text-right">{fmt(row.change_noncommercial_short)}</td>





              <td className="px-6 py-4 text-right">{fmt(row.open_interest)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default COTTable;