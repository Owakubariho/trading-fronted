import React, { useEffect, useState } from 'react';

function Cotindex13() {
  const [stock, SetStock] = useState([]);

  useEffect(() => {
    getStock();  // fetch data when component mounts
  }, []);

  // function to fetch data from the API
  const getStock = async () => {
    const response = await fetch('http://127.0.0.1:8000/cotindex13/');
    const data = await response.json();
    console.log(data);  // logging the fetched data to console for testing
    SetStock(data);
  };

  // Function to determine the class based on value
  const getClassByValue = (value) => {
    if (value < 5) return 'bg-red-200';
    if (value > 95) return 'bg-green-200';
    return '';  // No class for other values
  };

  return (
    <div className="App">
      <div>
      <div className="p-8 bg-gray-50 rounded-lg shadow-lg">
  

  

  <h3 className="text-xl font-semibold mb-2 text-blue-600">Aslaph&apos;s Contrarian Strategy</h3>
  <p className="text-lg mb-4">
    Aslaph’s approach involves analyzing the COT Index to identify extremes in market positioning:
  </p>
  <ul className="list-disc list-inside text-lg mb-4">
    <li>When large speculators are extremely net short, it might indicate a potential <strong>buying opportunity</strong> as the market may reverse.</li>
    <li>When large speculators are extremely net long, it might indicate a potential <strong>selling opportunity</strong> as the market may be overbought and due for a correction.</li>
  </ul>
  <p className="text-lg mb-4">
    Aslaph emphasizes the importance of patience and risk management. By taking positions opposite to the majority, traders can potentially benefit from market reversals.
  </p>
 
</div>
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
            <tr>
              <th scope="col" className="px-6 py-4">Asset</th>
              <th scope="col" className="px-6 py-4">DATE</th>
              <th scope="col" className="px-6 py-4">CommercialWilliamsIndex</th>
              <th scope="col" className="px-6 py-4">NonCommercialWilliamsIndex</th>
            </tr>
          </thead>
          <tbody>
            {stock.map((item, index) => (
              <tr key={index} className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                <td className="whitespace-nowrap px-6 py-4 font-medium">{item.Asset}</td>
                <td className="whitespace-nowrap px-6 py-4">{item.DATE}</td>
                <td className={`whitespace-nowrap px-6 py-4 ${getClassByValue(item.CommercialWilliamsIndex)}`}>
                  {item.CommercialWilliamsIndex}
                </td>
                <td className={`whitespace-nowrap px-6 py-4 ${getClassByValue(item.NonCommercialWilliamsIndex)}`}>
                  {item.NonCommercialWilliamsIndex}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Cotindex13;
