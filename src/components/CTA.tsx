"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  Calendar, Clock, Mail, MapPin, Phone,
  ArrowRight, CheckCircle, XCircle, Zap, User, Building2, MessageSquare, Loader2
} from "lucide-react";

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM",  "2:00 PM",  "3:00 PM",  "4:00 PM",
  "5:00 PM",
];

const services = [
  "AI Chatbot / Voice Agent",
  "Workflow Automation",
  "Email & Outreach Automation",
  "CRM & Data Integration",
  "AI Document Processing",
  "Analytics & Reporting",
  "Not sure — need consultation",
];

const COMPANY_EMAIL = "hello@accelyx.ai";
const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbx_yf0gKQBZ8YszM_pGFIRY232fAkbotLF3OJvCfPiOXPnL9wbbT6F6nybtD8lkzU4bqw/exec";
const N8N_WEBHOOK_URL =
  "https://n8n.srv1299202.hstgr.cloud/webhook/lead-demo";
const AVAILABILITY_WEBHOOK_URL =
  "https://n8n.srv1299202.hstgr.cloud/webhook/check-availability";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  date: string;
  time: string;
  message: string;
}

const defaultForm: FormState = {
  firstName: "", lastName: "", email: "", phone: "",
  company: "", service: "", date: "", time: "", message: "",
};

