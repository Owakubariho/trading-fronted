import React from 'react';

const calculatePercentageChange = (current, previous) => {
  if (previous === 0) return 'N/A'; // Avoid division by zero
  return ((current - previous) / Math.abs(previous) * 100).toFixed(2) + '%';
};

const filterEarningsFrom2014 = (earnings) => {
  return earnings.filter((item) => 
    new Date(item.fiscalDateEnding).getFullYear() >= 2014);
};

const EarningsTable = ({ earningsData ,ticker}) => {
  if (!earningsData || earningsData.length === 0) 
    return <p className="text-center">No data available.</p>;

  const quarterlyEarnings = filterEarningsFrom2014(
    earningsData.quarterlyEarnings || []);
  const annualEarnings = filterEarningsFrom2014(
    earningsData.annualEarnings || []);
    // symbol
    const symbol = earningsData.symbol

  return (
    <div className="mt-6 overflow-x-auto">
      <h2 className="text-lg font-bold mb-4">Quarterly Earnings- <span className='text-blue-700'>{symbol}</span></h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Fiscal Date Ending</th>
            <th className="py-2 px-4 border-b">Reported Date</th>
            <th className="py-2 px-4 border-b">Reported EPS</th>
            <th className="py-2 px-4 border-b">Estimated EPS</th>
            <th className="py-2 px-4 border-b">Surprise</th>
            <th className="py-2 px-4 border-b">Surprise %</th>
            <th className="py-2 px-4 border-b">Percentage Change</th>
            <th className="py-2 px-4 border-b">Report Time</th>
          </tr>
        </thead>
        <tbody>
          {quarterlyEarnings.map((item, index) => {
            const prevItem = quarterlyEarnings[index + 1];
            const percentageChange = prevItem
              ? calculatePercentageChange(item.reportedEPS, prevItem.reportedEPS)
              : 'N/A';

            return (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{item.fiscalDateEnding}</td>
                <td className="py-2 px-4 border-b">{item.reportedDate}</td>
                <td className="py-2 px-4 border-b">{item.reportedEPS}</td>
                <td className="py-2 px-4 border-b">{item.estimatedEPS}</td>
                <td className="py-2 px-4 border-b">{item.surprise}</td>
                <td className="py-2 px-4 border-b">{item.surprisePercentage}</td>
                <td className="py-2 px-4 border-b">{percentageChange}</td>
                <td className="py-2 px-4 border-b">{item.reportTime}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2 className="text-lg font-bold mt-6 mb-4">Annual Earnings- <span className='text-blue-700'>{symbol}</span></h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Fiscal Date Ending</th>
            
            <th className="py-2 px-4 border-b">Reported EPS</th>
           
            <th className="py-2 px-4 border-b">Percentage Change</th>
           
          </tr>
        </thead>
        <tbody>
          {annualEarnings.map((item, index) => {
            const prevItem = annualEarnings[index + 1];
            const percentageChange = prevItem
              ? calculatePercentageChange(item.reportedEPS, prevItem.reportedEPS)
              : 'N/A';

            return (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{item.fiscalDateEnding}</td>
                
                <td className="py-2 px-4 border-b">{item.reportedEPS}</td>
                
                <td className="py-2 px-4 border-b">{percentageChange}</td>
                
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EarningsTable;
