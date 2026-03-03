/*
 * Trackeep Tech Stack Section
 * Design: Simple tech showcase with real logos
 * Layout: Grid layout with technology cards
 * Colors: Dark theme with clean presentation
 */
import { useState } from "react";
import { 
  SiSolid, 
  SiTypescript, 
  SiTailwindcss, 
  SiVite,
  SiGo,
  SiGin,
  SiSqlite,
  SiPostgresql,
  SiReact,
  SiDocker,
  SiGithubactions,
  SiNginx
} from "react-icons/si";

interface TechCategory {
  id: string;
  title: string;
  description: string;
  technologies: TechItem[];
}

interface TechItem {
  name: string;
  description: string;
  version?: string;
  logo: React.ReactNode;
}

const TECH_CATEGORIES: TechCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Modern, reactive user interface with exceptional performance",
    technologies: [
      {
        name: "SolidJS",
        description: "Fine-grained reactivity without the overhead",
        version: "v1.8",
        logo: <SiSolid size={32} className="text-white" />
      },
      {
        name: "TypeScript",
        description: "Type-safe development with excellent tooling",
        version: "v5.6",
        logo: <SiTypescript size={32} className="text-white" />
      },
      {
        name: "Tailwind CSS v4",
        description: "Modern atomic CSS with instant compilation",
        version: "v4.1",
        logo: <SiTailwindcss size={32} className="text-white" />
      },
      {
        name: "Vite",
        description: "Lightning-fast build tool and dev server",
        version: "v7.1",
        logo: <SiVite size={32} className="text-white" />
      }
    ]
  },
  {
    id: "backend",
    title: "Backend",
    description: "High-performance API server with enterprise features",
    technologies: [
      {
        name: "Go",
        description: "Compiled language with exceptional performance",
        version: "v1.22",
        logo: <SiGo size={32} className="text-white" />
      },
      {
        name: "Gin Framework",
        description: "Lightweight HTTP framework with middleware",
        version: "v1.9",
        logo: <SiGin size={32} className="text-white" />
      },
      {
        name: "GORM",
        description: "Powerful ORM with advanced features",
        version: "v1.25",
        logo: <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-black text-sm font-bold">GM</div>
      },
      {
        name: "PostgreSQL",
        description: "Enterprise-grade relational database",
        version: "v15",
        logo: <SiPostgresql size={32} className="text-white" />
      }
    ]
  },
  {
    id: "mobile",
    title: "Mobile",
    description: "Native mobile apps with offline-first architecture",
    technologies: [
      {
        name: "React Native",
        description: "Cross-platform mobile development",
        version: "v0.75",
        logo: <SiReact size={32} className="text-white" />
      },
      {
        name: "SQLite Storage",
        description: "Embedded database for offline data",
        version: "v3.45",
        logo: <SiSqlite size={32} className="text-white" />
      },
      {
        name: "React Navigation",
        description: "Declarative navigation for mobile apps",
        version: "v6.3",
        logo: <SiReact size={32} className="text-white" />
      }
    ]
  },
  {
    id: "devops",
    title: "DevOps",
    description: "Modern deployment pipeline with enterprise-grade infrastructure",
    technologies: [
      {
        name: "Docker",
        description: "Containerized deployment with orchestration",
        version: "v25.0",
        logo: <SiDocker size={32} className="text-white" />
      },
      {
        name: "GitHub Actions",
        description: "Automated CI/CD pipeline with testing",
        version: "v4.2",
        logo: <SiGithubactions size={32} className="text-white" />
      },
      {
        name: "Nginx",
        description: "High-performance reverse proxy and load balancer",
        version: "v1.25",
        logo: <SiNginx size={32} className="text-white" />
      }
    ]
  }
];

interface TechCardProps {
  category: TechCategory;
}

function TechCard({ category }: TechCardProps) {
  return (
    <div className="relative">
      <div className="rounded-2xl border border-white/[0.06] bg-[#13161c] p-6">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
          <p className="text-sm text-white/60">{category.description}</p>
        </div>

        {/* Technologies */}
        <div className="grid grid-cols-2 gap-4">
          {category.technologies.map((tech) => (
            <div key={tech.name} className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.04]">
              <div className="flex-shrink-0">
                {tech.logo}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  {tech.name}
                  {tech.version && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/[0.1] text-white/60">
                      {tech.version}
                    </span>
                  )}
                </h4>
                <p className="text-xs text-white/40 mt-1">{tech.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TechStackSection() {
  return (
    <section id="tech-stack" className="relative py-24 sm:py-32 bg-[#0a0e18]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#39b9ff]/15 bg-[#39b9ff]/5 mb-5">
            <div className="w-3 h-3 rounded-full bg-[#39b9ff]" />
            <span className="text-xs font-medium text-[#39b9ff]">Technology Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Built with
            <br />
            <span className="bg-gradient-to-r from-[#39b9ff] via-[#6dd5ff] to-[#8b5cf6] bg-clip-text text-transparent">
              Modern Technology
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-base text-white/40 leading-relaxed">
            Cutting-edge technology stack optimized for performance, scalability, and developer experience. 
            Every component chosen for maximum efficiency and reliability.
          </p>
        </div>

        {/* Tech categories grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {TECH_CATEGORIES.map((category) => (
            <TechCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
