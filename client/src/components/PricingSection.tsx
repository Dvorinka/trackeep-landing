/*
 * Trackeep Pricing Section
 * Design: Modern pricing cards with feature comparison and interactive elements
 * Layout: Three-tier pricing with highlighted recommended plan
 * Colors: Dark theme with gradient accents and feature highlights
 */
import { useState } from "react";
import { Check, X, Star, Zap, Shield, Users, Infinity } from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  badge?: string;
  features: string[];
  notIncluded?: string[];
  highlighted?: boolean;
  icon: React.ReactNode;
  cta: string;
}

const PRICING_PLANS: PricingPlan[] = [
  {
    id: "self-hosted",
    name: "Self-Hosted",
    description: "Complete control over your data and infrastructure",
    price: "Free",
    period: "forever",
    icon: <Shield size={20} />,
    features: [
      "Unlimited users",
      "Unlimited storage",
      "All core features",
      "AI integration",
      "Mobile apps",
      "API access",
      "Community support",
      "Regular updates"
    ],
    cta: "Get Started"
  },
  {
    id: "cloud",
    name: "Cloud Managed",
    description: "Hassle-free hosting with automatic updates and support",
    price: "$29",
    period: "per month",
    badge: "Most Popular",
    highlighted: true,
    icon: <Zap size={20} />,
    features: [
      "Everything in Self-Hosted",
      "Managed infrastructure",
      "Automatic backups",
      "SSL certificates",
      "99.9% uptime SLA",
      "Email support",
      "Priority updates",
      "Performance monitoring"
    ],
    cta: "Start Free Trial"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Advanced security and compliance for large organizations",
    price: "Custom",
    period: "contact us",
    icon: <Users size={20} />,
    features: [
      "Everything in Cloud",
      "SSO/SAML integration",
      "Advanced audit logs",
      "Custom branding",
      "Dedicated infrastructure",
      "24/7 phone support",
      "Custom integrations",
      "Compliance packages (GDPR, HIPAA)"
    ],
    cta: "Contact Sales"
  }
];

