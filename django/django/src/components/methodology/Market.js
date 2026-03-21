import React from 'react'
// load images from Assets/image1 folder

const indicators = [
  { name: "BAMLH0A0HYM2EY-US BOFA HIGH YIELD INDEX EFFECTIVE YIELD ", description: "It moves inversely to the price of US30 as well as spec turn of US30." },
  { name:  "D0w industrial average", description: "Inversely moves to price of US BOFA" },
  { name:"SPEC _TURNS-for US30", description: "Speculative turns of US30 indicating market sentiment." },
  // add Net highs/lows
  { name: "NET HIGHS/LOWS", description: "Net highs and lows indicating market extremes." }

];
const images = [
  { src: '/file1.jpg', alt: 'Aslaph Banner' },
  { src: '/file2.jpg', alt: 'Aslaph Banner' },
  { src: '/file3.jpg', alt: 'Aslaph Banner' },
  // add more images as needed
  { src: '/file4.jpg', alt: 'Aslaph Banner' },
  { src: '/file5.jpg', alt: 'Aslaph Banner' },
  { src: '/file6.jpg', alt: 'Aslaph Banner' },
  { src: '/file7.jpg', alt: 'Aslaph Banner' },
  { src: '/file8.jpg', alt: 'Aslaph Banner' },
  { src: '/file9.jpg', alt: 'Aslaph Banner' },
  { src: '/file10.jpg', alt: 'Aslaph Banner' },
  { src: '/file11.jpg', alt: 'Aslaph Banner' },
  { src: '/file12.jpg', alt: 'Aslaph Banner' },
  { src: '/file13.jpg', alt: 'Aslaph Banner' },
]

const Market = () => {
  return (
    // display adiv container
    <div>
     <div className="p-4 bg-gray-100 rounded-lg shadow-md">
  <p className="text-lg font-bold text-gray-800 mb-2">Commitment of traders-report<strong> indicators on trading view</strong></p>
  <ul className="list-disc list-inside text-gray-700">
    <li>NON COMM INDEX</li>
    <li>COMM_INDEX_NET</li>
    <li>SPEC _TURNS</li>
  </ul>
  <div>
    {/*  determing the context of the trading environment for stocks */}
    <p className="text-sm text-gray-500 mb-2"> The trading environment for stocks is characterized by a strong, upward trend, with volatility being low.</p>
    <span className='text-blue-500'> This will be based on the alignment of different indicators as shown below</span>
    <ul>
    {indicators.map((indicator, index) => (
            <li className="py-1 px-2 bg-gray-100 rounded-md mb-1 " key={index}>
              <span className="uppercase">{indicator.name}</span>: {indicator.description}
            </li>
          ))}
    </ul>
  </div>
</div>

     



   
    <div className="flex flex-wrap justify-center">
      {/* iterate through all images */}
      {images.map((image, index) => (
        <div key={index} className="w-1/2 p-2">
          <img src={image.src} alt={image.alt} className="w-full h-auto md:max-w-md mt-4 rounded shadow-lg" />
        </div>
      ))}
    </div>
    </div>
  )
}

export default Market
