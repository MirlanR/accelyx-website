"use client";

import { TrendingUp, Clock, DollarSign, Users } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: "10×",
    label: "Average ROI",
    description: "Clients see 10x return on their automation investment within the first 3 months.",
    color: "#6366f1",
  },
  {
    icon: Clock,
    value: "2,100+",
    label: "Hours Saved Monthly",
    description: "Across our clients, we've eliminated over 2,100 hours of manual work per month.",
    color: "#06b6d4",
  },
  {
    icon: DollarSign,
    value: "$2.4M+",
    label: "Revenue Generated",
    description: "Our automation systems have directly contributed to over $2.4M in new revenue.",
    color: "#8b5cf6",
  },
  {
    icon: Users,
    value: "80+",
    label: "Clients Served",
    description: "From startups to enterprise teams across 15+ industries worldwide.",
    color: "#06b6d4",
  },
];

const logos = [
  "Acme Corp", "Nexus Tech", "Orbit Labs", "Stratify",
  "PulseMedia", "CoreBridge", "ZenithAI", "DataForge",
];

export default function Stats() {
  return (
    <section id="results" className="section-padding relative overflow-hidden">
      <div
        className="glow-orb w-[500px] h-[500px] bottom-0 left-0"
        style={{ background: "#06b6d4" }}
      />

      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <span className="section-label mb-4 block">
            <span className="w-8 h-px inline-block align-middle mr-2" style={{ background: "var(--accent)" }} />
            Real Results
            <span className="w-8 h-px inline-block align-middle ml-2" style={{ background: "var(--accent)" }} />
          </span>
          <h2 className="section-title mb-5">
            Numbers That{" "}
            <span className="gradient-text">Speak for Themselves</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            We measure success by the impact we create — not by the number of automations we build.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="card text-center group">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${stat.color}18` }}
                >
                  <Icon size={22} style={{ color: stat.color }} />
                </div>
                <div
                  className="text-4xl font-bold mb-1 gradient-text"
                  style={{ fontFamily: "'Syne',sans-serif" }}
                >
                  {stat.value}
                </div>
                <div className="text-sm font-semibold mb-2" style={{ color: "var(--text)" }}>
                  {stat.label}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest mb-8" style={{ color: "var(--muted)" }}>
            Trusted by fast-growing companies
          </p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6">
            {logos.map((logo) => (
              <div
                key={logo}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide opacity-50 hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  color: "var(--muted)",
                  fontFamily: "'Syne',sans-serif",
                }}
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
