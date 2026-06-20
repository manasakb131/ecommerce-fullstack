import React from "react";

const Hero = () => {
  return (
    <div className="w-full h-[80vh] bg-gradient-to-r from-black via-gray-900 to-black text-white flex items-center justify-center">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Discover Premium Products
        </h1>
        <p className="text-gray-300 mb-6">
          Shop the latest trends with the best prices. Fast delivery. Trusted sellers.
        </p>
        <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Hero;