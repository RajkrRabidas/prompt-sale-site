import React from 'react'

const ProblemSolution = () => {
    return (
        <section
            className="py-20 px-6"
            style={{
                backgroundColor: "var(--section-bg)",
                color: "var(--text-primary)",
            }}
        >
            <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-2 items-start">

                {/* PROBLEM */}
                <div className="space-y-6 p-8">
                    <span className="text-sm font-semibold tracking-wide text-red-500">
                        THE PROBLEM
                    </span>

                    <h2 className="text-3xl pt-2 md:text-4xl font-bold leading-tight">
                        Still wasting hours writing prompts that barely work?
                    </h2>

                    <ul className="space-y-4 text-base text-[var(--text-muted)]">
                        <li>• You don’t know how to talk to AI properly</li>
                        <li>• Generic prompts give boring, low-quality output</li>
                        <li>• You keep rewriting the same prompt again and again</li>
                        <li>• Others get insane results — yours feel average</li>
                        <li>• You’re guessing instead of using a proven system</li>
                    </ul>
                </div>

                {/* SOLUTION */}
                <div className="space-y-6 bg-[var(--card-bg)] p-8 rounded-2xl shadow-lg">
                    <span className="text-sm font-semibold tracking-wide text-green-500">
                        THE SOLUTION
                    </span>

                    <h2 className="text-3xl pt-2 md:text-4xl font-bold leading-tight text-[var(--text-primary)]">
                        A ready-to-use AI Prompt Pack that actually works
                    </h2>

                    <p className="text-[var(--text-secondary)]">
                        This prompt pack removes guesswork completely.
                        Just copy, paste, and get high-quality AI output instantly.
                    </p>

                    <ul className="space-y-4 text-base text-[var(--text-primary)]">
                        <li>✅ Proven prompts tested on real use-cases</li>
                        <li>✅ Structured prompts that force better AI responses</li>
                        <li>✅ Saves time, energy, and mental load</li>
                        <li>✅ Works with ChatGPT, Claude, Gemini</li>
                        <li>✅ Beginner-friendly — no AI expertise needed</li>
                    </ul>

                    <button
                        className="mt-6 inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold transition
                       bg-[var(--primary)] text-white hover:opacity-90"
                    >
                        See What’s Inside →
                    </button>
                </div>
            </div>
        </section>
    );
}

export default ProblemSolution
