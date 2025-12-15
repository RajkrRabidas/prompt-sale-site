import { useNavigate } from "react-router-dom";
import PackPreview from "../../assets/PackPreview.png";

const ProductPreview = () => {
    const navigate = useNavigate();
    return (
        <section className="py-20 bg-[var(--bg)]">
            <div className="max-w-6xl mx-auto px-6">

                {/* Heading */}
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <span className="text-sm font-semibold text-[var(--accent)] uppercase tracking-wider">
                        Product Preview
                    </span>
                    <h2 className="mt-4 text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
                        See the Magic in Action
                    </h2>
                    <p className="mt-4 text-[var(--text-secondary)]">
                        Take a sneak peek at how these prompts are structured for better AI output.
                    </p>
                </div>

                {/* Preview Content */}
                <div className="grid gap-10 lg:grid-cols-2 items-center">

                    {/* Left: Text Preview */}
                    <div>
                        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6">
                            <p className="text-sm text-[var(--text-secondary)] mb-2">
                                Example Prompt
                            </p>

                            <pre className="bg-white border border-[var(--border)] rounded-lg p-4 text-sm text-[var(--text-primary)] overflow-auto">
                                Warm golden rays filtering from the top corner, <br />soft natural lens flares, subtle glow, clean minimal <br />background, professional and calm mood, premium but <br />restrained look, high contrast for headline text,<br />modern landing page hero section, realistic lighting,<br />no dramatic effects, no clutter
                            </pre>

                            <p className="mt-4 text-sm text-[var(--text-secondary)]">
                                Every prompt follows a clear structure so AI gives predictable, high-quality results.
                            </p>
                        </div>
                    </div>

                    {/* Right: Image Preview */}
                    <div className="flex justify-center">
                        <img
                            src={PackPreview}
                            alt="Prompt Pack Preview"
                            className="rounded-xl shadow-lg border border-[var(--border)] max-w-full"
                        />
                    </div>

                </div>

                {/* CTA */}
                <div className="text-center mt-14">
                    <button
                        onClick={()=> navigate("/checkout")}
                        className="inline-flex items-center justify-center px-8 py-3 text-white bg-[var(--accent)] rounded-lg font-semibold hover:opacity-90 transition"
                    >
                        Get Instant Access
                    </button>
                </div>

            </div>
        </section>
    );
};

export default ProductPreview;
