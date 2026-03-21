// src/components/HistoricalSignalsTable.js
import React from 'react';

const getSignalType = (report, lookback) => {
    const cotIndex = report[`cot_index_${lookback}`];
    const specIndex = report[`spec_ratio_index_${lookback}`];
    const commIndex = report[`comm_ratio_index_${lookback}`];

    if (cotIndex <= 10 && specIndex <= 10 && commIndex >= 90) return 'Bottom';
    if (cotIndex >= 90 && specIndex >= 90 && commIndex <= 10) return 'Top';
    return 'Hold';
};

const SignalBadge = ({ type }) => {
    if (type === 'Bottom') {
        return <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">Potential Bottom</span>;
    }
    if (type === 'Top') {
        return <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-red-100 text-red-800">Potential Top</span>;
    }
    return null;
};

function HistoricalSignalsTable({ data, lookback }) {
    const signals = data
        .map(report => ({
            ...report,
            signalType: getSignalType(report, lookback),
        }))
        .filter(report => report.signalType !== 'Hold')
        .sort((a, b) => new Date(b.report_date) - new Date(a.report_date));

    return (
        <div className="bg-white shadow-md rounded-lg mt-12">
            <h3 className="text-xl font-bold text-gray-800 p-4 border-b border-gray-200">
                Historical Signals ({lookback}-Week Period)
            </h3>

            {signals.length === 0 ? (
                <p className="p-4 text-gray-500">No signals found in the selected date range for this lookback period.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Signal Type</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">COT Index</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Spec Index</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Comm Index</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {signals.map((report) => (
                                <tr key={report.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.report_date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm"><SignalBadge type={report.signalType} /></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{report[`cot_index_${lookback}`]?.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{report[`spec_ratio_index_${lookback}`]?.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{report[`comm_ratio_index_${lookback}`]?.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default HistoricalSignalsTable;
