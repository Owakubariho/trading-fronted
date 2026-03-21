import React, { useEffect, useRef, memo } from 'react';

function TradingViewWatchlist({ symbols }) {
    const container = useRef();

    useEffect(
        () => {
            if (!container.current) return;

            // Clear previous widget
            container.current.innerHTML = '';

            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
            script.type = "text/javascript";
            script.async = true;

            // Map symbols to the format expected by the widget
            // Defaulting to just the ticker if no exchange is provided. 
            // TradingView usually handles "AAPL" well, but "NASDAQ:AAPL" is better.
            // Since we don't know the exchange, we'll try passing the raw ticker.
            const formattedSymbols = (symbols || []).map(s => ({ "s": s }));

            script.innerHTML = JSON.stringify({
                "colorTheme": "light",
                "dateRange": "12M",
                "showChart": true,
                "locale": "en",
                "largeChartUrl": "",
                "isTransparent": false,
                "showSymbolLogo": true,
                "showFloatingTooltip": false,
                "width": "100%",
                "height": "600",
                "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
                "plotLineColorFalling": "rgba(255, 0, 0, 1)",
                "gridLineColor": "rgba(240, 243, 250, 0)",
                "scaleFontColor": "rgba(106, 109, 120, 1)",
                "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
                "belowLineFillColorFalling": "rgba(255, 0, 0, 0.12)",
                "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
                "belowLineFillColorFallingBottom": "rgba(255, 0, 0, 0)",
                "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
                "tabs": [
                    {
                        "title": "Stocks",
                        "symbols": formattedSymbols
                    }
                ]
            });

            const widgetDiv = document.createElement("div");
            widgetDiv.className = "tradingview-widget-container__widget";

            const copyrightDiv = document.createElement("div");
            copyrightDiv.className = "tradingview-widget-copyright";
            copyrightDiv.innerHTML = `<a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a>`;

            container.current.appendChild(widgetDiv);
            container.current.appendChild(copyrightDiv);
            container.current.appendChild(script);
        },
        [symbols]
    );

    return (
        <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
        </div>
    );
}

export default memo(TradingViewWatchlist);
