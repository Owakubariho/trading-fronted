import React from 'react'
import { useEffect, useState } from 'react'
import InteractiveWatchlist from '../../components/InteractiveWatchlist'
import StockChartModal from '../../components/StockChartModal'
import TradingViewWatchlist from '../../components/TradingViewWatchlist'

function Exnesstrength2() {
  let [stock, SetStock] = useState([])
  let [selectedTicker, setSelectedTicker] = useState(null);
  useEffect(() => {
    getStock()  // fetch data when component mounts
  }, [])

  // function to fetch data from API
  let getStock = async () => {
    const response = await fetch('http://127.0.0.1:8000/relativestrength3/');
    const data = await response.json();
    console.log(data)  // logging the fetched data to console for testing
    SetStock(data)
  }
  const tickerNumber = stock.map((stock) => stock.Ticker).length;
  return (
    <div className="App">
      <div className="w-1/4 p-4 bg-blue-500 text-white rounded-md shadow-md mb-4">
        Number of Tickers: {tickerNumber}
      </div>
      <StockChartModal ticker={selectedTicker} onClose={() => setSelectedTicker(null)} />
      <div className='mb-8 h-[600px]'>
        <TradingViewWatchlist symbols={stock.map(s => s.Ticker)} />
      </div>
      <div className='mt-4'>
        <InteractiveWatchlist stocks={stock} onTickerClick={setSelectedTicker} />
      </div>

    </div>
  );
}

export default Exnesstrength2;
