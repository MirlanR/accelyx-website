"use client";

import { MessageSquare, Settings2, Rocket } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: MessageSquare,
    title: "Discovery Call",
    description:
      "We dive deep into your business — understanding your workflows, bottlenecks, and goals. No fluff, just clarity on where AI can drive the most value.",
    color: "#6366f1",
  },
  {
    step: "02",
    icon: Settings2,
    title: "Build & Integrate",
    description:
      "Our team designs and builds your custom AI automation system — fully integrated with your existing tools. You approve everything before it goes live.",
    color: "#06b6d4",
  },
  {
    step: "03",
    icon: Rocket,
    title: "Launch & Scale",
    description:
      "We deploy, monitor, and continuously optimize your system. As your business grows, your automation scales with it — with zero friction.",
    color: "#8b5cf6",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--surface)" }}
    >
      {/* Background glow */}
      <div
        className="glow-orb w-[400px] h-[400px] top-0 right-0"
        style={{ background: "#6366f1" }}
      />

      <div className="container-max relative z-10">
        {/* ── Header ─────────────────────────────── */}
        <div className="text-center mb-16">
          <span className="section-label mb-4 block">
            <span className="w-8 h-px inline-block align-middle mr-2" style={{ background: "var(--accent)" }} />
            The Process
            <span className="w-8 h-px inline-block align-middle ml-2" style={{ background: "var(--accent)" }} />
          </span>
          <h2 className="section-title mb-5">
            From Idea to{" "}
            <span className="gradient-text">Automation</span>
            <br />
            in 3 Simple Steps
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            We make going from "I hate manual work" to "everything runs itself"
            feel effortless.
          </p>
        </div>

        {/* ── Steps ──────────────────────────────── */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div
            className="hidden lg:block absolute top-16 left-1/2 -translate-x-1/2 w-2/3 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--accent), transparent)",
              opacity: 0.3,
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="flex flex-col items-center text-center group"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Step number + icon */}
                  <div className="relative mb-6">
                    {/* Glow ring */}
                    <div
                      className="absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                      style={{ background: step.color }}
                    />
                    <div
                      className="relative w-24 h-24 rounded-full flex items-center justify-center border-2 transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background:   `${step.color}14`,
                        borderColor:  `${step.color}40`,
                      }}
                    >
                      <Icon size={32} style={{ color: step.color }} />
                    </div>
                    {/* Step badge */}
                    <div
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: step.color }}
                    >
                      {step.step}
                    </div>
                  </div>

                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ fontFamily: "'Syne',sans-serif", color: "var(--text)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Timeline block (detailed) ───────────── */}
        <div
          className="mt-20 rounded-2xl p-8 md:p-12"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="section-label mb-3 block text-sm">Timeline</span>
              <h3
                className="text-3xl font-bold mb-4"
                style={{ fontFamily: "'Syne',sans-serif", color: "var(--text)" }}
              >
                From Onboarding to{" "}
                <span className="gradient-text">Live Automation</span>
              </h3>
              <p style={{ color: "var(--muted)" }}>
                Most clients are fully automated within 2–4 weeks. We move fast
                so you see ROI quickly — not in months.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { phase: "Week 1", label: "Discovery & Strategy",   pct: 100, color: "#6366f1" },
                { phase: "Week 2", label: "Build & Configure",      pct: 100, color: "#06b6d4" },
                { phase: "Week 3", label: "Testing & Integration",  pct: 80,  color: "#8b5cf6" },
                { phase: "Week 4", label: "Launch & Optimization",  pct: 60,  color: "#6366f1" },
              ].map((item) => (
                <div key={item.phase}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span style={{ color: "var(--text)", fontWeight: 500 }}>
                      {item.phase} — {item.label}
                    </span>
                  </div>
                  <div
                    className="h-2 rounded-full overflow-hidden"
                    style={{ background: "var(--border)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${item.pct}%`,
                        background: item.color,
                        opacity: 0.8,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
