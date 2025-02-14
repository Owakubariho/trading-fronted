
import './App.css';
import'./index.css'
import React from "react";
import {  Routes, Route ,Link, BrowserRouter} from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dropdown from "./components/Dropdown";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ExnessMomentum from './pages/stockscreens/ExnessMomentum';
import ExnessMomentumremainder from './pages/stockscreens/ExnessMomentumremainder';
import Form from './currency/Form';
import Pagenotfound from './pages/Pagenotfound';
import TradingViewWidget1 from './pages/TradingViewWidget1';

// stock screens
import Exnesstrength1 from './pages/stockscreens/Exnesstrength1';
import Exnesstrength2 from './pages/stockscreens/Exnesstrength2';
import Exnesstrength3 from './pages/stockscreens/Exnesstrength3';
import Sp500strength1 from './pages/stockscreens/Sp500strength1';
import Sp500strength2 from './pages/stockscreens/Sp500strength2';
import Sp500strength3 from './pages/stockscreens/Sp500strength3';
import Minerviniexness from './pages/stockscreens/Minerviniexness';
import Minervinisp from './pages/stockscreens/Minervinisp';
import Momentumsp from './pages/stockscreens/Momentumsp';
import Earnings from './fundermental/Earnings';
// line net position charts
import Aud4 from './pages/cot/cot_chartline/Aud4';
import Btc4 from './pages/cot/cot_chartline/Btc4';
import Cad4 from './pages/cot/cot_chartline/Cad4';
import Chf4 from './pages/cot/cot_chartline/Chf4';
import Copper4 from './pages/cot/cot_chartline/Copper4';
import Dxy4 from './pages/cot/cot_chartline/Dxy4';
import Eur4 from './pages/cot/cot_chartline/Eur4';
import Gbp4 from './pages/cot/cot_chartline/Gbp4';
import Jpy4 from './pages/cot/cot_chartline/Jpy4';
import Nat4 from './pages/cot/cot_chartline/Nat4';
import Nzd4 from './pages/cot/cot_chartline/Nzd4';
import Pa4 from './pages/cot/cot_chartline/Pa4';
import Silver4 from './pages/cot/cot_chartline/Silver4';
import Xaud4 from './pages/cot/cot_chartline/Xaud4';

// commitment of traders tables
import Nzd from './pages/cot/cot_tables/Nzd';
import Cad from './pages/cot/cot_tables/Cad';
import Chf from './pages/cot/cot_tables/Chf';
import Aud from './pages/cot/cot_tables/Aud';
import Eur from './pages/cot/cot_tables/Eur';
import Jpy from './pages/cot/cot_tables/Jpy';
import Dxy from './pages/cot/cot_tables/Dxy';
import Gbp from './pages/cot/cot_tables/Gbp';
import Btc from './pages/cot/cot_tables/Btc';
import Xaud from './pages/cot/cot_tables/Xaud';
import Copper from './pages/cot/cot_tables/Copper';
import Silver from './pages/cot/cot_tables/Silver';
import Nat from './pages/cot/cot_tables/Nat';
import Pa from './pages/cot/cot_tables/Pa';
// cotindex
import Cotindex13 from './pages/cot/index/Cotindex13';
import Cotindex26 from './pages/cot/index/Cotindex26';
import Cotindex52 from './pages/cot/index/Cotindex52';
import Cotindexchart13 from './pages/cot/index/Cotindexchart13';
// currencies
import Currencymeterchart from './currency/Currencymeterchart';
import Currencymeterline from './currency/Currencymeterline';
import Currencytable from './currency/Currencytable';
import ForexTracker from './currency/ForexTracker';
import Currency from './components/methodology/Currency';
import Lessons from './components/methodology/Market';

