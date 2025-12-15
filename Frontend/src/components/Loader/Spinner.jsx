import React from "react";

const Spinner = ({ text = "Processing..." }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-white rounded-xl px-8 py-6 flex flex-col items-center gap-4 shadow-lg">
        
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-sm font-medium text-gray-700">
          {text}
        </p>
      </div>
    </div>
  );
};

export default Spinner;
