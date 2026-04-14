"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AutomationDemo from "@/components/AutomationDemo";
import VoiceAIDemo from "@/components/VoiceAIDemo";
import { Bot, PhoneCall } from "lucide-react";

const TABS = [
  {
    id: "automation",
    label: "Lead Automation",
    icon: Bot,
    description: "Watch leads flow into Sheets, Calendar & Email",
  },
  {
    id: "voice-ai",
    label: "Voice AI Reception",
    icon: PhoneCall,
    description: "AI receptionist books calls, updates CRM & notifies you",
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState<TabId>("automation");

  return (
    <>
      <Navbar />
      <main>
        {/* Shared header section */}
        <section className="relative min-h-screen pt-28 pb-20 overflow-hidden">
          {/* bg glow */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-brand-500/5 blur-[120px]" />
            <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[100px]" />
          </div>

          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            {/* ── Header ── */}
            <div className="text-center mb-10">
              <span className="section-label">Live Demo</span>
              <h1 className="section-title mt-3">
                Watch AI Automation{" "}
                <span className="gradient-text">In Action</span>
              </h1>
              <p className="section-subtitle mt-4 max-w-2xl mx-auto">
                Choose a demo below to see exactly how our AI systems handle
                leads, book meetings, update your CRM, and send notifications —
                all automatically.
              </p>
            </div>

            {/* ── Tab Switcher ── */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex gap-2 p-1.5 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
                {TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-brand-500/15 text-brand-400 border border-brand-500/30 shadow-lg shadow-brand-500/5"
                          : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]"
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <div className="text-left">
                        <div className={isActive ? "text-brand-400" : ""}>
                          {tab.label}
                        </div>
                        <div
                          className={`text-xs mt-0.5 hidden sm:block ${
                            isActive
                              ? "text-brand-400/60"
                              : "text-[var(--muted)]"
                          }`}
                        >
                          {tab.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Tab Content ── */}
            <div>
              {activeTab === "automation" && <AutomationDemo embedded />}
              {activeTab === "voice-ai" && <VoiceAIDemo />}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
