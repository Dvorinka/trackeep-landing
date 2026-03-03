/*
 * Trackeep AI Features Section
 * Design: Futuristic AI showcase with animated gradients and interactive cards
 * Layout: Grid of AI capabilities with privacy-focused messaging and AI model logos
 * Colors: Dark theme with blue gradients and glowing effects
 */
import { Brain, Sparkles, Zap } from "lucide-react";
import deepseekLogo from "../assets/ai-models/deepseek-color.svg";
import grokLogo from "../assets/ai-models/grok.svg";
import longcatLogo from "../assets/ai-models/longcat-color.svg";
import mistralLogo from "../assets/ai-models/mistral-color.svg";
import ollamaLogo from "../assets/ai-models/ollama.svg";
import openrouterLogo from "../assets/ai-models/openrouter.svg";

interface AIModel {
  name: string;
  logo: string;
  description: string;
}

interface AIFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  useCase: string;
}

const AI_MODELS: AIModel[] = [
  { name: "DeepSeek", logo: deepseekLogo, description: "Advanced reasoning and content analysis" },
  { name: "Grok", logo: grokLogo, description: "Real-time knowledge and witty responses" },
  { name: "LongCat", logo: longcatLogo, description: "Advanced AI features and specialized tasks" },
  { name: "Mistral", logo: mistralLogo, description: "European AI with strong privacy focus" },
  { name: "Ollama", logo: ollamaLogo, description: "Self-hosted local AI models" },
  { name: "OpenRouter", logo: openrouterLogo, description: "Universal AI model gateway" }
];

const AI_FEATURES: AIFeature[] = [
  {
    icon: <Brain size={20} />,
    title: "Smart Content Analysis",
    description: "AI automatically analyzes and categorizes your content",
    useCase: "Automatic tagging of bookmarks, notes, and files"
  },
  {
    icon: <Sparkles size={20} />,
    title: "Intelligent Recommendations",
    description: "Get personalized suggestions based on your content patterns",
    useCase: "Related content discovery and knowledge graph building"
  },
  {
    icon: <Zap size={20} />,
    title: "AI-Powered Search",
    description: "Natural language search across all your content",
    useCase: "Find anything using conversational queries"
  },
  {
    icon: <Zap size={20} />,
    title: "Automated Workflows",
    description: "AI helps organize and maintain your knowledge base",
    useCase: "Smart filing, duplicate detection, content cleanup"
  }
];

export default function AISection() {
  return (
    <section id="ai-features" className="relative py-24 sm:py-32 bg-gradient-to-b from-[#0f1115] to-[#1a1f2e]">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#39b9ff]/5 via-transparent to-[#39b9ff]/3" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(57,185,255,0.3) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#39b9ff]/15 bg-[#39b9ff]/5 mb-5">
            <Brain size={14} className="text-[#39b9ff]" />
            <span className="text-xs font-medium text-[#39b9ff]">AI-Powered</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Intelligence That
            <br />
            <span className="bg-gradient-to-r from-[#39b9ff] via-[#6dd5ff] to-[#39b9ff] bg-clip-text text-transparent">
              Respects Your Privacy
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-base text-white/40 leading-relaxed">
            Advanced AI capabilities with complete control over your data. Choose your AI provider 
            or run completely offline. You're always in charge.
          </p>
        </div>

        {/* AI Models Grid */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-white mb-2">Supported AI Models</h3>
            <p className="text-sm text-white/40">Choose from leading AI providers or run completely offline</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {AI_MODELS.map((model, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 rounded-xl border border-white/[0.06] bg-[#13161c] hover:border-[#39b9ff]/20 transition-all duration-300 group"
              >
                <div className="w-12 h-12 mb-3 flex items-center justify-center">
                  <img 
                    src={model.logo} 
                    alt={model.name}
                    className="w-full h-full object-contain filter brightness-0 invert group-hover:brightness-0 group-hover:invert transition-all duration-300"
                  />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">{model.name}</h4>
                <p className="text-xs text-white/40 text-center">{model.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AI_FEATURES.map((feature, index: number) => (
            <div
              key={index}
              className="relative rounded-2xl border border-white/[0.06] bg-[#13161c] p-6 hover:border-[#39b9ff]/20 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#39b9ff]/20 to-[#39b9ff]/10 flex items-center justify-center text-[#39b9ff] mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-white/40 mb-3">{feature.description}</p>
              <p className="text-xs text-[#39b9ff] font-medium">{feature.useCase}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
