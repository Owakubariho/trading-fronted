"use client";

import React from "react";
import Dropdown from "./Dropdown";

const Sidebar = () => {
    const stocksLinks = [
        { label: "ExnessMomentum", to: "/stock11" },
        { label: "Tradingview screens", to: "/stock1e" },
        { label: "ExnessMomentumremainder", to: "/stock2" },
        { label: "exness_1 month RS", to: "/stock333" },
        { label: "exness_3 month RS", to: "/stock4" },
        { label: "exness_6 month RS", to: "/stock5" },
        // sp500
        { label: "sp_1 month RS", to: "/stock6" },
        { label: "sp_3 month RS", to: "/stock7" },
        { label: "sp_6 month RS", to: "/stock8" },

        { label: "Minerviniexness", to: "/stock2t" },
        { label: "Minervinisp", to: "/stock1t" },
        { label: "momentumsp", to: "/stock21t" },
        { label: "Mike webster Ratio", to: "/minervini1" },
        { label: "Hightight flag", to: "/hightightflag" },
        { label: "Power bennet", to: "/power" },
        { label: "NYSE & NASDAQ SCREENS", to: "/screens2" },
    ];

    const cotLinks = [
        { label: "Dashboard", to: "/dashboard" },
        { label: "Cot Heatmap", to: "/cotheatmap" },

        { label: "Sentiment cot-behavior book", to: "/sentimentcot" },
        { label: "COT Dashboard-briese", to: "/cotdashboard" },
        { label: "Stocks sector analysis", to: "/sectorstocks" },
        // stockscreener
        { label: "Stocks screener", to: "/stockscreener" },
        // ticker-uploader
        { label: "Ticker uploader", to: "/ticker-uploader" },
    ];
    const cotchartsnetposition1 = [
        { label: "Nzd", to: "/cot16" },
        { label: "Cad", to: "/cot17" },
        { label: "Chf", to: "/cot18" },
        { label: "Aud", to: "/cot19" },
        { label: "Eur", to: "/cot20" },
        { label: "Jpy", to: "/cot21" },
        { label: "Gbp", to: "/cot22" },
        { label: "Dxy", to: "/cot23" },
        { label: "Btc", to: "/cot24" },
        { label: "Copper", to: "/cot25" },
        { label: "Silver", to: "/cot26" },
        { label: "Nat", to: "/cot27" },
        { label: "Pa", to: "/cot28" },

        { label: "Xaud", to: "/cot29" },
        { label: "Oil", to: "/cot29er" },
        { label: "Vix", to: "/vix" },
    ];
    const cotindex = [
        { label: "cotinindex13", to: "/cot1e" },
        { label: "cotinindex26", to: "/cot2e" },
        { label: "cotinindex52", to: "/cot3e" },
        { label: "cotindex chart (13-26-52)", to: "/cot4e" },
    ];
    const cotchartSpeccommdiff = [
        { label: "Nzd", to: "/cot30" },
        { label: "Cad", to: "/cot31" },
        { label: "Chf", to: "/cot32" },
        { label: "Aud", to: "/cot33" },
        { label: "Eur", to: "/cot34" },
        { label: "Jpy", to: "/cot35" },
        { label: "Gbp", to: "/cot36" },
        { label: "Dxy", to: "/cot37" },
        { label: "Btc", to: "/cot38" },
        { label: "Copper", to: "/cot39" },
        { label: "Silver", to: "/cot40" },
        { label: "Nat", to: "/cot41" },
        { label: "Pa", to: "/cot42" },

        { label: "Xaud", to: "/cot43" },
        { label: "Oil", to: "/cot44er" },
        { label: "Vix", to: "/vix2" },
    ];
    // line charts for net positions
    const cotchartline = [
        { label: "Nzd", to: "/cot30d" },
        { label: "Cad", to: "/cot31d" },
        { label: "Chf", to: "/cot32d" },
        { label: "Aud", to: "/cot33d" },
        { label: "Eur", to: "/cot34d" },
        { label: "Jpy", to: "/cot35d" },
        { label: "Gbp", to: "/cot36d" },
        { label: "Dxy", to: "/cot37d" },
        { label: "Btc", to: "/cot38d" },
        { label: "Copper", to: "/cot39d" },
        { label: "Silver", to: "/cot40d" },
        { label: "Nat", to: "/cot41d" },
        { label: "Pa", to: "/cot42d" },

        { label: "Xaud", to: "/cot43d" },
    ];
    const stockanalysis = [
        { label: "stocks", to: "/analysis12" },
    ];
    const currencyanalysis = [
        { label: "Futures", to: "/currencyanalysis" },
    ];
    // minervini risk management principles
    const riskPrinciples = [
        { label: "risk statistics", to: "/minervini" },
        { label: "metrics", to: "/Metrics" },
        {
            label: "progressive exposure simulator",
            to: "/ProgressiveExposureSimulator",
        },
        { label: "position sizing calculator", to: "/PositionSizingCalculator" },
        { label: "Result based assumption", to: "/ResultBasedAssumption" },
        { label: "Minervini Risk management 1", to: "/minervinipart1" },
        { label: "Risk Management Dashboard", to: "/RiskManagementDashboard" },
        { label: "Forex Lot Calculator", to: "/ForexLotCalculator" },
        {
            label: "Stocks Percentage Calculator",
            to: "/StocksPercentageCalculator",
        },
        {
            label: "Stocks Dollar Risk Calculator",
            to: "/StocksDollarRiskCalculator",
        },
        { label: "Correlation", to: "/correlation" },
        { label: "Methodology", to: "/risk-management/methodology" },
        { label: "Risk Calculator", to: "/risk-management/calculator" },
        { label: "AI Market Assistant", to: "/ai/market-analysis" },
    ];

    return (
        <aside className="w-80 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 p-4 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto hidden md:block scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-slate-700">
            <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Detailed Analysis
            </h2>

            <div className="space-y-1">
                <Dropdown
                    label="Stockscreens"
                    links={stocksLinks}
                />
                <Dropdown
                    label="Risk Management Principles"
                    links={riskPrinciples}
                />
                <Dropdown
                    label="Commitment of traders report(CFTC)"
                    links={cotLinks}
                />
                <Dropdown
                    label="Commitment of traders(net pos)"
                    links={cotchartsnetposition1}
                />
                <Dropdown
                    label="Commitment of traders(spec diff)"
                    links={cotchartSpeccommdiff}
                />
                <Dropdown
                    label="Commitment of traders(index)"
                    links={cotindex}
                />
                <Dropdown
                    label="Commitment of traders(line)"
                    links={cotchartline}
                />

                <Dropdown label="stock analysis" links={stockanalysis} />
                <Dropdown label="currency analysis" links={currencyanalysis} />
            </div>
        </aside>
    );
};

export default Sidebar;
