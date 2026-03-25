"use client";

import { Zap } from "lucide-react";

const items = [
  "AI Workflow Automation",
  "Intelligent Chatbots",
  "CRM Integration",
  "Lead Generation",
  "Email Automation",
  "Data Processing",
  "AI Document Handling",
  "Predictive Analytics",
  "Voice AI Agents",
  "Smart Reporting",
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div
      className="relative py-5 overflow-hidden"
      style={{
        borderTop:    "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background:   "var(--card)",
      }}
    >
      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--card), transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--card), transparent)" }}
      />

      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2.5 mx-6 text-sm font-semibold uppercase tracking-widest flex-shrink-0"
            style={{ color: "var(--muted)" }}
          >
            <Zap size={12} style={{ color: "var(--accent)" }} className="fill-current" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
