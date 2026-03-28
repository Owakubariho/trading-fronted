import "./App.css";
import "./index.css";
import React from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router";

// ============================================================================
// LAYOUT & NAVIGATION COMPONENTS
// ============================================================================
import { Navbar, Footer, Dropdown } from "./components";

// ============================================================================
// PAGES
// ============================================================================
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Pagenotfound from "./pages/Pagenotfound";
import TradingViewWidget1 from "./pages/TradingViewWidget1";

// Stock Screen Components
import Exnesstrength1 from "./pages/stockscreens/Exnesstrength1";
import Exnesstrength2 from "./pages/stockscreens/Exnesstrength2";
import Exnesstrength3 from "./pages/stockscreens/Exnesstrength3";
import Sp500strength1 from "./pages/stockscreens/Sp500strength1";
import Sp500strength2 from "./pages/stockscreens/Sp500strength2";
import Sp500strength3 from "./pages/stockscreens/Sp500strength3";
import Minerviniexness from "./pages/stockscreens/Minerviniexness";
import Minervinisp from "./pages/stockscreens/Minervinisp";
import Momentumsp from "./pages/stockscreens/Momentumsp";
import ExnessMomentum from "./pages/stockscreens/ExnessMomentum";
import ExnessMomentumremainder from "./pages/stockscreens/ExnessMomentumremainder";

// ============================================================================
// CURRENCY & FUNDAMENTAL COMPONENTS
// ============================================================================
import Form from "./currency/Form";
import Currencymeterchart from "./currency/Currencymeterchart";
import Currencymeterline from "./currency/Currencymeterline";
import Currencytable from "./currency/Currencytable";
import ForexTracker from "./currency/ForexTracker";
import Earnings from "./fundermental/Earnings";

// ============================================================================
// METHODOLOGY COMPONENTS
// ============================================================================
import Currency from "./components/methodology/Currency";
import Market from "./components/methodology/Market";

// ============================================================================
// ORGANIZED COMPONENT IMPORTS FROM INDEX FILES
// ============================================================================

// Risk Management Components (from organized index)
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

const App = () => {
  const stocksLinks = [
    { label: "ExnessMomentum", to: "/stock1" },
    { label: "Tradingview screens", to: "/stock1e" },
    { label: "ExnessMomentumremainder", to: "/stock2" },
    { label: "exness_1 month RS", to: "/stock3" },
    { label: "exness_3 month RS", to: "/stock4" },
    { label: "exness_6 month RS", to: "/stock5" },
    // sp500
    { label: "sp_1 month RS", to: "/stock6" },
    { label: "sp_3 month RS", to: "/stock7" },
    { label: "sp_6 month RS", to: "/stock8" },

    { label: "Minerviniexness", to: "/stock2t" },
    { label: "Minervinisp", to: "/stock1t" },
    { label: "momentumsp", to: "/stock21t" },
  ];

  const riskManagementLinks = [
    { label: "Dashboard", to: "/risk-dashboard" },
    { label: "Forex Lot Calculator", to: "/forex-calculator" },
    { label: "Stocks % Calculator", to: "/stocks-percentage" },
    { label: "Position Sizing", to: "/position-sizing" },
    { label: "Metrics", to: "/metrics" },
    { label: "Minervini", to: "/minervini" },
    { label: "Minervini 2", to: "/minervini2" },
    { label: "Minervini Part 1", to: "/minervini-part1" },
    { label: "Progressive Exposure", to: "/progressive-exposure" },
    { label: "Result Based Assumption", to: "/result-assumption" },
    { label: "Risk Calculator", to: "/risk-calculator" },
    { label: "Stocks $ Risk", to: "/stocks-dollar-risk" },
    { label: "Portfolio Methodology", to: "/portfolio-methodology" },
    { label: "Correlation", to: "/correlation" },
  ];

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-grow pt-16">
          {/* Left-side navigation */}
          <div className="w-1/4 bg-gray-200 p-4">
            <h2 className="text-lg font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
              Detailed Analysis
            </h2>

            <Dropdown
              label="Stockscreens"
              className="text-blue-700"
              links={stocksLinks}
            />

            <Dropdown
              label="Risk Management Tools"
              links={riskManagementLinks}
            />
          </div>
          {/* Right-side content */}
          <div className="w-3/4 p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/currency" element={<Form />} />
              <Route path="/currencychart" element={<Currencymeterchart />} />
              <Route
                path="/currencylinechart"
                element={<Currencymeterline />}
              />
              <Route path="/currencytracker" element={<ForexTracker />} />
              <Route path="/currencytable" element={<Currencytable />} />
              <Route path="/fundermental" element={<Earnings />} />

              {/* cot index - routes removed - modules no longer imported */}

              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/stock1" element={<ExnessMomentum />} />
              <Route path="/stock2" element={<ExnessMomentumremainder />} />
              <Route path="/stock1e" element={<TradingViewWidget1 />} />
              <Route path="/stock3" element={<Exnesstrength1 />} />
              <Route path="/stock4" element={<Exnesstrength2 />} />
              <Route path="/stock5" element={<Exnesstrength3 />} />
              <Route path="/stock2t" element={<Minerviniexness />} />
              <Route path="/stock1t" element={<Minervinisp />} />
              <Route path="/stock21t" element={<Momentumsp />} />

              {/* STRENGTH SP */}
              <Route path="/stock6" element={<Sp500strength1 />} />
              <Route path="/stock7" element={<Sp500strength2 />} />
              <Route path="/stock8" element={<Sp500strength3 />} />

              {/* Risk Management Tools Routes */}
              <Route
                path="/risk-dashboard"
                element={<RiskManagementDashboard />}
              />
              <Route
                path="/forex-calculator"
                element={<ForexLotCalculator />}
              />
              <Route
                path="/stocks-percentage"
                element={<StocksPercentageCalculator />}
              />
              <Route
                path="/position-sizing"
                element={<PositionSizingCalculator />}
              />
              <Route path="/metrics" element={<Metrics />} />
              <Route path="/minervini" element={<Minervini />} />
              <Route path="/minervini2" element={<Minervini2 />} />
              <Route path="/minervini-part1" element={<MinerviniPart1 />} />
              <Route
                path="/progressive-exposure"
                element={<ProgressiveExposureSimulator />}
              />
              <Route
                path="/result-assumption"
                element={<ResultBasedAssumption />}
              />
              <Route path="/risk-calculator" element={<RiskCalculator />} />
              <Route
                path="/stocks-dollar-risk"
                element={<StocksDollarRiskCalculator />}
              />
              <Route
                path="/portfolio-methodology"
                element={<PortfolioMethodology />}
              />
              <Route path="/correlation" element={<Correlation />} />

              {/* page not found  */}
              <Route path="*" element={<Pagenotfound />} />

              {/* methodologies and strategies */}
              <Route path="/currency-1" element={<Currency />} />
              <Route path="/currency-2" element={<Market />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
