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
} from "lucide-react";

/* ───────────────── types ───────────────── */
type Step = "idle" | "form" | "sheets" | "calendar" | "email" | "done";

interface LeadRow {
  name: string;
  email: string;
  company: string;
  status: string;
  time: string;
}

/* ───────────────── mock data ───────────────── */
const EXISTING_LEADS: LeadRow[] = [
  {
    name: "Sarah Chen",
    email: "sarah@techflow.io",
    company: "TechFlow",
    status: "Qualified",
    time: "10:23 AM",
  },
  {
    name: "Marcus Lee",
    email: "marcus@growth.co",
    company: "GrowthCo",
    status: "Meeting Set",
    time: "11:45 AM",
  },
  {
    name: "Emily Park",
    email: "emily@startupx.com",
    company: "StartupX",
    status: "Follow-up",
    time: "1:12 PM",
  },
];

const NEW_LEAD: LeadRow = {
  name: "Alex Rivera",
  email: "alex@newclient.com",
  company: "NewClient Inc.",
  status: "New Lead",
  time: "Just now",
};

/* ───────────────── main component ───────────────── */
export default function AutomationDemo() {
  const [step, setStep] = useState<Step>("idle");
  const [typing, setTyping] = useState({ name: "", email: "", company: "" });
  const [sheetRows, setSheetRows] = useState<LeadRow[]>(EXISTING_LEADS);
  const [showNewRow, setShowNewRow] = useState(false);
  const [calendarPulse, setCalendarPulse] = useState(false);
  const [calendarBooked, setCalendarBooked] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  /* ── timer ── */
  useEffect(() => {
    if (step !== "idle" && step !== "done") {
      timer.current = setInterval(() => setElapsed((e) => e + 100), 100);
    } else if (step === "done" && timer.current) {
      clearInterval(timer.current);
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [step]);

  /* ── automation sequence ── */
  const runDemo = () => {
    setStep("form");
    setElapsed(0);
    setShowNewRow(false);
    setCalendarPulse(false);
    setCalendarBooked(false);
    setEmailSending(false);
    setEmailSent(false);
    setSheetRows(EXISTING_LEADS);
    setTyping({ name: "", email: "", company: "" });

    // Step 1: simulate form typing
    const nameChars = "Alex Rivera".split("");
    const emailChars = "alex@newclient.com".split("");
    const companyChars = "NewClient Inc.".split("");

    let t = 0;
    nameChars.forEach((ch, i) => {
      setTimeout(
        () => setTyping((p) => ({ ...p, name: p.name + ch })),
        t + i * 70
      );
    });
    t += nameChars.length * 70 + 300;

    emailChars.forEach((ch, i) => {
      setTimeout(
        () => setTyping((p) => ({ ...p, email: p.email + ch })),
        t + i * 50
      );
    });
    t += emailChars.length * 50 + 300;

    companyChars.forEach((ch, i) => {
      setTimeout(
        () => setTyping((p) => ({ ...p, company: p.company + ch })),
        t + i * 60
      );
    });
    t += companyChars.length * 60 + 600;

    // Step 2: sheets
    setTimeout(() => {
      setStep("sheets");
      setTimeout(() => {
        setSheetRows([...EXISTING_LEADS, NEW_LEAD]);
        setShowNewRow(true);
      }, 800);
    }, t);

    // Step 3: calendar
    setTimeout(() => {
      setStep("calendar");
      setCalendarPulse(true);
      setTimeout(() => {
        setCalendarBooked(true);
        setCalendarPulse(false);
      }, 1500);
    }, t + 2500);

    // Step 4: email
    setTimeout(() => {
      setStep("email");
      setEmailSending(true);
      setTimeout(() => {
        setEmailSending(false);
        setEmailSent(true);
      }, 2000);
    }, t + 5500);

    // Done
    setTimeout(() => setStep("done"), t + 8500);
  };

  const reset = () => {
    setStep("idle");
    setElapsed(0);
    setTyping({ name: "", email: "", company: "" });
    setSheetRows(EXISTING_LEADS);
    setShowNewRow(false);
    setCalendarPulse(false);
    setCalendarBooked(false);
    setEmailSending(false);
    setEmailSent(false);
  };

  const stepIndex =
    step === "idle"
      ? -1
      : step === "form"
      ? 0
      : step === "sheets"
      ? 1
      : step === "calendar"
      ? 2
      : step === "email"
      ? 3
      : 4;

  return (
    <section className="relative min-h-screen pt-28 pb-20 overflow-hidden">
      {/* bg glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-brand-500/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* ── Header ── */}
        <div className="text-center mb-12">
          <span className="section-label">Live Demo</span>
          <h1 className="section-title mt-3">
            Watch AI Automation{" "}
            <span className="gradient-text">In Action</span>
          </h1>
          <p className="section-subtitle mt-4 max-w-2xl mx-auto">
            See exactly how a new lead gets captured, qualified, booked into
            your calendar, and sent a confirmation email — all in seconds,
            with zero manual work.
          </p>
        </div>

        {/* ── Progress bar ── */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10 flex-wrap">
          {[
            { icon: Bot, label: "Lead Form" },
            { icon: Table, label: "Google Sheets" },
            { icon: Calendar, label: "Calendar" },
            { icon: Mail, label: "Email" },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-2 sm:gap-4">
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-500 ${
                  stepIndex >= i
                    ? "border-brand-500 bg-brand-500/10 text-brand-400"
                    : "border-[var(--border)] text-[var(--muted)]"
                }`}
              >
                {stepIndex > i ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <s.icon className="w-5 h-5" />
                )}
                <span className="text-sm font-medium hidden sm:inline">
                  {s.label}
                </span>
              </div>
              {i < 3 && (
                <ArrowRight
                  className={`w-4 h-4 transition-colors duration-500 ${
                    stepIndex > i ? "text-green-400" : "text-[var(--muted)]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* ── Timer + start ── */}
        <div className="flex justify-center gap-4 mb-10">
          {step === "idle" ? (
            <button onClick={runDemo} className="btn-primary flex items-center gap-2">
              <Play className="w-5 h-5" /> Start Live Demo
            </button>
          ) : step === "done" ? (
            <button onClick={reset} className="btn-secondary flex items-center gap-2">
              <RotateCcw className="w-5 h-5" /> Run Again
            </button>
          ) : (
            <div className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium text-[var(--text)]">
                Running...
              </span>
              <span className="font-mono text-brand-400 text-sm">
                {(elapsed / 1000).toFixed(1)}s
              </span>
            </div>
          )}
        </div>

        {step === "done" && (
          <div className="text-center mb-10 animate-fade-in">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-green-500/10 border border-green-500/30">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span className="text-green-400 font-semibold text-lg">
                Complete in {(elapsed / 1000).toFixed(1)} seconds
              </span>
              <Zap className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
        )}

        {/* ── Demo panels ── */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* LEFT: Lead Form */}
          <DemoCard
            title="Lead Capture Form"
            icon={<Bot className="w-5 h-5" />}
            active={step === "form"}
            done={stepIndex > 0}
          >
            <div className="space-y-4">
              <FormField label="Full Name" value={typing.name} active={step === "form" && typing.name.length < 11} />
              <FormField label="Email" value={typing.email} active={step === "form" && typing.name.length >= 11 && typing.email.length < 18} />
              <FormField label="Company" value={typing.company} active={step === "form" && typing.email.length >= 18 && typing.company.length < 14} />
              <div
                className={`mt-4 w-full py-3 rounded-lg text-center font-medium text-sm transition-all duration-300 ${
                  stepIndex > 0
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-brand-500/20 text-brand-300 border border-brand-500/30"
                }`}
              >
                {stepIndex > 0 ? "✓ Submitted" : "Submit Request"}
              </div>
            </div>
          </DemoCard>

          {/* RIGHT: Google Sheets */}
          <DemoCard
            title="Google Sheets — Lead Database"
            icon={<Table className="w-5 h-5" />}
            active={step === "sheets"}
            done={stepIndex > 1}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="text-left text-[var(--muted)] border-b border-[var(--border)]">
                    <th className="pb-2 pr-3">Name</th>
                    <th className="pb-2 pr-3 hidden sm:table-cell">Email</th>
                    <th className="pb-2 pr-3">Company</th>
                    <th className="pb-2 pr-3">Status</th>
                    <th className="pb-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {sheetRows.map((row, i) => (
                    <tr
                      key={i}
                      className={`border-b border-[var(--border)]/50 transition-all duration-500 ${
                        i === sheetRows.length - 1 && showNewRow
                          ? "bg-brand-500/10 animate-fade-in"
                          : ""
                      }`}
                    >
                      <td className="py-2.5 pr-3 font-medium text-[var(--text)]">
                        {row.name}
                      </td>
                      <td className="py-2.5 pr-3 text-[var(--muted)] hidden sm:table-cell">
                        {row.email}
                      </td>
                      <td className="py-2.5 pr-3 text-[var(--muted)]">
                        {row.company}
                      </td>
                      <td className="py-2.5 pr-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            row.status === "New Lead"
                              ? "bg-cyan-500/20 text-cyan-300"
                              : row.status === "Qualified"
                              ? "bg-green-500/20 text-green-300"
                              : row.status === "Meeting Set"
                              ? "bg-brand-500/20 text-brand-300"
                              : "bg-yellow-500/20 text-yellow-300"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="py-2.5 text-[var(--muted)]">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DemoCard>

          {/* LEFT: Calendar */}
          <DemoCard
            title="Google Calendar — Auto-Booked"
            icon={<Calendar className="w-5 h-5" />}
            active={step === "calendar"}
            done={stepIndex > 2}
          >
            <div className="space-y-3">
              {/* Mini calendar grid */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs mb-4">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <span key={d} className="text-[var(--muted)] font-medium pb-1">
                    {d}
                  </span>
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <div
                    key={d}
                    className={`py-1.5 rounded-md transition-all duration-500 ${
                      d === 15 && calendarBooked
                        ? "bg-brand-500 text-white font-bold ring-2 ring-brand-400/50 animate-pulse"
                        : d === 15 && calendarPulse
                        ? "bg-brand-500/30 text-brand-300 animate-pulse"
                        : d === 10 || d === 22
                        ? "bg-brand-500/10 text-brand-300"
                        : "text-[var(--muted)]"
                    }`}
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Booked event */}
              {calendarBooked && (
                <div className="animate-fade-in p-4 rounded-xl bg-brand-500/10 border border-brand-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-semibold text-sm">
                      New Meeting Booked
                    </span>
                  </div>
                  <p className="text-[var(--text)] font-medium">
                    Discovery Call — Alex Rivera
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-[var(--muted)] text-sm">
                    <Clock className="w-3.5 h-3.5" />
                    March 15, 2026 • 2:00 PM – 2:30 PM
                  </div>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    📍 Zoom • Automatically scheduled by AI
                  </p>
                </div>
              )}

              {!calendarBooked && !calendarPulse && (
                <div className="p-4 rounded-xl border border-dashed border-[var(--border)] text-center text-[var(--muted)] text-sm">
                  Waiting for calendar event...
                </div>
              )}

              {calendarPulse && !calendarBooked && (
                <div className="p-4 rounded-xl bg-brand-500/5 border border-brand-500/20 text-center animate-pulse">
                  <span className="text-brand-400 text-sm font-medium">
                    Finding available time slot...
                  </span>
                </div>
              )}
            </div>
          </DemoCard>

          {/* RIGHT: Email */}
          <DemoCard
            title="Confirmation Email — Auto-Sent"
            icon={<Mail className="w-5 h-5" />}
            active={step === "email"}
            done={stepIndex > 3}
          >
            <div className="space-y-3">
              {emailSending && (
                <div className="flex items-center justify-center gap-3 py-8 animate-pulse">
                  <div className="w-8 h-8 border-2 border-brand-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-brand-400 font-medium">
                    Sending confirmation email...
                  </span>
                </div>
              )}

              {emailSent && (
                <div className="animate-fade-in">
                  {/* Email header */}
                  <div className="space-y-2 pb-3 border-b border-[var(--border)]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[var(--muted)]">From:</span>
                      <span className="text-xs text-[var(--text)]">
                        hello@accelyx.ai
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[var(--muted)]">To:</span>
                      <span className="text-xs text-[var(--text)]">
                        alex@newclient.com
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[var(--muted)]">Subject:</span>
                      <span className="text-xs text-[var(--text)] font-medium">
                        Your Discovery Call is Confirmed!
                      </span>
                    </div>
                  </div>

                  {/* Email body */}
                  <div className="mt-4 space-y-3 text-sm text-[var(--text)]">
                    <p>Hi Alex,</p>
                    <p>
                      Thanks for your interest in Accelyx AI! Your discovery
                      call has been confirmed:
                    </p>
                    <div className="p-3 rounded-lg bg-brand-500/10 border border-brand-500/20 text-sm">
                      <p className="font-semibold text-brand-400">
                        Discovery Call
                      </p>
                      <p className="text-[var(--muted)]">
                        📅 March 15, 2026 • 2:00 PM
                      </p>
                      <p className="text-[var(--muted)]">📍 Zoom (link below)</p>
                    </div>
                    <p className="text-[var(--muted)] text-xs">
                      We&apos;ll discuss how AI automation can save your team
                      40+ hours per month. Looking forward to it!
                    </p>
                    <p className="text-xs text-brand-400">— Accelyx AI Team</p>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-green-400 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    Delivered successfully
                  </div>
                </div>
              )}

              {!emailSending && !emailSent && (
                <div className="flex flex-col items-center justify-center py-8 text-[var(--muted)] gap-2">
                  <Mail className="w-8 h-8 opacity-30" />
                  <span className="text-sm">Waiting to send email...</span>
                </div>
              )}
            </div>
          </DemoCard>
        </div>

        {/* ── CTA ── */}
        <div className="text-center mt-16">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text)] mb-4">
            Want this for <span className="gradient-text">your business</span>?
          </h2>
          <p className="text-[var(--muted)] mb-6 max-w-lg mx-auto">
            We build custom automation workflows that capture leads, book
            meetings, and follow up — all on autopilot. No coding needed.
          </p>
          <a
            href="/#book"
            className="btn-primary inline-flex items-center gap-2"
          >
            Book Your Free Strategy Call
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────────────── sub-components ───────────────── */

function DemoCard({
  title,
  icon,
  active,
  done,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  active: boolean;
  done: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`card p-5 sm:p-6 transition-all duration-500 ${
        active
          ? "ring-2 ring-brand-500/50 shadow-lg shadow-brand-500/10"
          : done
          ? "ring-1 ring-green-500/30"
          : ""
      }`}
    >
      <div className="flex items-center gap-2 mb-4">
        <div
          className={`p-2 rounded-lg transition-colors duration-300 ${
            active
              ? "bg-brand-500/20 text-brand-400"
              : done
              ? "bg-green-500/20 text-green-400"
              : "bg-[var(--surface)] text-[var(--muted)]"
          }`}
        >
          {done ? <CheckCircle className="w-5 h-5" /> : icon}
        </div>
        <h3 className="font-semibold text-[var(--text)] text-sm sm:text-base">
          {title}
        </h3>
        {active && (
          <span className="ml-auto flex items-center gap-1.5 text-xs text-brand-400">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
            Active
          </span>
        )}
        {done && (
          <span className="ml-auto text-xs text-green-400 font-medium">
            Done
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function FormField({
  label,
  value,
  active,
}: {
  label: string;
  value: string;
  active: boolean;
}) {
  return (
    <div>
      <label className="block text-xs text-[var(--muted)] mb-1">{label}</label>
      <div
        className={`px-3 py-2.5 rounded-lg border text-sm transition-all duration-300 min-h-[40px] ${
          active
            ? "border-brand-500 bg-brand-500/5 text-[var(--text)]"
            : value
            ? "border-[var(--border)] text-[var(--text)]"
            : "border-[var(--border)] text-[var(--muted)]"
        }`}
      >
        {value || (
          <span className="opacity-40">
            {label === "Full Name"
              ? "Enter full name"
              : label === "Email"
              ? "Enter email address"
              : "Enter company name"}
          </span>
        )}
        {active && (
          <span className="inline-block w-0.5 h-4 bg-brand-400 animate-pulse ml-0.5 align-text-bottom" />
        )}
      </div>
    </div>
  );
}
