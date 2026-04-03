"use client";

import { useState } from "react";
import { ArrowRight, Play, CheckCircle } from "lucide-react";
import BookingModal from "./BookingModal";

const badges = [
  "Workflow Automation",
  "AI Chatbots",
  "Smart Integrations",
];

export default function Hero() {
  const [showBookingModal, setShowBookingModal] = useState(false);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-grid"
      style={{ paddingTop: "80px" }}
    >
      {/* ── Background glows ─────────────────────── */}
      <div
        className="glow-orb w-[600px] h-[600px] -top-40 -left-40"
        style={{ background: "#6366f1" }}
      />
      <div
        className="glow-orb w-[500px] h-[500px] top-1/2 -right-60"
        style={{ background: "#06b6d4" }}
      />
      <div
        className="glow-orb w-[300px] h-[300px] bottom-20 left-1/3"
        style={{ background: "#8b5cf6", opacity: 0.12 }}
      />

      {/* ── Radial gradient hero overlay ─────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.15), transparent 70%)",
        }}
      />

      <div className="container-max section-padding relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* ── Label badge ──────────────────────── */}
          <button
            onClick={() => setShowBookingModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in cursor-pointer transition-all duration-300 hover:scale-105"
            style={{
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.3)",
              color: "var(--accent)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "#10b981" }}
            />
            7-Day Free Trial — No Credit Card Required
          </button>

          {/* ── Headline ─────────────────────────── */}
          <h1
            className="section-title text-5xl md:text-7xl lg:text-8xl mb-6 animate-slide-up"
            style={{ lineHeight: "1.05" }}
          >
            We Automate{" "}
            <br className="hidden sm:block" />
            <span className="gradient-text">Your Business</span>
            <br className="hidden sm:block" />
            With AI
          </h1>

          {/* ── Subtext ──────────────────────────── */}
          <p
            className="section-subtitle text-xl md:text-2xl max-w-2xl mb-10 animate-slide-up"
            style={{ animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}
          >
            Stop wasting time on repetitive tasks. Accelyx AI builds custom
            automation systems that work 24/7 — so you can focus on what matters.
          </p>

          {/* ── Proof badges ─────────────────────── */}
          <div
            className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            {badges.map((b) => (
              <span
                key={b}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  color: "var(--muted)",
                }}
              >
                <CheckCircle size={14} style={{ color: "#06b6d4" }} />
                {b}
              </span>
            ))}
          </div>

          {/* ── CTA Buttons ──────────────────────── */}
          <div
            className="flex flex-col sm:flex-row items-center gap-4 animate-slide-up"
            style={{ animationDelay: "0.25s", opacity: 0, animationFillMode: "forwards" }}
          >
            <button
              onClick={() => setShowBookingModal(true)}
              className="btn-primary px-8 py-4 text-base"
            >
              Start Your Free Trial
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => scrollTo("#how-it-works")}
              className="btn-secondary px-8 py-4 text-base"
            >
              <Play size={16} />
              See How It Works
            </button>
          </div>

          {/* ── Social proof mini ────────────────── */}
          <div
            className="mt-16 flex flex-col sm:flex-row items-center gap-6 sm:gap-12 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            {[
              { number: "150+", label: "Automations Deployed" },
              { number: "98%",  label: "Client Satisfaction" },
              { number: "10×",  label: "Average ROI" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span
                  className="text-3xl font-bold gradient-text"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {stat.number}
                </span>
                <span className="text-sm mt-0.5" style={{ color: "var(--muted)" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Hero visual / animated card ──────────── */}
        <div className="mt-20 md:mt-28 relative max-w-4xl mx-auto animate-slide-up"
          style={{ animationDelay: "0.35s", opacity: 0, animationFillMode: "forwards" }}>
          {/* Glow behind card */}
          <div
            className="absolute -inset-4 rounded-3xl blur-2xl opacity-30"
            style={{ background: "linear-gradient(135deg, #6366f1, #06b6d4)" }}
          />
          {/* Dashboard mockup card */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              boxShadow: "0 40px 80px rgba(0,0,0,0.3)",
            }}
          >
            {/* Titlebar */}
            <div
              className="flex items-center gap-3 px-5 py-4"
              style={{ borderBottom: "1px solid var(--border)", background: "var(--card)" }}
            >
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400 opacity-80" />
                <span className="w-3 h-3 rounded-full bg-yellow-400 opacity-80" />
                <span className="w-3 h-3 rounded-full bg-green-400 opacity-80" />
              </div>
              <div
                className="flex-1 h-6 rounded-md text-xs flex items-center px-3"
                style={{ background: "var(--bg)", color: "var(--muted)" }}
              >
                accelyx.ai / dashboard
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Stats */}
              {[
                { label: "Tasks Automated", value: "12,847", change: "+24%", color: "#6366f1" },
                { label: "Hours Saved",     value: "2,103",  change: "+18%", color: "#06b6d4" },
                { label: "Cost Reduced",    value: "$48.2K", change: "+31%", color: "#8b5cf6" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl p-4"
                  style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                >
                  <p className="text-xs mb-2" style={{ color: "var(--muted)" }}>{s.label}</p>
                  <p
                    className="text-2xl font-bold"
                    style={{ fontFamily: "'Syne',sans-serif", color: "var(--text)" }}
                  >
                    {s.value}
                  </p>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block"
                    style={{
                      background: `${s.color}22`,
                      color: s.color,
                    }}
                  >
                    {s.change} this month
                  </span>
                </div>
              ))}

              {/* Workflow visualization */}
              <div
                className="md:col-span-3 rounded-xl p-4"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}
              >
                <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>Active Workflows</p>
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {[
                    { name: "Lead Capture",    status: "active" },
                    { name: "Email Sequences", status: "active" },
                    { name: "CRM Sync",        status: "active" },
                    { name: "Invoice Gen.",    status: "paused" },
                    { name: "Reporting",       status: "active" },
                  ].map((wf, i) => (
                    <div key={wf.name} className="flex items-center flex-shrink-0">
                      <div
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
                        style={{
                          background: wf.status === "active"
                            ? "rgba(99,102,241,0.12)"
                            : "var(--bg)",
                          border: `1px solid ${wf.status === "active" ? "rgba(99,102,241,0.4)" : "var(--border)"}`,
                          color: wf.status === "active" ? "var(--accent)" : "var(--muted)",
                        }}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${wf.status === "active" ? "animate-pulse" : ""}`}
                          style={{
                            background: wf.status === "active" ? "var(--accent)" : "var(--muted)"
                          }}
                        />
                        {wf.name}
                      </div>
                      {i < 4 && (
                        <div
                          className="w-8 h-px mx-1"
                          style={{ background: "var(--border)" }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs" style={{ color: "var(--muted)" }}>Scroll</span>
        <div
          className="w-px h-8 rounded-full"
          style={{ background: "linear-gradient(to bottom, var(--accent), transparent)" }}
        />
      </div>
    </section>
    <BookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} />
  );
}
