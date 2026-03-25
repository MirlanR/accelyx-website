"use client";

import {
  Bot, Workflow, Database, Mail, BarChart3, Brain,
  ArrowRight
} from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "AI Chatbots & Voice Agents",
    description:
      "Deploy 24/7 AI agents that handle customer inquiries, qualify leads, and book appointments — without human intervention.",
    tags: ["GPT-4o", "WhatsApp", "Website"],
    color: "#6366f1",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Eliminate manual, repetitive tasks with custom automation flows connecting all your tools — from CRMs to spreadsheets.",
    tags: ["Zapier", "Make.com", "n8n"],
    color: "#06b6d4",
  },
  {
    icon: Mail,
    title: "Email & Outreach Automation",
    description:
      "Build intelligent email sequences that nurture leads, follow up automatically, and personalize at scale.",
    tags: ["Instantly", "Clay", "HubSpot"],
    color: "#8b5cf6",
  },
  {
    icon: Database,
    title: "CRM & Data Integration",
    description:
      "Sync your data seamlessly across platforms. Auto-update CRM records, trigger actions, and keep teams aligned.",
    tags: ["Salesforce", "Notion", "Airtable"],
    color: "#06b6d4",
  },
  {
    icon: Brain,
    title: "AI Document Processing",
    description:
      "Extract, classify, and process documents instantly with AI — contracts, invoices, forms, and more.",
    tags: ["OCR", "GPT-4", "Custom AI"],
    color: "#6366f1",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting AI",
    description:
      "Get real-time AI-powered dashboards and reports that surface insights and trigger smart actions automatically.",
    tags: ["BigQuery", "Looker", "Custom"],
    color: "#8b5cf6",
  },
];

export default function Services() {
  return (
    <section id="services" className="section-padding">
      <div className="container-max">
        {/* ── Header ────────────────────────────────── */}
        <div className="text-center mb-16">
          <span className="section-label mb-4 block">
            <span
              className="w-8 h-px inline-block align-middle mr-2"
              style={{ background: "var(--accent)" }}
            />
            What We Build
            <span
              className="w-8 h-px inline-block align-middle ml-2"
              style={{ background: "var(--accent)" }}
            />
          </span>
          <h2 className="section-title mb-5">
            AI Solutions for{" "}
            <span className="gradient-text">Every Problem</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            From automating customer support to streamlining internal ops — we
            build AI systems tailored to your exact business needs.
          </p>
        </div>

        {/* ── Grid ──────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="card group cursor-pointer"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${service.color}18` }}
                >
                  <Icon size={22} style={{ color: service.color }} />
                </div>

                {/* Title */}
                <h3
                  className="text-lg font-bold mb-2.5"
                  style={{ fontFamily: "'Syne', sans-serif", color: "var(--text)" }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
                  {service.description}
                </p>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
