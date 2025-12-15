import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Checkout from './pages/Checkout'
import successPage from './pages/SucessPage.jsx'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

const App = () => {


  useEffect(() => {
    const status = sessionStorage.getItem("payment_status");

    if (status === "success") {
      toast.success("Payment successful! Check your email.");
    }

    if (status === "failed") {
      toast.error("Payment was not completed.");
    }

    sessionStorage.removeItem("payment_status");
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/sucess" element={<successPage />} />
    </Routes>
  );
}

export default App
