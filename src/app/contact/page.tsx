"use client";

import { useState } from "react";
import { Mail, Clock, MessageCircle, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Here you would send form data to your backend or email service
    setSubmitted(true);
  }

  return (
    <div className="bg-catch-black min-h-screen">
      {/* ─── HEADER ───────────────────────────────────────── */}
      <section className="section-padding pt-36 pb-16 border-b border-catch-mid">
        <p className="label-xs text-catch-muted mb-4">We&apos;re Here for You</p>
        <h1 className="heading-display text-6xl md:text-8xl leading-none">
          Contact
          <br />
          Us
        </h1>
      </section>

      <div className="section-padding py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* ── Left: Info ─────────────────────────────── */}
          <div>
            <p className="text-catch-muted text-sm leading-relaxed mb-12 max-w-md">
              Have a question about your order, sizing, or just want to talk about the
              brand? We&apos;re available 24/7 via live chat or drop us an email — we&apos;ll
              get back to you fast.
            </p>

            {/* Contact Cards */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-5 border border-catch-mid bg-catch-dark">
                <div className="w-10 h-10 bg-catch-gray flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={18} className="text-catch-white" />
                </div>
                <div>
                  <p className="text-catch-white text-sm font-medium mb-1">Live Chat</p>
                  <p className="text-catch-muted text-xs leading-relaxed">
                    Chat with us instantly using the button in the bottom right corner.
                    Available 24 hours a day, 7 days a week.
                  </p>
                  <p className="text-green-400 text-[11px] tracking-widest uppercase mt-2">
                    Online now
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 border border-catch-mid bg-catch-dark">
                <div className="w-10 h-10 bg-catch-gray flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-catch-white" />
                </div>
                <div>
                  <p className="text-catch-white text-sm font-medium mb-1">Email Us</p>
                  <p className="text-catch-muted text-xs leading-relaxed">
                    Send us a message using the form and we&apos;ll reply within a few hours.
                    For order issues, include your order number.
                  </p>
                  <p className="text-catch-light text-[11px] mt-2">
                    support@catchbrand.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 border border-catch-mid bg-catch-dark">
                <div className="w-10 h-10 bg-catch-gray flex items-center justify-center flex-shrink-0">
                  <Clock size={18} className="text-catch-white" />
                </div>
                <div>
                  <p className="text-catch-white text-sm font-medium mb-1">Response Time</p>
                  <p className="text-catch-muted text-xs leading-relaxed">
                    Live chat: instant · Email replies: under 2 hours during business hours,
                    or by next morning for late-night messages.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Links */}
            <div className="mt-10 border-t border-catch-mid pt-8">
              <p className="label-xs text-catch-white mb-4">Common Questions</p>
              <ul className="space-y-3">
                {[
                  "How do I track my order?",
                  "What is your return policy?",
                  "Do you ship internationally?",
                  "How do I find my size?",
                ].map((q) => (
                  <li key={q}>
                    <button className="text-catch-muted text-sm hover:text-catch-white transition-colors text-left">
                      → {q}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Right: Email Form ───────────────────────── */}
          <div>
            {submitted ? (
              /* Success State */
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <CheckCircle size={48} className="text-green-400 mb-6" />
                <h2 className="heading-display text-3xl mb-3">Message Sent</h2>
                <p className="text-catch-muted text-sm leading-relaxed max-w-xs">
                  Thanks for reaching out. We&apos;ll get back to you at{" "}
                  <span className="text-catch-white">{form.email}</span> within a few hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="btn-ghost mt-8"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="label-xs block mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full bg-catch-gray border border-catch-mid text-catch-white placeholder:text-catch-muted text-sm px-4 py-3 focus:outline-none focus:border-catch-muted transition-colors"
                  />
                </div>

                <div>
                  <label className="label-xs block mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full bg-catch-gray border border-catch-mid text-catch-white placeholder:text-catch-muted text-sm px-4 py-3 focus:outline-none focus:border-catch-muted transition-colors"
                  />
                </div>

                <div>
                  <label className="label-xs block mb-2">Subject</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-catch-gray border border-catch-mid text-catch-white text-sm px-4 py-3 focus:outline-none focus:border-catch-muted transition-colors cursor-pointer"
                  >
                    <option value="" className="bg-catch-dark text-catch-muted">
                      Select a topic
                    </option>
                    <option value="order" className="bg-catch-dark">Order / Tracking</option>
                    <option value="return" className="bg-catch-dark">Returns & Exchanges</option>
                    <option value="sizing" className="bg-catch-dark">Sizing Help</option>
                    <option value="product" className="bg-catch-dark">Product Question</option>
                    <option value="other" className="bg-catch-dark">Other</option>
                  </select>
                </div>

                <div>
                  <label className="label-xs block mb-2">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us how we can help..."
                    className="w-full bg-catch-gray border border-catch-mid text-catch-white placeholder:text-catch-muted text-sm px-4 py-3 focus:outline-none focus:border-catch-muted transition-colors resize-none"
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>

                <p className="text-catch-muted text-[11px] text-center">
                  We reply to every message · support@catchbrand.com
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
