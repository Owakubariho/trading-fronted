# Component Tree & Quick Reference

## All Available Components

### 📊 Assets (Economic & Market Data)

- `Cotsummary` - Commitment of Traders summary data
- `CurrencySummary` - Currency pair summaries
- `Economic` - Economic indicators and data
- `Macro` - Macroeconomic analysis
- `Putratio` - Put/Call ratio tracking
- `Report1` - Market reports
- `Retailsentiment` - Retail trading sentiment
- `Spy` - SPY/S&P 500 analysis
- `Stocksentiment` - Stock sentiment indicators

### 🎯 Behavioral Methodology COT

- `assetList` - Asset selection list
- `CotHeatmap` - Visual heat map of COT data
- `COTTable` - Tabular COT display
- `Dashboard` - Behavioral analysis dashboard

### 📈 Briese Methodology

- `AssetDetail` - Detailed asset information
- `assetList` - Asset selection interface
- `AssetSelector` - Asset picker component
- `ChartWrapper` - Chart display container
- `COTDashboard` - COT-focused dashboard
- `CrossRateDashboard` - Currency cross rates
- `Dashboard` - Main methodology dashboard
- `Documentation` - Strategy documentation
- `HistoricalSignalsTable` - Historical trading signals

### 💱 Currency Strength

- `Currencymeterchart` - Currency strength visualization
- `CurrencyStrengthBoard` - Complete currency strength display

### ⚠️ Risk Management

- `RiskManagementDashboard` - Risk overview & tools
- `ForexLotCalculator` - Forex position sizing
- `StocksPercentageCalculator` - Stock % risk calculator
- `PositionSizingCalculator` - General position sizing
- `Metrics` - Risk metrics & statistics
- `Minervini` - Minervini strategy metrics
- `Minervini2` - Alternative Minervini calculation
- `MinerviniPart1` - Minervini part 1 analysis
- `ProgressiveExposureSimulator` - Exposure simulation
- `ResultBasedAssumption` - Result analysis
- `RiskCalculator` - Risk calculation tool
- `StocksDollarRiskCalculator` - Dollar-based risk
- `PortfolioMethodology` - Portfolio management
- `Correlation` - Pair correlation analysis

### 📊 Sector & Stock Analysis

- `StockScreener` - Stock screening tool
- `StrategyDashboard` - Strategy performance
- `TickerUploader` - Ticker management

### 🎪 Mike Webster Strategies

- `HighTightFlagDashboard` - High tight flag patterns
- `MinerviniDashboard` - Minervini trend strategy
- `MultiExchangeDashboard` - Multi-market analysis
- `StrategyScreenDashboard` - Strategy screening

### 🔧 Layout & Navigation

- `Navbar` - Navigation bar
- `Footer` - Footer component
- `Dropdown` - Dropdown menu
- `Modal` - Modal dialog
- `PrivateRoute` - Protected routes
- `ProtectedLayout` - Protected layout wrapper
- `Providers` - Context providers
- `StockChartModal` - Stock chart modal
- `TradingViewChart` - TradingView integration
- `TradingViewWatchlist` - TradingView watchlist
- `InteractiveWatchlist` - Interactive watchlist

---

## Quick Import Reference

### Import Everything from Assets

```javascript
import * from './components/Assets';
```

### Import All Risk Management Tools

```javascript
import {
  RiskManagementDashboard,
  ForexLotCalculator,
  PositionSizingCalculator,
  RiskCalculator,
} from "./components";
```

### Import All Trading Dashboards

```javascript
import {
  COTDashboard,
  MinerviniDashboard,
  StockScreener,
  StrategyDashboard,
} from "./components";
```

### Import All Currency Analysis

```javascript
import {
  Currencymeterchart,
  CurrencyStrengthBoard,
  CurrencySummary,
  CrossRateDashboard,
} from "./components";
```

---

## Organization Benefits

✅ **Efficient Development** - Find components quickly  
✅ **Clean Imports** - Organized export structure  
✅ **Easy Scaling** - Add components to organized folders  
✅ **Maintainable Code** - Clear folder hierarchy  
✅ **Better Collaboration** - Team understands structure  
✅ **Reduced Conflicts** - Components grouped by feature
