"use client";

import { Check, Zap, ArrowRight, TrendingUp } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$2,500",
    period: "one-time",
    tagline: "Best for solopreneurs & small teams automating their first workflow.",
    color: "#6366f1",
    features: [
      "1 fully custom automation workflow",
      "Up to 3 tool integrations",
      "AI chatbot (GPT-4o powered)",
      "Delivered in 1–2 weeks",
      "30-day bug-fix support",
      "Full video walkthrough",
      "You own everything — no lock-in",
    ],
    cta: "Get Started",
    popular: false,
    badge: null,
  },
  {
    name: "Growth",
    price: "$5,500",
    period: "one-time",
    tagline: "For scaling businesses that need a full AI automation engine.",
    color: "#06b6d4",
    features: [
      "Up to 6 custom automation workflows",
      "Unlimited tool integrations",
      "Advanced AI chatbot + voice agent",
      "Full CRM & data sync setup",
      "Email & outreach automation",
      "Delivered in 3–4 weeks",
      "60-day support & maintenance",
      "Monthly performance report",
      "Dedicated Slack channel",
    ],
    cta: "Start Now",
    popular: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "let's talk",
    tagline: "End-to-end AI transformation for ambitious companies.",
    color: "#8b5cf6",
    features: [
      "Unlimited workflows & automations",
      "Dedicated AI engineer on your team",
      "Custom AI model fine-tuning",
      "Full-stack system architecture",
      "Custom API & software integrations",
      "SLA-backed priority support",
      "Quarterly strategy sessions",
      "Ongoing retainer available",
      "White-label options",
    ],
    cta: "Book a Strategy Call",
    popular: false,
    badge: "Best Value",
  },
];

const retainer = {
  price: "$1,200",
  period: "/ month",
  features: [
    "Ongoing workflow maintenance & updates",
    "New automation requests (up to 4/month)",
    "Performance monitoring & optimization",
    "Priority support (< 4hr response)",
    "Monthly strategy check-in call",
  ],
};

export default function Pricing() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="section-padding relative overflow-hidden">
      <div
        className="glow-orb w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ background: "#6366f1", opacity: 0.07 }}
      />

      <div className="container-max relative z-10">
        {/* ── Header ─────────────────────────────── */}
        <div className="text-center mb-16">
          <span className="section-label mb-4 block">
            <span className="w-8 h-px inline-block align-middle mr-2" style={{ background: "var(--accent)" }} />
            Transparent Pricing
            <span className="w-8 h-px inline-block align-middle ml-2" style={{ background: "var(--accent)" }} />
          </span>
          <h2 className="section-title mb-5">
            Simple Plans,{" "}
            <span className="gradient-text">Serious Results</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            No retainers forced on you, no hidden fees, no lock-in contracts.
            You own 100% of everything we build.
          </p>
        </div>

        {/* ── Plans Grid ─────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start mb-10">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative flex flex-col rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl"
              style={{
                background: plan.popular ? `${plan.color}0d` : "var(--card)",
                border: `1px solid ${plan.popular ? plan.color : "var(--border)"}`,
                boxShadow: plan.popular ? `0 0 50px ${plan.color}18` : "none",
                transform: plan.popular ? "scale(1.04)" : "scale(1)",
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold text-white flex items-center gap-1.5 whitespace-nowrap"
                  style={{ background: `linear-gradient(135deg, ${plan.color}, #6366f1)` }}
                >
                  <Zap size={11} className="fill-white" />
                  {plan.badge}
                </div>
              )}

              {/* Plan header */}
              <div className="mb-5">
                <div
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: plan.color }}
                >
                  {plan.name}
                </div>
                <div className="flex items-end gap-1 mb-1">
                  <span
                    className="text-4xl font-bold leading-none"
                    style={{ fontFamily: "'Syne',sans-serif", color: "var(--text)" }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-sm pb-1" style={{ color: "var(--muted)" }}>
                    &nbsp;/ {plan.period}
                  </span>
                </div>
                <p className="text-sm mt-2" style={{ color: "var(--muted)" }}>
                  {plan.tagline}
                </p>
              </div>

              <div className="h-px mb-5" style={{ background: "var(--border)" }} />

              {/* Features */}
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm"
                    style={{ color: "var(--muted)" }}
                  >
                    <Check
                      size={15}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: plan.color }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => scrollTo("#contact")}
                className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300"
                style={
                  plan.popular
                    ? {
                        background: `linear-gradient(135deg, ${plan.color}, #6366f1)`,
                        color: "#fff",
                        boxShadow: `0 4px 20px ${plan.color}40`,
                      }
                    : {
                        background: "transparent",
                        border: `1px solid var(--border)`,
                        color: "var(--text)",
                      }
                }
              >
                {plan.cta}
                <ArrowRight size={15} />
              </button>
            </div>
          ))}
        </div>

        {/* ── Monthly Retainer Add-on ─────────────── */}
        <div
          className="rounded-2xl p-6 md:p-8"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex items-start gap-4 flex-1">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(99,102,241,0.12)" }}
              >
                <TrendingUp size={22} style={{ color: "#6366f1" }} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span
                    className="text-base font-bold"
                    style={{ fontFamily: "'Syne',sans-serif", color: "var(--text)" }}
                  >
                    Monthly Retainer — Add-on
                  </span>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: "rgba(99,102,241,0.12)", color: "#6366f1" }}
                  >
                    {retainer.price}{retainer.period}
                  </span>
                </div>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  Keep your automation running, growing, and improving every month.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 md:max-w-sm">
              {retainer.features.map((f) => (
                <div key={f} className="flex items-center gap-1.5 text-sm" style={{ color: "var(--muted)" }}>
                  <Check size={13} style={{ color: "#06b6d4", flexShrink: 0 }} />
                  {f}
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollTo("#contact")}
              className="btn-secondary text-sm px-5 py-3 flex-shrink-0 whitespace-nowrap"
            >
              Ask about retainer
            </button>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-sm mt-8" style={{ color: "var(--muted)" }}>
          Not sure which plan fits?{" "}
          <button
            onClick={() => scrollTo("#contact")}
            className="font-semibold underline transition-colors duration-200"
            style={{ color: "var(--accent)" }}
          >
            Book a free strategy call →
          </button>{" "}
          and we'll recommend the right fit for your business.
        </p>
      </div>
    </section>
  );
}