function PricingCard({ plan, index }: { plan: PricingPlan; index: number }) {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div
      className={`relative rounded-2xl border transition-all duration-300 ${
        plan.highlighted
          ? "border-[#39b9ff]/30 bg-[#1a1f2e] scale-105 shadow-2xl shadow-[#39b9ff]/10"
          : "border-white/[0.06] bg-[#13161c] hover:border-white/[0.12]"
      }`}
    >
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-[#39b9ff] to-[#6dd5ff] text-white text-xs font-bold rounded-full">
          {plan.badge}
        </div>
      )}

      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
            plan.highlighted 
              ? "bg-gradient-to-br from-[#39b9ff] to-[#6dd5ff] text-white" 
              : "bg-white/[0.06] text-white/60"
          }`}>
            {plan.icon}
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
          <p className="text-sm text-white/40 mb-4">{plan.description}</p>
          
          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-bold text-white">{plan.price}</span>
              {plan.period !== "forever" && (
                <span className="text-sm text-white/40">/{plan.period}</span>
              )}
            </div>
            {plan.price === "Free" && (
              <div className="flex items-center justify-center gap-1 mt-2">
                <Infinity size={14} className="text-[#39b9ff]" />
                <span className="text-xs text-[#39b9ff]">No limits</span>
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
              ? "bg-gradient-to-r from-[#39b9ff] to-[#6dd5ff] text-[#0a0e18] hover:shadow-lg hover:shadow-[#39b9ff]/25"
              : "bg-white/[0.05] text-white hover:bg-white/[0.10] border border-white/[0.10]"
          }`}
        >
          {plan.cta}
        </button>
      </div>

      {/* Hover glow for highlighted card */}
      {plan.highlighted && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#39b9ff]/5 to-transparent pointer-events-none" />
      )}
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/[0.06] rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 text-left flex items-center justify-between hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-sm font-medium text-white">{question}</span>
        <div className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <X size={16} className="text-white/60" />
        </div>
      </button>
      {isOpen && (
        <div className="px-4 pb-4">
          <p className="text-sm text-white/40">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function PricingSection() {
  const faqItems = [
    {
      question: "Is the self-hosted version really free?",
      answer: "Yes! The self-hosted version is completely free with unlimited users and storage. You only pay for your own infrastructure costs."
    },
    {
      question: "What's included in the cloud managed plan?",
      answer: "We handle all infrastructure, backups, updates, and security. You get a hosted instance with SSL, monitoring, and email support."
    },
    {
      question: "Can I switch between plans?",
      answer: "Absolutely! You can upgrade, downgrade, or switch between self-hosted and cloud at any time. We make it easy to migrate your data."
    },
    {
      question: "Do you offer discounts for non-profits?",
      answer: "Yes! We offer 50% discounts for qualified non-profit organizations and educational institutions. Contact us for details."
    }
  ];

  return (
    <section id="pricing" className="relative py-24 sm:py-32 bg-gradient-to-b from-[#1a1f2e] to-[#0f1115]">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#39b9ff]/5 via-transparent to-[#8b5cf6]/5" />
        <div
          className="absolute inset-0 opacity-[0.02]"
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
            <Star size={14} className="text-[#39b9ff]" />
            <span className="text-xs font-medium text-[#39b9ff]">Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Simple, Transparent
            <br />
            <span className="bg-gradient-to-r from-[#39b9ff] via-[#6dd5ff] to-[#39b9ff] bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-base text-white/40 leading-relaxed">
            Choose the perfect plan for your needs. From free self-hosting to enterprise-grade solutions. 
            No hidden fees, no surprise charges.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {PRICING_PLANS.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>

        {/* Feature comparison */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Compare Features</h3>
          <div className="relative rounded-2xl border border-white/[0.06] bg-[#13161c] overflow-hidden">
            <div className="grid grid-cols-4 gap-4 p-6 border-b border-white/[0.06]">
              <div className="text-sm font-semibold text-white">Feature</div>
              <div className="text-sm font-semibold text-white text-center">Self-Hosted</div>
              <div className="text-sm font-semibold text-white text-center">Cloud</div>
              <div className="text-sm font-semibold text-white text-center">Enterprise</div>
            </div>
            
            {[
              { feature: "Unlimited Users", self: true, cloud: true, enterprise: true },
              { feature: "Unlimited Storage", self: true, cloud: true, enterprise: true },
              { feature: "AI Integration", self: true, cloud: true, enterprise: true },
              { feature: "Mobile Apps", self: true, cloud: true, enterprise: true },
              { feature: "API Access", self: true, cloud: true, enterprise: true },
              { feature: "Managed Infrastructure", self: false, cloud: true, enterprise: true },
              { feature: "Automatic Backups", self: false, cloud: true, enterprise: true },
              { feature: "SSO/SAML", self: false, cloud: false, enterprise: true },
              { feature: "24/7 Support", self: false, cloud: false, enterprise: true }
            ].map((row, idx) => (
              <div key={idx} className="grid grid-cols-4 gap-4 p-6 border-b border-white/[0.04] last:border-b-0">
                <div className="text-sm text-white/60">{row.feature}</div>
                <div className="text-center">
                  {row.self ? <Check size={16} className="text-green-400 mx-auto" : <X size={16} className="text-white/20 mx-auto" />}
                </div>
                <div className="text-center">
                  {row.cloud ? <Check size={16} className="text-green-400 mx-auto" : <X size={16} className="text-white/20 mx-auto" />}
                </div>
                <div className="text-center">
                  {row.enterprise ? <Check size={16} className="text-green-400 mx-auto" : <X size={16} className="text-white/20 mx-auto" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h3 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h3>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, idx) => (
              <FAQItem key={idx} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
