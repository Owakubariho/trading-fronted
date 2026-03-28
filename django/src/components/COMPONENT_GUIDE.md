# Component Organization & Import Guide

This document explains how to import and use components from the organized folder structure.

## Folder Structure Overview

```
src/components/
├── Assets/                          (Economic and market data components)
├── BehavioralMethodologyCot/         (COT behavioral analysis)
├── BrieseMethodolgy/                (Briese methodology components)
├── CurrencyStrength/                (Currency strength indicators)
├── RiskManagement/                  (Risk & position sizing calculators)
├── sector/                          (Sector analysis & stock screens)
│   └── mikewebster/                 (Mike Webster strategies)
├── methodology/                     (Market analysis methodologies)
├── index.js                         (Main export hub)
└── [Other utility components]
```

## Import Methods

### Method 1: Import from Main Components Index (Recommended)

```javascript
// Import multiple components at once from the main index
import {
  Cotsummary,
  CurrencySummary,
  Economic,
  RiskManagementDashboard,
  ForexLotCalculator,
  CotHeatmap,
  StockScreener,
} from "./components";
```

### Method 2: Import from Specific Folder Index

```javascript
// Import from Assets folder
import { Cotsummary, CurrencySummary, Economic } from "./components/Assets";

// Import from Behavioral Methodology
import {
  CotHeatmap,
  COTTable,
  BehavioralDashboard,
} from "./components/BehavioralMethodologyCot";

// Import from Briese Methodology
import {
  COTDashboard,
  CrossRateDashboard,
  BrieseDashboard,
} from "./components/BrieseMethodolgy";

// Import from Currency Strength
import {
  Currencymeterchart,
  CurrencyStrengthBoard,
} from "./components/CurrencyStrength";

// Import from Sector
import { StockScreener, StrategyDashboard } from "./components/sector";

// Import from Mike Webster strategies
import {
  MinerviniDashboard,
  HighTightFlagDashboard,
} from "./components/sector/mikewebster";

// Import from Risk Management
import {
  ForexLotCalculator,
  RiskManagementDashboard,
} from "./components/RiskManagement";
```

### Method 3: Direct File Import

```javascript
// Import directly from specific file
import Cotsummary from "./components/Assets/Cotsummary";
import RiskManagementDashboard from "./components/RiskManagement/RiskManagementDashboard";
```

## Component Groups & Their Use Cases

### Assets Components

Economic indicators, market sentiment, and asset-specific reports.

- `Cotsummary` - Commitment of Traders summary
- `CurrencySummary` - Currency overview
- `Economic` - Economic data
- `Macro` - Macroeconomic indicators
- `Putratio` - Put/Call ratio analysis
- `Report1` - Market report
- `Retailsentiment` - Retail sentiment data
- `Spy` - SPY-specific analysis
- `Stocksentiment` - Stock sentiment indicators

### Behavioral Methodology COT

Commitment of Traders analysis from behavioral perspective.

- `CotHeatmap` - Heat map visualization
- `COTTable` - Tabular COT data
- `Dashboard` - Behavioral dashboard
- `assetList` - Available assets list

### Briese Methodology

Advanced methodology for cross-rate and asset analysis.

- `COTDashboard` - COT analysis dashboard
- `CrossRateDashboard` - Currency cross-rate analysis
- `AssetSelector` - Select and compare assets
- `ChartWrapper` - Chart display wrapper
- `Documentation` - Strategy documentation

### Currency Strength

Currency pair strength and momentum analysis.

- `Currencymeterchart` - Currency strength meter
- `CurrencyStrengthBoard` - Complete strength board

### Risk Management

Position sizing and risk calculation tools.

- `RiskManagementDashboard` - Risk overview
- `ForexLotCalculator` - Calculate forex lot sizes
- `PositionSizingCalculator` - Calculate position sizes
- `RiskCalculator` - General risk calculations

### Sector & Stock Analysis

Stock screening and sector-specific strategies.

- `StockScreener` - Screen stocks by criteria
- `StrategyDashboard` - Strategy performance dashboard
- `TickerUploader` - Upload and manage tickers

### Mike Webster Strategies

Specialized trading strategies and screen dashboards.

- `MinerviniDashboard` - Minervini trend following
- `HighTightFlagDashboard` - High tight flag patterns
- `StrategyScreenDashboard` - Strategy screening
- `MultiExchangeDashboard` - Multi-exchange analysis

## Usage Examples

### Example 1: Display Risk Management Dashboard

```javascript
import { RiskManagementDashboard, ForexLotCalculator } from "./components";

export default function App() {
  return (
    <div>
      <RiskManagementDashboard />
      <ForexLotCalculator />
    </div>
  );
}
```

### Example 2: Display Market Analysis

```javascript
import {
  COTDashboard,
  CrossRateDashboard,
  CurrencyStrengthBoard,
} from "./components";

export default function MarketAnalysis() {
  return (
    <div>
      <COTDashboard />
      <CurrencyStrengthBoard />
      <CrossRateDashboard />
    </div>
  );
}
```

### Example 3: Display Trading Strategies

```javascript
import {
  MinerviniDashboard,
  HighTightFlagDashboard,
  StockScreener,
} from "./components";

export default function Strategies() {
  return (
    <div>
      <StockScreener />
      <MinerviniDashboard />
      <HighTightFlagDashboard />
    </div>
  );
}
```

## Adding New Components

When adding new components to existing folders:

1. Create the component file in the appropriate folder
2. Add the export to the folder's `index.js`
3. (Optional) Add the export to the main `src/components/index.js` for easier access

Example:

```javascript
// In src/components/Assets/index.js
export { default as NewComponent } from "./NewComponent";

// In src/components/index.js
export { default as NewComponent } from "./Assets/NewComponent";
```

## Benefits of This Structure

- ✅ **Easy Navigation**: All components organized by functionality
- ✅ **Simple Imports**: Use the main index for quick access
- ✅ **Scalability**: Easy to add new components
- ✅ **Maintainability**: Clear folder organization
- ✅ **Discoverability**: Well-organized structure helps finding components
- ✅ **Reusability**: Export pattern makes components easy to use anywhere
