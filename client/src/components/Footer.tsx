/*
 * Trackeep Footer
 * Design: Dark footer with three columns, compliance badges, large logo
 * Colors: Deep dark background, muted text, blue accents
 */

export default function Footer() {
  const columns = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Integrations", href: "#integrations" },
        { label: "Changelog", href: "#" },
        { label: "Documentation", href: "#" },
      ],
    },
    {
      title: "Community",
      links: [
        { label: "GitHub", href: "https://github.com" },
        { label: "Discord", href: "#" },
        { label: "Contributing", href: "#" },
        { label: "Discussions", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "MIT License", href: "#" },
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
      ],
    },
  ];

  return (
    <footer className="relative bg-[#080a0f] border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Top: Logo + columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Logo + description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#39b9ff] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Trackeep
              </span>
            </div>
            <p className="text-sm text-white/30 leading-relaxed max-w-xs mb-6">
              Self-hosted productivity and knowledge hub. Open source, privacy-first,
              and built for full data ownership.
            </p>
            <div className="flex items-center gap-2 text-xs text-white/20">
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                All systems normal
              </span>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white/50 mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/25 hover:text-white/50 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom: Compliance + theme */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.04]">
          <p className="text-xs text-white/15">
            &copy; {new Date().getFullYear()} Trackeep. Open source under MIT License.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/20">
            <span>Privacy-first</span>
            <span>&middot;</span>
            <span>No telemetry</span>
            <span>&middot;</span>
            <span>Self-hosted</span>
          </div>
        </div>

        {/* Large background logo text */}
        <div className="mt-16 text-center overflow-hidden">
          <div className="text-[8rem] sm:text-[12rem] lg:text-[16rem] font-extrabold text-white/[0.02] leading-none tracking-tighter select-none">
            Trackeep
          </div>
        </div>
      </div>
    </footer>
  );
}
