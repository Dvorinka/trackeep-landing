/*
 * Trackeep Hero Section - Clean & Professional
 * Design: Minimal hero with clean typography and subtle effects
 * Background: Deep navy with subtle gradients
 * Typography: Clean, readable hierarchy
 * Elements: Simple CTA buttons, clean dashboard mockup
 */
import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const HERO_DASHBOARD_IMG = "/trackeep-dashboard.png";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const children = el.querySelectorAll("[data-animate]");
    children.forEach((child, i) => {
      setTimeout(() => {
        (child as HTMLElement).style.opacity = "1";
        (child as HTMLElement).style.transform = "translateY(0)";
      }, 150 + i * 120);
    });
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Clean gradient background */}
      <div className="absolute inset-0 bg-[#0a0e18]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(57,185,255,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 50% 100%, rgba(57,185,255,0.05) 0%, transparent 50%)",
        }}
      />

      {/* Content */}
      <div ref={heroRef} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-32 sm:pt-36 pb-8">
        {/* Clean badge */}
        <div
          data-animate
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#39b9ff]/20 bg-[#39b9ff]/5 mb-8 opacity-0 translate-y-6 transition-all duration-700 ease-out"
        >
          <Sparkles size={14} className="text-[#39b9ff]" />
          <span className="text-xs font-medium text-[#39b9ff]">
            100% Free & Open Source Forever
          </span>
        </div>

        {/* Clean headline */}
        <h1
          data-animate
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6 opacity-0 translate-y-6 transition-all duration-700 ease-out"
        >
          Your entire digital life,
          <br />
          <span className="bg-gradient-to-r from-[#39b9ff] to-[#6dd5ff] bg-clip-text text-transparent">
            in one place
          </span>
        </h1>

        {/* Clean subtitle */}
        <p
          data-animate
          className="max-w-2xl mx-auto text-lg sm:text-xl text-white/50 leading-relaxed mb-10 opacity-0 translate-y-6 transition-all duration-700 ease-out"
        >
          Bookmarks, tasks, notes, files, AI-powered search, and mobile apps — all in one 
          <span className="text-[#39b9ff] font-semibold"> completely free</span> and 
          <span className="text-[#39b9ff] font-semibold"> open source</span> platform. 
          No subscriptions, no vendor lock-in. Your data, your rules.
        </p>

        {/* Clean CTAs */}
        <div
          data-animate
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 opacity-0 translate-y-6 transition-all duration-700 ease-out"
        >
          <a
            href="#get-started"
            className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold rounded-full bg-[#39b9ff] text-[#0a0e18] hover:bg-[#5cc8ff] transition-all duration-200 hover:shadow-[0_0_30px_rgba(57,185,255,0.35)] group"
          >
            Get Started Free
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-all duration-200"
          >
            See Features
          </a>
        </div>

        {/* Clean dashboard mockup */}
        <div
          data-animate
          className="relative max-w-4xl mx-auto opacity-0 translate-y-6 transition-all duration-1000 ease-out"
        >
          <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-[#39b9ff]/5">
            {/* Clean browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1d25] border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-md bg-white/5 text-xs text-white/30 font-mono">
                  localhost:5173/app
                </div>
              </div>
            </div>
            <img
              src={HERO_DASHBOARD_IMG}
              alt="Trackeep Dashboard"
              className="w-full"
              loading="eager"
            />
          </div>
          {/* Subtle glow effect */}
          <div className="absolute -inset-4 bg-[#39b9ff]/5 rounded-2xl blur-3xl -z-10" />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0f1115] to-transparent" />
    </section>
  );
}
