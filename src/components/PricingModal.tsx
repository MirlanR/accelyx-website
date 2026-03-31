"use client";

import { useEffect } from "react";
import { X, CheckCircle, ArrowRight, Zap, Rocket, Building2 } from "lucide-react";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const plans = [
  {
    name: "Starter",
    icon: Zap,
    price: "$550",
    period: "/ month",
    setup: "$2,000 one-time setup",
    description: "Perfect if you're just getting started with automation and want to see real results fast.",
    color: "#6366f1",
    highlights: [
      "One complete automation built for your business",
      "AI chatbot that captures leads 24/7",
      "Up to 3 of your tools connected together",
      "Ongoing support and monthly check-in",
    ],
  },
  {
    name: "Professional",
    icon: Rocket,
    price: "$950",
    period: "/ month",
    setup: "$3,500 one-time setup",
    description: "For growing businesses that want a full automation system working behind the scenes.",
    color: "#06b6d4",
    popular: true,
    highlights: [
      "5 automations: leads, booking, invoicing, email, CRM",
      "Advanced AI chatbot + voice calls",
      "All your tools connected — no limits",
      "Priority support with dedicated Slack channel",
    ],
  },
  {
    name: "Premium",
    icon: Building2,
    price: "Custom",
    period: "let's talk",
    setup: "Custom setup",
    description: "For companies that want a dedicated AI team to automate everything end-to-end.",
    color: "#8b5cf6",
    highlights: [
      "Unlimited automations for your entire business",
      "Dedicated AI engineer on your account",
      "Custom-built AI models and integrations",
      "SLA-backed priority support",
    ],
  },
];

export default function PricingModal({ isOpen, onClose }: PricingModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
      className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="fixed inset-0" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }} />

      {/* Centering wrapper */}
      <div className="min-h-full flex items-center justify-center p-4">
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
          <h2
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ fontFamily: "'Syne',sans-serif", color: "var(--text)" }}
          >
            Simple, Transparent Pricing
          </h2>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            One-time setup fee + flat monthly rate. No hidden fees, no lock-in — cancel anytime.
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

                {/* Price */}
                <div className="mb-1">
                  <span
                    className="text-2xl font-bold"
                    style={{ fontFamily: "'Syne',sans-serif", color: "var(--text)" }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-xs ml-1.5" style={{ color: "var(--muted)" }}>{plan.period}</span>
                </div>
                <div className="mb-4">
                  <span className="text-xs font-medium" style={{ color: plan.color }}>
                    + {plan.setup}
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

                {/* CTA — all buttons solid and clickable */}
                <button
                  onClick={scrollToContact}
                  className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
                  style={{
                    background: plan.popular
                      ? `linear-gradient(135deg, ${plan.color}, #6366f1)`
                      : `linear-gradient(135deg, ${plan.color}cc, ${plan.color})`,
                    color: "white",
                    boxShadow: `0 4px 15px ${plan.color}30`,
                  }}
                >
                  {plan.name === "Premium" ? "Let's Talk" : "Get Started"}
                  <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <p className="text-center text-xs mt-6" style={{ color: "var(--muted)" }}>
          No credit card required · Full details discussed on your strategy call
        </p>
      </div>
      </div>
    </div>
  );
}
