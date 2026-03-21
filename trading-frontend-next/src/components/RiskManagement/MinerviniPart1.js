import React from "react";

const MinerviniPart1 = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 font-sans bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen">
      {/* Building in Failure - Edge */}
      <div className="mb-12 border-b pb-8 bg-blue-100 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-blue-900">
          Building in "Failure"
        </h1>
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">Edge</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="border p-4 rounded-lg bg-white shadow">
            <h3 className="text-xl font-medium mb-3">Trader A</h3>
            <ul className="space-y-2">
              <li>Avg. Gain 15%</li>
              <li>Avg. Loss 5%</li>
              <li>Ratio 3:1</li>
              <li>Bat. Avg. 40%</li>
              <li>AWLR 2:1</li>
              <li>10 trades +28%</li>
            </ul>
          </div>

          <div className="border p-4 rounded-lg bg-white shadow">
            <h3 className="text-xl font-medium mb-3">Trader B</h3>
            <ul className="space-y-2">
              <li>Avg. Gain 7.5%</li>
              <li>Avg. Loss 15%</li>
              <li>Ratio 0.50</li>
              <li>Bat. Avg. 80%</li>
              <li>AWLR 2:1</li>
              <li>10 trades +28%</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Building in Failure - Edge cut in half */}
      <div className="mb-12 border-b pb-8 bg-green-100 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-green-900">
          Building in "Failure"
        </h1>
        <h2 className="text-2xl font-semibold mb-6 text-green-700">
          Edge cut in half
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="border p-4 rounded-lg bg-white shadow">
            <h3 className="text-xl font-bold mb-3">Trader A</h3>
            <ul className="space-y-2">
              <li>Avg. Gain 7.5%</li>
              <li>Avg. Loss 5%</li>
              <li>Ratio 1.5:1</li>
              <li>Bat. Avg. 40%</li>
              <li>AWLR 1:1</li>
              <li>10 trades (-2%)</li>
            </ul>
          </div>

          <div className="border p-4 rounded-lg bg-white shadow">
            <h3 className="text-xl font-bold mb-3">Trader B</h3>
            <ul className="space-y-2">
              <li>Avg. Gain 7.5%</li>
              <li>Avg. Loss 15%</li>
              <li>Ratio 0.50</li>
              <li>Bat. Avg. 40%</li>
              <li>AWLR 0.33</li>
              <li>10 trades (-50%)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Building in Failure - W/L ratio cut in half */}
      <div className="mb-12 border-b pb-8 bg-yellow-100 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-yellow-900">
          Building in "Failure"
        </h1>
        <h2 className="text-2xl font-semibold mb-2 text-yellow-700">
          W/L ratio{" "}
          <span className="text-sm font-normal">("edges") cut in half</span>
        </h2>
        <h3 className="text-xl font-medium mb-6 text-yellow-800">
          Borting Average cut by one-quarter
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full border bg-white shadow">
            <thead>
              <tr className="bg-yellow-200">
                <th className="border px-4 py-2 text-left">Trader A</th>
                <th className="border px-4 py-2 text-left">Trader B</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Avg. Gain 7.5%</td>
                <td className="border px-4 py-2">Avg. Gain 7.5%</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Avg. Loss 5%</td>
                <td className="border px-4 py-2">Avg. Loss 15%</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Ratio 1.5:1</td>
                <td className="border px-4 py-2">Ratio 0.50</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-6">
          <div className="border p-4 rounded-lg bg-white shadow">
            <p className="font-bold">Bat. Avg. 30%</p>
            <p>AWLR 0.64</p>
            <p>10 trades</p>
            <p>(-13%)</p>
          </div>

          <div className="border p-4 rounded-lg bg-white shadow">
            <p className="font-bold">Bat. Avg. 60%</p>
            <p>AWLR 0.75</p>
            <p>10 trades</p>
            <p>(-20%)</p>
          </div>
        </div>
      </div>

      {/* Result Based Assumption Forecast */}
      <div className="mb-12 border-b pb-8 bg-purple-100 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-purple-900">
          Result Based Assumption Forecast (RBAF)
        </h1>

        <div className="grid md:grid-cols-2 gap-8 mb-6">
          <div className="border p-4 rounded-lg bg-white shadow">
            <h2 className="text-2xl font-semibold mb-3">INPUTS</h2>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="py-1">Portfolio Size $</td>
                  <td className="py-1 font-medium">$200,000</td>
                </tr>
                <tr>
                  <td className="py-1">Position Size %</td>
                  <td className="py-1 font-medium">25%</td>
                </tr>
                <tr>
                  <td className="py-1">Particle & Return</td>
                  <td className="py-1 font-medium">100%</td>
                </tr>
                <tr>
                  <td className="py-1">Average % Gain</td>
                  <td className="py-1 font-medium">12%</td>
                </tr>
                <tr>
                  <td className="py-1">Average % Loss</td>
                  <td className="py-1 font-medium">6%</td>
                </tr>
                <tr>
                  <td className="py-1">% of Winning Trades</td>
                  <td className="py-1 font-medium">50%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border p-4 rounded-lg bg-white shadow">
            <h2 className="text-2xl font-semibold mb-3">RESULTS</h2>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="py-1">Avg $ Gain on Winning Trades</td>
                  <td className="py-1 font-medium">$6,000</td>
                </tr>
                <tr>
                  <td className="py-1"># of Winning Trades</td>
                  <td className="py-1 font-medium">67</td>
                </tr>
                <tr>
                  <td className="py-1">Avg $ Loss on Losing Trades</td>
                  <td className="py-1 font-medium">$3,000</td>
                </tr>
                <tr>
                  <td className="py-1"># of Losing Trades</td>
                  <td className="py-1 font-medium">2.1</td>
                </tr>
                <tr>
                  <td className="py-1">Gain / Loss Ratio</td>
                  <td className="py-1 font-medium">2:1</td>
                </tr>
                <tr>
                  <td className="py-1">Expected Net % Return per Trade</td>
                  <td className="py-1 font-medium">0.03</td>
                </tr>
                <tr>
                  <td className="py-1">Expected Net $ Return per Trade</td>
                  <td className="py-1 font-medium">$1,500</td>
                </tr>
                <tr>
                  <td className="py-1">$ Goal</td>
                  <td className="py-1 font-medium">$200,000</td>
                </tr>
                <tr>
                  <td className="py-1"># of Trades Needed to Reach Goal</td>
                  <td className="py-1 font-medium">134</td>
                </tr>
                <tr>
                  <td className="py-1">Adjusted Gain / Loss Ratio</td>
                  <td className="py-1 font-medium">2:1</td>
                </tr>
                <tr>
                  <td className="py-1">Position Size</td>
                  <td className="py-1 font-medium">25%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Position Management Section */}
      <div className="mb-12 border-b pb-8 bg-pink-100 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-pink-900">
          Position Management Principles
        </h1>

        <div className="space-y-6">
          <div className="border p-4 rounded-lg bg-white shadow">
            <h2 className="text-2xl font-semibold mb-3">
              Scaling In vs Averaging Down
            </h2>
            <p className="mb-4">
              If the stock keeps sinking, it becomes even more difficult to sell
              because you kept committing to the stock with additional buys. In
              my trading, I try to buy or add to a position in the direction of
              the trade only after it has shown me a profit; even if I'm buying
              a pullback, I generally wait for the stock to turn up before going
              long.
            </p>
            <p className="font-bold">
              The lesson: never trust the first price unless the position shows
              you a profit.
            </p>
          </div>

          <div className="border p-4 rounded-lg bg-white shadow">
            <h2 className="text-2xl font-semibold mb-3">
              When to Move Up Your Stop
            </h2>
            <p className="mb-2">I have some basic general guidelines:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>
                Any stock that rises to a multiple of my stop loss should never
                be allowed to go into the loss column.
              </li>
              <li>
                When the price of a stock I own rises by three times my risk, I
                almost always move my stop up to at least breakeven.
              </li>
            </ul>
            <p className="mb-4 italic">
              Example: Suppose I buy a stock at $50 and decide that I'm willing
              to risk 5 percent on the trade ($47.50 stop loss for a $2.50
              risk). If the stock advances to $57.50 (3 × $2.50), I move my stop
              to at least $50.
            </p>
            <p className="font-medium">
              Move your stop up when your stock rises by two or three times your
              risk, especially if that number is above your historical average
              gain. This will help guard you against losses and protect your
              profits and your confidence.
            </p>
          </div>

          <div className="border p-4 rounded-lg bg-white shadow">
            <h2 className="text-2xl font-semibold mb-3">
              Not All Ratios Are Created Equal
            </h2>
            <p className="mb-4">
              Most often, high volatility is experienced during a tough market
              environment. During difficult periods, your gains will be smaller
              than normal and your percentage of profitable trades (your batting
              average) will definitely be lower than usual, and so your losses
              must be cut shorter to compensate.
            </p>
            <p className="font-bold">
              Once your batting average drops below 50 percent, increasing your
              risk proportionately to compensate for a higher expected gain
              based on higher volatility will eventually cause you to hit
              negative expectancy.
            </p>
          </div>
        </div>
      </div>

      {/* Optimal Ratios Section */}
      <div className="mb-12 border-b pb-8 bg-indigo-100 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-indigo-900">
          Optimal Gain/Loss Ratios
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="border p-4 rounded-lg bg-white shadow">
            <h2 className="text-xl font-semibold mb-3">
              Total compounded return per 10 trades at various batting averages
            </h2>
            <p className="mb-4">
              At a 40 percent batting average your optimal gain/loss ratio is
              20%/10%; at this ratio your return on investment (ROI) over 10
              trades is 10.2%. Note that the expected return rises from left to
              right and peaks at this ratio.
            </p>
            <p className="font-medium">
              This illustrates the power of finding the optimal ratio. Any less
              and you make less money; however, any more and you also make less
              money.
            </p>
          </div>

          <div className="border p-4 rounded-lg bg-white shadow">
            <h2 className="text-xl font-semibold mb-3">
              The Danger of Geometric Losses
            </h2>
            <p className="mb-4">
              If your winning trades were to more than double from 20% to 42%
              and you maintained a 2:1 gain/loss ratio by cutting your losses at
              21% instead of 10%, you would actually lose money. You're still
              maintaining the same ratio, so how could you be losing?
            </p>
            <p className="font-bold mb-4">
              This is the dangerous nature of losses; they work geometrically
              against you.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                At 50% batting average: 100% winners / 50% losers = break even
              </li>
              <li>
                At 30% batting average: 100% winners / 50% losers = 93% loss in
                10 trades
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 border p-4 rounded-lg bg-white shadow">
          <h2 className="text-xl font-semibold mb-3 text-indigo-800">
            Optimal Ratio at 40% batting average
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border bg-indigo-50">
              <thead>
                <tr className="bg-indigo-200">
                  <th className="border px-4 py-2">Less Return</th>
                  <th className="border px-4 py-2">Less Return</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["-42", "-64"],
                  ["-12/6", "-14/7"],
                  ["-16/8", "-20/10"],
                  ["-24/13", "-36/18"],
                  ["-42/21", "-49/27"],
                  ["-60/30", "-70/35"],
                  ["-80/40", "-90/45"],
                  ["-100/50", "-100"],
                ].map((row, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{row[0]}</td>
                    <td className="border px-4 py-2">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex space-x-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 mr-2 rounded-full border"></div>
              <span className="text-red-700">Negative</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 mr-2 rounded-full border"></div>
              <span className="text-green-700">Expected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Market Environment Strategies */}
      <div className="mb-12 bg-gray-100 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">
          Strategies for Difficult Market Environments
        </h1>

        <div className="border p-4 rounded-lg bg-white shadow">
          <p className="mb-4">
            In a difficult market environment, profits will be smaller than
            normal and losses will be larger; downside gaps will be more common,
            and you will most likely experience greater slippage. The smart way
            to handle this is to:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li className="font-medium">
              Tighten up stop losses. If you normally cut losses at 7 to 8%, cut
              them at 5 to 6%.
            </li>
            <li className="font-medium">
              Settle for smaller profits. If you normally take profits of 15 to
              20% on average, take profits at 10 to 12%.
            </li>
            <li className="font-medium">
              If you're trading with the use of leverage, get off margin
              immediately.
            </li>
            <li className="font-medium">
              Reduce your exposure with regard to your position sizes as well as
              your overall capital commitment.
            </li>
            <li className="font-medium">
              Once you see your batting average and risk/reward profile improve,
              you can start to extend your parameters gradually back to normal
              levels.
            </li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm bg-gradient-to-r from-blue-100 via-green-100 to-pink-100 py-4 rounded">
        <p>
          © {new Date().getFullYear()} Trading Edge Visuals. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default MinerviniPart1;
