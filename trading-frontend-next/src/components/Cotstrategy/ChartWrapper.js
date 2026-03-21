// src/components/ChartWrapper.js
import React from 'react';

function ChartWrapper({ title, children }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
            {/* This container gives each chart a large, fixed height */}
            <div className="relative h-96">
                {children}
            </div>
        </div>
    );
}

export default ChartWrapper;
