import React from 'react'

const TrustSection = () => {
    return (
        <section class="bg-white py-16">
            <div class="max-w-5xl mx-auto px-6">

                <div class="grid md:grid-cols-4 gap-8 text-center">

                    {/* <!-- Trust Item 1 --> */}
                    <div class="flex flex-col items-center">
                        <div class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-xl">
                            ⚡
                        </div>
                        <h4 class="mt-4 font-semibold text-gray-900">
                            Instant Delivery
                        </h4>
                        <p class="mt-1 text-sm text-gray-600">
                            Get the prompt pack instantly on your email after payment.
                        </p>
                    </div>

                    {/* <!-- Trust Item 2 --> */}
                    <div class="flex flex-col items-center">
                        <div class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-xl">
                            🔒
                        </div>
                        <h4 class="mt-4 font-semibold text-gray-900">
                            Secure Payments
                        </h4>
                        <p class="mt-1 text-sm text-gray-600">
                            100% secure checkout powered by Razorpay.
                        </p>
                    </div>

                    {/* <!-- Trust Item 3 --> */}
                    <div class="flex flex-col items-center">
                        <div class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-xl">
                            ♾️
                        </div>
                        <h4 class="mt-4 font-semibold text-gray-900">
                            Lifetime Access
                        </h4>
                        <p class="mt-1 text-sm text-gray-600">
                            Pay once and use the prompts forever.
                        </p>
                    </div>

                    {/* <!-- Trust Item 4 --> */}
                    <div class="flex flex-col items-center">
                        <div class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-xl">
                            📩
                        </div>
                        <h4 class="mt-4 font-semibold text-gray-900">
                            Email Support
                        </h4>
                        <p class="mt-1 text-sm text-gray-600">
                            Facing issues? Get help via email anytime.
                        </p>
                    </div>

                </div>

            </div>
        </section>

    )
}

export default TrustSection