// commitment of traders Net position charts
import Nzd1 from './pages/cot/cot_chart1/Nzd1';
import Aud1 from './pages/cot/cot_chart1/Aud1';
import Btc1 from './pages/cot/cot_chart1/Btc1';
import Copper1 from './pages/cot/cot_chart1/Copper1';
import Dxy1 from './pages/cot/cot_chart1/Dxy1';
import Eur1 from './pages/cot/cot_chart1/Eur1';
import Gbp1 from './pages/cot/cot_chart1/Gbp1';
import Jpy1 from './pages/cot/cot_chart1/Jpy1';
import Nat1 from './pages/cot/cot_chart1/Nat1';
import Pa1 from './pages/cot/cot_chart1/Pa1';
import Silver1 from './pages/cot/cot_chart1/Silver1';
import Chf1 from './pages/cot/cot_chart1/Chf1';
import Cad1 from './pages/cot/cot_chart1/Cad1';
import Xaud1 from './pages/cot/cot_chart1/Xaud1';
// commitment of traders spec-diff charts
import Nzd3 from './pages/cot/cot_chart2/Nzd3';
import Aud3 from './pages/cot/cot_chart2/Aud3';
import Btc3 from './pages/cot/cot_chart2/Btc3';
import Copper3 from './pages/cot/cot_chart2/Copper3';
import Dxy3 from './pages/cot/cot_chart2/Dxy3';
import Cad3 from './pages/cot/cot_chart2/Cad3';
import Chf3 from './pages/cot/cot_chart2/Chf3';
import Eur3 from './pages/cot/cot_chart2/Eur3';
import Gbp3 from './pages/cot/cot_chart2/Gbp3';
import Jpy3 from './pages/cot/cot_chart2/Jpy3';
import Nat3 from './pages/cot/cot_chart2/Nat3';
import Pa3 from './pages/cot/cot_chart2/Pa3';
import Silver3 from './pages/cot/cot_chart2/Silver3';
import Xaud3 from './pages/cot/cot_chart2/Xaud3';
import Market from './components/methodology/Market';


