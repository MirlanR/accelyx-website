"use client";

import { useState, useEffect, useRef } from "react";
import {
  Play,
  CheckCircle,
  Mail,
  Calendar,
  Table,
  ArrowRight,
  Bot,
  Clock,
  Zap,
  RotateCcw,
  Monitor,
  ExternalLink,
} from "lucide-react";

/* ───────────────── types ───────────────── */
type Step = "idle" | "lead" | "qualify" | "sheets" | "calendar" | "email" | "done";

/* ───────────────── component ───────────────── */
export default function ZoomDemo() {
  const [step, setStep] = useState<Step>("idle");
  const [clientName, setClientName] = useState("John Smith");
  const [clientEmail, setClientEmail] = useState("john@example.com");
  const [clientCompany, setClientCompany] = useState("Smith Enterprises");
  const [elapsed, setElapsed] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (step !== "idle" && step !== "done") {
      timer.current = setInterval(() => setElapsed((e) => e + 100), 100);
    } else if (step === "done" && timer.current) {
      clearInterval(timer.current);
    }
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [step]);

  const runDemo = () => {
    setStep("lead");
    setElapsed(0);

    setTimeout(() => setStep("qualify"), 2000);
    setTimeout(() => setStep("sheets"), 4000);
    setTimeout(() => setStep("calendar"), 6500);
    setTimeout(() => setStep("email"), 9500);
    setTimeout(() => setStep("done"), 12500);
  };

  const reset = () => {
    setStep("idle");
    setElapsed(0);
  };

  const stepIdx = ["idle","lead","qualify","sheets","calendar","email","done"].indexOf(step);

  const steps = [
    { id: 1, label: "Lead Captured", icon: Bot, detail: `${clientName} submitted a form on your website` },
    { id: 2, label: "AI Qualifies", icon: Zap, detail: "AI scores the lead — high intent, ready to buy" },
    { id: 3, label: "Added to Sheet", icon: Table, detail: "Lead data auto-added to your Google Sheets CRM" },
    { id: 4, label: "Meeting Booked", icon: Calendar, detail: "Discovery call auto-scheduled in Google Calendar" },
    { id: 5, label: "Email Sent", icon: Mail, detail: "Personalized confirmation email sent automatically" },
  ];

  return (
    <section className="relative min-h-screen pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-brand-500/5 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium mb-4">
            <Monitor className="w-4 h-4" />
            Client Presentation Mode
          </div>
          <h1 className="section-title">
            Live Automation <span className="gradient-text">Demo</span>
          </h1>
          <p className="section-subtitle mt-3 max-w-xl mx-auto">
            Watch a new lead flow through the entire automation system — in real time.
          </p>
        </div>

        {/* Client Info (editable before demo) */}
        {step === "idle" && (
          <div className="card p-6 max-w-lg mx-auto mb-8">
            <h3 className="font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
              <Bot className="w-5 h-5 text-brand-400" />
              Demo Lead Info
              <span className="text-xs text-[var(--muted)] font-normal">(edit for each client call)</span>
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-[var(--muted)] mb-1">Client Name</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] text-sm focus:border-brand-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-[var(--muted)] mb-1">Client Email</label>
                <input
                  type="text"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] text-sm focus:border-brand-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-[var(--muted)] mb-1">Company</label>
                <input
                  type="text"
                  value={clientCompany}
                  onChange={(e) => setClientCompany(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] text-sm focus:border-brand-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Start / Timer / Reset */}
        <div className="flex justify-center gap-4 mb-10">
          {step === "idle" ? (
            <button onClick={runDemo} className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
              <Play className="w-6 h-6" /> Start Live Demo
            </button>
          ) : step === "done" ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-green-500/10 border border-green-500/30">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span className="text-green-400 font-semibold text-xl">
                  Done in {(elapsed / 1000).toFixed(1)}s
                </span>
                <Zap className="w-5 h-5 text-yellow-400" />
              </div>
              <button onClick={reset} className="btn-secondary flex items-center gap-2">
                <RotateCcw className="w-5 h-5" /> Reset
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-[var(--card)] border border-[var(--border)]">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <span className="text-base font-medium text-[var(--text)]">Automation running...</span>
              <span className="font-mono text-brand-400 text-lg">{(elapsed / 1000).toFixed(1)}s</span>
            </div>
          )}
        </div>

        {/* ── Step-by-step flow (vertical timeline) ── */}
        <div className="max-w-2xl mx-auto space-y-4">
          {steps.map((s, i) => {
            const isActive = stepIdx === i + 1;
            const isDone = stepIdx > i + 1;
            const isPending = stepIdx <= i;

            return (
              <div
                key={s.id}
                className={`relative flex items-start gap-4 p-5 rounded-2xl border transition-all duration-700 ${
                  isActive
                    ? "border-brand-500 bg-brand-500/10 shadow-lg shadow-brand-500/10 scale-[1.02]"
                    : isDone
                    ? "border-green-500/30 bg-green-500/5"
                    : "border-[var(--border)] bg-[var(--card)] opacity-50"
                }`}
              >
                {/* Icon */}
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                    isDone
                      ? "bg-green-500/20 text-green-400"
                      : isActive
                      ? "bg-brand-500/20 text-brand-400 animate-pulse"
                      : "bg-[var(--surface)] text-[var(--muted)]"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <s.icon className="w-6 h-6" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold text-base ${
                      isDone ? "text-green-400" : isActive ? "text-brand-400" : "text-[var(--muted)]"
                    }`}>
                      Step {s.id}: {s.label}
                    </span>
                    {isActive && (
                      <span className="flex items-center gap-1 text-xs bg-brand-500/20 text-brand-300 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
                        Processing
                      </span>
                    )}
                    {isDone && (
                      <span className="text-xs text-green-400 font-medium">✓ Complete</span>
                    )}
                  </div>
                  <p className={`text-sm mt-1 ${
                    isPending ? "text-[var(--muted)]" : "text-[var(--text)]"
                  }`}>
                    {s.detail}
                  </p>

                  {/* Extra details for specific steps */}
                  {isDone && i === 2 && (
                    <div className="mt-3 p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-xs">
                      <div className="grid grid-cols-4 gap-2 text-[var(--muted)] font-medium mb-2">
                        <span>Name</span><span>Email</span><span>Company</span><span>Status</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-[var(--text)]">
                        <span>{clientName}</span>
                        <span className="truncate">{clientEmail}</span>
                        <span>{clientCompany}</span>
                        <span className="text-cyan-400">New Lead</span>
                      </div>
                    </div>
                  )}

                  {isDone && i === 3 && (
                    <div className="mt-3 p-3 rounded-lg bg-brand-500/10 border border-brand-500/20 text-xs">
                      <p className="font-semibold text-brand-400">Discovery Call — {clientName}</p>
                      <p className="text-[var(--muted)] mt-1">
                        📅 Tomorrow • 2:00 PM — 2:30 PM &nbsp;|&nbsp; 📍 Google Meet
                      </p>
                    </div>
                  )}

                  {isDone && i === 4 && (
                    <div className="mt-3 p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-[var(--muted)]">From:</span>
                        <span className="text-[var(--text)]">hello@accelyx.ai</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--muted)]">To:</span>
                        <span className="text-[var(--text)]">{clientEmail}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--muted)]">Subject:</span>
                        <span className="text-[var(--text)] font-medium">Your Discovery Call is Confirmed!</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-[var(--border)] text-green-400 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Delivered
                      </div>
                    </div>
                  )}
                </div>

                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className={`absolute left-[2.1rem] top-[4.5rem] w-0.5 h-6 transition-colors duration-500 ${
                    isDone ? "bg-green-500/30" : "bg-[var(--border)]"
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Done CTA */}
        {step === "done" && (
          <div className="text-center mt-12 animate-fade-in">
            <div className="card p-8 max-w-xl mx-auto">
              <h2 className="text-2xl font-display font-bold text-[var(--text)] mb-3">
                That was <span className="gradient-text">{(elapsed / 1000).toFixed(1)} seconds</span>.
              </h2>
              <p className="text-[var(--text)] mb-2">
                Your lead was captured, qualified, added to your CRM, booked into your calendar, and sent a confirmation email — <strong>all automatically</strong>.
              </p>
              <p className="text-[var(--muted)] mb-6 text-sm">
                No manual work. No missed leads. Working 24/7, even while you sleep.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <div className="text-center px-6 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                  <div className="text-2xl font-bold text-brand-400">40+</div>
                  <div className="text-xs text-[var(--muted)]">Hours Saved / Month</div>
                </div>
                <div className="text-center px-6 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                  <div className="text-2xl font-bold text-green-400">98%</div>
                  <div className="text-xs text-[var(--muted)]">Lead Response Rate</div>
                </div>
                <div className="text-center px-6 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                  <div className="text-2xl font-bold text-cyan-400">0</div>
                  <div className="text-xs text-[var(--muted)]">Missed Leads</div>
                </div>
              </div>
              <p className="mt-6 text-lg font-semibold text-[var(--text)]">
                Ready to set this up for your business?
              </p>
            </div>
          </div>
        )}

        {/* Instruction note for Mirlan */}
        {step === "idle" && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-start gap-3 px-5 py-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-left max-w-lg">
              <span className="text-yellow-400 text-lg">💡</span>
              <div className="text-sm">
                <p className="text-yellow-400 font-medium mb-1">Tip for your Zoom call:</p>
                <p className="text-[var(--muted)]">
                  1. Share your screen showing this page<br />
                  2. Type the client&apos;s real name above<br />
                  3. Click &quot;Start Live Demo&quot;<br />
                  4. After it runs, open your Google Calendar & Gmail to show them the REAL event and email
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
