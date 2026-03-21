import React, { useState } from 'react';

/**
 * A demo component for AI-Powered Market Analysis.
 * Simulates fetching AI commentary for a given stock ticker.
 */
const AiMarketAnalysis = () => {
    const [ticker, setTicker] = useState('');
    const [loading, setLoading] = useState(false);
    const [aiResponse, setAiResponse] = useState(null);

    // Mock function to simulate AI API call
    const generateAnalysis = async () => {
        if (!ticker) return;

        setLoading(true);
        setAiResponse(null);

        // Simulate network delay
        setTimeout(() => {
            setLoading(false);
            setAiResponse({
                ticker: ticker.toUpperCase(),
                summary: "Bullish Outlook",
                details: `Based on the simplified technical data for ${ticker.toUpperCase()}, the AI model detects a strong uptrend. Key indicators like the 50-day moving average are sloping upwards. Volume has increased on up-days, suggesting institutional accumulation. However, value investors might find it overextended at current levels.`
            });
        }, 2000);
    };

    return (
        <div className="p-8 max-w-3xl mx-auto font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold mb-2">🤖 AI Market Assistant</h2>
                <p className="text-gray-600 dark:text-gray-400">Get instant, AI-generated technical summaries for any asset.</p>
            </div>

            <div className="flex justify-center gap-3 mb-8">
                <input
                    type="text"
                    placeholder="Enter Stock Ticker (e.g., TSLA, NVDA)"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value)}
                    className="p-3 text-base rounded border border-gray-300 w-72 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                />
                <button
                    onClick={generateAnalysis}
                    disabled={loading}
                    className={`px-6 py-3 text-base font-bold text-white rounded transition-colors duration-300 ${loading
                            ? 'bg-purple-300 cursor-not-allowed dark:bg-purple-900/50'
                            : 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600'
                        }`}
                >
                    {loading ? 'Analyzing...' : 'Generate Analysis'}
                </button>
            </div>

            {loading && (
                <div className="text-center text-gray-500 p-5 dark:text-gray-400">
                    <p className="animate-pulse">🧠 AI is analyzing chart patterns and sentiment...</p>
                </div>
            )}

            {aiResponse && (
                <div className="bg-purple-50 p-6 rounded-lg border border-purple-100 animate-fade-in dark:bg-slate-800 dark:border-slate-700">
                    <h3 className="text-xl font-semibold mb-2 text-purple-900 dark:text-purple-100">Analysis for {aiResponse.ticker}</h3>
                    <div className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase mb-4 shadow-sm">
                        {aiResponse.summary}
                    </div>
                    <p className="leading-relaxed text-gray-800 text-lg dark:text-gray-300">
                        {aiResponse.details}
                    </p>
                    <div className="mt-5 pt-3 border-t border-purple-200 dark:border-slate-700 text-gray-500 text-sm italic dark:text-gray-500">
                        <small>Disclaimer: This is AI-generated content for informational purposes only. It does not constitute financial advice.</small>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AiMarketAnalysis;
