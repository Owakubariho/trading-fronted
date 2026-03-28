// EXAMPLE: Routes Configuration Using Organized Components
// This file shows how to structure routes using the organized component imports

import { Routes, Route, BrowserRouter } from "react-router";

// Import organized components
import {
  // Assets
  Cotsummary,
  CurrencySummary,
  Economic,
  Macro,
  Putratio,
  Report1,
  Retailsentiment,
  Spy,
  Stocksentiment,

  // Behavioral Methodology
  BehavioralAssetList,
  CotHeatmap,
  COTTable,
  BehavioralDashboard,

  // Briese Methodology
  AssetDetail,
  BrieseAssetList,
  AssetSelector,
  ChartWrapper,
  COTDashboard,
  CrossRateDashboard,
  BrieseDashboard,
  Documentation,
  HistoricalSignalsTable,

  // Currency Strength
  Currencymeterchart,
  CurrencyStrengthBoard,

  // Risk Management
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

  // Sector & Strategies
  StockScreener,
  StrategyDashboard,
  TickerUploader,
  HighTightFlagDashboard,
  MinerviniDashboard,
  MultiExchangeDashboard,
  StrategyScreenDashboard,

  // Layout
  Navbar,
  Footer,
  Dropdown,
  Modal,
} from "./components";

// ============ ROUTE GROUPS ============

// Assets Routes
export const assetRoutes = [
  { path: "/assets/cot-summary", component: Cotsummary, label: "COT Summary" },
  {
    path: "/assets/currency-summary",
    component: CurrencySummary,
    label: "Currency Summary",
  },
  { path: "/assets/economic", component: Economic, label: "Economic Data" },
  { path: "/assets/macro", component: Macro, label: "Macroeconomics" },
  { path: "/assets/put-ratio", component: Putratio, label: "Put/Call Ratio" },
  { path: "/assets/report", component: Report1, label: "Market Report" },
  {
    path: "/assets/retail-sentiment",
    component: Retailsentiment,
    label: "Retail Sentiment",
  },
  { path: "/assets/spy", component: Spy, label: "SPY Analysis" },
  {
    path: "/assets/stock-sentiment",
    component: Stocksentiment,
    label: "Stock Sentiment",
  },
];

// Behavioral Methodology Routes
export const behavioralRoutes = [
  {
    path: "/behavioral/dashboard",
    component: BehavioralDashboard,
    label: "Dashboard",
  },
  { path: "/behavioral/heat-map", component: CotHeatmap, label: "Heat Map" },
  { path: "/behavioral/table", component: COTTable, label: "COT Table" },
  {
    path: "/behavioral/assets",
    component: BehavioralAssetList,
    label: "Assets",
  },
];

// Briese Methodology Routes
export const brieseRoutes = [
  { path: "/briese/dashboard", component: BrieseDashboard, label: "Dashboard" },
  { path: "/briese/cot", component: COTDashboard, label: "COT Dashboard" },
  {
    path: "/briese/cross-rates",
    component: CrossRateDashboard,
    label: "Cross Rates",
  },
  { path: "/briese/asset-selector", component: AssetSelector, label: "Assets" },
  {
    path: "/briese/documentation",
    component: Documentation,
    label: "Documentation",
  },
  {
    path: "/briese/signals",
    component: HistoricalSignalsTable,
    label: "Signals",
  },
];

// Currency Strength Routes
export const currencyRoutes = [
  {
    path: "/currency/strength-board",
    component: CurrencyStrengthBoard,
    label: "Strength Board",
  },
  {
    path: "/currency/meter",
    component: Currencymeterchart,
    label: "Meter Chart",
  },
];

// Risk Management Routes
export const riskRoutes = [
  {
    path: "/risk/dashboard",
    component: RiskManagementDashboard,
    label: "Dashboard",
  },
  {
    path: "/risk/forex-calculator",
    component: ForexLotCalculator,
    label: "Forex Calculator",
  },
  {
    path: "/risk/stock-percentage",
    component: StocksPercentageCalculator,
    label: "Stock %",
  },
  {
    path: "/risk/position-sizing",
    component: PositionSizingCalculator,
    label: "Position Sizing",
  },
  { path: "/risk/metrics", component: Metrics, label: "Metrics" },
  {
    path: "/risk/calculator",
    component: RiskCalculator,
    label: "Risk Calculator",
  },
  {
    path: "/risk/portfolio",
    component: PortfolioMethodology,
    label: "Portfolio",
  },
  { path: "/risk/correlation", component: Correlation, label: "Correlation" },
];

// Sector & Stock Analysis Routes
export const sectorRoutes = [
  {
    path: "/sector/screener",
    component: StockScreener,
    label: "Stock Screener",
  },
  {
    path: "/sector/strategy",
    component: StrategyDashboard,
    label: "Strategy Dashboard",
  },
  {
    path: "/sector/upload",
    component: TickerUploader,
    label: "Upload Tickers",
  },
];

// Trading Strategies Routes
export const strategyRoutes = [
  {
    path: "/strategy/minervini",
    component: MinerviniDashboard,
    label: "Minervini",
  },
  {
    path: "/strategy/high-tight-flag",
    component: HighTightFlagDashboard,
    label: "High Tight Flag",
  },
  {
    path: "/strategy/multi-exchange",
    component: MultiExchangeDashboard,
    label: "Multi Exchange",
  },
  {
    path: "/strategy/screen",
    component: StrategyScreenDashboard,
    label: "Strategy Screen",
  },
];

// ============ EXAMPLE: RENDERING ROUTES ============

export function AppRoutes() {
  return (
    <Routes>
      {/* Assets */}
      {assetRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      ))}

      {/* Behavioral Methodology */}
      {behavioralRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      ))}

      {/* Briese Methodology */}
      {brieseRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      ))}

      {/* Currency Strength */}
      {currencyRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      ))}

      {/* Risk Management */}
      {riskRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      ))}

      {/* Sector & Stock Analysis */}
      {sectorRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      ))}

      {/* Trading Strategies */}
      {strategyRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      ))}
    </Routes>
  );
}

// ============ EXAMPLE: NAVIGATION MENU ============

export const navigationMenu = {
  Assets: assetRoutes,
  "Behavioral COT": behavioralRoutes,
  "Briese Methodology": brieseRoutes,
  "Currency Strength": currencyRoutes,
  "Risk Management": riskRoutes,
  "Sector Analysis": sectorRoutes,
  Strategies: strategyRoutes,
};

// Usage in Navbar:
// navigationMenu.forEach((category, routes) => {
//   routes.forEach(route => {
//     <NavLink to={route.path}>{route.label}</NavLink>
//   })
// })
