// ============ HOW TO UPDATE YOUR App.js ============
// This guide shows how to refactor your existing App.js to use organized components

// BEFORE (Old way - lots of scattered imports):
/*
import Cotsummary from "./components/Assets/Cotsummary";
import CurrencySummary from "./components/Assets/CurrencySummary";
import Economic from "./components/Assets/Economic";
import Macro from "./components/Assets/Macro";
import Putratio from "./components/Assets/Putratio";
... (many more individual imports)
import RiskManagementDashboard from "./components/RiskManagement/RiskManagementDashboard";
import ForexLotCalculator from "./components/RiskManagement/ForexLotCalculator";
... (many more)
*/

// AFTER (New way - organized imports):

import React from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router";
import { Navbar, Footer, PrivateRoute, ProtectedLayout } from "./components";

// Import organized component groups
import {
  // Home & Core Pages
  Home,
  About,
  Contact,
  Pagenotfound,
  TradingViewWidget1,
} from "./pages";

// Stock Screen Components
import {
  ExnessMomentum,
  ExnessMomentumremainder,
  Exnesstrength1,
  Exnesstrength2,
  Exnesstrength3,
  Sp500strength1,
  Sp500strength2,
  Sp500strength3,
  Minerviniexness,
  Minervinisp,
  Momentumsp,
} from "./pages/stockscreens";

// Fundamental Analysis
import { Earnings } from "./fundermental";

// Currency Components
import {
  Form,
  Currencymeterchart,
  Currencymeterline,
  Currencytable,
  ForexTracker,
} from "./currency";

// Risk Management - Now imported as a group
import {
  RiskManagementDashboard,
  ForexLotCalculator,
  StocksPercentageCalculator,
  PositionSizingCalculator,
  Metrics,
  Minervini,
  Minervini2,
  MinerviniPart1,
  ProgressiveExposureSimulator,
  ResultBasedAssumption,
  RiskCalculator,
  StocksDollarRiskCalculator,
  PortfolioMethodology,
  Correlation,
} from "./components";

// Asset & Market Analysis - Now imported as organized groups
import {
  Cotsummary,
  CurrencySummary,
  Economic,
  Macro,
  Putratio,
  Report1,
  Retailsentiment,
  Spy,
  Stocksentiment,
} from "./components/Assets";

// Behavioral COT Analysis
import {
  BehavioralAssetList,
  CotHeatmap,
  COTTable,
  BehavioralDashboard,
} from "./components/BehavioralMethodologyCot";

// Briese Methodology
import {
  AssetDetail,
  BrieseAssetList,
  AssetSelector,
  ChartWrapper,
  COTDashboard,
  CrossRateDashboard,
  BrieseDashboard,
  Documentation,
  HistoricalSignalsTable,
} from "./components/BrieseMethodolgy";

// Currency Strength
import {
  Currencymeterchart as CurrencyMeterChart,
  CurrencyStrengthBoard,
} from "./components/CurrencyStrength";

// Sector Analysis & Strategies
import {
  StockScreener,
  StrategyDashboard,
  TickerUploader,
  HighTightFlagDashboard,
  MinerviniDashboard,
  MultiExchangeDashboard,
  StrategyScreenDashboard,
} from "./components/sector";

// ============ ROUTE ORGANIZATION ============

