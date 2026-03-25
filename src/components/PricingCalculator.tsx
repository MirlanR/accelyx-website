"use client";

import { useState, useMemo } from "react";
import { TrendingUp, Clock, DollarSign, Users, ArrowRight, Zap } from "lucide-react";

/* ── Slider Component ──────────────────────────────────────── */
function Slider({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
  hint?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-semibold" style={{ color: "var(--text)" }}>
          {label}
        </label>
        <span
          className="text-sm font-bold px-3 py-1 rounded-lg"
          style={{
            background: "rgba(99,102,241,0.12)",
            color: "var(--accent)",
            minWidth: 72,
            textAlign: "center",
          }}
        >
          {format(value)}
        </span>
      </div>
      {hint && (
        <p className="text-xs mb-2" style={{ color: "var(--muted)" }}>{hint}</p>
      )}
      <div className="relative h-5 flex items-center">
        {/* Track background */}
        <div
          className="absolute w-full h-1.5 rounded-full"
          style={{ background: "var(--border)" }}
        />
        {/* Track fill */}
        <div
          className="absolute h-1.5 rounded-full"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, #6366f1, #06b6d4)",
          }}
        />
        {/* Thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: 2 }}
        />
        <div
          className="absolute w-4 h-4 rounded-full border-2 border-white shadow-lg transition-transform hover:scale-125"
          style={{
            left: `calc(${pct}% - 8px)`,
            background: "linear-gradient(135deg, #6366f1, #06b6d4)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs" style={{ color: "var(--muted)" }}>{format(min)}</span>
        <span className="text-xs" style={{ color: "var(--muted)" }}>{format(max)}</span>
      </div>
    </div>
  );
}

/* ── Stat Card ─────────────────────────────────────────────── */
function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
  highlight,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  color: string;
  highlight?: boolean;
}) {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-1 transition-all duration-300"
      style={{
        background: highlight ? `${color}12` : "var(--card)",
        border: `1px solid ${highlight ? color : "var(--border)"}`,
        boxShadow: highlight ? `0 0 30px ${color}18` : "none",
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: `${color}18` }}
        >
          <Icon size={15} style={{ color }} />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>
          {label}
        </span>
      </div>
      <span
        className="text-2xl font-bold"
        style={{ fontFamily: "'Syne',sans-serif", color: highlight ? color : "var(--text)" }}
      >
        {value}
      </span>
      {sub && (
        <span className="text-xs" style={{ color: "var(--muted)" }}>{sub}</span>
      )}
    </div>
  );
}

