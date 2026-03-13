/*
 * Trackeep Clean Navbar
 * Design: Simple, professional top navigation
 * Style: Clean glassmorphism with subtle animations
 * Color: Professional dark theme with blue accents
 */
import { useState, useEffect } from "react";
import { Menu, X, ExternalLink } from "lucide-react";

interface GitHubStats {
  stars: number;
  forks: number;
}

async function fetchGitHubStats(): Promise<GitHubStats> {
  try {
    const response = await fetch('https://api.github.com/repos/dvorinka/trackeep');
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub stats');
    }
    const data = await response.json();
    return {
      stars: data.stargazers_count || 0,
      forks: data.forks_count || 0
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return {
      stars: 0,
      forks: 0
    };
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [githubStats, setGithubStats] = useState<GitHubStats>({
    stars: 0,
    forks: 0
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchGitHubStats().then(stats => {
      setGithubStats(stats);
    });
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Screenshots", href: "#screenshots" },
    { label: "Setup", href: "#setup" },
    { label: "AI", href: "#ai-features" },
    { label: "Tech Stack", href: "#tech-stack" },
    { label: "API Docs", href: "/api" },
    { label: "Live Demo", href: "https://demo.trackeep.org", external: true },
    { label: "Open Source", href: "#open-source" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0f1115]/90 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Clean Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#39b9ff] to-[#6dd5ff]">
              <svg width="32" height="32" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="white" d="M797.56,348.33c30.91,6.66,83.06,31.07,87.21,66.41,3.15,26.85-13.06,79.89-19.48,108.33-18.08,80.05-35.49,169.43-58.24,247.51-37.84,129.87-259.97,143.84-369.81,131-79.98-9.34-191.79-42.13-218.72-127.8l-79.09-341.68c-6.97-50.68,49.68-73.96,89.21-85.61,54.67-16.12,110.4-16.62,167.08-15.62l-45.47,16.39c-44.91,18.53-101.62,26.35-145.23,45.5-15.84,6.96-26.94,19.89-14.58,36.36,18.56,24.72,115.14,56.1,146.77,62.89,82.16,17.65,152.89,2.18,231.43-22.46,54.98-17.25,130.36-44.86,168.52-89.18,25.27-29.35,31.42-69.3,44.38-104.84l-243.09,42.99-2,3.82c-1.45,15.08-2.76,30.11-6.03,44.92-31.75,143.69-186.99,93.71-283.19,53.84l1.47-2.15c82.39-23.86,163.75-50.91,245.03-78.2,5.91-3.48,5.08-25.81,7.22-33.55,3.45-12.47,12.22-19.65,23.97-24.08l282.88-49.24c14.15,3.11,20.4,11.87,18.9,26.37l-29.13,88.06v.02ZM841.24,457.54l-19.61,14.59c-113.51,75.99-355.25,76.96-485.87,53.37-58.02-10.48-91.56-24.33-143.96-48.22-1.22-.56-3.68-1.88-4.26-.11,9.51,23.92,8.86,56.35,22.36,78.1,28.12,45.3,113.96,67.69,163.71,76.52,72.61,12.88,148.98,14.98,222.29,7.73,63.62-6.3,204.67-30.25,226.3-101.29,7.88-25.88,11.16-54.64,19.03-80.69h0ZM806.3,607.51l-30.5,18.26c-131.73,66.26-405.38,65.51-535.38-4.91-6.49-3.51-12.31-8.25-18.62-11.96-1.12-.66-2.56-2.94-3.72-.65,11.55,32.54,8.2,71.49,34.17,96.87,59.84,58.47,212.94,70.07,292.78,66.97,63.99-2.48,191.09-21.71,233.65-73.56,19.02-23.17,17.88-63.15,27.62-91.02h0ZM774.26,744.37c-13.76,6.59-26.7,15.08-40.78,21.08-119.06,50.77-329.26,50.83-447.48-2.37-12.39-5.57-23.46-13.36-35.88-18.71,6.11,30.5,22.34,54.66,47.59,72.51,97.85,69.2,342.24,69.95,436.47-5.6,21.95-17.59,34.7-39.15,40.08-66.92h0Z"/>
                <rect fill="white" x="186.46" y="68.76" width="21.26" height="21.26" rx="2.24" ry="2.24"/>
                <rect fill="white" x="237.34" y="47.44" width="21.26" height="21.26" rx="2.24" ry="2.24"/>
                <rect fill="white" x="144.77" y="100.13" width="21.26" height="21.26" rx="2.24" ry="2.24"/>
              </svg>
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Trackeep
            </span>
          </a>

          {/* Clean Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 flex items-center gap-1"
              >
                {link.label}
                {link.external && <ExternalLink size={12} className="opacity-60" />}
              </a>
            ))}
          </div>

          {/* Clean Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://github.com/Dvorinka/Trackeep"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg border border-white/10 bg-white/[0.05] text-white/70 hover:text-white hover:border-white/20 hover:bg-white/[0.1] transition-all duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="font-semibold">{githubStats.stars.toLocaleString()}</span>
              <ExternalLink size={12} className="opacity-60" />
            </a>
            <a
              href="#get-started"
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-full bg-[#39b9ff] text-[#0a0e18] hover:bg-[#5cc8ff] transition-all duration-200 hover:shadow-[0_0_20px_rgba(57,185,255,0.3)]"
            >
              Get Started
            </a>
          </div>

          {/* Clean Mobile menu button */}
          <button
            className="lg:hidden text-white/70 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0f1115]/95 backdrop-blur-xl border-t border-white/5">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
                {link.external && <ExternalLink size={12} className="opacity-60" />}
              </a>
            ))}
            <a
              href="https://github.com/Dvorinka/Trackeep"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border border-white/10 bg-white/[0.05] text-white/70 hover:text-white hover:border-white/20 hover:bg-white/[0.1] transition-all duration-200"
              onClick={() => setMobileOpen(false)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="font-semibold">{githubStats.stars.toLocaleString()}</span>
              <span className="text-xs opacity-70">Stars</span>
            </a>
            <a
              href="#get-started"
              className="block text-center px-5 py-2.5 text-sm font-semibold rounded-full bg-[#39b9ff] text-[#0a0e18] mt-3"
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
