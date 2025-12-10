import React, { useState } from "react";
import axios from "axios";

const ProductCard = ({ product = [] }) => {
  const [userEmail, setUserEmail] = useState("");

  if (!Array.isArray(product) || product.length === 0) {
    return (
      <div className="p-6">
        <p className="text-sm text-gray-300">No products available.</p>
      </div>
    );
  }

  const checkoutHandler = async (amount) => {
    if (!userEmail) {
      alert("Please enter your email before purchase!");
      return;
    }

    try {
      // 1️⃣ Get Razorpay Key
      const { data: keyData } = await axios.get(
        "http://localhost:8000/api/v1/payment/key"
      );
      const { key } = keyData;

      // 2️⃣ Create Order
      const { data: orderData } = await axios.post(
        "http://localhost:8000/api/v1/payment/process",
        { amount }
      );

      const { order } = orderData;

      // 3️⃣ Razorpay Options
      const options = {
        key,
        amount: amount * 100, 
        currency: "INR",
        name: "Your Store",
        description: "AI Prompt Pack Purchase",
        order_id: order.id,

        handler: async function (response) {
          console.log("Payment Response:", response);

          const paymentData = {
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            email: userEmail, // send email to backend
          };

          console.log("Payment Data to send to backend:", paymentData);
          console.log("User Email:", userEmail);

          // 4️⃣ Send Payment + Email request to backend
          const backendResp = await axios.post(
            "http://localhost:8000/api/v1/payment-success",
            paymentData
          );

          if (backendResp.data.success) {
            alert("Payment Successful & Email Sent!");
          } else {
            alert("Payment OK but email sending failed.");
          }
        },

        prefill: {
          email: userEmail,
          name: "Customer",
        },

        theme: {
          color: "#6C63FF",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Payment failed.");
    }
  };

  return (
    <div className="w-full h-full p-6">

      {/* Email Input */}
      <div className="mb-6">
        <input
          type="email"
          placeholder="Enter your email to receive PDF"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full text-black"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {product.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:-translate-y-1 cursor-pointer"
          >
            <div className="w-full h-72 bg-gray-100 rounded-2xl">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/400x300?text=No+Image";
                }}
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {item.name}
              </h3>

              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {item.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-indigo-600">
                  ₹{item.price}
                </span>

                <button
                  onClick={() => checkoutHandler(item.price)}
                  className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 transition"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
