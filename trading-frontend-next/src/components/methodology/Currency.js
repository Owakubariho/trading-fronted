import React from 'react'

function Currency() {
  return (
    <div className="p-4">
      <div className="mb-8">
        <h3 className="text-xl font-bold">Macro picture of the Gold-<span className="text-yellow-500"> Bitcoin-Gold ratio</span></h3>
        <p className="mt-2 text-gray-700">This ratio imperatively correlates with the price of Gold</p>
        <ul className="mt-4 space-y-4">
          <li className="flex flex-col items-center">
            <p>Look at the trends of the copper, platinum and silver</p>
            <img src="/image1.jpg" alt="Aslaph Banner" className="w-full h-auto mt-4 rounded shadow-lg" />
          </li>
          <li>
            <strong>All of them should be respecting trendlines, from there <strong>you can judge the direction of Gold</strong></strong>
          </li>
        </ul>
        <img src="/image4.jpg" alt="Aslaph Banner" className="w-full h-auto mt-4 rounded shadow-lg" />
      </div>
      <div>
        <h3 className="text-xl font-bold">Macro picture of the Dxy-<span className="text-yellow-500"> Gold-silver ratio</span></h3>
        <p className="mt-2 text-gray-700">This ratio imperatively correlates with the price of Dxy</p>
        <div className="mt-4">
          <span className="font-semibold">Daily chart</span>
          <img src="/image3.jpg" alt="Aslaph Banner" className="w-full h-auto mt-2 rounded shadow-lg" />
        </div>
        <div className="mt-4">
          <span className="font-semibold">Weekly chart</span>
          <img src="/image2.jpg" alt="Aslaph Banner" className="w-full h-auto mt-2 rounded shadow-lg" />
        </div>
      </div>
    </div>
  )
}

export default Currency
