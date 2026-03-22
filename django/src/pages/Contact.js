import React from 'react';

function Contact() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen flex items-center justify-center flex-col">
      {/* Banner image */}
      <img src="/banner.png" alt="Aslaph Banner" className="w-full mb-8 rounded-lg shadow-lg" />

      {/* Contact information */}
      <div className="max-w-xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
        <p className="text-lg mb-2"><strong>Email:</strong> owakubarihoaslaph06@gmail.com</p>
        <p className="text-lg mb-2"><strong>Phone:</strong> +256770597052 / +256700302432</p>
        <p className="text-lg mb-2"><strong>Address:</strong> Mitooma District, Town Council</p>
        <p className="text-lg mb-6"><strong>Hours:</strong> Monday - Friday 9:00 AM - 5:00 PM</p>
        <p className="text-lg mb-4">
          Email us at{' '}
          <a href="mailto:owakubarihoaslaph06@gmail.com" className="text-blue-500 hover:underline">123@example.com</a>
        </p>
        <p className="text-lg mb-4">
          Call us at{' '}
          <a href="tel:+256770597052" className="text-blue-500 hover:underline">+256770597052 / +256700302432</a>
        </p>
      </div>
    </div>
  );
}

export default Contact;
