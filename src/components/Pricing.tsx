"use client";

import { Check, Zap, ArrowRight, Rocket, Building2 } from "lucide-react";

const plans = [
  {
    name: "Starter",
    icon: Zap,
    price: "$550",
    period: "/ month",
    setup: "$1,500 one-time setup",
    tagline: "Perfect if you're just getting started with automation and want to see real results fast.",
    color: "#6366f1",
    features: [
      "We build one complete automation for your business — like auto-responding to new leads, sending follow-up emails, or syncing your tools together",
      "An AI chatbot on your website that answers questions and captures leads for you 24/7",
      "We connect up to 3 of your existing tools (e.g. your CRM, email, calendar, or forms)",
      "Everything is delivered within 1–2 weeks, fully tested and ready to go",
      "Ongoing support — if anything breaks or needs tweaking, we handle it",
      "Monthly check-in to make sure everything is running smoothly",
    ],
    cta: "Get Started",
    popular: false,
    badge: null,
  },
  {
    name: "Professional",
    icon: Rocket,
    price: "$950",
    period: "/ month",
    setup: "$3,000 one-time setup",
    tagline: "For growing businesses that want a full automation system working behind the scenes.",
    color: "#06b6d4",
    features: [
      "We set up up to 5 automations across your business — lead follow-ups, appointment booking, invoicing, email campaigns, data syncing, and more",
      "Advanced AI chatbot that handles conversations, qualifies leads, and can even make voice calls on your behalf",
      "Full CRM setup so every lead, client, and deal is tracked automatically",
      "Automated email sequences that nurture leads and keep clients engaged without you lifting a finger",
      "Connect all your tools — no limits on integrations",
      "Delivered in 3–4 weeks with hands-on onboarding",
      "Priority support with a dedicated Slack channel for your team",
      "Monthly performance report showing exactly how automation is saving you time and money",
    ],
    cta: "Start Now",
    popular: true,
    badge: "Most Popular",
  },
  {
    name: "Premium",
    icon: Building2,
    price: "Custom",
    period: "let's talk",
    setup: "Custom setup",
    tagline: "For companies that want a dedicated AI team to automate everything end-to-end.",
    color: "#8b5cf6",
    features: [
      "Unlimited automations — we automate every repeatable process in your business",
      "A dedicated AI engineer assigned to your account who knows your business inside and out",
      "Custom-built AI models trained specifically on your data and workflows",
      "We design and build your entire system architecture from scratch",
      "Custom API connections and software integrations tailored to your exact needs",
      "Guaranteed response times with SLA-backed priority support",
      "Quarterly strategy sessions to plan what to automate next",
      "White-label options — put your own brand on everything we build",
    ],
    cta: "Book a Strategy Call",
    popular: false,
    badge: "Best Value",
  },
];

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
            Pricing Plans
            <span className="w-8 h-px inline-block align-middle ml-2" style={{ background: "var(--accent)" }} />
          </span>
          <h2 className="section-title mb-5">
            Simple Plans,{" "}
            <span className="gradient-text">Serious Results</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            A one-time setup fee to build your system, then a flat monthly rate to keep it running, optimized, and supported. No hidden fees, no lock-in — cancel anytime.
          </p>
        </div>

        {/* ── Plans Grid ─────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start mb-10">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
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
                  <div className="flex items-center gap-2.5 mb-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: `${plan.color}18` }}
                    >
                      <Icon size={16} style={{ color: plan.color }} />
                    </div>
                    <span
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: plan.color }}
                    >
                      {plan.name}
                    </span>
                  </div>
                  <div className="flex items-end gap-1 mb-1">
                    <span
                      className="text-4xl font-bold leading-none"
                      style={{ fontFamily: "'Syne',sans-serif", color: "var(--text)" }}
                    >
                      {plan.price}
                    </span>
                    <span className="text-sm pb-1" style={{ color: "var(--muted)" }}>
                      &nbsp;{plan.period}
                    </span>
                  </div>
                  <div className="text-xs font-medium mt-1.5" style={{ color: plan.color }}>
                    + {plan.setup}
                  </div>
                  <p className="text-sm mt-3" style={{ color: "var(--muted)" }}>
                    {plan.tagline}
                  </p>
                </div>

                <div className="h-px mb-5" style={{ background: "var(--border)" }} />

                {/* Features */}
                <ul className="flex flex-col gap-4 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm leading-relaxed"
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
            );
          })}
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
          and we&apos;ll recommend the right fit for your business.
        </p>
      </div>
    </section>
  );
}
