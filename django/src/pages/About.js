import React from 'react';

function About() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
        <p className="text-lg mb-4">
          Welcome to Aslaph, your premier destination for stock growth investment and forex trading. Our mission is to empower investors with the knowledge and tools they need to achieve financial success.
        </p>
        
        <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          Our Expertise
        </h2>
        <p className="text-lg mb-4">
          At Aslaph, we specialize in identifying and capitalizing on growth stocks that have the potential to deliver significant returns. Our team of experts conducts thorough research and analysis to provide you with the best investment opportunities.
        </p>
        <p className="text-lg mb-4">
          In addition to stock investments, we offer comprehensive forex trading services. Our experienced traders use advanced strategies and cutting-edge technology to navigate the complex forex market, helping you maximize your profits.
        </p>

        <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          Why Choose Aslaph?
        </h2>
        <ul className="list-disc list-inside text-lg mb-4">
          <li>Extensive expertise in stock growth investments and forex trading</li>
          <li>Personalized investment advice tailored to your financial goals</li>
          <li>Access to a wealth of resources, including market analysis and investment tips</li>
          <li>Dedicated customer support to assist you every step of the way</li>
        </ul>

        <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          Contact Us
        </h2>
        <p className="text-lg mb-4">
          Have questions or need more information? Reach out to our team:
        </p>
        <p className="text-lg mb-2"><strong>Email:</strong> owakubarihoaslaph06@gmail.com</p>
        <p className="text-lg mb-2"><strong>Phone:</strong> +256770597052 / +256700302432</p>
        <p className="text-lg mb-4"><strong>Address:</strong> Mitooma District, Town Council</p>

        <img src="/banner.png" alt="Aslaph Banner" className="w-full mt-4 rounded-lg shadow-lg" />
      </div>
    </div>
  );
}

export default About;
