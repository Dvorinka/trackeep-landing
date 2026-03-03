/*
 * Trackeep Integrations Section
 * Design: "Connect your stack" with integration icons grid
 * Layout: Centered heading + grid of integration cards
 * Background: Dark with subtle blue accents
 */
import { useEffect, useRef, useState } from "react";
import { Globe, Github, Chrome, FileJson, Database, Cloud, Terminal, Rss, Webhook, Download } from "lucide-react";

const INTEGRATIONS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663395621350/dTa4MaxWPTtKL9CDHWz7CJ/integrations-grid-8HKZ3Mf5bf8JsjdyNd9waR.webp";

const integrations = [
  { icon: <Chrome size={22} />, name: "Browser Extension", desc: "Save from any page" },
  { icon: <Github size={22} />, name: "GitHub", desc: "Sync repos & issues" },
  { icon: <FileJson size={22} />, name: "REST API", desc: "Full programmatic access" },
  { icon: <Rss size={22} />, name: "RSS Feeds", desc: "Auto-import articles" },
  { icon: <Database size={22} />, name: "SQLite / Postgres", desc: "Your choice of DB" },
  { icon: <Cloud size={22} />, name: "S3 Storage", desc: "Cloud file backup" },
  { icon: <Terminal size={22} />, name: "CLI Tool", desc: "Manage from terminal" },
  { icon: <Webhook size={22} />, name: "Webhooks", desc: "Automate workflows" },
  { icon: <Globe size={22} />, name: "WebDAV", desc: "Sync with any client" },
  { icon: <Download size={22} />, name: "Import/Export", desc: "JSON, CSV, HTML" },
];

export default function IntegrationsSection() {
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="integrations" className="relative py-24 sm:py-32 bg-[#0f1115] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 opacity-[0.06]">
        <img
          src={INTEGRATIONS_IMG}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#39b9ff]/15 bg-[#39b9ff]/5 mb-5">
            <span className="text-xs font-medium text-[#39b9ff]">Integrations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Connect your stack
          </h2>
          <p className="max-w-xl mx-auto text-base text-white/40 leading-relaxed">
            Browser extensions, APIs, CLI tools, and webhooks. Trackeep fits into your
            existing workflow, not the other way around.
          </p>
        </div>

        {/* Integration grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {integrations.map((item, i) => (
            <div
              key={item.name}
              className={`group relative rounded-xl border border-white/[0.06] bg-[#13161c]/80 backdrop-blur-sm p-5 text-center transition-all duration-500 ease-out hover:border-[#39b9ff]/15 hover:bg-[#39b9ff]/[0.03] ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="w-11 h-11 rounded-xl bg-[#39b9ff]/10 flex items-center justify-center text-[#39b9ff] mx-auto mb-3 group-hover:bg-[#39b9ff]/15 transition-colors">
                {item.icon}
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">{item.name}</h4>
              <p className="text-xs text-white/35">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`text-center mt-12 transition-all duration-700 delay-500 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="#get-started"
            className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold rounded-full bg-[#39b9ff] text-[#0a0e18] hover:bg-[#5cc8ff] transition-all duration-200 hover:shadow-[0_0_20px_rgba(57,185,255,0.3)]"
          >
            Get started
          </a>
        </div>
      </div>
    </section>
  );
}
