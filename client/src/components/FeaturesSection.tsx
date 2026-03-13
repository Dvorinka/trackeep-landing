/*
 * Trackeep Clean Features Section
 * Design: Simple, professional feature grid
 * Layout: Clean two-column grid with cards
 * Colors: Consistent with overall theme
 */
import { useEffect, useRef, useState } from "react";
import { Bookmark, FileText, Search, Tags, CheckSquare, FolderOpen } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`bg-[#1a1d25] border border-white/10 rounded-xl p-6 transition-all duration-700 hover:border-[#39b9ff]/30 hover:shadow-lg hover:shadow-[#39b9ff]/10 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="w-12 h-12 rounded-lg bg-[#39b9ff]/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-white/60 leading-relaxed">{description}</p>
    </div>
  );
}

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Bookmark className="w-6 h-6 text-[#39b9ff]" />,
      title: "Smart Bookmarks",
      description: "Organize bookmarks with tags, folders, and powerful search. Import from browsers and access anywhere.",
      delay: 0,
    },
    {
      icon: <FileText className="w-6 h-6 text-[#39b9ff]" />,
      title: "Rich Notes",
      description: "Markdown editor with syntax highlighting, attachments, and version history. Collaborate in real-time.",
      delay: 100,
    },
    {
      icon: <Search className="w-6 h-6 text-[#39b9ff]" />,
      title: "AI Search",
      description: "Natural language search across all your content. Find what you need, when you need it.",
      delay: 200,
    },
    {
      icon: <Tags className="w-6 h-6 text-[#39b9ff]" />,
      title: "Smart Tags",
      description: "Automatic tagging and categorization. Create custom workflows with powerful filters.",
      delay: 300,
    },
    {
      icon: <CheckSquare className="w-6 h-6 text-[#39b9ff]" />,
      title: "Task Management",
      description: "Kanban boards, calendars, and reminders. Track progress and stay productive.",
      delay: 400,
    },
    {
      icon: <FolderOpen className="w-6 h-6 text-[#39b9ff]" />,
      title: "File Storage",
      description: "Secure cloud storage with end-to-end encryption. Share files with granular permissions.",
      delay: 500,
    },
  ];

  return (
    <section id="features" ref={sectionRef} className="py-20 bg-[#0f1115]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.2] overflow-visible">
            Everything you need to
            <span className="block text-gradient leading-[1.2] overflow-visible">stay organized</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            From bookmarks to notes, tasks to files — all seamlessly integrated in one beautiful platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

        
