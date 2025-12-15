import axios from "axios";
import successPage from "../../pages/SucessPage.jsx";
import { redirect, useNavigate } from "react-router-dom";

const PaymentButton = ({
  amount,
  userEmail,
  userName,
  userContact,
  label = "Buy Now",
  className = "",
}) => {

  const navigate = useNavigate();

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
          const payload = {
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
          };

          const { data } = await axios.post(
            "http://localhost:8000/api/v1/payment-success",
            payload
          );

          if (data.success) {
            navigate("/sucess");
          } else {
            alert("Payment done but processing failed.");
          }
        },

        theme: {
          color: "#ccc07a",
        },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed.");
    }
  };



  return (
    <button onClick={checkoutHandler} className={className}>
      {label}
    </button>
  );
};

export default PaymentButton;
