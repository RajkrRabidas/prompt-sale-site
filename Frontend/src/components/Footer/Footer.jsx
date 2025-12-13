import React from 'react'

const Footer = () => {
    return (
        <footer class="bg-white border-t border-gray-200 py-6">
            <div class="max-w-6xl mx-auto px-6">

                <div class="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">

                    {/* <!-- Left --> */}
                    <p class="text-sm text-gray-500">
                        © 2025 AI Prompt Pack. All rights reserved.
                    </p>

                    {/* <!-- Right --> */}
                    <div class="flex gap-6 text-sm">
                        <a href="/privacy" class="text-gray-500 hover:text-gray-900">
                            Privacy Policy
                        </a>
                        <a href="/terms" class="text-gray-500 hover:text-gray-900">
                            Terms & Conditions
                        </a>
                        <a href="mailto:support@yourdomain.com" class="text-gray-500 hover:text-gray-900">
                            Support
                        </a>
                    </div>

                </div>

            </div>
        </footer>

    )
}

export default Footer
