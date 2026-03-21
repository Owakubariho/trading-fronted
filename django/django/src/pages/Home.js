import React from 'react';
import { Link } from 'react-router';
import TradingViewWidget from './TradingViewWidget';

function Home() {
  return (
    <div className="p-8 bg-gray-200 min-h-screen">
 <Link to="/currency-1" className="text-white hover:underline">Methodologies & strategies</Link>
 <Link to="/currency-2" className="text-white hover:underline">lessons</Link>

      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-4xl font-bold mb-6 text-center">Welcome to the Aslaph Investment Platform</h1>
          <p className="text-lg mb-4 text-center">Gives detailed Analysis of Growth stocks and forex trading using pro trading strategies</p>
          <p className="text-lg mb-4 text-center">Our mission is to provide investors with a comprehensive and effective investment experience, while helping them grow their wealth and achieve their financial goals.</p>
          <p className="text-lg mb-4 text-center">
            Contact us at <a href="mailto:owakubarihoaslaph06@gmail.com" className="text-blue-500 hover:underline transition">info@aslaph.com</a> for more information or to schedule a consultation.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-3xl font-semibold mb-4 text-center">ABOUT ASLAPH MANAGEMENT</h2>
          <p className="text-lg mb-4 text-center">Aslaph is a leading investment platform that specializes in growth stocks, forex trading, and pro trading strategies.</p>
          <p className="text-lg mb-4 text-center">We offer a variety of services, including customizable investment portfolios, personalized trading advice, and access to a vast database of stocks and forex data.</p>
          <img src="/banner.png" alt="Aslaph Banner" className="w-full mt-4 rounded" />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-semibold mb-4 text-center">Forex Heat Map</h2>
          <TradingViewWidget />
        </div>
      </div>
    </div>
  );
}

export default Home;
