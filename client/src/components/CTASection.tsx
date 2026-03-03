/*
 * Trackeep Final CTA Section
 * Design: "Be ready for whatever you launch next" — large centered CTA
 * Background: Dark with subtle blue gradient glow
 */
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="get-started" className="relative py-32 sm:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0e18]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(57,185,255,0.08) 0%, transparent 70%)",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2
          className={`text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Take control of your
          <br />
          digital life
        </h2>

        <p
          className={`max-w-xl mx-auto text-base sm:text-lg text-white/40 leading-relaxed mb-10 transition-all duration-700 delay-100 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Deploy Trackeep in minutes. Self-host your bookmarks, notes, tasks, and
          files in one clean, private, open-source system.
        </p>

        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-200 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold rounded-full bg-[#39b9ff] text-[#0a0e18] hover:bg-[#5cc8ff] transition-all duration-200 hover:shadow-[0_0_30px_rgba(57,185,255,0.35)] group"
          >
            Get Started Free
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all duration-200"
          >
            Read the Docs
          </a>
        </div>

        {/* Install command */}
        <div
          className={`mt-12 transition-all duration-700 delay-300 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-[#13161c] border border-white/[0.06]">
            <span className="text-xs text-[#39b9ff] font-mono">$</span>
            <code className="text-sm text-white/60 font-mono">
              docker run -d -p 3000:3000 trackeep/trackeep
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}