const App = () => {
  // Stock Screen Links
  const stocksLinks = [
    { label: "ExnessMomentum", to: "/stock1" },
    { label: "Tradingview screens", to: "/stock1e" },
    { label: "ExnessMomentumremainder", to: "/stock2" },
    { label: "exness_1 month RS", to: "/stock3" },
    { label: "exness_3 month RS", to: "/stock4" },
    { label: "exness_6 month RS", to: "/stock5" },
    { label: "sp_1 month RS", to: "/stock6" },
    { label: "sp_3 month RS", to: "/stock7" },
    { label: "sp_6 month RS", to: "/stock8" },
    { label: "Minerviniexness", to: "/stock2t" },
    { label: "Minervinisp", to: "/stock1t" },
    { label: "momentumsp", to: "/stock21t" },
  ];

  // Asset Screens Links
  const assetLinks = [
    { label: "COT Summary", to: "/assets/cot-summary" },
    { label: "Currency Summary", to: "/assets/currency-summary" },
    { label: "Economic Data", to: "/assets/economic" },
    { label: "Macroeconomics", to: "/assets/macro" },
    { label: "Put Ratio", to: "/assets/put-ratio" },
    { label: "Report", to: "/assets/report" },
    { label: "Retail Sentiment", to: "/assets/retail-sentiment" },
    { label: "SPY Analysis", to: "/assets/spy" },
    { label: "Stock Sentiment", to: "/assets/stock-sentiment" },
  ];

  // Risk Management Links
  const riskLinks = [
    { label: "Dashboard", to: "/risk/dashboard" },
    { label: "Forex Calculator", to: "/risk/forex-calculator" },
    { label: "Stock % Calculator", to: "/risk/stock-percentage" },
    { label: "Position Sizing", to: "/risk/position-sizing" },
    { label: "Metrics", to: "/risk/metrics" },
    { label: "Risk Calculator", to: "/risk/calculator" },
    { label: "Correlation", to: "/risk/correlation" },
  ];

  // Methodology Links
  const methodologyLinks = [
    { label: "Behavioral COT", to: "/behavioral/dashboard" },
    { label: "Briese Method", to: "/briese/dashboard" },
    { label: "Currency Strength", to: "/currency/strength-board" },
  ];

  // Strategy Links
  const strategyLinks = [
    { label: "Minervini", to: "/strategy/minervini" },
    { label: "High Tight Flag", to: "/strategy/high-tight-flag" },
    { label: "Stock Screener", to: "/sector/screener" },
    { label: "Strategy Dashboard", to: "/sector/strategy" },
  ];

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Core Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Stock Screens */}
        <Route path="/stock1" element={<ExnessMomentum />} />
        <Route path="/stock2" element={<ExnessMomentumremainder />} />
        <Route path="/stock1e" element={<TradingViewWidget1 />} />
        <Route path="/stock3" element={<Exnesstrength1 />} />
        <Route path="/stock4" element={<Exnesstrength2 />} />
        <Route path="/stock5" element={<Exnesstrength3 />} />
        <Route path="/stock6" element={<Sp500strength1 />} />
        <Route path="/stock7" element={<Sp500strength2 />} />
        <Route path="/stock8" element={<Sp500strength3 />} />
        <Route path="/stock2t" element={<Minerviniexness />} />
        <Route path="/stock1t" element={<Minervinisp />} />
        <Route path="/stock21t" element={<Momentumsp />} />

        {/* Currency Components */}
        <Route path="/currency" element={<Form />} />
        <Route path="/currencychart" element={<Currencymeterchart />} />
        <Route path="/currencylinechart" element={<Currencymeterline />} />
        <Route path="/currencytracker" element={<ForexTracker />} />
        <Route path="/currencytable" element={<Currencytable />} />

        {/* Fundamental Analysis */}
        <Route path="/fundermental" element={<Earnings />} />

        {/* ========== ASSET SCREENS ========== */}
        <Route path="/assets/cot-summary" element={<Cotsummary />} />
        <Route path="/assets/currency-summary" element={<CurrencySummary />} />
        <Route path="/assets/economic" element={<Economic />} />
        <Route path="/assets/macro" element={<Macro />} />
        <Route path="/assets/put-ratio" element={<Putratio />} />
        <Route path="/assets/report" element={<Report1 />} />
        <Route path="/assets/retail-sentiment" element={<Retailsentiment />} />
        <Route path="/assets/spy" element={<Spy />} />
        <Route path="/assets/stock-sentiment" element={<Stocksentiment />} />

        {/* ========== BEHAVIORAL METHODOLOGY ========== */}
        <Route path="/behavioral/dashboard" element={<BehavioralDashboard />} />
        <Route path="/behavioral/heat-map" element={<CotHeatmap />} />
        <Route path="/behavioral/table" element={<COTTable />} />
        <Route path="/behavioral/assets" element={<BehavioralAssetList />} />

        {/* ========== BRIESE METHODOLOGY ========== */}
        <Route path="/briese/dashboard" element={<BrieseDashboard />} />
        <Route path="/briese/cot" element={<COTDashboard />} />
        <Route path="/briese/cross-rates" element={<CrossRateDashboard />} />
        <Route path="/briese/asset-selector" element={<AssetSelector />} />
        <Route path="/briese/documentation" element={<Documentation />} />
        <Route path="/briese/signals" element={<HistoricalSignalsTable />} />

        {/* ========== CURRENCY STRENGTH ========== */}
        <Route
          path="/currency/strength-board"
          element={<CurrencyStrengthBoard />}
        />
        <Route path="/currency/meter" element={<CurrencyMeterChart />} />

        {/* ========== RISK MANAGEMENT ========== */}
        <Route path="/risk/dashboard" element={<RiskManagementDashboard />} />
        <Route path="/risk/forex-calculator" element={<ForexLotCalculator />} />
        <Route
          path="/risk/stock-percentage"
          element={<StocksPercentageCalculator />}
        />
        <Route
          path="/risk/position-sizing"
          element={<PositionSizingCalculator />}
        />
        <Route path="/risk/metrics" element={<Metrics />} />
        <Route path="/risk/calculator" element={<RiskCalculator />} />
        <Route path="/risk/correlation" element={<Correlation />} />

        {/* ========== SECTOR & STOCK ANALYSIS ========== */}
        <Route path="/sector/screener" element={<StockScreener />} />
        <Route path="/sector/strategy" element={<StrategyDashboard />} />
        <Route path="/sector/upload" element={<TickerUploader />} />

        {/* ========== TRADING STRATEGIES ========== */}
        <Route path="/strategy/minervini" element={<MinerviniDashboard />} />
        <Route
          path="/strategy/high-tight-flag"
          element={<HighTightFlagDashboard />}
        />
        <Route
          path="/strategy/multi-exchange"
          element={<MultiExchangeDashboard />}
        />
        <Route path="/strategy/screen" element={<StrategyScreenDashboard />} />

        {/* 404 Page */}
        <Route path="*" element={<Pagenotfound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;

// ============ BENEFITS ============
// ✅ Clean, organized imports
// ✅ Easy to understand route structure
// ✅ Grouped by functionality
// ✅ Scalable - easy to add new routes
// ✅ Maintainable - clear naming conventions
// ✅ Reusable - can extract link arrays for menus
