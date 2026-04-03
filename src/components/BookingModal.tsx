"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  X, Calendar, Clock, Mail, Phone,
  CheckCircle, Zap, User, Building2, MessageSquare, Loader2
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

const N8N_WEBHOOK_URL    = "https://n8n.srv1299202.hstgr.cloud/webhook/lead-demo";
const AVAILABILITY_WEBHOOK_URL = "https://n8n.srv1299202.hstgr.cloud/webhook/check-availability";

interface FormState {
  firstName: string; lastName: string; email: string; phone: string;
  company: string; service: string; date: string; time: string; message: string;
}
const defaultForm: FormState = {
  firstName: "", lastName: "", email: "", phone: "",
  company: "", service: "", date: "", time: "", message: "",
};

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [form, setForm]           = useState<FormState>(defaultForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors]       = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [availability, setAvailability] = useState<"idle"|"checking"|"available"|"taken">("idle");
  const availabilityController = useRef<AbortController | null>(null);

  /* ── Lock body scroll when open ── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* ── Close on Escape ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  /* ── Availability check ── */
  useEffect(() => {
    if (!form.date || !form.time) { setAvailability("idle"); return; }
    if (availabilityController.current) availabilityController.current.abort();
    const controller = new AbortController();
    availabilityController.current = controller;
    setAvailability("checking");
    fetch(AVAILABILITY_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: form.date, time: form.time }),
      signal: controller.signal,
    })
      .then(r => r.json())
      .then(d => { if (!controller.signal.aborted) setAvailability(d.available ? "available" : "taken"); })
      .catch(err => { if (!controller.signal.aborted) setAvailability("available"); });
    return () => controller.abort();
  }, [form.date, form.time]);

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
    };

  const validate = (): boolean => {
    const errs: Partial<FormState> = {};
    if (!form.firstName.trim()) errs.firstName = "Required";
    if (!form.lastName.trim())  errs.lastName  = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email required";
    if (!form.service) errs.service = "Please select a service";
    if (!form.date)    errs.date    = "Please pick a date";
    if (!form.time)    errs.time    = "Please pick a time";
    else if (availability === "checking") errs.time = "Please wait — checking availability";
    else if (availability === "taken")    errs.time = "hidden";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`,
          email: form.email, phone: form.phone,
          company: form.company || "Not provided",
          service: form.service, date: form.date,
          time: form.time, message: form.message,
        }),
      }).catch(() => null);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }, [form, availability]);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const inputBase: React.CSSProperties = {
    background: "var(--bg)", border: "1px solid var(--border)",
    color: "var(--text)", borderRadius: "0.75rem",
    padding: "0.75rem 1rem", fontSize: "0.875rem",
    width: "100%", outline: "none", transition: "border-color 0.2s",
  };
  const inputErr: React.CSSProperties = { ...inputBase, borderColor: "#ef4444" };

  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleReset = () => { setSubmitted(false); setForm(defaultForm); setErrors({}); };
  const handleClose = () => { onClose(); setTimeout(handleReset, 300); };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-8"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
          style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--muted)" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}
        >
          <X size={18} />
        </button>

        {submitted ? (
          /* ── Success ── */
          <div className="flex flex-col items-center justify-center text-center py-10 gap-5">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: "rgba(99,102,241,0.15)", border: "2px solid var(--accent)" }}
            >
              <CheckCircle size={36} style={{ color: "var(--accent)" }} />
            </div>
            <h3 className="text-2xl font-bold" style={{ fontFamily: "'Syne',sans-serif", color: "var(--text)" }}>
              Request Sent!
            </h3>
            <p style={{ color: "var(--muted)", maxWidth: 340 }}>
              Your booking request is on its way. We&apos;ll confirm your call at{" "}
              <strong style={{ color: "var(--text)" }}>{form.time}</strong> on{" "}
              <strong style={{ color: "var(--text)" }}>{form.date}</strong> via email.
            </p>
            <div className="flex gap-3 mt-2">
              <button onClick={handleReset} className="btn-secondary px-5 py-2.5 text-sm">Submit another</button>
              <button onClick={handleClose} className="btn-primary px-5 py-2.5 text-sm">Close</button>
            </div>
          </div>
        ) : (
          /* ── Form ── */
          <form onSubmit={handleSubmit} noValidate>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 pr-10">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #6366f1, #06b6d4)" }}
              >
                <Zap size={18} className="text-white fill-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold" style={{ fontFamily: "'Syne',sans-serif", color: "var(--text)" }}>
                  Book Your Free Strategy Call
                </h2>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  Free 30-min call · No sales pitch · Confirm right away
                </p>
              </div>
            </div>

            {/* Name row */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {(["firstName", "lastName"] as const).map((field) => (
                <div key={field}>
                  <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--muted)" }}>
                    <User size={11} />{field === "firstName" ? "First Name" : "Last Name"}<span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder={field === "firstName" ? "John" : "Doe"}
                    value={form[field]} onChange={set(field)}
                    style={errors[field] ? inputErr : inputBase}
                    onFocus={e => { if (!errors[field]) e.target.style.borderColor = "var(--accent)"; }}
                    onBlur={e  => { if (!errors[field]) e.target.style.borderColor = "var(--border)"; }}
                  />
                  {errors[field] && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors[field]}</p>}
                </div>
              ))}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--muted)" }}>
                <Mail size={11} />Business Email<span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input type="email" placeholder="you@company.com" value={form.email} onChange={set("email")}
                style={errors.email ? inputErr : inputBase}
                onFocus={e => { if (!errors.email) e.target.style.borderColor = "var(--accent)"; }}
                onBlur={e  => { if (!errors.email) e.target.style.borderColor = "var(--border)"; }}
              />
              {errors.email && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.email}</p>}
            </div>

            {/* Phone + Company */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--muted)" }}>
                  <Phone size={11} />Phone (optional)
                </label>
                <input type="tel" placeholder="+1 555 000 0000" value={form.phone} onChange={set("phone")}
                  style={inputBase}
                  onFocus={e => { e.target.style.borderColor = "var(--accent)"; }}
                  onBlur={e  => { e.target.style.borderColor = "var(--border)"; }}
                />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--muted)" }}>
                  <Building2 size={11} />Company (optional)
                </label>
                <input type="text" placeholder="Your company" value={form.company} onChange={set("company")}
                  style={inputBase}
                  onFocus={e => { e.target.style.borderColor = "var(--accent)"; }}
                  onBlur={e  => { e.target.style.borderColor = "var(--border)"; }}
                />
              </div>
            </div>

            {/* Service */}
            <div className="mb-4">
              <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--muted)" }}>
                <Zap size={11} />I&apos;m interested in<span style={{ color: "#ef4444" }}>*</span>
              </label>
              <select value={form.service} onChange={set("service")}
                style={errors.service ? { ...inputErr, appearance: "none" } : { ...inputBase, appearance: "none" }}
                onFocus={e => { if (!errors.service) e.target.style.borderColor = "var(--accent)"; }}
                onBlur={e  => { if (!errors.service) e.target.style.borderColor = "var(--border)"; }}
              >
                <option value="">Select a service...</option>
                {services.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.service && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.service}</p>}
            </div>

            {/* Date + Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--muted)" }}>
                  <Calendar size={11} />Preferred Date<span style={{ color: "#ef4444" }}>*</span>
                </label>
                {/* Wrapper makes the entire field clickable and opens native picker */}
                <div
                  style={{ position: "relative", cursor: "pointer" }}
                  onClick={() => { try { dateInputRef.current?.showPicker(); } catch { dateInputRef.current?.focus(); } }}
                >
                  <input
                    ref={dateInputRef}
                    type="date"
                    min={minDate}
                    value={form.date}
                    onChange={set("date")}
                    style={{
                      ...(errors.date ? inputErr : inputBase),
                      cursor: "pointer",
                      colorScheme: "dark",
                      boxSizing: "border-box",
                      /* Prevent the year segment from overflowing */
                      minWidth: 0,
                    }}
                    onFocus={e => { if (!errors.date) e.target.style.borderColor = "var(--accent)"; }}
                    onBlur={e  => { if (!errors.date) e.target.style.borderColor = "var(--border)"; }}
                  />
                </div>
                {errors.date && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.date}</p>}
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--muted)" }}>
                  <Clock size={11} />Time (EST)<span style={{ color: "#ef4444" }}>*</span>
                </label>
                <select value={form.time} onChange={set("time")}
                  style={errors.time && errors.time !== "hidden" ? { ...inputErr, appearance: "none" } : { ...inputBase, appearance: "none" }}
                  onFocus={e => { e.target.style.borderColor = "var(--accent)"; }}
                  onBlur={e  => { e.target.style.borderColor = "var(--border)"; }}
                >
                  <option value="">Select time...</option>
                  {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                {/* Availability status */}
                {availability === "checking" && (
                  <p className="text-xs mt-1 flex items-center gap-1" style={{ color: "var(--muted)" }}>
                    <Loader2 size={10} className="animate-spin" /> Checking availability...
                  </p>
                )}
                {availability === "available" && form.time && (
                  <p className="text-xs mt-1 flex items-center gap-1" style={{ color: "#22c55e" }}>
                    <CheckCircle size={10} /> Available
                  </p>
                )}
                {availability === "taken" && (
                  <p className="text-xs mt-1" style={{ color: "#ef4444" }}>
                    This slot is taken — please pick another time.
                  </p>
                )}
                {errors.time && errors.time !== "hidden" && (
                  <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.time}</p>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="mb-6">
              <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--muted)" }}>
                <MessageSquare size={11} />What do you want to automate? (optional)
              </label>
              <textarea rows={3} placeholder="Describe your current workflow or biggest pain point..."
                value={form.message} onChange={set("message")}
                style={{ ...inputBase, resize: "none" }}
                onFocus={e => { e.target.style.borderColor = "var(--accent)"; }}
                onBlur={e  => { e.target.style.borderColor = "var(--border)"; }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit" disabled={submitting || availability === "taken"}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 text-base font-semibold"
              style={{ opacity: submitting || availability === "taken" ? 0.6 : 1 }}
            >
              {submitting ? (
                <><Loader2 size={18} className="animate-spin" /> Sending...</>
              ) : (
                <><Zap size={18} className="fill-white" /> Confirm My Strategy Call</>
              )}
            </button>
            <p className="text-center text-xs mt-3" style={{ color: "var(--muted)" }}>
              7-day free trial · No credit card · We&apos;ll confirm right away
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
