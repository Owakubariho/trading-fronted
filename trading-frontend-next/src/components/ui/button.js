import React from "react";

const Button = ({ children, className = "", ...props }) => (
  <button
    className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
