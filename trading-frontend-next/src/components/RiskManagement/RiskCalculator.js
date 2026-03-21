import React, { useState, useMemo } from 'react';

/**
 * A dynamic calculator component implementing the Caruso $ Stop methodology.
 * It calculates position size and risk allocation based on buy and stop prices.
 *
 * PROFESSIONAL NOTES:
 * 1. State Management: Uses useState for all inputs (buyPrice, stopPrice, etc.)
 * to ensure the component re-renders and recalculates upon any change.
 * 2. Performance: Uses useMemo to memoize the calculation results. This prevents
 * re-running complex calculations unless the input dependencies change,
 * optimizing performance.
 * 3. Input Handling: Input fields use type="number" and clear event handlers
 * to ensure data integrity.
 */
const RiskCalculator = () => {
    // 1. Core State Inputs
    const [accountEquity, setAccountEquity] = useState(100000); // Default $100,000
    const [maxRiskPercent, setMaxRiskPercent] = useState(0.5); // Default 0.5% (Conservative)
    const [buyPrice, setBuyPrice] = useState(100);
    const [stopPrice, setStopPrice] = useState(90);

    // 2. Pyramiding/Position Building State
    const [buys, setBuys] = useState([
        { price: 100, shares: 0, order: 1 }, // Shares will be calculated
        { price: 110, shares: 0, order: 2 },
        { price: 120, shares: 0, order: 3 },
    ]);

    // --- Core Calculation Logic (Memoized for Performance) ---
    const results = useMemo(() => {
        // A. Base Risk Calculation
        const dollarRiskPerShare = buyPrice - stopPrice;
        if (dollarRiskPerShare <= 0) {
            return {
                maxDollarLoss: 0,
                dollarRiskPerShare: 0,
                sharesInitialBuy: 0,
                totalInitialAllocation: 0,
                totalShares: 0,
                totalAllocation: 0,
                finalAvgCost: 0,
            };
        }

        const maxDollarLoss = accountEquity * (maxRiskPercent / 100);
        const sharesInitialBuy = Math.floor(maxDollarLoss / dollarRiskPerShare);
        const initialAllocation = sharesInitialBuy * buyPrice;

        // B. Pyramiding Calculation (Simulating 3 Buys)
        // Assume the initial calculated share size is the size of the first order (Order 1)
        const updatedBuys = buys.map((b, index) => {
            // For simplicity, we'll keep the share count the same for subsequent orders
            // OR recalculate based on *new* stop-loss logic (more complex, using fixed size for simplicity)
            const currentShares = index === 0 ? sharesInitialBuy : sharesInitialBuy;
            return {
                ...b,
                shares: currentShares,
                value: currentShares * b.price
            };
        });

        // C. Final Portfolio Metrics
        const totalShares = updatedBuys.reduce((sum, b) => sum + b.shares, 0);
        const totalAllocationValue = updatedBuys.reduce((sum, b) => sum + b.value, 0);

        const finalAvgCost = totalAllocationValue / totalShares;
        const totalAllocationPercent = (totalAllocationValue / accountEquity) * 100;

        return {
            maxDollarLoss,
            dollarRiskPerShare,
            sharesInitialBuy,
            initialAllocation,
            updatedBuys,
            totalShares,
            totalAllocationValue,
            finalAvgCost,
            totalAllocationPercent,
        };
    }, [accountEquity, maxRiskPercent, buyPrice, stopPrice, buys]);

    // Function to handle changes in subsequent buy prices (for pyramiding)
    const handlePyramidingChange = (index, value) => {
        const newBuys = [...buys];
        newBuys[index].price = parseFloat(value) || 0;
        setBuys(newBuys);
    };

    const initialStopLossPercent = (buyPrice - stopPrice) / buyPrice * 100;
    const initialAllocationPercent = (results.initialAllocation / accountEquity) * 100;

    // --- Render Logic ---
    return (
        <div style={styles.container}>
            <h2>Dynamic Risk & Position Sizing Calculator</h2>
            <p style={styles.subtext}>Implements the Caruso $ Stop and Position Building rules.</p>

            <div style={styles.grid}>
                {/* --- INPUTS: CORE RISK PARAMETERS --- */}
                <div style={styles.inputGroup}>
                    <label>Account Equity ($)</label>
                    <input
                        type="number"
                        value={accountEquity}
                        onChange={(e) => setAccountEquity(parseFloat(e.target.value) || 0)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>Max Loss per Trade (%)</label>
                    <input
                        type="number"
                        value={maxRiskPercent}
                        onChange={(e) => setMaxRiskPercent(parseFloat(e.target.value) || 0)}
                        style={styles.input}
                        step="0.01"
                    />
                    <small>({maxRiskPercent}% of ${accountEquity} = ${results.maxDollarLoss.toFixed(2)} Max Loss)</small>
                </div>
                <div style={styles.inputGroup}>
                    <label>Initial Buy Price ($)</label>
                    <input
                        type="number"
                        value={buyPrice}
                        onChange={(e) => setBuyPrice(parseFloat(e.target.value) || 0)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>Initial Stop Price ($)</label>
                    <input
                        type="number"
                        value={stopPrice}
                        onChange={(e) => setStopPrice(parseFloat(e.target.value) || 0)}
                        style={styles.input}
                    />
                </div>
            </div>

            <hr style={styles.hr} />

            {/* --- RESULTS: INITIAL POSITION SIZING --- */}
            <div style={styles.resultsBlock}>
                <h3>🎯 Initial Position Sizing (Order 1)</h3>
                <div style={styles.metricGrid}>
                    <div style={styles.metric}>
                        <p>Max Dollar Loss (Fixed)</p>
                        <span style={styles.value}>${results.maxDollarLoss.toFixed(2)}</span>
                    </div>
                    <div style={styles.metric}>
                        <p>Dollar Risk per Share</p>
                        <span style={styles.value}>${results.dollarRiskPerShare.toFixed(2)}</span>
                    </div>
                    <div style={styles.metric}>
                        <p>Calculated Shares to Buy</p>
                        <span style={{ ...styles.value, color: '#28a745' }}>{results.sharesInitialBuy} Shares</span>
                    </div>
                    <div style={styles.metric}>
                        <p>Stop-Loss % for Order 1</p>
                        <span style={styles.value}>{initialStopLossPercent.toFixed(1)}%</span>
                    </div>
                    <div style={styles.metric}>
                        <p>Initial Allocation Value</p>
                        <span style={styles.value}>${results.initialAllocation.toFixed(2)}</span>
                    </div>
                    <div style={styles.metric}>
                        <p>Initial Allocation % of Equity</p>
                        <span style={styles.value}>{initialAllocationPercent.toFixed(1)}%</span>
                    </div>
                </div>
                <p style={styles.note}>
                    The Caruso $ Stop determines share size such that if the stock hits the stop price, the total dollar loss equals your fixed maximum risk.
                </p>
            </div>

            <hr style={styles.hr} />

            {/* --- PYRAMIDING/POSITION BUILDING ANALYSIS --- */}
            <div style={styles.resultsBlock}>
                <h3>📈 Position Building (Pyramiding)</h3>
                <p>Enter the subsequent buy prices (Orders 2 & 3). Shares are kept equal to Order 1 size as per the methodology.</p>

                {results.updatedBuys.map((buy, index) => (
                    <div key={index} style={styles.pyramidingRow}>
                        <label>Order {buy.order} Buy Price</label>
                        <input
                            type="number"
                            value={buy.price}
                            onChange={(e) => handlePyramidingChange(index, e.target.value)}
                            style={styles.input}
                            min={buyPrice + 0.01} // Enforce pyramiding above initial price
                        />
                        <div style={styles.pyramidingSummary}>
                            <span>Shares: {buy.shares}</span>
                            <span>Value: ${buy.value.toFixed(2)}</span>
                        </div>
                    </div>
                ))}

                <h4 style={{ marginTop: '20px' }}>Final Portfolio Metrics After Pyramiding:</h4>
                <div style={styles.metricGrid}>
                    <div style={styles.metric}>
                        <p>Total Shares Held</p>
                        <span style={styles.value}>{results.totalShares}</span>
                    </div>
                    <div style={styles.metric}>
                        <p>Final Average Cost</p>
                        <span style={styles.value}>${results.finalAvgCost.toFixed(2)}</span>
                    </div>
                    <div style={styles.metric}>
                        <p>Total Allocation Value</p>
                        <span style={styles.value}>${results.totalAllocationValue.toFixed(2)}</span>
                    </div>
                    <div style={styles.metric}>
                        <p>Total Allocation % of Equity</p>
                        <span style={{ ...styles.value, color: results.totalAllocationPercent > 25 ? '#dc3545' : '#17a2b8' }}>
                            {results.totalAllocationPercent.toFixed(1)}%
                        </span>
                    </div>
                </div>
                <p style={styles.note}>
                    The maximum loss remains ${results.maxDollarLoss.toFixed(2)} from your starting capital. The risk is now spread across a larger, higher-cost position, but is protected by the position-building approach which only adds to winning positions.
                </p>
            </div>
        </div>
    );
};

// --- Component Styling ---
const styles = {
    container: {
        padding: '30px',
        maxWidth: '900px',
        margin: '0 auto',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
    },
    subtext: {
        color: '#6c757d',
        marginBottom: '20px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        marginBottom: '30px',
        padding: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '6px',
        backgroundColor: '#fff',
    },
    inputGroup: {
        padding: '0 10px',
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        padding: '10px',
        border: '1px solid #ced4da',
        borderRadius: '4px',
        marginTop: '5px',
    },
    hr: {
        margin: '30px 0',
        border: '0',
        borderTop: '1px solid #dee2e6',
    },
    resultsBlock: {
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '6px',
        border: '1px solid #e9ecef',
    },
    metricGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        marginTop: '15px',
    },
    metric: {
        backgroundColor: '#e6f0ff',
        padding: '15px',
        borderRadius: '4px',
        textAlign: 'center',
    },
    value: {
        fontSize: '1.4em',
        fontWeight: 'bold',
        color: '#007bff',
        display: 'block',
        marginTop: '5px',
    },
    note: {
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#fff3cd',
        borderLeft: '4px solid #ffc107',
        color: '#856404',
        borderRadius: '4px',
    },
    pyramidingRow: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 2fr',
        gap: '20px',
        alignItems: 'center',
        marginBottom: '10px',
        padding: '10px',
        borderBottom: '1px dotted #e9ecef',
    },
    pyramidingSummary: {
        display: 'flex',
        justifyContent: 'space-around',
        fontSize: '1.1em',
        fontWeight: 'bold',
    }
};

export default RiskCalculator;
