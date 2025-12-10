import React from 'react'
import ProductCard from './components/product/ProductCard';
import data from './assets/data.js';

const App = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900">
      <ProductCard product={data} />
    </div>
  );
}

export default App
