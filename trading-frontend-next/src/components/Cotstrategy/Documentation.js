// src/components/Documentation.js
import React from 'react';
import { Link } from 'react-router-dom';

// A reusable component for section headings to keep styling consistent.
const Section = ({ title, children }) => (
    <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-6">
            {title}
        </h2>
        <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
            {children}
        </div>
    </div>
);

// A component for highlighting the signal rules.
const SignalRule = ({ title, conditions, color }) => (
    <div className={`border-l-4 ${color} bg-gray-50 p-6 rounded-r-lg my-6`}>
        <h4 className="text-xl font-bold text-gray-900 mb-3">{title}</h4>
        <ul className="list-disc list-inside space-y-2">
            {conditions.map((condition, index) => (
                <li key={index}>{condition}</li>
            ))}
        </ul>
    </div>
);

function Documentation() {
    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">

                <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
                    Strategy & Interpretation Guide
                </h1>

                {/* --- SECTION 1: THE STRATEGY --- */}
                <Section title="The Commitment of Traders (COT) Strategy">
                    <p>
                        The Commitment of Traders (COT) report is a weekly publication from the U.S. Commodity Futures Trading Commission (CFTC). It provides a detailed breakdown of the long and short positions held by different types of traders. For decentralized markets like Forex, it serves as one of the best available proxies for overall market sentiment.
                    </p>
                    <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">The Key Market Participants</h3>
                    <p>
                        The core of this strategy lies in understanding the opposing behaviors of two main groups:
                    </p>
                    <ul className="list-disc list-inside space-y-3 mt-4">
                        <li>
                            <strong>Commercials (The "Smart Money"):</strong> These are large corporations and financial institutions (e.g., Toyota, Goldman Sachs) that use the futures market to hedge against risk in their primary business. They tend to buy into falling prices and sell into rising prices. They are often correct at major market turning points.
                        </li>
                        <li>
                            <strong>Large Speculators (The "Crowd"):</strong> This group includes hedge funds and other large traders who are speculating on the future price direction. They are trend-followers, meaning they buy as prices rise and sell as prices fall. While often right during a trend, they are famously wrong at the market's absolute tops and bottoms.
                        </li>
                    </ul>
                    <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">The Core Contrarian Principle</h3>
                    <p>
                        Our strategy is to trade <strong>against</strong> the speculators and <strong>with</strong> the commercials when their positioning reaches an unsustainable extreme. In short: when speculators are overwhelmingly betting one way, we prepare to bet the other.
                    </p>
                </Section>

                {/* --- SECTION 2: INTERPRETING THE CHARTS --- */}
                <Section title="How to Interpret the Charts">
                    <div className="space-y-8">
                        <div>
                            <h4 className="text-xl font-bold text-gray-800 mb-2">1. Commercial vs Non-Commercial Net Positions (Bar Chart)</h4>
                            <p>This chart shows the raw positioning of the two groups. A positive bar means the group is "net long" (more long contracts than short), and a negative bar means they are "net short." You will almost always see these two groups on opposite sides of the market. The key is not just their direction, but the *magnitude* of their positions, which is what the next three charts help us analyze.</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-gray-800 mb-2">2. COT Index (Line Chart, 0-100)</h4>
                            <p>This is a composite sentiment indicator. A reading near <strong>100</strong> signifies an extreme of bullish sentiment (speculators are max-long relative to commercials), which is a warning sign of a <strong>potential market top</strong>. A reading near <strong>0</strong> signifies an extreme of bearish sentiment (speculators are max-short), which is a warning sign of a <strong>potential market bottom</strong>.</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-gray-800 mb-2">3. Speculator Ratio Index (Line Chart, 0-100)</h4>
                            <p>This shows speculator sentiment in isolation. A reading near <strong>100</strong> indicates "Maximum Greed," as speculators are almost all-in on long positions. A reading near <strong>0</strong> indicates "Maximum Fear," as they are all-in on short positions. This chart acts as a powerful confirmation of the extremes seen in the COT Index.</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-gray-800 mb-2">4. Commercial Ratio Index (Line Chart, 0-100)</h4>
                            <p>This shows the hedging behavior of the "smart money." A reading near <strong>100</strong> means commercials are aggressively buying futures to hedge against falling prices, a strong sign they believe the asset is undervalued and a powerful confirmation for a <strong>market bottom</strong>. A reading near <strong>0</strong> means they are aggressively selling futures to hedge against rising prices, suggesting they believe the asset is overvalued and confirming a _potential market top_.</p>
                        </div>
                    </div>
                </Section>

                {/* --- SECTION 3: IDENTIFYING SIGNALS --- */}
                <Section title="Identifying High-Probability Trade Signals">
                    <p>
                        The most powerful signals in this strategy occur when all three indices reach their extremes at the same time. This alignment indicates a high probability that the current trend is exhausted and a reversal is imminent.
                    </p>
                    <SignalRule
                        title="Potential Top (Bearish Reversal Signal)"
                        color="border-red-500"
                        conditions={[
                            "COT Index is at or above 90.",
                            "Speculator Ratio Index is at or above 90.",
                            "Commercial Ratio Index is at or below 10."
                        ]}
                    />
                    <SignalRule
                        title="Potential Bottom (Bullish Reversal Signal)"
                        color="border-green-500"
                        conditions={[
                            "COT Index is at or below 10.",
                            "Speculator Ratio Index is at or below 10.",
                            "Commercial Ratio Index is at or above 90."
                        ]}
                    />
                    <p className="mt-8 italic text-gray-600">
                        <strong>Important:</strong> These are sentiment indicators, not timing tools. They tell you *when* to look for a reversal but should be used with other forms of analysis (like price action) to time your actual entries and exits.
                    </p>
                </Section>
                <div className="text-center mt-12">
                    <Link to="/sentimentcot" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition">
                        &larr; Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Documentation;
