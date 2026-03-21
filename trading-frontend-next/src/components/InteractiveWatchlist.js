import React from 'react';

const InteractiveWatchlist = ({ stocks, onTickerClick }) => {
    if (!stocks || stocks.length === 0) {
        return (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No data available.
            </div>
        );
    }

    // Dynamically determine columns based on the first item, excluding 'Ticker' which we'll handle specially
    // or just hardcode common ones if the data structure varies too much.
    // For now, let's try to be smart but safe. We'll grab keys from the first object.
    const firstItem = stocks[0];
    const columns = Object.keys(firstItem).filter(key => key !== 'Ticker' && key !== 'id');

    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Ticker
                        </th>
                        {columns.map((col) => (
                            <th key={col} scope="col" className="px-6 py-3">
                                {col.replace(/_/g, ' ')}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {stocks.map((stock, index) => (
                        <tr
                            key={index}
                            onClick={() => onTickerClick(stock.Ticker)}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-150"
                        >
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {stock.Ticker}
                            </th>
                            {columns.map((col) => (
                                <td key={col} className="px-6 py-4">
                                    {stock[col]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InteractiveWatchlist;