/* ── Helpers ─────────────────────────────────────────────────*/
const fmt$ = (n: number) =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(1)}M`
    : n >= 1_000
    ? `$${(n / 1_000).toFixed(1)}K`
    : `$${n.toLocaleString()}`;

const fmtH = (n: number) =>
  n >= 1_000 ? `${(n / 1_000).toFixed(1)}K hrs` : `${n.toLocaleString()} hrs`;

/* ── Main Component ──────────────────────────────────────────*/
export default function PricingCalculator() {
  const [teamSize,       setTeamSize]       = useState(5);
  const [hoursPerWeek,   setHoursPerWeek]   = useState(20);
  const [hourlyRate,     setHourlyRate]     = useState(35);
  const [leadsPerMonth,  setLeadsPerMonth]  = useState(200);
  const [closeRate,      setCloseRate]      = useState(10);
  const [dealValue,      setDealValue]      = useState(1500);

  const AUTOMATION_EFFICIENCY = 0.80; // 80% of manual time eliminated
  const CONVERSION_LIFT       = 0.35; // 35% more leads converted with AI

  const calc = useMemo(() => {
    // ── Current state ─────────────────────────────────────
    const weeklyManualHours    = teamSize * hoursPerWeek;
    const monthlyManualHours   = weeklyManualHours * 4.33;
    const monthlyLaborCost     = monthlyManualHours * hourlyRate;
    const annualLaborCost      = monthlyLaborCost * 12;

    const currentDeals         = leadsPerMonth * (closeRate / 100);
    const currentRevenue       = currentDeals * dealValue;

    // ── After automation ──────────────────────────────────
    const savedHoursMonth      = monthlyManualHours * AUTOMATION_EFFICIENCY;
    const savedLaborMonth      = savedHoursMonth * hourlyRate;
    const savedLaborYear       = savedLaborMonth * 12;

    const newDeals             = leadsPerMonth * ((closeRate / 100) * (1 + CONVERSION_LIFT));
    const newRevenue           = newDeals * dealValue;
    const revenueGainMonth     = newRevenue - currentRevenue;
    const revenueGainYear      = revenueGainMonth * 12;

    const totalSavingsMonth    = savedLaborMonth + revenueGainMonth;
    const totalSavingsYear     = totalSavingsMonth * 12;

    // ── ROI based on Growth plan ($5,500) ─────────────────
    const investmentCost       = 5500;
    const paybackDays          = Math.round(investmentCost / (totalSavingsMonth / 30));
    const roiPct               = Math.round(((totalSavingsYear - investmentCost) / investmentCost) * 100);

    return {
      monthlyManualHours,
      annualLaborCost,
      savedHoursMonth,
      savedLaborYear,
      currentRevenue,
      revenueGainYear,
      totalSavingsMonth,
      totalSavingsYear,
      paybackDays,
      roiPct,
    };
  }, [teamSize, hoursPerWeek, hourlyRate, leadsPerMonth, closeRate, dealValue]);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: "var(--surface)" }}>
      {/* Glow */}
      <div className="glow-orb w-[500px] h-[500px] top-0 right-0" style={{ background: "#6366f1" }} />
      <div className="glow-orb w-[400px] h-[400px] bottom-0 left-0" style={{ background: "#06b6d4" }} />

      <div className="container-max relative z-10">
        {/* ── Header ─────────────────────────────── */}
        <div className="text-center mb-14">
          <span className="section-label mb-4 block">
            <span className="w-8 h-px inline-block align-middle mr-2" style={{ background: "var(--accent)" }} />
            ROI Calculator
            <span className="w-8 h-px inline-block align-middle ml-2" style={{ background: "var(--accent)" }} />
          </span>
          <h2 className="section-title mb-5">
            How Much Is Manual Work{" "}
            <span className="gradient-text">Costing You?</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Drag the sliders to match your business. See in real time exactly
            how much time and money AI automation puts back in your pocket.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* ── LEFT: Sliders ──────────────────────── */}
          <div
            className="rounded-2xl p-8"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <p
              className="text-base font-bold mb-6"
              style={{ fontFamily: "'Syne',sans-serif", color: "var(--text)" }}
            >
              Tell us about your business
            </p>

            <Slider
              label="Team members doing manual work"
              value={teamSize}
              min={1} max={50} step={1}
              format={(v) => `${v} people`}
              onChange={setTeamSize}
              hint="Employees spending time on repetitive tasks"
            />
            <Slider
              label="Manual hours per person per week"
              value={hoursPerWeek}
              min={2} max={40} step={1}
              format={(v) => `${v} hrs`}
              onChange={setHoursPerWeek}
              hint="Hours on tasks like data entry, follow-ups, reporting"
            />
            <Slider
              label="Average hourly cost per employee"
              value={hourlyRate}
              min={15} max={150} step={5}
              format={(v) => `$${v}/hr`}
              onChange={setHourlyRate}
              hint="Salary + benefits ÷ working hours"
            />

            <div className="h-px my-6" style={{ background: "var(--border)" }} />

            <p
              className="text-base font-bold mb-6"
              style={{ fontFamily: "'Syne',sans-serif", color: "var(--text)" }}
            >
              Your sales pipeline
            </p>

            <Slider
              label="Leads per month"
              value={leadsPerMonth}
              min={10} max={2000} step={10}
              format={(v) => `${v.toLocaleString()}`}
              onChange={setLeadsPerMonth}
            />
            <Slider
              label="Current close rate"
              value={closeRate}
              min={1} max={60} step={1}
              format={(v) => `${v}%`}
              onChange={setCloseRate}
              hint="% of leads that become paying clients"
            />
            <Slider
              label="Average deal / contract value"
              value={dealValue}
              min={100} max={50000} step={100}
              format={(v) => `$${v.toLocaleString()}`}
              onChange={setDealValue}
            />
          </div>

          {/* ── RIGHT: Results ─────────────────────── */}
          <div className="flex flex-col gap-5">
            {/* Hero number */}
            <div
              className="rounded-2xl p-8 text-center relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(6,182,212,0.1) 100%)",
                border: "1px solid rgba(99,102,241,0.35)",
              }}
            >
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(99,102,241,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.15) 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />
              <div className="relative z-10">
                <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--muted)" }}>
                  Your estimated annual savings
                </p>
                <div
                  className="text-6xl md:text-7xl font-bold gradient-text mb-3"
                  style={{ fontFamily: "'Syne',sans-serif", lineHeight: 1 }}
                >
                  {fmt$(calc.totalSavingsYear)}
                </div>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  {fmt$(calc.totalSavingsMonth)}/month after AI automation
                </p>
              </div>
            </div>

            {/* Stat grid */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                icon={Clock}
                label="Hours reclaimed/mo"
                value={fmtH(calc.savedHoursMonth)}
                sub={`From ${fmtH(calc.monthlyManualHours)} monthly`}
                color="#06b6d4"
              />
              <StatCard
                icon={DollarSign}
                label="Labor savings/yr"
                value={fmt$(calc.savedLaborYear)}
                sub="From automating manual tasks"
                color="#6366f1"
              />
              <StatCard
                icon={TrendingUp}
                label="Extra revenue/yr"
                value={fmt$(calc.revenueGainYear)}
                sub="From 35% higher close rate"
                color="#8b5cf6"
              />
              <StatCard
                icon={Users}
                label="ROI"
                value={`${calc.roiPct.toLocaleString()}%`}
                sub={`Payback in ${calc.paybackDays} days`}
                color="#06b6d4"
                highlight
              />
            </div>

            {/* Comparison bar */}
            <div
              className="rounded-2xl p-6"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <p className="text-sm font-bold mb-4" style={{ color: "var(--text)" }}>
                Before vs. After Automation
              </p>

              {[
                {
                  label: "Monthly revenue",
                  before: calc.currentRevenue,
                  after: calc.currentRevenue + (calc.revenueGainYear / 12),
                  color: "#6366f1",
                },
                {
                  label: "Labor cost/month",
                  before: calc.annualLaborCost / 12,
                  after: (calc.annualLaborCost / 12) - (calc.savedLaborYear / 12),
                  color: "#06b6d4",
                  inverse: true,
                },
              ].map(({ label, before, after, color, inverse }) => {
                const max = Math.max(before, after);
                const beforePct = max > 0 ? (before / max) * 100 : 0;
                const afterPct  = max > 0 ? (after  / max) * 100 : 0;
                const improved = inverse ? after < before : after > before;

                return (
                  <div key={label} className="mb-4 last:mb-0">
                    <div className="flex justify-between text-xs mb-2">
                      <span style={{ color: "var(--muted)" }}>{label}</span>
                      <span
                        className="font-bold"
                        style={{ color: improved ? "#22c55e" : "#ef4444" }}
                      >
                        {inverse ? "↓" : "↑"} {fmt$(Math.abs(after - before))}/mo
                      </span>
                    </div>
                    {/* Before bar */}
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs w-10 text-right flex-shrink-0" style={{ color: "var(--muted)" }}>Now</span>
                      <div className="flex-1 h-2 rounded-full" style={{ background: "var(--border)" }}>
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${beforePct}%`, background: "var(--border)", filter: "brightness(2)" }}
                        />
                      </div>
                      <span className="text-xs w-16 flex-shrink-0" style={{ color: "var(--muted)" }}>{fmt$(before)}</span>
                    </div>
                    {/* After bar */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs w-10 text-right flex-shrink-0" style={{ color: color }}>AI</span>
                      <div className="flex-1 h-2 rounded-full" style={{ background: "var(--border)" }}>
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${afterPct}%`, background: `linear-gradient(90deg, ${color}, #06b6d4)` }}
                        />
                      </div>
                      <span className="text-xs w-16 font-semibold flex-shrink-0" style={{ color }}>{fmt$(after)}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <button
              onClick={() => scrollTo("#contact")}
              className="btn-primary w-full py-4 text-base justify-center"
            >
              <Zap size={18} className="fill-white" />
              Get My Custom Automation Plan
              <ArrowRight size={18} />
            </button>
            <p className="text-xs text-center" style={{ color: "var(--muted)" }}>
              Free strategy call · No commitment · Results in 2–4 weeks
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
