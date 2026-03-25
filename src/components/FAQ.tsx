"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What exactly is AI automation?",
    a: "AI automation combines artificial intelligence with workflow automation tools to handle repetitive tasks without human input. Unlike basic automation that just follows rules, AI automation can understand context, process natural language, make decisions, and adapt to new situations — like a smart employee that never sleeps.",
  },
  {
    q: "How long does it take to build and launch?",
    a: "Most projects are live within 2–4 weeks. The Starter plan typically takes 1–2 weeks. Growth projects run 3–4 weeks. Enterprise timelines are scoped per project but we always move fast. You'll see working prototypes in the first week.",
  },
  {
    q: "What tools and platforms do you work with?",
    a: "We work with virtually any modern tool — CRMs (HubSpot, Salesforce, Pipedrive), communication tools (Slack, Gmail, WhatsApp), databases (Notion, Airtable, Google Sheets), and automation platforms (Make, Zapier, n8n). We also build custom integrations via APIs when needed.",
  },
  {
    q: "Do I need to be technical to work with you?",
    a: "Not at all. We handle all the technical complexity. You just need to know your business and what you want to automate. We'll guide you through everything with clear explanations and walkthroughs — no jargon.",
  },
  {
    q: "What happens after the project is delivered?",
    a: "All plans include a post-launch support window (30–60 days). During this time we fix any bugs, handle edge cases, and make adjustments. After that, you can continue on a monthly maintenance retainer or manage things yourself — the choice is yours.",
  },
  {
    q: "Do I own the automation systems you build?",
    a: "Yes, 100%. Everything we build belongs to you — the workflows, the code, the integrations. We don't hold anything hostage. If you ever decide to manage things in-house or work with another team, you have full access to everything.",
  },
  {
    q: "How do you measure success?",
    a: "We track time saved, cost reduced, revenue influenced, and error rates. Before every project, we define clear KPIs together. We then report on these during and after delivery so you can see exactly what impact the automation is making.",
  },
  {
    q: "What if I'm not sure what to automate?",
    a: "That's exactly what our Discovery Call is for. We'll audit your current workflows, identify the highest-leverage automation opportunities, and give you a clear roadmap — even if you're not ready to start immediately. No pressure, just clarity.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--surface)" }}
    >
      <div
        className="glow-orb w-[400px] h-[400px] bottom-0 right-0"
        style={{ background: "#6366f1" }}
      />

      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <span className="section-label mb-4 block">
            <span className="w-8 h-px inline-block align-middle mr-2" style={{ background: "var(--accent)" }} />
            FAQ
            <span className="w-8 h-px inline-block align-middle ml-2" style={{ background: "var(--accent)" }} />
          </span>
          <h2 className="section-title mb-5">
            Questions?{" "}
            <span className="gradient-text">We've Got Answers</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Everything you need to know before working with us.
          </p>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: "var(--card)",
                  border: `1px solid ${isOpen ? "var(--accent)" : "var(--border)"}`,
                  boxShadow: isOpen ? "0 8px 30px rgba(99,102,241,0.1)" : "none",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span
                    className="font-semibold text-sm md:text-base"
                    style={{ color: "var(--text)" }}
                  >
                    {faq.q}
                  </span>
                  <span
                    className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isOpen ? "var(--accent)" : "var(--border)",
                      color: isOpen ? "#fff" : "var(--muted)",
                    }}
                  >
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>

                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: isOpen ? "300px" : "0" }}
                >
                  <p
                    className="px-6 pb-5 text-sm leading-relaxed"
                    style={{ color: "var(--muted)" }}
                  >
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
