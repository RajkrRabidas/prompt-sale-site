import React from "react";
import { useNavigate } from "react-router-dom";


const Hero = ({ email, name, phone }) => {

  const navigate = useNavigate();


  return (
    <section
      className="w-full bg-[var(--color-bg)]"
    >
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
          <span className="inline-block mb-4 text-sm font-medium text-[var(--color-primary)]">
            🚀 AI Prompt Pack
          </span>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[var(--color-heading)]">
            500+ Ready-to-Use AI Prompts to
            <span className="text-[var(--color-primary)]"> 10× Your Productivity</span>
          </h1>

          <p className="mt-6 text-lg text-[var(--color-text)] max-w-xl">
            Stop wasting hours writing prompts.
            Get a curated PDF of proven prompts for ChatGPT, freelancing, coding, marketing & more.
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={()=> navigate("/checkout")}
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-8 py-4 text-sm leading-relaxed rounded-xl font-semibold transition"
            >
              Get Instant Access In ₹199
            </button>

            <button
              className="border border-gray-300 text-[var(--color-heading)] px-8 py-4 text-sm leading-relaxed rounded-xl font-medium hover:bg-gray-50 transition"
            >
              See What’s Inside
            </button>
          </div>

          {/* TRUST LINE */}
          <div className="mt-6 text-sm text-[var(--color-muted)]">
            ✔ One-time payment • ✔ Instant email delivery • ✔ Secure Razorpay checkout
          </div>
        </div>

        {/* RIGHT PREVIEW */}
        <div className="relative">
          <div className="bg-indigo-50 rounded-2xl p-6 shadow-md">
            <img
              src="https://www.laststandhats.com/cdn/shop/files/1740881953266.jpg?v=1741130609&width=720"
              alt="Prompt Pack Preview"
              className="rounded-xl"
            />
          </div>

          {/* FLOATING BADGE */}
          <div className="absolute -bottom-6 -left-6 bg-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium text-[var(--color-heading)]">
            📩 Delivered instantly via email
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
