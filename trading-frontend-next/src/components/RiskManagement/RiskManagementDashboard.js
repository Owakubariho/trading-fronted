import React from "react";

const RiskManagementDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen">
      {/* Header */}
      <header className="mb-8 text-center bg-blue-100 rounded-xl shadow-md py-6">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">
          Risk Management Principles
        </h1>
        <p className="text-blue-700">
          Mastering the art of trading through disciplined risk management
        </p>
      </header>

      {/* 3 Key Facts Section - Restyled */}
      <section className="mb-12 bg-gradient-to-br from-blue-100 via-white to-green-100 p-8 rounded-2xl shadow-xl border-2 border-blue-300">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-200 mr-4">
              <svg
                className="w-7 h-7 text-blue-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </span>
            <h2 className="text-3xl font-extrabold text-blue-900 tracking-tight">
              3 Key Facts About Losses
            </h2>
          </div>
          <div className="flex space-x-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold text-sm shadow">
              Risk Awareness
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 font-semibold text-sm shadow">
              Protection
            </span>
          </div>
        </div>
        <ol className="list-none grid md:grid-cols-3 gap-6 text-blue-800 mb-8">
          <li className="flex items-start bg-white rounded-xl shadow p-4 border-l-4 border-blue-400">
            <span className="mr-3 mt-1 text-blue-500">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6"
                />
              </svg>
            </span>
            <span className="font-medium">
              You are NOT going to be correct all the time –{" "}
              <span className="font-bold text-red-600">
                YOU'RE GOING TO HAVE LOSSES
              </span>
            </span>
          </li>
          <li className="flex items-start bg-white rounded-xl shadow p-4 border-l-4 border-green-400">
            <span className="mr-3 mt-1 text-green-500">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </span>
            <span className="font-medium">
              Losses work{" "}
              <span className="font-bold text-green-700">geometrically</span>{" "}
              against you – the bigger, the harder to recoup
            </span>
          </li>
          <li className="flex items-start bg-white rounded-xl shadow p-4 border-l-4 border-yellow-400">
            <span className="mr-3 mt-1 text-yellow-500">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
            <span className="font-medium">
              Keeping losses small is your{" "}
              <span className="font-bold text-yellow-700">
                ONLY real protection
              </span>{" "}
              against large losses
            </span>
          </li>
        </ol>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full bg-gradient-to-r from-blue-50 via-white to-green-50 rounded-xl overflow-hidden shadow-lg border border-blue-200">
            <thead className="bg-blue-300">
              <tr>
                <th className="px-6 py-3 text-left text-blue-900 font-bold text-lg">
                  LOSS
                </th>
                <th className=""></th>
                <th className="px-6 py-3 text-left text-green-800 font-bold text-lg">
                  GAIN TO BREAK EVEN
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              {[
                { loss: "5%", gain: "5.26%" },
                { loss: "10%", gain: "11%" },
                { loss: "20%", gain: "25%" },
                { loss: "30%", gain: "43%" },
                { loss: "40%", gain: "67%" },
                { loss: "50%", gain: "100%" },
                { loss: "60%", gain: "150%" },
                { loss: "70%", gain: "233%" },
                { loss: "80%", gain: "400%" },
                { loss: "90%", gain: "900%" },
              ].map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-blue-50"}
                >
                  <td className="px-6 py-3 font-bold text-blue-900 text-lg">
                    {item.loss}
                  </td>
                  <td className="px-6 py-3"></td>
                  <td className="px-6 py-3 text-green-700 font-bold text-lg">
                    {item.gain}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Risk vs Reward Section */}
      <section className="mb-12 grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-green-200">
          <h2 className="text-2xl font-semibold text-green-800 mb-4 border-b pb-2">
            Risk vs Reward
          </h2>
          <div className="flex justify-center my-4">
            <div className="relative h-64 w-32">
              <div className="absolute top-0 left-0 right-0 h-1/4 bg-green-100 border border-green-300 flex items-center justify-center">
                <span className="text-green-800 font-medium">+20%</span>
              </div>
              <div className="absolute top-1/4 left-0 right-0 h-1/4 bg-blue-100 border border-blue-300 flex items-center justify-center">
                <span className="text-blue-800">Trader A-Buys Here</span>
              </div>
              <div className="absolute top-2/4 left-0 right-0 h-1/4 bg-gray-100 border border-gray-300 flex items-center justify-center">
                <span className="text-gray-800">1R</span>
              </div>
              <div className="absolute top-3/4 left-0 right-0 h-1/4 bg-red-100 border border-red-300 flex items-center justify-center">
                <span className="text-red-800">-5%</span>
              </div>
            </div>
            <div className="relative h-64 w-32 ml-4">
              <div className="absolute top-0 left-0 right-0 h-1/4 bg-green-100 border border-green-300 flex items-center justify-center">
                <span className="text-green-800 font-medium">+20%</span>
              </div>
              <div className="absolute top-1/2 left-0 right-0 h-1/4 bg-blue-100 border border-blue-300 flex items-center justify-center">
                <span className="text-blue-800">Trader B-Buys Here</span>
              </div>
              <div className="absolute top-3/4 left-0 right-0 h-1/4 bg-gray-100 border border-gray-300 flex items-center justify-center">
                <span className="text-gray-800">1R</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-red-100 border border-red-300 flex items-center justify-center">
                <span className="text-red-800">-20%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-yellow-200">
          <h2 className="text-2xl font-semibold text-yellow-800 mb-4 border-b pb-2">
            Know What You Control
          </h2>
          <p className="italic text-gray-600 mb-4">
            "In trading we cannot direct the wind, we can only adjust our
            sails."
          </p>

          <div className="mb-6">
            <h3 className="font-medium text-green-700 mb-2">Direct Control</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>What you buy</li>
              <li>When you buy</li>
              <li>How much you buy</li>
              <li>When you sell</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-red-700 mb-2">No Control</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>How much a stock goes up (profitability)</li>
              <li>Frequency of wins (batting average)</li>
            </ul>
          </div>

          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-yellow-800 font-medium">
              How do we get some control over the thing we don't have control
              of?
            </p>
          </div>
        </div>
      </section>

      {/* Odds Table Section */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow-md border border-purple-200">
        <h2 className="text-2xl font-semibold text-purple-800 mb-4 border-b pb-2">
          Always Get Odds on Your Money
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-100 rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-gray-700"></th>
                <th className="px-4 py-2 text-left text-gray-700">Risk</th>
                <th className="px-4 py-2 text-left text-gray-700">Reward</th>
                <th className="px-4 py-2 text-left text-gray-700">
                  Win Rate % Breakeven
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {[
                { type: "Laying", risk: 50, reward: 1, winRate: "98%" },
                { type: "", risk: 10, reward: 1, winRate: "91%" },
                { type: "", risk: 5, reward: 1, winRate: "83%" },
                { type: "", risk: 3, reward: 1, winRate: "75%" },
                { type: "", risk: 2, reward: 1, winRate: "67%" },
                { type: "Even Money", risk: 1, reward: 1, winRate: "50%" },
                { type: "Getting", risk: 1, reward: 2, winRate: "33%" },
                { type: "", risk: 1, reward: 3, winRate: "25%" },
                { type: "", risk: 1, reward: 5, winRate: "17%" },
                { type: "", risk: 1, reward: 10, winRate: "9%" },
                { type: "", risk: 1, reward: 50, winRate: "2%" },
              ].map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-2 font-medium">{item.type}</td>
                  <td className="px-4 py-2">{item.risk}</td>
                  <td className="px-4 py-2">{item.reward}</td>
                  <td className="px-4 py-2">{item.winRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Trading Triangle Section */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow-md border border-blue-200">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4 border-b pb-2">
          The Trading Triangle
        </h2>
        <div className="flex flex-col items-center">
          <div className="relative w-64 h-56 mb-4">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center">
              <div className="bg-blue-100 px-4 py-2 rounded-lg border border-blue-300">
                <p className="font-medium text-blue-800">Average Gain</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 text-center">
              <div className="bg-green-100 px-4 py-2 rounded-lg border border-green-300">
                <p className="font-medium text-green-800">Edge</p>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 text-center">
              <div className="bg-purple-100 px-4 py-2 rounded-lg border border-purple-300">
                <p className="font-medium text-purple-800">Average Loss</p>
              </div>
            </div>
            <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-center">
              <div className="bg-yellow-100 px-4 py-2 rounded-lg border border-yellow-300">
                <p className="font-medium text-yellow-800">Batting Average</p>
              </div>
            </div>
            <svg className="w-full h-full" viewBox="0 0 200 180">
              <polygon
                points="100,20 180,160 20,160"
                fill="none"
                stroke="#4B5563"
                strokeWidth="2"
              />
              <line
                x1="100"
                y1="20"
                x2="100"
                y2="90"
                stroke="#4B5563"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              <line
                x1="20"
                y1="160"
                x2="100"
                y2="90"
                stroke="#4B5563"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              <line
                x1="180"
                y1="160"
                x2="100"
                y2="90"
                stroke="#4B5563"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Holy Grail Formula Section */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow-md border border-green-200">
        <h2 className="text-2xl font-semibold text-green-800 mb-4 border-b pb-2">
          Losses are a Function of Expected Gain
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>a. How much can you expect to gain on average?</p>
          <p>b. How often can you expect to be profitable on average?</p>

          <div className="mt-4 grid md:grid-cols-4 gap-4">
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="font-medium">1. Average Gain (AG)</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="font-medium">2. Average Loss (AL)</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="font-medium">
                3. Percentage of Winning Trades (PWT)
              </p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="font-medium">
                4. Percentage of Losing Trades (PLT)
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              The "Holy Grail"
            </h3>
            <div className="text-center text-lg font-mono bg-white p-3 rounded border border-gray-300">
              (AG × PWT) / (AL × PLT) = (AWLR)
            </div>
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded border border-gray-300">
                <p className="font-medium">Example 1:</p>
                <p>10 × 50 / 5 × 60 = 2:1</p>
              </div>
              <div className="bg-white p-3 rounded border border-gray-300">
                <p className="font-medium">Example 2:</p>
                <p>15 × 40 / 5 × 60 = 2:1</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Tracker Section */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Monthly Tracker
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-100 rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-gray-700"></th>
                <th className="px-4 py-2 text-left text-gray-700">AVG GAIN</th>
                <th className="px-4 py-2 text-left text-gray-700">AVG LOSS</th>
                <th className="px-4 py-2 text-left text-gray-700">WIN %</th>
                <th className="px-4 py-2 text-left text-gray-700">
                  TOTAL TRADES
                </th>
                <th className="px-4 py-2 text-left text-gray-700">
                  LG GAIN & LOSS
                </th>
                <th className="px-4 py-2 text-left text-gray-700">
                  AVG DAYS GAIN
                </th>
                <th className="px-4 py-2 text-left text-gray-700">
                  AVG DAYS LOSS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {[
                {
                  month: "JAN",
                  avgGain: "7.78%",
                  avgLoss: "3.65%",
                  winPct: "20.00%",
                  totalTrades: 5,
                  lgGainLoss: "7.78%",
                  avgDaysGain: 7,
                  avgDaysLoss: 10,
                },
                {
                  month: "FEB",
                  avgGain: "17.51%",
                  avgLoss: "5.35%",
                  winPct: "62.50%",
                  totalTrades: 8,
                  lgGainLoss: "21.34%",
                  avgDaysGain: 24,
                  avgDaysLoss: 9,
                },
                {
                  month: "MAR",
                  avgGain: "17.20%",
                  avgLoss: "4.91%",
                  winPct: "55.56%",
                  totalTrades: 9,
                  lgGainLoss: "29.87%",
                  avgDaysGain: 31,
                  avgDaysLoss: 11,
                },
                {
                  month: "APR",
                  avgGain: "9.95%",
                  avgLoss: "5.48%",
                  winPct: "40.00%",
                  totalTrades: 10,
                  lgGainLoss: "10.02%",
                  avgDaysGain: 19,
                  avgDaysLoss: 17,
                },
                {
                  month: "MAY",
                  avgGain: "6.63%",
                  avgLoss: "5.50%",
                  winPct: "54.55%",
                  totalTrades: 11,
                  lgGainLoss: "24.79%",
                  avgDaysGain: 18,
                  avgDaysLoss: 19,
                },
                {
                  month: "JUN",
                  avgGain: "16.67%",
                  avgLoss: "6.33%",
                  winPct: "57.14%",
                  totalTrades: 14,
                  lgGainLoss: "30.01%",
                  avgDaysGain: 44,
                  avgDaysLoss: 13,
                },
              ].map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-2 font-medium">{item.month}</td>
                  <td className="px-4 py-2">{item.avgGain}</td>
                  <td className="px-4 py-2">{item.avgLoss}</td>
                  <td className="px-4 py-2">{item.winPct}</td>
                  <td className="px-4 py-2">{item.totalTrades}</td>
                  <td className="px-4 py-2">{item.lgGainLoss}</td>
                  <td className="px-4 py-2">{item.avgDaysGain}</td>
                  <td className="px-4 py-2">{item.avgDaysLoss}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            Trading Summary
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white p-3 rounded border border-green-300">
              <p className="font-medium">Winning Percentage</p>
              <p className="text-lg">46.32%</p>
            </div>
            <div className="bg-white p-3 rounded border border-green-300">
              <p className="font-medium">Average Gain</p>
              <p className="text-lg">13.35%</p>
            </div>
            <div className="bg-white p-3 rounded border border-green-300">
              <p className="font-medium">Average Loss</p>
              <p className="text-lg">5.85%</p>
            </div>
            <div className="bg-white p-3 rounded border border-green-300">
              <p className="font-medium">Win/Loss Ratio</p>
              <p className="text-lg">2.28%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Principles Section */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow-md border border-red-200">
        <h2 className="text-2xl font-semibold text-red-800 mb-4 border-b pb-2">
          Key Risk Management Principles
        </h2>

        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-red-800 mb-2">
            During Difficult Periods:
          </h3>
          <p className="font-medium mb-3">
            During difficult periods your gains will be smaller than normal and
            your percentage of profitable trades will be lower than usual.{" "}
            <span className="underline">
              You must cut your losses sooner to compensate.
            </span>
          </p>
          <p className="font-bold">DO NOT WIDEN YOUR STOPS!</p>

          <ol className="list-decimal pl-5 mt-3 space-y-2">
            <li>
              If you're trading with the use of leverage, get off margin
              immediately.
            </li>
            <li>
              Reduce your exposure; position sizing and overall capital
              commitment.
            </li>
            <li>
              Unless forgiving – tighten up stop-losses. If you normally cut
              losses at 7-8%, cut them at 4-5%.
            </li>
            <li>
              Be less greedy – settle for smaller profits. If you normally take
              profits of 15-20% on average, take profits at 10-12%.
            </li>
          </ol>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">
            The Benefits of Measuring Your Results
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>✓ Better and more accurate assumptions</li>
            <li>✓ More optimal loss-cutting</li>
            <li>✓ Better risk/reward management</li>
            <li>✓ Improved decisiveness</li>
            <li>✓ More consistent trading</li>
            <li>✓ Greater strategic thinking</li>
          </ul>

          <div className="mt-4 p-3 bg-white border border-blue-300 rounded shadow">
            <p className="italic text-blue-700">
              Next time you're thinking about to make a trading decision, ask
              yourself this question:{" "}
              <span className="font-semibold">
                How is this going to look on my spreadsheet?
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Victor Sperandeo Quote */}
      <section className="bg-white p-6 rounded-lg shadow-md border border-yellow-200">
        <h2 className="text-2xl font-semibold text-yellow-800 mb-4 border-b pb-2">
          Wisdom from Victor Sperandeo
        </h2>

        <div className="space-y-6 text-gray-700">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              LEARN TO PACE YOURSELF
            </h3>
            <p className="italic">
              When I come out of a 100 percent cash position, generally after a
              bear market or intermediate-term correction, I rarely jump right
              in with both feet. I think of each trading year as the opener of a
              twelve-inning game. There's plenty of time to reach my goal. Early
              on, I take it slow with my main focus on avoiding major errors and
              finding the market's theme. This is like an athlete warming up and
              assessing the competitive environment.
            </p>
            <p className="mt-2">
              Themes can come in the form of how prices are acting in general,
              industry group leadership, overall market tone, and economic and
              political influences. I try to establish a rhythm and set my pace
              during this time. Like a golfer who has found his swing groove,
              once I find a theme and establish my trading rhythm, then and only
              then do I step up my exposure significantly.
            </p>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              BUILD ON SUCCESS
            </h3>
            <p>I view the objectives in trading as a three-tiered hierarchy:</p>
            <ol className="list-decimal pl-5 mt-2 space-y-2">
              <li>
                <span className="font-medium">
                  First and foremost is the preservation of capital.
                </span>{" "}
                When I first look at a trade, I don't ask, "What is the
                potential profit I can realize?" but rather, "What is the
                potential loss I could suffer?"
              </li>
              <li>
                <span className="font-medium">
                  Second, I strive for consistent profitability
                </span>{" "}
                by balancing my risk relative to the accumulated profits or
                losses. Consistency is far more important than making lots of
                money.
              </li>
              <li>
                <span className="font-medium">
                  Third, insofar as I'm successful in the first two goals, I
                  attempt to achieve superior returns.
                </span>{" "}
                I do this by increasing my bet size after, and only after,
                periods of high profitability.
              </li>
            </ol>
            <p className="mt-2 font-medium">
              The key to building wealth is to preserve capital and wait
              patiently for the right opportunity to make extraordinary gains.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm bg-gradient-to-r from-blue-100 via-green-100 to-pink-100 py-4 rounded">
        <p>
          © {new Date().getFullYear()} Risk Management Dashboard. All rights
          reserved.
        </p>
        <p className="mt-1">
          Based on materials from T64S.net Master Trader Program
        </p>
      </footer>
    </div>
  );
};

export default RiskManagementDashboard;
