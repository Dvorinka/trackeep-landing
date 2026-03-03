/*
 * Trackeep Features Section
 * Design: "Ship more, break less" style — feature grid with UI mockups
 * Layout: Section heading + two-column feature cards with images
 * Colors: Dark background, white text, blue accents
 */
import { useEffect, useRef, useState } from "react";
import { Bookmark, FileText, Search, Tags, CheckSquare, FolderOpen } from "lucide-react";

const FEATURE_BOOKMARKS_IMG = "/trackeep-bookmarks.png";
const FEATURE_NOTES_IMG = "/trackeep-dashboard.png";
const FEATURE_SEARCH_IMG = "/trackeep-dashboard.png";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  image?: string;
  delay?: number;
}

function FeatureCard({ icon, title, description, image, delay = 0 }: FeatureCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl border border-white/[0.06] bg-[#13161c] overflow-hidden transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Content */}
      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#39b9ff]/10 flex items-center justify-center text-[#39b9ff]">
            {icon}
          </div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
        <p className="text-sm text-white/45 leading-relaxed">{description}</p>
      </div>
      {/* Image */}
      {image && (
        <div className="px-6 pb-6 sm:px-8 sm:pb-8">
          <div className="rounded-xl overflow-hidden border border-white/[0.06]">
            <img
              src={image}
              alt={title}
              className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>
        </div>
      )}
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-b from-[#39b9ff]/[0.03] to-transparent" />
    </div>
  );
}

function SmallFeatureCard({ icon, title, description, delay = 0 }: Omit<FeatureCardProps, "image">) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl border border-white/[0.06] bg-[#13161c] p-6 sm:p-8 transition-all duration-700 ease-out hover:border-[#39b9ff]/10 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="w-10 h-10 rounded-xl bg-[#39b9ff]/10 flex items-center justify-center text-[#39b9ff] mb-4">
        {icon}
      </div>
      <h3 className="text-base font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-white/40 leading-relaxed">{description}</p>
    </div>
  );
}

export default function FeaturesSection() {
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
    <section id="features" className="relative py-24 sm:py-32 bg-[#0f1115]">
      {/* Subtle dot pattern */}
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
            <span className="text-xs font-medium text-[#39b9ff]">Core Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Everything you need,
            <br />
            nothing you don't
          </h2>
          <p className="max-w-xl mx-auto text-base text-white/40 leading-relaxed">
            A unified workspace for bookmarks, notes, tasks, and files — with powerful
            search and tagging to keep everything organized.
          </p>
        </div>

        {/* Feature cards - large */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <FeatureCard
            icon={<Bookmark size={20} />}
            title="Bookmarks & Links"
            description="Save, organize, and instantly retrieve any link. Smart tagging, rich previews, and powerful search keep your digital library perfectly organized."
            image={FEATURE_BOOKMARKS_IMG}
            delay={0}
          />
          <FeatureCard
            icon={<FileText size={20} />}
            title="Unified Dashboard"
            description="Your command center for everything. See tasks, bookmarks, and recent activity in one clean, intuitive interface."
            image={FEATURE_NOTES_IMG}
            delay={100}
          />
        </div>

        {/* Full-text search - wide card */}
        <div className="mb-5">
          <FeatureCard
            icon={<Search size={20} />}
            title="Full-Text Search"
            description="Instantly find anything across all your content — notes, bookmarks, files, and tasks. Search by keyword, tag, or content type."
            image={FEATURE_SEARCH_IMG}
            delay={200}
          />
        </div>

        {/* Small feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <SmallFeatureCard
            icon={<CheckSquare size={20} />}
            title="Tasks"
            description="Track to-dos with due dates, priorities, and project grouping. Stay on top of what matters."
            delay={0}
          />
          <SmallFeatureCard
            icon={<Tags size={20} />}
            title="Smart Tagging"
            description="Flexible tagging system that works across all content types. Create hierarchies, filter, and cross-reference."
            delay={100}
          />
          <SmallFeatureCard
            icon={<FolderOpen size={20} />}
            title="File Management"
            description="Upload, organize, and search through documents and files. Everything lives in one secure place."
            delay={200}
          />
        </div>
      </div>
    </section>
  );
}
