import React from 'react';
import { Link } from 'react-router'; // Corrected import for react-router-dom

function Pagenotfound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img src="/banner.png" alt="Aslaph Banner" className="w-full mb-8 rounded-lg shadow-lg" />
      <h1 className="text-5xl font-bold text-red-600 mb-4">404 Page Not Found</h1>
      <p className="text-lg text-gray-700 mb-6">The page you're looking for doesn't exist.</p>
      <Link to="/" className="text-lg text-blue-500 hover:underline hover:text-blue-700">
        Go back to the Home Page
      </Link>
 <p className="text-lg text-gray-600 mt-6">
            Need help? <a href="mailto:support@aslaph.com" className="text-blue-500 hover:underline">Contact Support</a>
        </p>
   </div>
  );
}

export default Pagenotfound;
