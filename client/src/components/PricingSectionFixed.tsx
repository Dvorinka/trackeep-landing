/*
 * Trackeep Pricing Section - Free & Open Source
 * Design: Emphasis on free self-hosting with optional support
 */
import { Check, Star, Shield, Zap, Heart, Github } from "lucide-react";

interface FreePlan {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  icon: React.ReactNode;
  highlighted?: boolean;
}

const FREE_PLANS: FreePlan[] = [
  {
    id: "self-hosted",
    name: "Self-Hosted",
    description: "Complete freedom and control over your data",
    price: "Always Free",
    icon: <Shield size={20} />,
    highlighted: true,
    features: [
      "Unlimited users",
      "Unlimited storage",
      "All core features",
      "AI integration",
      "Mobile apps",
      "API access",
      "Regular updates",
      "Community support",
      "No vendor lock-in",
      "Complete data ownership"
    ]
  },
  {
    id: "enterprise-support",
    name: "Enterprise Support",
    description: "Optional professional support for organizations",
    price: "Optional",
    icon: <Zap size={20} />,
    features: [
      "Everything in Self-Hosted",
      "Priority email support",
      "Security consultations",
      "Custom integration help",
      "SLA agreements",
      "On-premises deployment assistance",
      "Training sessions",
      "Custom development (quoted separately)"
    ]
  }
];

function PlanCard({ plan }: { plan: FreePlan }) {
  return (
    <div
      className={`relative rounded-2xl border transition-all duration-300 ${
        plan.highlighted
          ? "border-[#39b9ff]/30 bg-[#1a1f2e] scale-105 shadow-2xl shadow-[#39b9ff]/10"
          : "border-white/[0.06] bg-[#13161c] hover:border-white/[0.12]"
      }`}
    >
      {plan.highlighted && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
          <Heart size={12} />
          100% Free Forever
        </div>
      )}

      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
            plan.highlighted 
              ? "bg-gradient-to-br from-green-500 to-emerald-500 text-white" 
              : "bg-white/[0.06] text-white/60"
          }`}>
            {plan.icon}
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
          <p className="text-sm text-white/40 mb-4">{plan.description}</p>
          
          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline justify-center gap-1">
              <span className={`text-4xl font-bold ${plan.highlighted ? "text-green-400" : "text-white"}`}>
                {plan.price}
              </span>
            </div>
            {plan.price === "Always Free" && (
              <div className="flex items-center justify-center gap-1 mt-2">
                <Github size={14} className="text-green-400" />
                <span className="text-xs text-green-400">Open Source</span>
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-8">
          {plan.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <Check size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-white/80">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
            plan.highlighted
              ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg hover:shadow-green-500/25"
              : "bg-white/[0.05] text-white hover:bg-white/[0.10] border border-white/[0.10]"
          }`}
        >
          {plan.id === "self-hosted" ? "Get Started Now" : "Contact for Support"}
        </button>
      </div>
    </div>
  );
}

export default function PricingSectionFixed() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32 bg-gradient-to-b from-[#1a1f2e] to-[#0f1115]">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(34,197,94,0.3) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/15 bg-green-500/5 mb-5">
            <Heart size={14} className="text-green-400" />
            <span className="text-xs font-medium text-green-400">Free & Open Source</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Always Free,
            <br />
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">
              Forever Open Source
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-base text-white/40 leading-relaxed">
            Trackeep is and always will be free and open source. No subscriptions, no premium tiers, 
            no hidden fees. Just powerful self-hosted productivity tools that respect your freedom.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {FREE_PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Open source emphasis */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl border border-white/[0.06] bg-[#13161c]">
            <Github size={24} className="text-green-400" />
            <div className="text-left">
              <h3 className="text-lg font-semibold text-white mb-1">100% Open Source</h3>
              <p className="text-sm text-white/40">
                Fork, modify, and deploy however you want. Your data, your code, your rules.
              </p>
            </div>
          </div>
        </div>

        {/* Value proposition */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 mx-auto mb-3">
              <Shield size={20} />
            </div>
            <h4 className="text-sm font-semibold text-white mb-2">No Vendor Lock-in</h4>
            <p className="text-xs text-white/40">Export your data anytime. You're always in control.</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 mx-auto mb-3">
              <Zap size={20} />
            </div>
            <h4 className="text-sm font-semibold text-white mb-2">No Limits</h4>
            <p className="text-xs text-white/40">Unlimited users, storage, and features. No artificial restrictions.</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 mx-auto mb-3">
              <Heart size={20} />
            </div>
            <h4 className="text-sm font-semibold text-white mb-2">Community Driven</h4>
            <p className="text-xs text-white/40">Built by the community, for the community. Forever.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
