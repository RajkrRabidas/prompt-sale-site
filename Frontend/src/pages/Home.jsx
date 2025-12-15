import Hero from "../components/Hero/Hero";
import ProblemSolution from "../components/ProblemSolution/ProblemSolution";
import WhatYouGet from "../components/WhatYouGet/WhatYouGet";
import ProductPreview from "../components/ProductPreview/ProductPreview";
import Pricing from "../components/Pricing/Pricing";
import TrustSection from "../components/TrustSection/TrustSection";
import FAQSection from "../components/FAQSection/FAQSection";
import CTA from "../components/CTA/CTA";
import Footer from "../components/Footer/Footer";
import { useEffect } from 'react'
import { toast, Toaster } from 'react-hot-toast'

const Home = () => {

  useEffect(() => {
    const status = sessionStorage.getItem("payment_status");

    if (!status) return;

    if (status === "success") {
      toast.success("Payment successful! Check your Email🎉");
    }

    if (status === "failed") {
      toast.error("Payment completed but verification failed.");
    }

    sessionStorage.removeItem("payment_status");
  }, []);

  return (
    <>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: "14px",
          },
        }}
      />

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
