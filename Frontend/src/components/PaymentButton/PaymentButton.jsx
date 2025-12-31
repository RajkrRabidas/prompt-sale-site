import axios from "axios";
import { useState } from "react";
import Spinner from "../Loader/Spinner";
import { useNavigate } from "react-router-dom";

const PaymentButton = ({
  userEmail,
  userName,
  userContact,
  onError = () => {},
  label = "Buy Now",
  className = "",
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  console.log(userContact)

  const checkoutHandler = async () => {
    if (!userEmail) {
      onError({ email: "Email is required" });
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Get Razorpay public key
      const { data: keyData } = await axios.get(
        "http://localhost:8000/api/v1/payment/key"
      );

      // 2️⃣ Create order (SERVER decides amount)
      const { data: orderData } = await axios.post(
        "http://localhost:8000/api/v1/payment/process",
        {
          email: userEmail,
          name: userName,
          contact: userContact || "",
          productKey: "PROMPT_PACK",
        }
      );

      const options = {
        key: keyData.key,
        order_id: orderData.order.id,
        currency: "INR",
        name: "AI Prompt Pack",
        description: "One-time purchase",

        prefill: {
          email: userEmail,
          name: userName || "",
          contact: userContact || "",
        },

        handler: function (response) {
          // ✅ FRONTEND SUCCESS PAGE
          navigate(`/payment/webhook?orderId=${response.razorpay_order_id}`);
        },

        modal: {
          ondismiss: () => {
            onError({ form: "Payment cancelled by user" });
          },
        },

        theme: {
          color: "#ccc07a",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (err) {
      const res = err.response?.data;

      if (res?.code === "VALIDATION_ERROR") {
        onError(res.errors); // field-wise errors
        return;
      }

      onError({
        form: res?.message || "Unable to start payment. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Spinner text="Redirecting to payment..." />}

      <button
        onClick={checkoutHandler}
        disabled={loading}
        className={`${className} ${
          loading ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Please wait..." : label}
      </button>
    </>
  );
};

export default PaymentButton;