const App = () => {
  const stocksLinks = [
    { label: "ExnessMomentum", to: "/stock1" },
    { label: "Tradingview screens", to: "/stock1e" },
    { label: "ExnessMomentumremainder", to: "/stock2" },
    { label: "exness_1 month RS", to: "/stock3" },
    { label: "exness_3 month RS", to: "/stock4" },
    { label: "exness_6 month RS", to: "/stock5" },
    // sp500
    { label: "sp_1 month RS", to: "/stock6" },
    { label: "sp_3 month RS", to: "/stock7" },
    { label: "sp_6 month RS", to: "/stock8" },
    
    { label: "Minerviniexness", to: "/stock2t" },
    { label: "Minervinisp", to: "/stock1t" },
    { label: "momentumsp", to: "/stock21t" },
  ];

  const cotLinks = [
    { label: "Nzd-table", to: "/cot1" },
    { label: "Cad-table", to: "/cot2" },
    { label: "Chf-table", to: "/cot3" },
    { label: "Aud-table", to: "/cot4" },
    { label: "Eur-table", to: "/cot5" },
    { label: "Jpy-table", to: "/cot6" },
    { label: "Gbp-table", to: "/cot7" },
    { label: "Dxy-table", to: "/cot8" },
    { label: "Btc-table", to: "/cot9" },
    { label: "Copper-table", to: "/cot10" },
    { label: "Silver-table", to: "/cot11" },
    { label: "Nat-table", to: "/cot12" },
    { label: "Pa-table", to: "/cot13" },
    
    { label: "Xaud-table", to: "/cot15" },
    
    ];
  const cotchartsnetposition1 = [
    { label: "Nzd", to: "/cot16" },
    { label: "Cad", to: "/cot17" },
    { label: "Chf", to: "/cot18" },
    { label: "Aud", to: "/cot19" },
    { label: "Eur", to: "/cot20" },
    { label: "Jpy", to: "/cot21" },
    { label: "Gbp", to: "/cot22" },
    { label: "Dxy", to: "/cot23" },
    { label: "Btc", to: "/cot24" },
    { label: "Copper", to: "/cot25" },
    { label: "Silver", to: "/cot26" },
    { label: "Nat", to: "/cot27" },
    { label: "Pa", to: "/cot28" },
    
    { label: "Xaud", to: "/cot29" },
    

   
  ];
  const cotindex = [
    { label: "cotinindex13", to: "/cot1e" },
    { label: "cotinindex26", to: "/cot2e" },
    { label: "cotinindex52", to: "/cot3e" },
    { label: "cotindex chart (13-26-52)", to: "/cot4e" },
    

  ]
  const cotchartSpeccommdiff = [
   
    { label: "Nzd", to: "/cot30" },
    { label: "Cad", to: "/cot31" },
    { label: "Chf", to: "/cot32" },
    { label: "Aud", to: "/cot33" },
    { label: "Eur", to: "/cot34" },
    { label: "Jpy", to: "/cot35" },
    { label: "Gbp", to: "/cot36" },
    { label: "Dxy", to: "/cot37" },
    { label: "Btc", to: "/cot38" },
    { label: "Copper", to: "/cot39" },
    { label: "Silver", to: "/cot40" },
    { label: "Nat", to: "/cot41" },
    { label: "Pa", to: "/cot42" },
    
    { label: "Xaud", to: "/cot43" },
    
   
   
  ];
  // line charts for net positions
  const cotchartline = [
   
    { label: "Nzd", to: "/cot30d" },
    { label: "Cad", to: "/cot31d" },
    { label: "Chf", to: "/cot32d" },
    { label: "Aud", to: "/cot33d" },
    { label: "Eur", to: "/cot34d" },
    { label: "Jpy", to: "/cot35d" },
    { label: "Gbp", to: "/cot36d" },
    { label: "Dxy", to: "/cot37d" },
    { label: "Btc", to: "/cot38d" },
    { label: "Copper", to: "/cot39d" },
    { label: "Silver", to: "/cot40d" },
    { label: "Nat", to: "/cot41d" },
    { label: "Pa", to: "/cot42d" },
    
    { label: "Xaud", to: "/cot43d" },
    
   
   
  ];

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
  <Navbar />
  <div className="flex flex-grow pt-16">
    {/* Left-side navigation */}
    <div className="w-1/4 bg-gray-200 p-4">
    <h2 className="text-lg font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
  Detailed Analysis
</h2>

      <Dropdown label="Stockscreens" className='text-blue-700' links={stocksLinks} />
      <Dropdown label="Commitment of traders report(CFTC)" links={cotLinks} />
      <Dropdown label="Commitment of traders(comm and noncomm netpositioncharts)" links={cotchartsnetposition1} />
      <Dropdown label="Commitment of traders(specComm diffcharts)" links={cotchartSpeccommdiff} />
      <Dropdown label="Commitment of traders(index charts)" links={cotindex} />
      <Dropdown label="Commitment of traders(line-charts)" links={cotchartline} />



     
    </div>
    {/* Right-side content */}
    <div className="w-3/4 p-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/currency" element={<Form />} />
        <Route path="/currencychart" element={<Currencymeterchart/>} />
        <Route path="/currencylinechart" element={<Currencymeterline/>} />
        <Route path="/currencytracker" element={<ForexTracker/>} />
        <Route path="/currencytable" element={<Currencytable/>} />
        <Route path="/fundermental" element={<Earnings/>} />


{/* cot index */}
        <Route path="/cot1e" element={<Cotindex13 />} />
        <Route path="/cot2e" element={<Cotindex26 />} />
        <Route path="/cot3e" element={<Cotindex52 />} />
        <Route path="/cot4e" element={<Cotindexchart13/>} />





        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/stock1" element={<ExnessMomentum/>} />
        <Route path="/stock2" element={<ExnessMomentumremainder/>} />
        <Route path="/stock1e" element={<TradingViewWidget1/>} />
        <Route path="/stock3" element={< Exnesstrength1/>} />
        <Route path="/stock4" element={<Exnesstrength2/>} />
        <Route path="/stock5" element={<Exnesstrength3/>} />
        <Route path="/stock2t" element={<Minerviniexness/>} />
        <Route path="/stock1t" element={<Minervinisp/>} />
        <Route path="/stock21t" element={<Momentumsp/>} />




        {/* STRENGTH SP */}
        <Route path="/stock6" element={<Sp500strength1/>} />
        <Route path="/stock7" element={<Sp500strength2/>} />
        <Route path="/stock8" element={<Sp500strength3/>} />
        <Route path="/cot1" element={<Nzd/>} />
        <Route path="/cot2" element={<Cad/>} />
        <Route path="/cot3" element={<Chf/>} />
        <Route path="/cot4" element={<Aud/>} />
        <Route path="/cot5" element={<Eur/>} />
        <Route path="/cot6" element={<Jpy/>} />
        <Route path="/cot7" element={<Gbp/>} />
        <Route path="/cot8" element={<Dxy/>} />
        <Route path="/cot15" element={<Xaud/>} />
        <Route path="/cot9" element={<Btc/>} />
        <Route path="/cot10" element={<Copper/>} />
        <Route path="/cot11" element={<Silver/>} />
        <Route path="/cot12" element={<Nat/>} />
        <Route path="/cot13" element={<Pa/>} />
        <Route path="/cot15" element={<Xaud1/>} />


        {/* net position charts */}
        <Route path="/cot16" element={<Nzd1/>} />
        <Route path="/cot17" element={<Cad1/>} />
        <Route path="/cot18" element={<Chf1/>} />
        <Route path="/cot19" element={<Aud1/>} />
        <Route path="/cot20" element={<Eur1/>} />
        <Route path="/cot21" element={<Jpy1/>} /> 
        
        <Route path="/cot22" element={<Gbp1/>} />
        <Route path="/cot23" element={<Dxy1/>} />
        <Route path="/cot24" element={<Btc1/>} />
        <Route path="/cot25" element={<Copper1/>} />
        <Route path="/cot26" element={<Silver1/>} />
        <Route path="/cot27" element={<Nat1/>} />
        <Route path="/cot28" element={<Pa1/>} />
        <Route path="/cot29" element={<Xaud1/>} />
        {/* SPEC-COMM DIFF charts */}
        <Route path="/cot30" element={<Nzd3/>} />
        <Route path="/cot31" element={<Cad3/>} />
        <Route path="/cot32" element={<Chf3/>} />
        <Route path="/cot33" element={<Aud3/>} />
        <Route path="/cot34" element={<Eur3/>} />
        <Route path="/cot35" element={<Jpy3/>} />
        <Route path="/cot36" element={<Gbp3/>} />
        <Route path="/cot37" element={<Dxy3/>} />
        <Route path="/cot38" element={<Btc3/>} />
        <Route path="/cot39" element={<Copper3/>} />
        <Route path="/cot40" element={<Silver3/>} />
        <Route path="/cot41" element={<Nat3/>} />
        <Route path="/cot42" element={<Pa3/>} />
        <Route path="/cot43" element={<Xaud3/>} />
{/*  net position charts */}
        {/* SPEC-COMM DIFF charts */}
        <Route path="/cot30d" element={<Nzd4/>} />
        <Route path="/cot31d" element={<Cad4/>} />
        <Route path="/cot32d" element={<Chf4/>} />
        <Route path="/cot33d" element={<Aud4/>} />
        <Route path="/cot34d" element={<Eur4/>} />
        <Route path="/cot35d" element={<Jpy4/>} />
        <Route path="/cot36d" element={<Gbp4/>} />
        <Route path="/cot37d" element={<Dxy4/>} />
        <Route path="/cot38d" element={<Btc4/>} />
        <Route path="/cot39d" element={<Copper4/>} />
        <Route path="/cot40d" element={<Silver4/>} />
        <Route path="/cot41d" element={<Nat4/>} />
        <Route path="/cot42d" element={<Pa4/>} />
        <Route path="/cot43d" element={<Xaud4/>} />

        {/* page not found  */}
        <Route path="*" element={<Pagenotfound />} />
        
{/* methodologies and strategies */}
<Route path="/currency-1" element={<Currency/>} />
<Route path="/currency-2" element={<Market/>} />






        



        
        


      </Routes>
    </div>
  </div>
  <Footer />
</div>

    </BrowserRouter>
  );
};

export default App;
