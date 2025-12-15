import axios from "axios";
import { useState } from "react";
import Spinner from "../Loader/Spinner";

const PaymentButton = ({
  amount,
  userEmail,
  userName,
  userContact,
  label = "Buy Now",
  className = "",
}) => {

  const [loading, setLoading] = useState(false);

  const checkoutHandler = async () => {
    if (!userEmail) {
      alert("Email is required");
      return;
    }

    try {
      const { data: keyData } = await axios.get(
        "http://localhost:8000/api/v1/payment/key"
      );

      const { data: orderData } = await axios.post(
        "http://localhost:8000/api/v1/payment/process",
        { amount }
      );

      const { key } = keyData;
      const { order } = orderData;

      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load.");
        return;
      }

      const options = {
        key,
        amount: Number(amount) * 100,
        currency: "INR",
        name: "AI Prompt Pack",
        description: "One-time purchase",
        order_id: order.id,

        prefill: {
          email: userEmail,
          name: userName || "",
          contact: userContact || "",
        },

        handler: async (response) => {
          setLoading(true); // Start loading state
          try {
            const payload = {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
              email: userEmail,
              name: userName,
              contact: userContact,
              amount,
            };

            const { data } = await axios.post(
              "http://localhost:8000/api/v1/payment-success",
              payload
            );

            if (data.success) {
              sessionStorage.setItem("payment_status", "success");
              window.location.href = "/";
            } else {
              sessionStorage.setItem("payment_status", "failed");
              window.location.href = "/";
            }
          } catch (error) {
            console.error("Verification failed:", error);
            sessionStorage.setItem("payment_status", "failed");
            window.location.href = "/";
          }
        },

          theme: {
            color: "#ccc07a",
        },
        };

        new window.Razorpay(options).open();
      } catch (err) {
        console.error("Payment error:", err);
        sessionStorage.setItem("payment_status", "failed");
        window.location.href = "/";
      }
    };



    return (
      <>
      {loading && <Spinner text="Verifying payment..." />}

      <button
        onClick={checkoutHandler}
        disabled={loading}
        className={`${className} ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        {loading ? "Please wait..." : label}
      </button>
    </>
    );
  };

  export default PaymentButton;
