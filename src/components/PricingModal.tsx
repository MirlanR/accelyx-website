"use client";

import { X, CheckCircle, ArrowRight, Zap, Rocket, Building2 } from "lucide-react";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const plans = [
  {
    name: "Starter",
    icon: Zap,
    setup: "$1,500",
    maintenance: "$200",
    description: "Perfect for small businesses automating their first workflow.",
    color: "#6366f1",
    highlights: [
      "1 custom automation workflow",
      "AI chatbot (FAQ + lead capture)",
      "Up to 3 tool integrations",
      "Delivered in 1–2 weeks",
    ],
  },
  {
    name: "Growth",
    icon: Rocket,
    setup: "$4,000",
    maintenance: "$400",
    description: "For scaling businesses that need multiple connected automations.",
    color: "#06b6d4",
    popular: true,
    highlights: [
      "Up to 5 custom workflows",
      "Advanced AI chatbot + voice agent",
      "Full CRM & email automation",
      "Dedicated Slack channel",
    ],
  },
  {
    name: "Enterprise",
    icon: Building2,
    setup: "Custom",
    maintenance: "Custom",
    description: "End-to-end AI transformation for ambitious companies.",
    color: "#8b5cf6",
    highlights: [
      "Unlimited workflows",
      "Dedicated AI engineer",
      "Custom integrations & API",
      "SLA-backed priority support",
    ],
  },
];

export default function PricingModal({ isOpen, onClose }: PricingModalProps) {
  if (!isOpen) return null;

  const scrollToContact = () => {
    onClose();
    setTimeout(() => {
      const el = document.querySelector("#contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }} />

      {/* Modal */}
      <div
        className="relative w-full max-w-4xl rounded-2xl p-6 md:p-10"
        style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--muted)" }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", color: "#10b981" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#10b981" }} />
            7-Day Free Trial Included
          </span>
          <h2
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ fontFamily: "'Syne',sans-serif", color: "var(--text)" }}
          >
            Simple, Transparent Pricing
          </h2>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            One-time setup + optional monthly maintenance. We&apos;ll discuss the details on your strategy call.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className="relative rounded-2xl p-5 flex flex-col"
                style={{
                  background: plan.popular
                    ? `linear-gradient(135deg, ${plan.color}12 0%, ${plan.color}06 100%)`
                    : "var(--card)",
                  border: plan.popular
                    ? `2px solid ${plan.color}50`
                    : "1px solid var(--border)",
                }}
              >
                {plan.popular && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${plan.color}, #6366f1)` }}
                  >
                    Most Popular
                  </div>
                )}

                {/* Name */}
                <div className="flex items-center gap-2.5 mb-4 mt-1">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `${plan.color}18` }}
                  >
                    <Icon size={16} style={{ color: plan.color }} />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-wider" style={{ color: plan.color }}>
                    {plan.name}
                  </span>
                </div>

                {/* Prices */}
                <div className="mb-1">
                  <span
                    className="text-2xl font-bold"
                    style={{ fontFamily: "'Syne',sans-serif", color: "var(--text)" }}
                  >
                    {plan.setup}
                  </span>
                  <span className="text-xs ml-1.5" style={{ color: "var(--muted)" }}>one-time</span>
                </div>
                <div className="mb-4">
                  <span className="text-sm font-medium" style={{ color: plan.color }}>
                    + {plan.maintenance}/mo
                  </span>
                  <span className="text-xs ml-1.5 px-1.5 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.12)", color: "#10b981" }}>
                    optional
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>
                  {plan.description}
                </p>

                {/* Key features */}
                <div className="flex-1 space-y-2.5 mb-5">
                  {plan.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2">
                      <CheckCircle size={13} style={{ color: plan.color, flexShrink: 0 }} />
                      <span className="text-sm" style={{ color: "var(--muted)" }}>{h}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={scrollToContact}
                  className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: plan.popular
                      ? `linear-gradient(135deg, ${plan.color}, #6366f1)`
                      : "var(--bg)",
                    border: plan.popular ? "none" : "1px solid var(--border)",
                    color: plan.popular ? "white" : "var(--text)",
                  }}
                >
                  {plan.name === "Enterprise" ? "Let's Talk" : "Start Free Trial"}
                  <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <p className="text-center text-xs mt-6" style={{ color: "var(--muted)" }}>
          7-day free trial · No credit card required · Full details discussed on your strategy call
        </p>
      </div>
    </div>
  );
}
