import React from 'react'
import ProductCard from './components/product/ProductCard';
import data from './assets/data.js';
import Hero from './components/Hero/Hero.jsx';
import ProblemSolution from './components/ProblemSolution/ProblemSolution.jsx';
import WhatYouGet from './components/WhatYouGet/WhatYouGet.jsx';
import ProductPreview from './components/ProductPreview/ProductPreview.jsx';
import Pricing from './components/Pricing/Pricing.jsx';
import TrustSection from './components/TrustSection/TrustSection.jsx';
import FAQSection from './components/FAQSection/FAQSection.jsx';
import CTA from './components/CTA/CTA.jsx';
import Footer from './components/Footer/Footer.jsx';

const App = () => {
  return (
    <div>
      {/* <ProductCard product={data} /> */}
      <Hero />
      <ProblemSolution />
      <WhatYouGet />
      <ProductPreview />
      <Pricing />
      <TrustSection />
      <FAQSection />
      <CTA />
      <Footer />
    </div>
  );
}

export default App
