import React from 'react'

const CTA = () => {
  return (
    <section class="bg-white py-24">
      <div class="max-w-4xl mx-auto px-6">

        <div class="border border-gray-200 rounded-3xl p-12 text-center">

          {/* <!-- Heading --> */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Ready to Unlock the Full Power of AI?
          </h2>

          {/* <!-- Subtext --> */}
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Get instant access to the complete AI Prompt Pack and start creating smarter today.
          </p>

          {/* <!-- CTA Button --> */}
          <button
            className="mt-10 px-10 py-4 bg-black text-white text-lg font-semibold rounded-xl hover:opacity-90 transition"
          >
            Buy Now – ₹299 (One-Time)
          </button>

          {/* <PaymentButton
            amount={299}
            email={"email"}
            label="Buy Now – ₹299 (One-Time)"

          /> */}

          {/* <!-- Trust line --> */}
          <p className="mt-6 text-sm text-gray-500">
            Instant email delivery · Secure payment via Razorpay
          </p>

        </div>

      </div>
    </section>

  )
}

export default CTA
