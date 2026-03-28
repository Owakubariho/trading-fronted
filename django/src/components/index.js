// Main Components Index - Central hub for all component imports

// ============ Assets Components ============
export {
  Cotsummary,
  CurrencySummary,
  Economic,
  Macro,
  Putratio,
  Report1,
  Retailsentiment,
  Spy,
  Stocksentiment,
} from "./Assets";

// ============ Behavioral Methodology COT ============
export {
  assetList as BehavioralAssetList,
  CotHeatmap,
  COTTable,
  Dashboard as BehavioralDashboard,
} from "./BehavioralMethodologyCot";

// ============ Briese Methodology ============
export {
  AssetDetail,
  assetList as BrieseAssetList,
  AssetSelector,
  ChartWrapper,
  COTDashboard,
  CrossRateDashboard,
  Dashboard as BrieseDashboard,
  Documentation,
  HistoricalSignalsTable,
} from "./BrieseMethodolgy";

// ============ Currency Strength ============
export { Currencymeterchart, CurrencyStrengthBoard } from "./CurrencyStrength";

// ============ Risk Management Components ============
export { default as RiskManagementDashboard } from "./RiskManagement/RiskManagementDashboard";
export { default as ForexLotCalculator } from "./RiskManagement/ForexLotCalculator";
export { default as StocksPercentageCalculator } from "./RiskManagement/StocksPercentageCalculator";
export { default as PositionSizingCalculator } from "./RiskManagement/PositionSizingCalculator";
export { default as Metrics } from "./RiskManagement/Metrics";
export { default as Minervini } from "./RiskManagement/Minervini";
export { default as Minervini2 } from "./RiskManagement/Minervini2";
export { default as MinerviniPart1 } from "./RiskManagement/MinerviniPart1";
export { default as ProgressiveExposureSimulator } from "./RiskManagement/ProgressiveExposureSimulator";
export { default as ResultBasedAssumption } from "./RiskManagement/ResultBasedAssumption";
export { default as RiskCalculator } from "./RiskManagement/RiskCalculator";
export { default as StocksDollarRiskCalculator } from "./RiskManagement/StocksDollarRiskCalculator";
export { default as PortfolioMethodology } from "./RiskManagement/PortfolioMethodology";
export { default as Correlation } from "./RiskManagement/Correlation";

// ============ Sector & Strategies ============
export {
  StockScreener,
  StrategyDashboard,
  TickerUploader,
  HighTightFlagDashboard,
  MinerviniDashboard,
  MultiExchangeDashboard,
  StrategyScreenDashboard,
} from "./sector";

// ============ Layout & Navigation Components ============
export { default as Navbar } from "./Navbar";
export { default as Footer } from "./Footer";
export { default as Dropdown } from "./Dropdown";
export { default as Modal } from "./Modal";
export { default as PrivateRoute } from "./PrivateRoute";
export { default as ProtectedLayout } from "./ProtectedLayout";
export { default as Providers } from "./Providers";
export { default as StockChartModal } from "./StockChartModal";
export { default as TradingViewChart } from "./TradingViewChart";
export { default as TradingViewWatchlist } from "./TradingViewWatchlist";
export { default as InteractiveWatchlist } from "./InteractiveWatchlist";
