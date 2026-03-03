/*
 * Trackeep Setup Section
 * Design: Modern setup guide with interactive tabs and code snippets
 * Layout: Tabbed interface showing different setup methods
 * Colors: Dark theme with syntax highlighting and interactive elements
 */
import { useState, version } from "react";
import { Copy, Check, Package, Github, Server, Zap } from "lucide-react";

interface SetupMethod {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  difficulty: "Easy" | "Medium" | "Advanced";
  time: string;
  commands: string[];
  features: string[];
}

const SETUP_METHODS: SetupMethod[] = [
  {
    id: "docker",
    title: "Docker Compose",
    description: "Quickest way to get started with pre-built containers. Perfect for production.",
    icon: <Package size={20} />,
    difficulty: "Easy",
    time: "5 minutes",
    commands: [
      `# Create docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  trackeep-frontend:
    image: 'ghcr.io/Dvorinka/Trackeep/frontend:latest'
    ports:
      - '80:80'
      - '443:443'
    environment:
      - NODE_ENV=production
      - VITE_DEMO_MODE=\${VITE_DEMO_MODE:-false}
    depends_on:
      - trackeep-backend
    restart: unless-stopped
    networks:
      - trackeep-network

  trackeep-backend:
    image: 'ghcr.io/Dvorinka/Trackeep/backend:latest'
    ports:
      - '8080:8080'
    environment:
      - DB_PASSWORD=\${DB_PASSWORD}
      - JWT_SECRET=\${JWT_SECRET}
      - ENCRYPTION_KEY=\${ENCRYPTION_KEY}
    volumes:
      - './data:/data'
      - './uploads:/app/uploads'
      - './logs:/app/logs'
    restart: unless-stopped
    networks:
      - trackeep-network

  postgres:
    image: 'postgres:15-alpine'
    environment:
      POSTGRES_PASSWORD: \${POSTGRES_PASSWORD}
    volumes:
      - 'postgres_data:/var/lib/postgresql/data'
    restart: unless-stopped
    networks:
      - trackeep-network

volumes:
  postgres_data:

networks:
  trackeep-network:
    driver: bridge
EOF

docker-compose up -d`
    ],
    features: [
      "One-command deployment",
      "Automatic SSL with Let's Encrypt",
      "Built-in database (PostgreSQL)",
      "Production-ready configuration",
      "Easy updates with Docker images"
    ]
  },
  {
    id: "source",
    title: "From Source",
    description: "Build from source for maximum customization and development flexibility.",
    icon: <Github size={20} />,
    difficulty: "Medium",
    time: "15 minutes",
    commands: [
      `git clone https://github.com/Dvorinka/Trackeep.git
cd Trackeep
cp .env.example .env
# Edit .env file with your configuration
docker-compose up -d`
    ],
    features: [
      "Full source code access",
      "Custom modifications possible",
      "Development environment",
      "Latest features and fixes",
      "Contribute to the project"
    ]
  }
];

function SetupCard({ method, index, isActive, onClick }: { 
  method: SetupMethod; 
  index: number; 
  isActive: boolean; 
  onClick: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const copyAllCommands = () => {
    navigator.clipboard.writeText(method.commands.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id={`setup-card-${method.id}`}
      className={`relative rounded-2xl border transition-all duration-300 cursor-pointer ${
        isActive 
          ? "border-[#39b9ff]/30 bg-[#1a1f2e]" 
          : "border-white/[0.06] bg-[#13161c] hover:border-white/[0.12]"
      }`}
      onClick={onClick}
    >
      {/* Header */}
      <div className="p-6 border-b border-white/[0.04]">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isActive ? "bg-[#39b9ff]/20 text-[#39b9ff]" : "bg-white/[0.06] text-white/60"
            }`}>
              {method.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{method.title}</h3>
              <div className="flex items-center gap-3 mt-1">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  method.difficulty === "Easy" ? "bg-green-500/10 text-green-400" :
                  method.difficulty === "Medium" ? "bg-yellow-500/10 text-yellow-400" :
                  "bg-red-500/10 text-red-400"
                }`}>
                  {method.difficulty}
                </span>
                <span className="text-xs text-white/40">{method.time}</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm text-white/40 leading-relaxed">{method.description}</p>
      </div>

      {/* Content - only show when active */}
      {isActive && (
        <div className="p-3 space-y-3">
          {/* Commands */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-white">Commands</h4>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyAllCommands();
                }}
                className="flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all duration-200"
              >
                {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                {copied ? "Copied!" : "Copy All"}
              </button>
            </div>
            <div className="space-y-1">
              {method.commands.map((command, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#39b9ff]/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-start gap-3 p-2 bg-black/40 rounded-lg border border-white/[0.06] font-mono text-sm text-white/80">
                    <span className="text-white/40 select-none mt-0.5">$</span>
                    <pre className="flex-1 whitespace-pre-wrap">{command}</pre>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyCommand(command);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/[0.1] rounded mt-0.5"
                    >
                      {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-white/60" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-1">Features</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {method.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-white/60">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#39b9ff]" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-2 border-t border-white/[0.04]">
            <a
              href="#get-started"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-[#39b9ff] text-[#0a0e18] hover:bg-[#5cc8ff] transition-all duration-200"
            >
              <Zap size={14} />
              Get Started with {method.title}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SetupSection() {
  const [activeMethod, setActiveMethod] = useState("docker");

  const handleMethodClick = (methodId: string) => {
    // Store current scroll position
    const scrollY = window.scrollY;
    
    // Set the active method
    setActiveMethod(methodId);
    
    // Restore scroll position after state update
    setTimeout(() => {
      window.scrollTo(0, scrollY);
    }, 0);
  };

  return (
    <section id="setup" className="relative py-24 sm:py-32 bg-[#0a0e18]">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(57,185,255,0.3) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#39b9ff]/15 bg-[#39b9ff]/5 mb-5">
            <Server size={14} className="text-[#39b9ff]" />
            <span className="text-xs font-medium text-[#39b9ff]">Quick Setup</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Deploy Trackeep Your
            <br />
            <span className="bg-gradient-to-r from-[#39b9ff] via-[#6dd5ff] to-[#39b9ff] bg-clip-text text-transparent">
              Way
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-base text-white/40 leading-relaxed">
            Choose your deployment method. From one-click Docker setup to custom cloud deployment. 
            Everything you need to get Trackeep running in minutes.
          </p>
        </div>

        {/* Setup methods */}
        <div className="space-y-3">
          {SETUP_METHODS.map((method, index) => (
            <SetupCard
              key={method.id}
              method={method}
              index={index}
              isActive={activeMethod === method.id}
              onClick={() => handleMethodClick(method.id)}
            />
          ))}
        </div>

        {/* Bottom info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-white/40 mb-4">
            Need help? Check our comprehensive documentation
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://github.com/dvorinka/trackkeep"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all duration-200"
            >
              <Github size={16} />
              View Documentation
            </a>
            <a
              href="#support"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-[#39b9ff] hover:text-[#5cc8ff] transition-all duration-200"
            >
              Get Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
