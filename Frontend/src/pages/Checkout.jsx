import { useState } from "react";
import PaymentButton from "../components/PaymentButton/PaymentButton";

const Checkout = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full border rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-semibold mb-4">
          Complete your purchase
        </h1>

        <input
          type="email"
          placeholder="Email address"
          className="w-full border p-3 rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Full name"
          className="w-full border p-3 rounded mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Phone number"
          className="w-full border p-3 rounded mb-4"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <PaymentButton
          amount={299}
          userEmail={email}
          userName={name}
          userContact={phone}
          className="w-full bg-black text-white py-3 rounded-xl hover:opacity-90"
        />
      </div>
    </div>
  );
};

export default Checkout;
