import "tailwindcss/tailwind.css";
import { Link } from "react-router";

function Form() {
  return (
    <>
      <div className="bg-gray-100 text-gray-900 dark:bg-slate-900 dark:text-gray-100 transition-colors duration-300">
        <div className="flex flex-wrap bg-gray-100 w-full mb-6 dark:bg-slate-900">
          <div className="flex flex-col items-center py-10 px-6">
            <h2 className="text-xl font-bold mb-4 text-blue-500">
              Currency Strength
            </h2>
            <Link
              to="/currencychart"
              className="text-gray-500 hover:underline text-sm mb-2"
            >
              Currency Meter Chart
            </Link>
            <Link
              to="/currencylinechart"
              className="text-gray-500 hover:underline text-sm mb-2"
            >
              Currency Meter Line Chart
            </Link>
            <Link
              to="/currencytable"
              className="text-gray-500 hover:underline text-sm mb-2 dark:text-gray-400 dark:hover:text-blue-400"
            >
              Currency Meter Table
            </Link>
            <Link
              to="/currrency-summary"
              className="text-gray-500 hover:underline text-sm mb-2 dark:text-gray-400 dark:hover:text-blue-400"
            >
              Currrency-Strength Scoring System
            </Link>
          </div>
          <div className="flex flex-col items-center py-10 px-6">
            <h2 className="text-xl font-bold mb-4 text-blue-500">
              Commodities Strength
            </h2>
            <Link
              to="/currencychart1"
              className="text-gray-500 hover:underline text-sm mb-2 dark:text-gray-400 dark:hover:text-blue-400"
            >
              Commodities Meter Chart
            </Link>
          </div>
          <div className="flex flex-col items-center py-10 px-6">
            <h2 className="text-xl font-bold mb-4 text-blue-500">
              Other Strength meters
            </h2>
            <Link
              to="/currencychart2"
              className="text-gray-500 hover:underline text-sm mb-2 dark:text-gray-400 dark:hover:text-blue-400"
            >
              Indices Meter Chart
            </Link>
            <div>
              <Link
                to="/currencychart3"
                className="text-gray-700 hover:underline text-sm mb-2"
              >
                Crypto Meter Chart
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center py-10 px-6">
            <h2 className="text-xl font-bold mb-4 text-blue-500">
              Other Analysis
            </h2>
            <Link
              to="/hello1"
              className="text-gray-700 hover:underline text-sm mb-2"
            >
              AAI Investment Analysis
            </Link>
            <Link
              to="/retailsentiment"
              className="text-gray-700 hover:underline text-sm mb-2"
            >
              Retail sentiment
            </Link>
            <Link
              to="/cot1summary"
              className="text-gray-700 hover:underline text-sm mb-2"
            >
              Smart Money Cot Analysis
            </Link>
            <Link
              to="/cot2summary"
              className="text-gray-700 hover:underline text-sm mb-2"
            >
              Smart Money Cot Analysis by Net position
            </Link>
            <Link
              to="/putratio245"
              className="text-gray-700 hover:underline text-sm mb-2"
            >
              Put-call ratio Analysis
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
