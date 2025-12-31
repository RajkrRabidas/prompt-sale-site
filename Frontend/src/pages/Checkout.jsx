import { useState } from "react";
import PaymentButton from "../components/PaymentButton/PaymentButton";

const Checkout = () => {
  const [form, setForm] = useState({
    email: "",
    name: "",
    contact: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null, form: null });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT — PRODUCT DETAILS */}
        <div>
          <img
            src="/logo.png"
            alt="AI Growth School"
            className="h-8 mb-6"
          />

          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            500+ Professional Prompts Library
          </h1>

          <p className="text-sm text-gray-500 mb-4">
           brand name
          </p>

          <div className="flex items-center gap-3 mb-6">
            <span className="line-through text-gray-400">₹999</span>
            <span className="text-3xl font-bold text-gray-900">₹199</span>
          </div>

          <img
            src="https://www.laststandhats.com/cdn/shop/files/1740881953266.jpg?v=1741130609&width=720"
            alt="Prompt Pack"
            className="rounded-lg mb-6"
          />

          <p className="text-gray-700 leading-relaxed">
            500+ ready-to-use prompts across <strong>fashion, beauty, health,
            food, home, and tech</strong> — engineered to deliver e-commerce
            ready visuals in seconds.
            <br /><br />
            No models. No studio. No waiting.
          </p>

          <p className="text-xs text-gray-400 mt-6">
            You agree to share information entered on this page with Razorpay,
            adhering to applicable laws.
          </p>
        </div>

        {/* RIGHT — PAYMENT FORM */}
        <div className="bg-white rounded-xl p-8 h-fit">

          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Payment details
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Complete your purchase by providing your payment details.
          </p>

          {/* Billing Info */}
          <div className="border rounded-lg p-4 mb-6">
            <p className="text-sm font-medium text-gray-700 mb-4">
              Billing information
            </p>

            {/* Name */}
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full border rounded-md px-4 py-3 mb-2 outline-0"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mb-2">{errors.name}</p>
            )}

            {/* Email */}
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border rounded-md px-4 py-3 mb-2 outline-0"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mb-2">{errors.email}</p>
            )}

            {/* Phone */}
            <input
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full border rounded-md px-4 py-3 outline-0"
            />
            {errors.contact && (
              <p className="text-sm text-red-500 mt-1">{errors.contact}</p>
            )}
          </div>

          {/* Coupon */}
          <div className="border rounded-lg px-4 py-3 mb-6 flex items-center justify-between cursor-pointer">
            <input type="text" className="text-sm text-gray-600 w-full h-full border-0 outline-0" placeholder="Have a coupon?"/>
            <span className="text-xl">+</span>
          </div>

          {/* Exclusive Offer */}
          <div className="bg-lime-100 border border-lime-300 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <input type="checkbox" defaultChecked />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Course Access – How to Make Money with AI Images
                </p>
                <p className="text-sm text-gray-600">
                  Get access to our webinar recording.
                </p>
              </div>
              <span className="ml-auto font-semibold">₹199</span>
            </div>
          </div>

          {/* FORM ERROR */}
          {errors.form && (
            <div className="text-red-600 text-sm mb-4">{errors.form}</div>
          )}

          {/* PAY BUTTON */}
          <PaymentButton
            userEmail={form.email}
            userName={form.name}
            userContact={form.contact}
            payload={form}
            onError={setErrors}
            label="Proceed to pay ₹199.00"
            className="w-full bg-[#0E3277] text-white py-3 rounded-lg font-medium hover:opacity-90 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
