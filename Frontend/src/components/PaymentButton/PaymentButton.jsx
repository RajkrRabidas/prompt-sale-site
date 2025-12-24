import axios from "axios";
import { useState } from "react";
import Spinner from "../Loader/Spinner";
import { useNavigate } from "react-router-dom";
import { handleApiError } from "../../../utils/handleApiError";

const PaymentButton = ({
  userEmail,
  userName,
  userContact,
  label = "Buy Now",
  className = "",
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const checkoutHandler = async () => {
    if (!userEmail) {
      alert("Email is required");
      return;
    }

    console.log(window.Razorpay);


    try {
      setLoading(true);

      // 1️⃣ Get Razorpay Key
      const { data: keyData } = await axios.get(
        "http://localhost:8000/api/v1/payment/key"
      );

      // 2️⃣ Create Order (AMOUNT DECIDED BY SERVER)
      const { data: orderData } = await axios.post(
        "http://localhost:8000/api/v1/payment/process",
        {
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
          navigate(`/payment/webhook?orderId=${response.razorpay_order_id}`);
        },

        theme: {
          color: "#ccc07a",
        },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      handleApiError(err, navigate);
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
