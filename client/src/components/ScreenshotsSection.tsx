/*
 * Trackeep Screenshots Section
 * Design: Interactive screenshot showcase with hover effects and descriptions
 * Layout: Grid of app screenshots with device frames and interactive elements
 * Colors: Dark background with device mockups and blue accents
 */
import { useEffect, useRef, useState } from "react";
import { Monitor, Smartphone, FolderOpen, CheckSquare, Bookmark, Search } from "lucide-react";

interface ScreenshotItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: "desktop" | "mobile";
  icon: React.ReactNode;
  features: string[];
}

const SCREENSHOTS: ScreenshotItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Your command center. See everything at a glance with the clean, organized dashboard.",
    image: "/trackeep-dashboard.png",
    category: "desktop",
    icon: <Monitor size={20} />,
    features: ["Overview stats", "Recent activity", "Quick actions", "Navigation"]
  },
  {
    id: "bookmarks",
    title: "Bookmarks & Links",
    description: "Save and organize any link. Tag, rate, and search through your digital library.",
    image: "/trackeep-bookmarks.png",
    category: "desktop",
    icon: <Bookmark size={20} />,
    features: ["Smart tagging", "Rich previews", "Collections", "Import/export"]
  },
  {
    id: "ai",
    title: "AI Assistant",
    description: "Get intelligent help with content organization, summaries, and smart recommendations.",
    image: "/trackeep-ai.png",
    category: "desktop",
    icon: <Search size={20} />,
    features: ["Smart suggestions", "Content analysis", "Auto-tagging", "AI search"]
  },
  {
    id: "calendar",
    title: "Calendar & Planning",
    description: "Schedule tasks and deadlines. Integrated calendar for perfect time management.",
    image: "/trackeep-calendar.png",
    category: "desktop",
    icon: <CheckSquare size={20} />,
    features: ["Task scheduling", "Calendar view", "Deadlines", "Time blocking"]
  },
  {
    id: "time-tracking",
    title: "Time Tracking",
    description: "Track where your time goes. Built-in time tracking for productivity insights.",
    image: "/trackeep-time-tracking.png",
    category: "desktop",
    icon: <FolderOpen size={20} />,
    features: ["Time logs", "Productivity stats", "Project tracking", "Reports"]
  }
];

interface ScreenshotCardProps {
  screenshot: ScreenshotItem;
  index: number;
}

function ScreenshotCard({ screenshot, index }: ScreenshotCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 100);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className={`group relative transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card */}
      <div className="relative rounded-2xl border border-white/[0.06] bg-[#13161c] overflow-hidden hover:border-[#39b9ff]/20 transition-all duration-300">
        {/* Header */}
        <div className="p-6 border-b border-white/[0.04]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#39b9ff]/10 flex items-center justify-center text-[#39b9ff]">
              {screenshot.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{screenshot.title}</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/40">{screenshot.category}</span>
                {screenshot.category === "mobile" && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#39b9ff]/10 text-[#39b9ff]">
                    Mobile
                  </span>
                )}
              </div>
            </div>
          </div>
          <p className="text-sm text-white/40 leading-relaxed">{screenshot.description}</p>
        </div>

        {/* Screenshot */}
        <div className="relative aspect-video bg-[#0a0e18] overflow-hidden">
          {/* Device frame for mobile */}
          {screenshot.category === "mobile" ? (
            <div className="absolute inset-4 flex items-center justify-center">
              <div className="relative w-full max-w-xs mx-auto">
                {/* Phone frame */}
                <div className="relative rounded-[2.5rem] border-2 border-white/10 bg-black p-2">
                  <div className="rounded-[2rem] overflow-hidden bg-black">
                    <img
                      src={screenshot.image}
                      alt={screenshot.title}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                {/* Phone notch */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-full" />
              </div>
            </div>
          ) : (
            <div className="absolute inset-4 flex items-center justify-center">
              {/* Browser frame for desktop */}
              <div className="relative w-full h-full rounded-lg border border-white/10 bg-[#1a1d25] overflow-hidden">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-3 py-2 bg-[#1a1d25] border-b border-white/5">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                    <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                    <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="flex-1 text-center">
                    <div className="px-2 py-0.5 rounded bg-white/5 text-xs text-white/30 font-mono truncate">
                      trackeep.app/{screenshot.id}
                    </div>
                  </div>
                </div>
                <div className="flex-1 p-1">
                  <img
                    src={screenshot.image}
                    alt={screenshot.title}
                    className="w-full h-full object-cover rounded"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Hover overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`} />
        </div>

        {/* Features */}
        <div className="p-6 border-t border-white/[0.04]">
          <div className="flex flex-wrap gap-2">
            {screenshot.features.map((feature, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 rounded-lg bg-white/[0.04] text-white/40 border border-white/[0.06]"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Hover glow */}
        <div className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none bg-gradient-to-b from-[#39b9ff]/[0.05] to-transparent ${
          hovered ? "opacity-100" : "opacity-0"
        }`} />
      </div>
    </div>
  );
}

export default function ScreenshotsSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadingVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (headingRef.current) observer.observe(headingRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="screenshots" className="relative py-24 sm:py-32 bg-[#0f1115]">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(57,185,255,0.3) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div
          ref={headingRef}
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#39b9ff]/15 bg-[#39b9ff]/5 mb-5">
            <Monitor size={14} className="text-[#39b9ff]" />
            <span className="text-xs font-medium text-[#39b9ff]">Interface Tour</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            See Trackeep in
            <br />
            <span className="bg-gradient-to-r from-[#39b9ff] via-[#6dd5ff] to-[#39b9ff] bg-clip-text text-transparent">
              Action
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-base text-white/40 leading-relaxed">
            Explore the clean, intuitive desktop interface with powerful features. 
            Every tool designed to help you stay organized and productive.
          </p>
        </div>

        {/* Screenshots grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SCREENSHOTS.map((screenshot, index) => (
            <ScreenshotCard key={screenshot.id} screenshot={screenshot} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-sm text-white/40 mb-6">
            Ready to organize your digital life?
          </p>
          <a
            href="#get-started"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full bg-[#39b9ff] text-[#0a0e18] hover:bg-[#5cc8ff] transition-all duration-200 hover:shadow-[0_0_30px_rgba(57,185,255,0.35)]"
          >
            Get Started Now
          </a>
        </div>
      </div>
    </section>
  );
}
