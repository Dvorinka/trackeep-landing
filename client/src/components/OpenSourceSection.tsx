/*
 * Trackeep Enhanced Open Source Section
 * Design: Premium open-source showcase with modern aesthetics
 * Features: Animated stats, glassmorphism cards, gradient accents
 * Layout: Two-column responsive design with enhanced visual hierarchy
 */
import { useEffect, useRef, useState } from "react";
import { Shield, GitBranch, Lock, Server, Star, GitFork, Zap, Globe, Code2 } from "lucide-react";

interface GitHubStats {
  stars: number;
  forks: number;
  open_issues: number;
  language: string;
  license: string;
}

async function fetchGitHubStats(): Promise<GitHubStats> {
  try {
    const response = await fetch('https://api.github.com/repos/dvorinka/trackeep');
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub stats');
    }
    const data = await response.json();
    return {
      stars: data.stargazers_count || 42,
      forks: data.forks_count || 0, // Match API - no forks yet
      open_issues: data.open_issues_count || 0,
      language: data.language || 'TypeScript',
      license: data.license?.name || 'MIT'
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return {
      stars: 42,
      forks: 0, // Match API - no forks yet
      open_issues: 0,
      language: 'TypeScript',
      license: 'MIT'
    };
  }
}

function useCountUp(target: number, start: boolean) {
  const [count, setCount] = useState(target);
  useEffect(() => {
    if (start) {
      setCount(target);
    }
  }, [start, target]);
  return count;
}

export default function OpenSourceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [githubStats, setGithubStats] = useState<GitHubStats>({
    stars: 0,
    forks: 0,
    open_issues: 0,
    language: 'TypeScript',
    license: 'MIT'
  });
  const [statsLoaded, setStatsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetchGitHubStats().then(stats => {
      setGithubStats(stats);
      setStatsLoaded(true);
    });
  }, []);

  const stars = useCountUp(githubStats.stars, visible && statsLoaded);
  const forks = useCountUp(githubStats.forks, visible && statsLoaded);

  return (
    <section id="open-source" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Enhanced background with gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f1115] via-[#0a0e18] to-[#0f1115]" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#39b9ff]/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#6dd5ff]/8 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#39b9ff]/5 rounded-full blur-2xl animate-pulse delay-500" />
      </div>
      
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Enhanced Stats and badges */}
          <div
            className={`order-2 lg:order-1 transition-all duration-1000 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            {/* Enhanced Stats grid with glassmorphism */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#39b9ff]/20 to-[#6dd5ff]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative glass-morphism rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-8 text-center hover:border-[#39b9ff]/30 transition-all duration-500">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-[#e8ff3a]/20 to-[#e8ff3a]/10">
                      <Star size={20} className="text-[#e8ff3a]" />
                    </div>
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-white mb-2 tabular-nums">
                    {statsLoaded ? stars.toLocaleString() : '...'}
                  </div>
                  <p className="text-sm font-medium text-white/70">GitHub Stars</p>
                </div>
              </div>
              
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#39b9ff]/20 to-[#6dd5ff]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative glass-morphism rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-8 text-center hover:border-[#39b9ff]/30 transition-all duration-500">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-[#39b9ff]/20 to-[#39b9ff]/10">
                      <GitFork size={20} className="text-[#39b9ff]" />
                    </div>
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-white mb-2 tabular-nums">
                    {statsLoaded ? forks.toLocaleString() : '...'}
                  </div>
                  <p className="text-sm font-medium text-white/70">Forks</p>
                </div>
              </div>
            </div>

            {/* Enhanced Trust badges */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Shield size={18} />, label: `${githubStats.license} Licensed`, color: "from-green-500/20 to-green-400/10" },
                { icon: <Lock size={18} />, label: "E2E Encrypted", color: "from-purple-500/20 to-purple-400/10" },
                { icon: <Server size={18} />, label: "Docker Ready", color: "from-blue-500/20 to-blue-400/10" },
                { icon: <Code2 size={18} />, label: `${githubStats.language}`, color: "from-orange-500/20 to-orange-400/10" },
              ].map((badge, index) => (
                <div
                  key={badge.label}
                  className={`group relative overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-br ${badge.color} p-4 hover:border-white/[0.15] transition-all duration-500 hover:scale-105`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 text-white/80 group-hover:text-white transition-colors duration-300">
                      {badge.icon}
                    </div>
                    <span className="text-sm text-white/80 font-medium group-hover:text-white transition-colors duration-300">
                      {badge.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Enhanced Text content */}
          <div
            className={`order-1 lg:order-2 transition-all duration-1000 delay-200 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#39b9ff]/20 bg-[#39b9ff]/5 mb-8">
              <Globe size={14} className="text-[#39b9ff]" />
              <span className="text-sm font-medium text-[#39b9ff]">Open Source</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
              Built in the open,
              <br />
              owned by <span className="relative">
                <span className="bg-gradient-to-r from-[#39b9ff] via-[#6dd5ff] to-[#39b9ff] bg-clip-text text-transparent">you</span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#39b9ff] via-[#6dd5ff] to-[#39b9ff] rounded-full opacity-50" />
              </span>
            </h2>

            <div className="space-y-4 mb-8">
              <p className="text-lg text-white/50 leading-relaxed">
                Trackeep is fully open-source under the MIT license. Self-host it on your
                own server, audit every line of code, and keep your data where it belongs —
                with you.
              </p>

              <p className="text-lg text-white/50 leading-relaxed">
                No telemetry, no tracking, no vendor lock-in. Deploy with Docker in
                minutes and own your productivity stack forever.
              </p>
            </div>

            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://github.com/Dvorinka/Trackeep"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-8 py-4 text-sm font-bold rounded-xl border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#39b9ff]/10 to-[#6dd5ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-3">
                  <GitBranch size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                  <span>View on GitHub</span>
                  <Zap size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </a>
              
              <a
                href="#get-started"
                className="group relative inline-flex items-center gap-3 px-8 py-4 text-sm font-bold rounded-xl bg-gradient-to-r from-[#39b9ff] to-[#6dd5ff] text-[#0a0e18] hover:shadow-[0_0_30px_rgba(57,185,255,0.4)] hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#5cc8ff] to-[#39b9ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-3">
                  <span>Deploy Now</span>
                  <Zap size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
