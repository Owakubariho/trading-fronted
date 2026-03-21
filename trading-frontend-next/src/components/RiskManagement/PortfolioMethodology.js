import React from 'react';
import SectionCard from './SectionCard';
import Table from './Table';

/**
 * Renders the complete Portfolio Management Methodology as a React component.
 *
 * PROFESSIONAL NOTES:
 * 1. Data-Driven: All key information (tables, lists) is defined as JavaScript
 * data structures (arrays/objects) and passed as props to reusable components (Table).
 * This separates data from presentation logic (Principle of Separation of Concerns).
 * 2. Component Hierarchy: Uses SectionCard to create a consistent, visually clean structure
 * for each major section, improving readability and maintainability.
 * 3. Key Principle Emphasis: The introduction clearly highlights the core tenet:
 * Risk Management trumps all other rules.
 */
const PortfolioMethodology = () => {

    // --- 1. Data Definition: Portfolio Management Structure Essentials
    const essentialsData = {
        headers: ['Key Factor', 'Description'],
        data: [
            ['Position Sizing', 'Determining capital allocation per stock mechanically (fixed percentage of account equity) to prevent emotional trading.'],
            ['Risk Management', 'Protecting capital. Drawdown is the preferred metric. This is the most indispensable part of any investor\'s toolkit.'],
            ['Portfolio Management', 'Portfolio-based risk rules designed to prevent a series of bad trades with large positions from spiraling out of control.'],
        ]
    };

    // --- 2. Data Definition: C Limited Position Sizing Examples
    const cLimitedData = {
        headers: ['Position Size (Full Allocation)', 'Max Loss per Position', 'Impact on Total Account Equity (If Initial Purchase Stops Out)'],
        data: [
            ['35% ($84,000) (Aggressive)', '$2,100', '0.875%'],
            ['25% ($60,000) (Moderate/Aggressive)', '$1,500', '0.625%'],
            ['10% ($24,000) (Conservative)', '$600', '0.25%'],
        ]
    };

    // --- 3. Data Definition: Circuit Breakers
    const circuitBreakerData = {
        headers: ['Type of Circuit Breaker', 'Condition', 'Required Action'],
        data: [
            ['Monthly (Establishing Positions)', 'Account drops by 10% in one month while establishing positions', 'Close all positions and stop trading.'],
            ['Monthly (Leaders Correcting)', 'Account drops 10% from equity highs due to winning stocks correcting', 'Close all non-leaders and stop opening new positions until the account is back above the 10% drawdown mark.'],
            ['Monthly (Aggressive Correction)', 'Account drops 15% off equity highs due to leaders correcting', 'Get off of margin.'],
            ['One-Day', 'Portfolio drops by more than 5% in one day', 'Sell all stocks where profit is not greater than 3%. Attempt to sell enough stock to be off margin. Reduce all non-core positions.'],
        ]
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>🔬 Integrated Portfolio Management Methodology</h1>
            <p>
                The methodology is built on three interconnected elements: Position Sizing, Risk Management, and Portfolio Management. Risk Management is the most important factor, and all risk-related rules must override other system aspects to ensure long-term capital preservation.
            </p>

            <hr style={{ margin: '20px 0' }} />

            {/* SECTION 1: Portfolio Management Structure Essentials */}
            <SectionCard title="1. Structure Essentials" icon="🛠️">
                <p>The core focus is on maximizing return and limiting risk, with survival being mission-critical.</p>
                <Table
                    headers={essentialsData.headers}
                    data={essentialsData.data}
                />
            </SectionCard>

            {/* SECTION 2: Position Sizing and Concentration */}
            <SectionCard title="2. Position Sizing & Concentration" icon="📏">
                <p>Position sizing must be mechanical to prevent emotional allocation (too little to winners, too much to losers).</p>

                <h4>Concentration Guidelines (Full Position Allocation)</h4>
                <ul>
                    <li>Conservative: Full Position = 10% of account equity per stock.</li>
                    <li>Aggressive: Full Position = 25% of account equity per stock.</li>
                </ul>
                <p><em>Note:</em> Increased concentration increases volatility. Investors must be aware of silent overconcentration (e.g., 70% in three technology stocks).</p>

                <h4>Position Building (Pyramiding)</h4>
                <p>The preferred approach constructs a full position with three individual purchases to absorb stock volatility early on. New purchases are only rejoined into the average cost after a stock advances 10% from a new basing structure.</p>
            </SectionCard>

            {/* SECTION 3: Risk Management and Limiting Loss */}
            <SectionCard title="3. Risk Management & Limiting Loss" icon="🛑">
                <p>The primary metric for risk monitoring is drawdown (percentage drop from account high). Controlling drawdown is crucial due to the asymmetry of losses (e.g., a 25% loss requires a 33% gain to recover).</p>

                <h4>The Caruso $ Stop (Example)</h4>
                <p>Maximum Dollar Loss is a fixed percentage of total account equity (e.g., 0.5% for conservative). By using position building, a small dollar loss limit can translate into a much wider percentage stop for the initial small purchase, thus allowing the position to absorb greater stock volatility.</p>

                <h5>C Limited Position Sizing (Account: $240,000)</h5>
                <Table
                    headers={cLimitedData.headers}
                    data={cLimitedData.data}
                />
                <p><em>Nuance:</em> The maximum dollar loss is consistent across the position's life and eventually becomes $0 once unrealized profits provide a cushion.</p>
            </SectionCard>

            {/* SECTION 4: Portfolio Management Rules */}
            <SectionCard title="4. Portfolio Management Rules" icon="🚦">
                <p>These rules act as circuit breakers, forcing the investor to react before drawdown becomes too severe and overriding individual stock conviction.</p>

                <h4>Circuit Breakers (Drawdown Triggers)</h4>
                <Table
                    headers={circuitBreakerData.headers}
                    data={circuitBreakerData.data}
                />

                <h4>Market-Driven Rules (NASDAQ Composite Trend)</h4>
                <ul>
                    <li>Bearish Signal: Three consecutive days of net new 52-week lows Raise cash to  30 % and get off margin.</li>
                    <li>Bullish Signal: Three consecutive days of net new highs or a Follow Through Day  Raise stock exposure to ge 30%.</li>
                </ul>

                <h4>Dealing with Losing Streaks (Drawdown $&gt; 20%)</h4>
                <p>This signals a major issue. A mandatory plan must be followed:</p>
                <ol>
                    <li>Get off of margin.</li>
                    <li>Close all non-leader positions.</li>
                    <li>Maintain 30% cash until the account advances by 5%.</li>
                    <li>Review all trades since the streak started to identify the root cause.</li>
                </ol>
            </SectionCard>

            {/* ANALOGY Summary */}
            <div style={{ ...styles.analogyBlock, marginTop: '30px' }}>
                <h4>Clarification Analogy: The Integrated System</h4>
                <p>The structure is like a complex spacecraft design:</p>
                <ul>
                    <li>Position Sizing: Defines the size/placement of fuel tanks (capital allocation).</li>
                    <li>Risk Management: Acts as the launch abort system (drawdown limits), prioritizing survival (capital) over mission goals.</li>
                    <li>Portfolio Management: Acts as Mission Control (circuit breakers), adjusting overall exposure based on external conditions for long-term mission success.</li>
                </ul>
            </div>
        </div>
    );
};

// Simple styles for the analogy block
const styles = {
    analogyBlock: {
        borderLeft: '4px solid #007bff',
        paddingLeft: '15px',
        backgroundColor: '#f5f9ff',
        padding: '15px',
        borderRadius: '4px',
    }
};

export default PortfolioMethodology;