export default function CTA() {
  const [form, setForm] = useState<FormState>(defaultForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  // Availability check state
  const [availability, setAvailability] = useState<"idle" | "checking" | "available" | "taken">("idle");
  const availabilityController = useRef<AbortController | null>(null);

  // Check availability when both date and time are selected
  useEffect(() => {
    if (!form.date || !form.time) {
      setAvailability("idle");
      return;
    }

    // Cancel any in-flight request
    if (availabilityController.current) {
      availabilityController.current.abort();
    }

    const controller = new AbortController();
    availabilityController.current = controller;

    setAvailability("checking");

    fetch(AVAILABILITY_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: form.date, time: form.time }),
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        if (!controller.signal.aborted) {
          setAvailability(data.available ? "available" : "taken");
        }
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          // If webhook fails, don't block the user — assume available
          console.warn("Availability check failed:", err);
          setAvailability("available");
        }
      });

    return () => controller.abort();
  }, [form.date, form.time]);

  // Demo mode: press Shift+D to auto-fill the form with typing animation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === "D") {
        const demoData: FormState = {
          firstName: "Sarah",
          lastName: "Johnson",
          email: "sarah@luxrealty.com",
          phone: "+17865551234",
          company: "Lux Realty Group",
          service: "AI Chatbot / Voice Agent",
          date: "2026-04-02",
          time: "10:00 AM",
          message: "We want to automate our lead follow-ups and appointment booking.",
        };
        const fields = Object.keys(demoData) as (keyof FormState)[];
        let delay = 0;
        fields.forEach((field) => {
          const value = demoData[field];
          for (let i = 0; i <= value.length; i++) {
            setTimeout(() => {
              setForm((prev) => ({ ...prev, [field]: value.slice(0, i) }));
            }, delay + i * 40);
          }
          delay += value.length * 40 + 300;
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = (): boolean => {
    const errs: Partial<FormState> = {};
    if (!form.firstName.trim()) errs.firstName = "Required";
    if (!form.lastName.trim())  errs.lastName  = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Valid email required";
    if (!form.service)      errs.service = "Please select a service";
    if (!form.date)         errs.date    = "Please pick a date";
    if (!form.time)         errs.time    = "Please pick a time";
    else if (availability === "taken") errs.time = "This slot is taken — please pick another time";
    else if (availability === "checking") errs.time = "Please wait — checking availability";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      // Send to n8n webhook (primary — triggers Sheet + Calendar + Email)
      const webhookPayload = {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        phone: form.phone,
        company: form.company || "Not provided",
        service: form.service,
        date: form.date,
        time: form.time,
        message: form.message,
      };

      const n8nPromise = fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        body: JSON.stringify(webhookPayload),
        headers: { "Content-Type": "application/json" },
      }).catch(() => null); // Don't block on n8n failure

      // Also send to Google Sheet as backup
      const sheetPromise = fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "text/plain" },
        mode: "no-cors",
      }).catch(() => null);

      await Promise.all([n8nPromise, sheetPromise]);
      setSubmitted(true);
      setForm(defaultForm);
    } catch {
      setSubmitError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  }, [form]);

  /* ── Min date = tomorrow ── */
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const inputBase: React.CSSProperties = {
    background: "var(--bg)",
    border: "1px solid var(--border)",
    color: "var(--text)",
    borderRadius: "0.75rem",
    padding: "0.75rem 1rem",
    fontSize: "0.875rem",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const inputErr: React.CSSProperties = {
    ...inputBase,
    borderColor: "#ef4444",
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden" style={{ scrollMarginTop: "80px" }}>
      {/* Background glows */}
      <div
        className="glow-orb w-[500px] h-[500px] -top-40 -right-40"
        style={{ background: "#6366f1" }}
      />
      <div
        className="glow-orb w-[400px] h-[400px] -bottom-40 -left-40"
        style={{ background: "#06b6d4" }}
      />

      <div className="container-max relative z-10">
        {/* ── Section Header ──────────────────────────── */}
        <div className="text-center mb-14">
          <span className="section-label mb-4 block">
            <span className="w-8 h-px inline-block align-middle mr-2" style={{ background: "var(--accent)" }} />
            Start Your Free Trial
            <span className="w-8 h-px inline-block align-middle ml-2" style={{ background: "var(--accent)" }} />
          </span>
          <h2 className="section-title mb-5">
            Try It Free for{" "}
            <span className="gradient-text">7 Days</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Get a custom AI automation built for your business — completely free for 7 days.
            No credit card required. No commitment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* ── LEFT: Contact Info ──────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Info card */}
            <div
              className="rounded-2xl p-8"
              style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(6,182,212,0.08) 100%)",
                border: "1px solid rgba(99,102,241,0.25)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "linear-gradient(135deg, #6366f1, #06b6d4)" }}
              >
                <Zap size={22} className="text-white fill-white" />
              </div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ fontFamily: "'Syne',sans-serif", color: "var(--text)" }}
              >
                Accelyx AI
              </h3>
              <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
                Free 30-minute strategy call. No sales pitch — just a clear
                roadmap of how automation can transform your business.
              </p>

              <div className="flex flex-col gap-4">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: COMPANY_EMAIL,
                    href: `mailto:${COMPANY_EMAIL}`,
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "Remote — serving clients worldwide",
                    href: null,
                  },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                    >
                      <Icon size={15} style={{ color: "var(--accent)" }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: "var(--muted)" }}>
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm font-medium transition-colors duration-200"
                          style={{ color: "var(--text)" }}
                          onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "var(--accent)"; }}
                          onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "var(--text)"; }}
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm" style={{ color: "var(--text)" }}>{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What to expect */}
            <div
              className="rounded-2xl p-6"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <p
                className="text-sm font-bold uppercase tracking-widest mb-4"
                style={{ color: "var(--text)" }}
              >
                What to Expect
              </p>
              {[
                { icon: Clock,        text: "7-day free trial — no credit card needed" },
                { icon: CheckCircle,  text: "Custom automation built for your workflow" },
                { icon: CheckCircle,  text: "Full support during your trial period" },
                { icon: CheckCircle,  text: "Zero pressure — cancel anytime" },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2.5 mb-3 last:mb-0">
                  <Icon size={15} style={{ color: "#06b6d4", flexShrink: 0 }} />
                  <span className="text-sm" style={{ color: "var(--muted)" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Booking Form ─────────────────────── */}
          <div
            className="lg:col-span-3 rounded-2xl p-8"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            {submitted ? (
              /* ── Success State ── */
              <div className="flex flex-col items-center justify-center text-center py-12 gap-5">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(99,102,241,0.15)", border: "2px solid var(--accent)" }}
                >
                  <CheckCircle size={36} style={{ color: "var(--accent)" }} />
                </div>
                <h3
                  className="text-2xl font-bold"
                  style={{ fontFamily: "'Syne',sans-serif", color: "var(--text)" }}
                >
                  Request Sent!
                </h3>
                <p style={{ color: "var(--muted)", maxWidth: 340 }}>
                  Your booking request is on its way. We'll confirm your call at{" "}
                  <strong style={{ color: "var(--text)" }}>{form.time}</strong> on{" "}
                  <strong style={{ color: "var(--text)" }}>{form.date}</strong> via email.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm(defaultForm); }}
                  className="btn-secondary px-6 py-3 text-sm mt-2"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              /* ── Form ── */
              <form onSubmit={handleSubmit} noValidate>
                <p
                  className="text-lg font-bold mb-6"
                  style={{ fontFamily: "'Syne',sans-serif", color: "var(--text)" }}
                >
                  Book Your Free Strategy Call
                </p>

                {/* Name row */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {(["firstName", "lastName"] as const).map((field) => (
                    <div key={field}>
                      <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--muted)" }}>
                        <User size={11} />
                        {field === "firstName" ? "First Name" : "Last Name"}
                        <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder={field === "firstName" ? "John" : "Doe"}
                        value={form[field]}
                        onChange={set(field)}
                        style={errors[field] ? inputErr : inputBase}
                        onFocus={(e) => { if (!errors[field]) e.target.style.borderColor = "var(--accent)"; }}
                        onBlur={(e)  => { if (!errors[field]) e.target.style.borderColor = "var(--border)"; }}
                      />
                      {errors[field] && (
                        <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors[field]}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--muted)" }}>
                    <Mail size={11} />
                    Business Email
                    <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={set("email")}
                    style={errors.email ? inputErr : inputBase}
                    onFocus={(e) => { if (!errors.email) e.target.style.borderColor = "var(--accent)"; }}
                    onBlur={(e)  => { if (!errors.email) e.target.style.borderColor = "var(--border)"; }}
                  />
                  {errors.email && (
                    <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="mb-4">
                  <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--muted)" }}>
                    <Phone size={11} />
                    Phone Number (optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="+17735647389"
                    value={form.phone}
                    maxLength={15}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9+]/g, "");
                      if (val.length <= 15) setForm((prev) => ({ ...prev, phone: val }));
                    }}
                    style={inputBase}
                    onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; }}
                    onBlur={(e)  => { e.target.style.borderColor = "var(--border)"; }}
                  />
                </div>

                {/* Company */}
                <div className="mb-4">
                  <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--muted)" }}>
                    <Building2 size={11} />
                    Company Name (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Your company"
                    value={form.company}
                    onChange={set("company")}
                    style={inputBase}
                    onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; }}
                    onBlur={(e)  => { e.target.style.borderColor = "var(--border)"; }}
                  />
                </div>

                {/* Service */}
                <div className="mb-4">
                  <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--muted)" }}>
                    <Zap size={11} />
                    I'm interested in
                    <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <select
                    value={form.service}
                    onChange={set("service")}
                    style={errors.service ? inputErr : inputBase}
                    onFocus={(e) => { if (!errors.service) e.target.style.borderColor = "var(--accent)"; }}
                    onBlur={(e)  => { if (!errors.service) e.target.style.borderColor = "var(--border)"; }}
                  >
                    <option value="" style={{ background: "var(--bg)" }}>Select a service...</option>
                    {services.map((s) => (
                      <option key={s} value={s} style={{ background: "var(--bg)" }}>{s}</option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.service}</p>
                  )}
                </div>

                {/* Date + Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {/* Date */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--muted)" }}>
                      <Calendar size={11} />
                      Preferred Date
                      <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type="date"
                      min={minDate}
                      value={form.date}
                      onChange={set("date")}
                      onClick={(e) => (e.target as HTMLInputElement).showPicker()}
                      style={{ ...errors.date ? inputErr : inputBase, cursor: "pointer" }}
                      onFocus={(e) => { if (!errors.date) e.target.style.borderColor = "var(--accent)"; }}
                      onBlur={(e)  => { if (!errors.date) e.target.style.borderColor = "var(--border)"; }}
                    />
                    {errors.date && (
                      <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.date}</p>
                    )}
                  </div>

                  {/* Time */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--muted)" }}>
                      <Clock size={11} />
                      Preferred Time (EST)
                      <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={form.time}
                        onChange={set("time")}
                        style={{
                          ...(errors.time ? inputErr : inputBase),
                          paddingRight: availability !== "idle" ? "2.5rem" : "1rem",
                        }}
                        onFocus={(e) => { if (!errors.time) e.target.style.borderColor = "var(--accent)"; }}
                        onBlur={(e)  => { if (!errors.time) e.target.style.borderColor = "var(--border)"; }}
                      >
                        <option value="" style={{ background: "var(--bg)" }}>Select time...</option>
                        {timeSlots.map((t) => (
                          <option key={t} value={t} style={{ background: "var(--bg)" }}>{t}</option>
                        ))}
                      </select>

                      {/* Availability indicator icon */}
                      {availability === "checking" && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <Loader2 size={18} className="animate-spin" style={{ color: "var(--accent)" }} />
                        </span>
                      )}
                      {availability === "available" && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <CheckCircle size={18} style={{ color: "#22c55e" }} />
                        </span>
                      )}
                      {availability === "taken" && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <XCircle size={18} style={{ color: "#ef4444" }} />
                        </span>
                      )}
                    </div>

                    {/* Availability status message */}
                    {availability === "available" && (
                      <p className="text-xs mt-1 flex items-center gap-1" style={{ color: "#22c55e" }}>
                        <CheckCircle size={12} /> This slot is available!
                      </p>
                    )}
                    {availability === "taken" && (
                      <p className="text-xs mt-1 flex items-center gap-1" style={{ color: "#ef4444" }}>
                        <XCircle size={12} /> This slot is taken — please pick another time.
                      </p>
                    )}
                    {availability === "checking" && (
                      <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                        Checking availability...
                      </p>
                    )}

                    {errors.time && (
                      <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.time}</p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--muted)" }}>
                    <MessageSquare size={11} />
                    What do you want to automate? (optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your current workflow or biggest pain point..."
                    value={form.message}
                    onChange={set("message")}
                    style={{ ...inputBase, resize: "none" }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; }}
                    onBlur={(e)  => { e.target.style.borderColor = "var(--border)"; }}
                  />
                </div>

                {/* Error message */}
                {submitError && (
                  <p className="text-sm text-center mb-4 p-3 rounded-lg" style={{ color: "#ef4444", background: "rgba(239,68,68,0.1)" }}>
                    {submitError}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full py-4 text-base justify-center"
                  style={{ opacity: submitting ? 0.7 : 1, cursor: submitting ? "not-allowed" : "pointer" }}
                >
                  {submitting ? (
                    <>Submitting...</>
                  ) : (
                    <>
                      <Calendar size={18} />
                      Confirm My Strategy Call
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                <p className="text-xs text-center mt-4" style={{ color: "var(--muted)" }}>
                  7-day free trial · No credit card · We'll confirm within 24 hours
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
