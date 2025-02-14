import React,{useEffect,useState} from 'react'
import {  Link} from "react-router";
function Currencytable() {
     const [currencies, setCurrencies] = useState([]);
     useEffect(() => {
        fetchCurrencies();
      }, []);
      
      const fetchCurrencies = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/currencies/');
          const data = await response.json();
          setCurrencies(data.reverse());
        //   reverse order

          console.log(data);  // For debugging
        } catch (err) {
          console.log(err);
        }
      };
  return (
    <div>
      <div className='bg-gradient-to-r from-teal-400 to-blue-500 max-w-96 p-2 rounded-md '> 
      <p className='text-neutral-800  uppercase text-xl'>
          
          Currency meter based on the <strong> 15 week rate of change </strong>
        </p>
      </div>
      <div className="mt-8">
        
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Date</th>

              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">AUD</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">EUR</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">CHF</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">CAD</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">GBP</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">NZD</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">JPY</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">USD</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="text-left py-3 px-4">{item.date}</td>
                <td className="text-left py-3 px-4">{item.Aud}</td>
                <td className="text-left py-3 px-4">{item.Eur}</td>
                <td className="text-left py-3 px-4">{item.Chf}</td>
                <td className="text-left py-3 px-4">{item.Cad}</td>
                <td className="text-left py-3 px-4">{item.Gbp}</td>
                <td className="text-left py-3 px-4">{item.Nzd}</td>
                <td className="text-left py-3 px-4">{item.Jpy}</td>
                <td className="text-left py-3 px-4">{item.Usd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> 
      <div className="flex flex-col  py-10 px-6">
    <Link to="/currencychart" className="text-blue-500 hover:underline text-xl">
      Currency meter chart
    </Link>
    <Link to="/currencylinechart" className="text-blue-500 hover:underline text-xl">
      Currency meter line chart
    </Link>
    <Link to="/currencytable" className="text-blue-500 hover:underline text-xl">
      Currency meter table
    </Link>
  </div>
    </div>
  )
}

export default Currencytable
