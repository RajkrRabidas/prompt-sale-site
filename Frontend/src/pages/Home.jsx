import Hero from "../components/Hero/Hero";
import ProblemSolution from "../components/ProblemSolution/ProblemSolution";
import WhatYouGet from "../components/WhatYouGet/WhatYouGet";
import ProductPreview from "../components/ProductPreview/ProductPreview";
import Pricing from "../components/Pricing/Pricing";
import TrustSection from "../components/TrustSection/TrustSection";
import FAQSection from "../components/FAQSection/FAQSection";
import CTA from "../components/CTA/CTA";
import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <WhatYouGet />
      <ProductPreview />
      <Pricing />
      <TrustSection />
      <FAQSection />
      <CTA />
      <Footer />
    </>
  );
};

export default Home;
