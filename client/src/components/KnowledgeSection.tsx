/*
 * Trackeep Knowledge Section
 * Design: "Scale your knowledge to infinity" — like Antimetal's knowledge section
 * Layout: Left-aligned heading, search mockup, feature pills
 * Colors: Dark background, blue accents
 */
import { useEffect, useRef, useState } from "react";
import { Search, Lightbulb, Zap, BookOpen, ExternalLink, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";

// API documentation sections for search
const API_DOCS_SECTIONS = [
  { title: "Authentication - JWT Token Setup", category: "API", content: "Bearer token authentication for API endpoints" },
  { title: "Bookmarks API - Create and Manage", category: "API", content: "POST /bookmarks endpoints for bookmark management" },
  { title: "Notes API - Organize Your Thoughts", category: "API", content: "GET /notes endpoints for note retrieval" },
  { title: "Tasks API - Project Management", category: "API", content: "Task status and priority management" },
  { title: "Files API - Upload and Storage", category: "API", content: "File upload with multipart/form-data" },
  { title: "AI Features - Summarization", category: "AI", content: "AI-powered content summarization with Mistral" },
  { title: "Search API - Enhanced Search", category: "API", content: "Semantic search across all content types" },
  { title: "Rate Limiting - API Usage", category: "API", content: "100 requests per minute for standard endpoints" },
  { title: "Environment Configuration", category: "Setup", content: "MISTRAL_API_KEY and LONGCAT_API_KEY setup" },
  { title: "Error Responses - HTTP Status Codes", category: "API", content: "Standard HTTP error response format" }
];

export default function KnowledgeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof API_DOCS_SECTIONS>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [, setLocation] = useLocation();

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

  const queries = [
    { text: "How do I configure the API proxy?", tag: "Most searched", category: "Setup" },
    { text: "Meeting notes from last sprint review", tag: "Recent", category: "Notes" },
    { text: "Design system color tokens", tag: "Bookmarked", category: "Bookmarks" },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      const results = API_DOCS_SECTIONS.filter(section => 
        section.title.toLowerCase().includes(query.toLowerCase()) ||
        section.content.toLowerCase().includes(query.toLowerCase()) ||
        section.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 300);
  };

  const handleQueryClick = (query: string) => {
    handleSearch(query);
  };

  const navigateToAPIDocs = () => {
    setLocation('/api');
  };

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 bg-[#0f1115]">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text content */}
          <div
            className={`transition-all duration-700 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#39b9ff]/15 bg-[#39b9ff]/5 mb-5">
              <BookOpen size={12} className="text-[#39b9ff]" />
              <span className="text-xs font-medium text-[#39b9ff]">Knowledge Hub</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Scale your
              <br />
              knowledge to{" "}
              <span className="text-[#39b9ff]">&infin;</span>
            </h2>

            <p className="text-base text-white/40 leading-relaxed mb-8 max-w-md">
              Turn scattered information into a living knowledge base. Every bookmark,
              note, and file becomes instantly searchable and interconnected.
            </p>

            <div className="space-y-4">
              {[
                { icon: <Search size={16} />, title: "Instant Search", desc: "Find anything in milliseconds across all your content" },
                { icon: <Lightbulb size={16} />, title: "Smart Connections", desc: "Discover relationships between your notes and bookmarks" },
                { icon: <Zap size={16} />, title: "Quick Capture", desc: "Save content from anywhere with browser extensions and API" },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className={`flex items-start gap-4 transition-all duration-700 ease-out ${
                    visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${300 + i * 100}ms` }}
                >
                  <div className="mt-0.5 w-8 h-8 rounded-lg bg-[#39b9ff]/10 flex items-center justify-center text-[#39b9ff] shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-0.5">{item.title}</h4>
                    <p className="text-sm text-white/35">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Search mockup */}
          <div
            className={`transition-all duration-700 delay-200 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative rounded-2xl border border-white/[0.06] bg-[#13161c] p-6 sm:p-8">
              {/* Search bar */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1a1d25] border border-white/[0.06] mb-6">
                <Search size={18} className="text-white/30" />
                <input
                  type="text"
                  placeholder="Search notes, bookmarks, files..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSearchResults([]);
                    }}
                    className="text-white/30 hover:text-white/60 transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Search Results */}
              {searchQuery && (
                <div className="space-y-3 mb-6">
                  {isSearching ? (
                    <div className="text-center py-4">
                      <div className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-[#39b9ff]/30 border-t-[#39b9ff]"></div>
                      <p className="text-xs text-white/40 mt-2">Searching API documentation...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <>
                      <div className="text-xs text-white/40 mb-2">Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} in API docs</div>
                      {searchResults.map((result, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#1a1d25]/50 border border-white/[0.04] hover:border-[#39b9ff]/10 transition-colors cursor-pointer group"
                          onClick={navigateToAPIDocs}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm text-white/80 font-medium">{result.title}</span>
                              <span className="text-[10px] font-medium text-[#39b9ff]/60 px-2 py-0.5 rounded-full bg-[#39b9ff]/5">
                                {result.category}
                              </span>
                            </div>
                            <p className="text-xs text-white/40">{result.content}</p>
                          </div>
                          <ChevronRight size={14} className="text-white/20 group-hover:text-[#39b9ff] transition-colors" />
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-xs text-white/40">No results found in API documentation</p>
                      <button
                        onClick={navigateToAPIDocs}
                        className="mt-2 text-xs text-[#39b9ff] hover:text-[#5cc8ff] transition-colors flex items-center gap-1 mx-auto"
                      >
                        Browse full API docs
                        <ExternalLink size={12} />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Default Query suggestions */}
              {!searchQuery && (
                <div className="space-y-3">
                  <div className="text-xs text-white/40 mb-2">Popular searches in API documentation:</div>
                  {queries.map((q, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#1a1d25]/50 border border-white/[0.04] hover:border-[#39b9ff]/10 transition-colors cursor-pointer group"
                      onClick={() => handleQueryClick(q.text)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-white/60">{q.text}</span>
                        <span className="text-[10px] font-medium text-[#39b9ff]/60 px-2 py-0.5 rounded-full bg-[#39b9ff]/5">
                          {q.tag}
                        </span>
                      </div>
                      <ChevronRight size={14} className="text-white/20 group-hover:text-[#39b9ff] transition-colors" />
                    </div>
                  ))}
                </div>
              )}

              {/* API Docs Link */}
              <div className="mt-6 pt-4 border-t border-white/[0.06]">
                <button
                  onClick={navigateToAPIDocs}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#39b9ff]/10 text-[#39b9ff] hover:bg-[#39b9ff]/20 transition-colors text-sm font-medium"
                >
                  <BookOpen size={16} />
                  Browse Full API Documentation
                  <ExternalLink size={14} />
                </button>
              </div>

              {/* Decorative glow */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#39b9ff]/5 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
