import React from 'react'
import { ChevronDown } from "lucide-react";

const FAQSection = () => {
  return (
    <section className="bg-white py-24">
  <div className="max-w-4xl mx-auto px-6">

    {/* <!-- Heading --> */}
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
      Frequently Asked Questions
    </h2>

    {/* <!-- FAQ Items --> */}
    <div className="mt-12 space-y-3">

      {/* <!-- FAQ 1 --> */}
      <details className="group border border-gray-200 rounded-xl p-6">
        <summary className="flex justify-between items-center cursor-pointer font-medium text-gray-900">
          How will I receive the product?
          <span className="text-gray-400 group-open:rotate-180 transition"><ChevronDown size={20} /></span>
        </summary>
        <p className="mt-4 text-gray-600">
          After successful payment, the AI Prompt Pack PDF will be sent instantly to your email address.
        </p>
      </details>

      {/* <!-- FAQ 2 --> */}
      <details className="group border border-gray-200 rounded-xl p-6">
        <summary className="flex justify-between items-center cursor-pointer font-medium text-gray-900">
          Is this a one-time payment?
          <span className="text-gray-400 group-open:rotate-180 transition"><ChevronDown size={20} /></span>
        </summary>
        <p className="mt-4 text-gray-600">
          Yes. This is a one-time payment. There are no subscriptions, renewals, or hidden charges.
        </p>
      </details>

      {/* <!-- FAQ 3 --> */}
      <details className="group border border-gray-200 rounded-xl p-6">
        <summary className="flex justify-between items-center cursor-pointer font-medium text-gray-900">
          Can I use these prompts commercially?
          <span className="text-gray-400 group-open:rotate-180 transition"><ChevronDown size={20} /></span>
        </summary>
        <p className="mt-4 text-gray-600">
          Yes. You can use these prompts for client work, freelancing, content creation, and commercial projects.
        </p>
      </details>

      {/* <!-- FAQ 4 --> */}
      <details className="group border border-gray-200 rounded-xl p-6">
        <summary className="flex justify-between items-center cursor-pointer font-medium text-gray-900">
          What is the refund policy?
          <span className="text-gray-400 group-open:rotate-180 transition"><ChevronDown size={20} /></span>
        </summary>
        <p className="mt-4 text-gray-600">
          Since this is a digital product with instant delivery, refunds are not provided. 
          If you face any technical issues, you can contact support for assistance.
        </p>
      </details>

    </div>
    </div>
</section>
  )
}

export default FAQSection
