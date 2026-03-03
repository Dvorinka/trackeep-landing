/*
 * Trackeep Open Source Section
 * Design: Highlight open-source nature, self-hosting, privacy
 * Layout: Two columns — text left, stats/badges right
 * Colors: Dark background with blue accents
 */
import { useEffect, useRef, useState } from "react";
import { Shield, GitBranch, Lock, Server, Star, GitFork } from "lucide-react";

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
      stars: data.stargazers_count || 0,
      forks: data.forks_count || 0,
      open_issues: data.open_issues_count || 0,
      language: data.language || 'TypeScript',
      license: data.license?.name || 'MIT'
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    // Fallback values
    return {
      stars: 0,
      forks: 0,
      open_issues: 0,
      language: 'TypeScript',
      license: 'MIT'
    };
  }
}

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
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

  const stars = useCountUp(githubStats.stars, 2000, visible && statsLoaded);
  const forks = useCountUp(githubStats.forks, 1800, visible && statsLoaded);

  return (
    <section id="open-source" className="relative py-24 sm:py-32 bg-[#0f1115]">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Stats and badges */}
          <div
            className={`order-2 lg:order-1 transition-all duration-700 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-2xl border border-white/[0.06] bg-[#13161c] p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star size={18} className="text-[#e8ff3a]" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">
                  {statsLoaded ? stars.toLocaleString() : '...'}
                </div>
                <p className="text-xs text-white/35">GitHub Stars</p>
              </div>
              <div className="rounded-2xl border border-white/[0.06] bg-[#13161c] p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <GitFork size={18} className="text-[#39b9ff]" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">
                  {statsLoaded ? forks.toLocaleString() : '...'}
                </div>
                <p className="text-xs text-white/35">Forks</p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Shield size={16} />, label: `${githubStats.license} Licensed` },
                { icon: <Lock size={16} />, label: "E2E Encrypted" },
                { icon: <Server size={16} />, label: "Docker Ready" },
                { icon: <GitBranch size={16} />, label: `${githubStats.language}` },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.06] bg-[#13161c]"
                >
                  <div className="text-[#39b9ff]">{badge.icon}</div>
                  <span className="text-sm text-white/60 font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Text content */}
          <div
            className={`order-1 lg:order-2 transition-all duration-700 delay-100 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#39b9ff]/15 bg-[#39b9ff]/5 mb-5">
              <GitBranch size={12} className="text-[#39b9ff]" />
              <span className="text-xs font-medium text-[#39b9ff]">Open Source</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Built in the open,
              <br />
              owned by <span className="text-[#39b9ff]">you</span>
            </h2>

            <p className="text-base text-white/40 leading-relaxed mb-6 max-w-md">
              Trackeep is fully open-source under the MIT license. Self-host it on your
              own server, audit every line of code, and keep your data where it belongs —
              with you.
            </p>

            <p className="text-base text-white/40 leading-relaxed mb-8 max-w-md">
              No telemetry, no tracking, no vendor lock-in. Deploy with Docker in
              minutes and own your productivity stack forever.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/dvorinka/trackkeep"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-all duration-200"
              >
                <GitBranch size={16} />
                View on GitHub
              </a>
              <a
                href="#get-started"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-full bg-[#39b9ff] text-[#0a0e18] hover:bg-[#5cc8ff] transition-all duration-200"
              >
                Deploy Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
