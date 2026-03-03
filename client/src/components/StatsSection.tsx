/*
 * Trackeep Stats Section
 * Design: Gradient band from white to blue to dark (like Antimetal's "Engineers spend 40%" section)
 * Layout: Large stat text + CTA button
 * Animation: Counter animation on scroll
 */
import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

export default function StatsSection() {
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
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const hours = useCountUp(73, 2000, visible);
  const tools = useCountUp(6, 1500, visible);
  const features = useCountUp(5, 1800, visible);

  return (
    <section className="relative overflow-hidden">
      {/* Gradient background: dark → blue → white-ish → blue → dark */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0f1115 0%, #0d1525 10%, #0f2040 25%, #1a5a9a 40%, #39b9ff 50%, #1a5a9a 60%, #0f2040 75%, #0d1525 90%, #0f1115 100%)",
        }}
      />

      <div ref={ref} className="relative z-10 py-32 sm:py-44">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Main stat headline */}
          <div
            className={`transition-all duration-1000 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-lg sm:text-xl text-white/60 mb-4 font-medium">
              The average knowledge worker uses
            </p>
            <h2 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold text-white tracking-tight mb-2">
              <span className="text-[#39b9ff]">{tools}+</span> different tools
            </h2>
            <p className="text-lg sm:text-xl text-white/60 mt-4 mb-2 font-medium">
              and spends
            </p>
            <h2 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold text-white tracking-tight">
              <span className="text-[#39b9ff]">{hours}%</span> of their time
            </h2>
            <p className="text-xl sm:text-2xl text-white/50 mt-4 mb-8 font-medium">
              just searching for information
            </p>
            
            {/* Trackeep solution */}
            <div className="border-t border-white/10 pt-8">
              <p className="text-lg sm:text-xl text-white/60 mb-4 font-medium">
                Trackeep gives you
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-2">
                <span className="text-[#e8ff3a]">1</span> unified platform
              </h2>
              <p className="text-lg sm:text-xl text-white/50 font-medium">
                that's <span className="text-green-400">100% free</span> and <span className="text-green-400">open source</span>
              </p>
            </div>
          </div>

          {/* CTA */}
          <div
            className={`mt-12 transition-all duration-1000 delay-300 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <a
              href="#get-started"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold rounded-full bg-[#e8ff3a] text-[#0a0e18] hover:bg-[#f0ff6a] transition-all duration-200 hover:shadow-[0_0_30px_rgba(232,255,58,0.3)]"
            >
              Start saving time
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
