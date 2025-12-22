import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const SucessPage = () => {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    const checkPayment = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/payment/status/:orderId"
        );
        console.log({data});
        if (data.paid) {
          setStatus("success");
        } else {
          setStatus("pending");
        }
      } catch {
        setStatus("failed");
      }
    };

    checkPayment();
  }, []);

  if (status === "checking") return <h2>Verifying payment...</h2>;
  if (status === "pending") return <h2>Payment processing… please wait</h2>;
  if (status === "failed") return <h2>Payment failed</h2>;

  return (
    <div>
      <h1>Payment Successful 🎉</h1>
      <p>Your access will be activated shortly.</p>
    </div>
  );
}

export default SucessPage
