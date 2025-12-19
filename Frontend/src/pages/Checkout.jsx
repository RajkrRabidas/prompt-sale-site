import { useState } from "react";
import PaymentButton from "../components/PaymentButton/PaymentButton";

const Checkout = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
  const isEmailValid = re.test(email);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto min-h-screen grid grid-cols-1 md:grid-cols-2">
        {/* Left panel - form */}
        <div className="bg-white flex items-center justify-center px-8 md:px-16">
          <div className="w-full max-w-md py-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center text-white font-semibold">U</div>
              <div>
                <h2 className="text-2xl font-semibold">Welcome to AIPP</h2>
                <p className="text-sm text-gray-500">Fill this form to receive a prompt in your email</p>
              </div>
            </div>

            <label className="text-sm text-gray-500">Email*</label>
            <input
              type="email"
              placeholder="Email address"
              required={true}
              className="w-full border rounded-lg px-4 py-3 mt-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="text-xs text-gray-500">Full name*</label>
            <input
              type="text"
              placeholder="Full name"
              required={true}
              className="w-full border rounded-lg px-4 py-3 mt-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="text-xs text-gray-500">Phone*</label>
            <input
              type="tel"
              placeholder="Phone number"
              required={true}
              className="w-full border rounded-lg px-4 py-3 mt-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <div className="mb-4">
              <PaymentButton
                amount={199}
                userEmail={email}
                userName={name}
                userContact={phone}
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:opacity-95"
              />
            </div>
          </div>
        </div>

        {/* Right panel - illustration */}
        <div className="hidden md:flex items-center justify-center p-8">
          <div className="max-w-lg text-white text-center">
            <img src="https://www.laststandhats.com/cdn/shop/files/1740881953266.jpg?v=1741130609&width=720" alt="" />
            <h3 className="mt-6 text-2xl font-semibold">Secure payments, instant access</h3>
            <p className="mt-2 text-white/80">Complete your purchase quickly and securely with our integrated checkout.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
