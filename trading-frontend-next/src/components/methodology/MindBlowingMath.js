import React from 'react';

const MindBlowingMath = () => {
  return (
    <div className="p-8 bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">Mind Blowing Math-Trading</h1>
      
      <section className="mb-8">
        <p className="mb-4">It is better to know where surprises are, limit the downside.</p>
        <p className="mb-4 text-green-600">Green dots - winning trades</p>
        <p className="mb-4 text-red-600">Red dots - losing trades</p>
        <p className="mb-4">What's important is the average of green dots and red dots</p>
        <p className="mb-4"><strong>Average gain:</strong> 12.50%</p>
        <p className="mb-4"><strong>Average loss:</strong> 6.25%</p>
        <p className="mb-4"><strong>Total return:</strong> 96.5%</p>
        <p className="mb-4">This means you have a 2:1 reward to risk ratio.</p>
        <p className="mb-4">All this was achieved by having exposure of 25%, always 75% cash.</p>
        <p className="mb-4">By going 100% exposure, 25% positions, total return will be the same as shown in the image below.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Power of Numbers</h2>
        <p className="mb-4">You can achieve tremendous results without much risk. Focus on the right things if we have 253 days or trades in a year. Let's assume you are out of trading 216 days or at break even. However, you make 2% for 37 days (14.36%) = 107%.</p>
        <p className="mb-4">Find high probability stock setups based on good criteria. You should never be all in it to achieve super performance.</p>
        <p className="mb-4"><strong>From the above image:</strong></p>
        <ul className="list-disc list-inside mb-4">
          <li>13 - number of trades</li>
          <li>8 - Gain</li>
          <li>25 - position</li>
        </ul>
        <p className="mb-4">Everything is based on math, manage trades and positions properly.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Power of Compounding</h2>
        <p className="mb-4">As you're compounding, remember the downside also increases. Do everything to have asymmetrical leverage, cut the downside aggressively.</p>
        <p className="mb-4">Percentage increases include 30%, 39%, 50.7%, 65.91%.</p>
        <p className="mb-4">Compounding and being aggressively conservative as seen in the image above. Bars represent quarters.</p>
        <p className="mb-4">After certain trades, you can decide to play smaller percentage of gains.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Saving Bets</h2>
        <p className="mb-4">From above, fewer stocks make higher gains, therefore there is no need to buy and hold a stock for 100%, 107%, 114%. Instead, buy 4 stocks at 20% = 114%. Buy 8 stocks at 10% = 114%. If you can buy 4 stocks that make 20%, that will be equivalent to 107%. 5-10% happens frequently as compared to 45-50%.</p>
      </section>
    </div>
  );
}

export default MindBlowingMath;
