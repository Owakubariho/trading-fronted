
import React, { useEffect, useState } from "react";

function Nzd() {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    getStock();  // fetch data when component mounts
  }, []);

  // function to fetch data from API
  const getStock = async () => {
    const response = await fetch('http://127.0.0.1:8000/Nzd/');
    const data = await response.json();
    console.log(data);  // logging the fetched data to console for testing
    setStock(data);
  }

  return (
    <div className="App">
      <div>
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
            <tr>
              <th scope="col" className="px-6 py-4">Name</th>
              <th scope="col" className="px-6 py-4">Date</th>


              <th scope="col" className="px-6 py-4">SpecLongPct</th>
              <th scope="col" className="px-6 py-4">CommNet</th>
              <th scope="col" className="px-6 py-4">NoncommNet</th>
            </tr>
          </thead>
          <tbody>
            {stock.map((item, index) => (
              <tr key={index} className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                <td className="whitespace-nowrap px-6 py-4 font-medium">{item.Name}</td>
                <td className="whitespace-nowrap px-6 py-4">{item.Date}</td>
                <td className={`whitespace-nowrap px-6 py-4 ${item.SpecLongPct > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                  {item.SpecLongPct}
                </td>
                <td className={`whitespace-nowrap px-6 py-4 ${item.CommNet > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                  {item.CommNet}
                </td>
                <td className={`whitespace-nowrap px-6 py-4 ${item.NoncommNet > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                  {item.NoncommNet}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Nzd;
