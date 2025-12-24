const WhatYouGet = () => {
  const items = [
    {
      title: "500+ Proven AI Prompts",
      desc: "Ready-to-use prompts tested on real-world use cases. Just copy, paste, and run.",
    },
    {
      title: "Multiple Categories",
      desc: "ChatGPT, freelancing, coding, content writing, marketing, productivity & more.",
    },
    {
      title: "Structured Prompt Frameworks",
      desc: "Prompts designed with clear roles, context, constraints, and outputs.",
    },
    {
      title: "Beginner Friendly",
      desc: "No AI knowledge required. Works even if you’re new to AI tools.",
    },
    {
      title: "Works With Any AI Tool",
      desc: "Compatible with ChatGPT, Claude, Gemini, and other LLMs.",
    },
    {
      title: "Instant Digital Access",
      desc: "Download the PDF immediately after purchase. No waiting.",
    },
  ];

  return (
    <section className="py-20 bg-[var(--bg)]" id="what_you_get">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-lg font-semibold text-[var(--accent)] uppercase tracking-wider">
            What You Get
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
            Everything you need to get better AI results — fast
          </h2>
          <p className="mt-4 text-[var(--text-secondary)]">
            No guesswork. No trial and error. Just proven prompts that work.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 hover:border-[var(--accent)] transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-bold">
                  ✓
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhatYouGet;
