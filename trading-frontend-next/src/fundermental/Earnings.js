import React, { useState, useEffect } from "react";
import axios from "axios";
import EarningsTable from "./EarningsTable";

const Earnings = () => {
  const [ticker, setTicker] = useState("");
  const [earningsData, setEarningsData] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "ZFPM6GRHWJKSOWA8";
  // CHF-7.53,EUR-5.05,GBP-4.86,JPY-4.75,NZD-4.42,CAD-4.49

  useEffect(() => {
    const savedData = localStorage.getItem("earningsData");
    if (savedData) {
      setEarningsData(JSON.parse(savedData));
    }
  }, []);

  const saveToLocalStorage = (data) => {
    localStorage.setItem("earningsData", JSON.stringify(data));
  };

  const fetchEarnings = async (ticker) => {
    try {
      const url = `https://www.alphavantage.co/query?function=EARNINGS&symbol=${ticker}&apikey=${apiKey}`;
      const response = await axios.get(url);
      setEarningsData(response.data);
      saveToLocalStorage(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
      setEarningsData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchEarnings(ticker);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Stock Earnings Search
      </h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          placeholder="Enter stock ticker"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {earningsData && (
        <EarningsTable earningsData={earningsData} ticker={ticker} />
      )}
    </div>
  );
};

export default Earnings;
