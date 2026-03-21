import React from 'react'
import { useEffect,useState } from 'react'

function Exnesstrength3() {
    let [stock, SetStock]=useState([])
      useEffect(()=>{
        getStock()  // fetch data when component mounts
       },[])
        
      // function to fetch data from API
      let getStock= async () =>{
        const response = await fetch('http://127.0.0.1:8000/relativestrength6/');
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
        
         <div className='mt-4'>
              <table className="min-w-full text-left text-sm font-light">
                  <thead
                    className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                    <tr>
                      <th scope="col" className="px-6 py-4">Ticker</th>
                      <th scope="col" className="px-6 py-4">SMA50</th>
                      <th scope="col" className="px-6 py-4">Relative strength 1 month</th>
                      <th scope="col" className="px-6 py-4">Relative strength 3 month</th>
                      <th scope="col" className="px-6 py-4">Relative strength 6 month</th>

                    </tr>
                  </thead>
                  <tbody>
                  {stock.map((item, index) => (
                    <tr  key={index}  className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">{item.Ticker}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.SMA50}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.mr_1}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.mr_3}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.mr_6}</td>

                    </tr>
                  ))
                }
                    
                  </tbody>
                </table>
            </div>
         
          
        </div>
      );
}

export default Exnesstrength3;
