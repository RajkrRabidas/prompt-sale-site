import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 py-6">
            <div className="max-w-6xl mx-auto px-6">

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">

                    {/* <!-- Left --> */}
                    <p className="text-sm text-gray-500">
                        © 2025 AI Prompt Pack. All rights reserved.
                    </p>

                    {/* <!-- Right --> */}
                    <div className="flex gap-6 text-sm">
                        <Link href="/privacy" className="text-gray-500 hover:text-gray-900">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-gray-500 hover:text-gray-900">
                            Terms & Conditions
                        </Link>
                        <Link href="mailto:support@yourdomain.com" className="text-gray-500 hover:text-gray-900">
                            Support
                        </Link>
                    </div>

                </div>

            </div>
        </footer>

    )
}

export default Footer
