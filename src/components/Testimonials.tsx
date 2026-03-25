"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "CEO, Stratify Inc.",
    avatar: "SM",
    rating: 5,
    text: "Accelyx AI completely transformed how we handle leads. What used to take our team 3 hours daily is now fully automated. We've saved 60+ hours a month and our close rate went up 40%.",
    metric: "60 hrs/month saved",
    color: "#6366f1",
  },
  {
    name: "James Okafor",
    role: "Operations Director, PulseMedia",
    avatar: "JO",
    rating: 5,
    text: "I was skeptical at first, but the ROI was undeniable within 3 weeks. They built us a custom AI that processes 500+ documents per day — something that used to require 2 full-time staff.",
    metric: "2 FTEs replaced",
    color: "#06b6d4",
  },
  {
    name: "Elena Vasquez",
    role: "Founder, CoreBridge",
    avatar: "EV",
    rating: 5,
    text: "The team at Accelyx is exceptional. They understood our complex workflows and built automation that actually works in the real world. Our customer response time dropped from 6 hours to under 2 minutes.",
    metric: "6h → 2min response",
    color: "#8b5cf6",
  },
  {
    name: "Marcus Chen",
    role: "CTO, Orbit Labs",
    avatar: "MC",
    rating: 5,
    text: "We've tried other automation agencies before. Accelyx is different — they think like engineers, not just tool configurators. The systems they built are robust, scalable, and beautifully designed.",
    metric: "$180K revenue added",
    color: "#6366f1",
  },
  {
    name: "Priya Sharma",
    role: "Head of Growth, DataForge",
    avatar: "PS",
    rating: 5,
    text: "Our email outreach used to convert at 2%. After Accelyx built our AI-personalized sequences, we're at 11%. That's a 5x improvement in one month. Absolutely game-changing.",
    metric: "5× conversion rate",
    color: "#06b6d4",
  },
  {
    name: "Tom Bradley",
    role: "VP Sales, ZenithAI",
    avatar: "TB",
    rating: 5,
    text: "From day one, the Accelyx team was professional, fast, and genuinely invested in our success. The AI chatbot they built handles 80% of our support tickets automatically. Game over for manual work.",
    metric: "80% tickets resolved",
    color: "#8b5cf6",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--surface)" }}
    >
      <div
        className="glow-orb w-[400px] h-[400px] top-0 right-0"
        style={{ background: "#8b5cf6" }}
      />

      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <span className="section-label mb-4 block">
            <span className="w-8 h-px inline-block align-middle mr-2" style={{ background: "var(--accent)" }} />
            Client Stories
            <span className="w-8 h-px inline-block align-middle ml-2" style={{ background: "var(--accent)" }} />
          </span>
          <h2 className="section-title mb-5">
            Don't Take Our{" "}
            <span className="gradient-text">Word for It</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Here's what founders, operators, and executives say after working with Accelyx AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="card flex flex-col gap-4 group">
              {/* Quote icon */}
              <Quote
                size={28}
                style={{ color: t.color, opacity: 0.4 }}
                className="flex-shrink-0"
              />

              {/* Stars */}
              <StarRating count={t.rating} />

              {/* Text */}
              <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--muted)" }}>
                "{t.text}"
              </p>

              {/* Metric pill */}
              <div
                className="inline-flex self-start items-center px-3 py-1.5 rounded-full text-xs font-bold"
                style={{
                  background: `${t.color}15`,
                  color: t.color,
                  border: `1px solid ${t.color}30`,
                }}
              >
                ↑ {t.metric}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-1 border-t" style={{ borderColor: "var(--border)" }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${t.color}, #06b6d4)` }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
