import React from 'react'
import { Check, Zap, Shield, Clock } from "lucide-react";

const Pricing = () => {
    return (
        <section className="w-full py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-lg">
                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                        Simple Pricing
                    </h2>
                    <p className="text-muted-foreground">
                        No hidden fees. No subscriptions. Just value.
                    </p>
                </div>

                {/* Pricing Card */}
                <div className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-lg hover:shadow-md transition-shadow duration-300">
                    {/* Badge */}
                    <div className="flex justify-center mb-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-soft text-accent text-sm font-medium">
                            <Zap className="w-3.5 h-3.5" />
                            One-time payment
                        </span>
                    </div>

                    {/* Price */}
                    <div className="text-center mb-8">
                        <div className="flex items-baseline justify-center gap-1">
                            <span className="text-2xl font-semibold text-foreground">₹</span>
                            <span className="text-6xl md:text-7xl font-bold text-foreground tracking-tight">
                                199
                            </span>
                        </div>
                        <p className="text-muted-foreground mt-2">
                            Pay once, own forever
                        </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-soft flex items-center justify-center">
                                <Check className="w-3 h-3 text-accent" />
                            </div>
                            <span className="text-foreground">Full lifetime access</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-soft flex items-center justify-center">
                                <Check className="w-3 h-3 text-accent" />
                            </div>
                            <span className="text-foreground">Instant digital delivery</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-soft flex items-center justify-center">
                                <Check className="w-3 h-3 text-accent" />
                            </div>
                            <span className="text-foreground">Free future updates</span>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full py-3 px-6 bg-[#111111] hover:bg-primary-hover text-[#ffffff] font-semibold rounded-[8px] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/25">
                        Buy Now
                    </button>

                    {/* Trust Indicators */}
                    <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            <span>Instant delivery</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Shield className="w-4 h-4" />
                            <span>Secure payment</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Note */}
                <p className="text-center text-sm text-muted-foreground mt-6">
                    No subscription required.
                </p>
            </div>
        </section>

    )
}

export default Pricing
