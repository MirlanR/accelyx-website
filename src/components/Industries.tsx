"use client";

import { useState } from "react";
import {
  Building2, Sun, HeartPulse, Headphones, CreditCard,
  Brain, Home, ShoppingCart, GraduationCap, Briefcase,
  ChevronDown, ArrowRight, CheckCircle, Key, PawPrint,
  HardHat, UtensilsCrossed, TreePine, Smile, Smartphone,
  Store, Car, Scissors, Flower2, Bug, Wind, Wrench,
  Hammer, Activity
} from "lucide-react";

const industries = [
  {
    icon: Building2,
    name: "Real Estate",
    color: "#6366f1",
    description: "Automate lead capture, follow-ups, and appointment booking. Never miss a hot lead again.",
    useCases: ["Lead qualification chatbot", "Auto follow-up sequences", "CRM auto-sync", "Appointment scheduling"],
  },
  {
    icon: Sun,
    name: "Solar & Energy",
    color: "#f59e0b",
    description: "Streamline proposals, site assessments, and customer communication with AI-powered workflows.",
    useCases: ["Proposal generation", "Customer onboarding", "Service ticket routing", "Energy report automation"],
  },
  {
    icon: HeartPulse,
    name: "Healthcare",
    color: "#ef4444",
    description: "Automate patient intake, appointment reminders, and document processing while staying compliant.",
    useCases: ["Patient intake forms", "Appointment reminders", "Insurance verification", "Document processing"],
  },
  {
    icon: Headphones,
    name: "Tech & SaaS",
    color: "#06b6d4",
    description: "Scale customer support, onboarding, and internal ops without scaling headcount.",
    useCases: ["AI support chatbot", "User onboarding flows", "Ticket triage & routing", "Usage analytics reports"],
  },
  {
    icon: CreditCard,
    name: "Financial Services",
    color: "#10b981",
    description: "Automate client onboarding, compliance checks, and reporting with secure AI workflows.",
    useCases: ["KYC automation", "Client onboarding", "Compliance monitoring", "Automated reporting"],
  },
  {
    icon: ShoppingCart,
    name: "E-Commerce",
    color: "#8b5cf6",
    description: "Boost conversions with AI-driven customer engagement, inventory alerts, and personalized outreach.",
    useCases: ["Abandoned cart recovery", "AI product recommendations", "Inventory alerts", "Customer segmentation"],
  },
  {
    icon: GraduationCap,
    name: "Education",
    color: "#3b82f6",
    description: "Automate enrollment, student support, and administrative workflows across your institution.",
    useCases: ["Enrollment automation", "AI student support", "Grading workflows", "Communication sequences"],
  },
  {
    icon: Briefcase,
    name: "Agencies & Consultants",
    color: "#ec4899",
    description: "Automate client delivery, reporting, and prospecting so you can focus on strategy.",
    useCases: ["Client reporting", "Lead generation", "Project management automation", "Invoice & billing"],
  },
  {
    icon: Key,
    name: "Locksmiths",
    color: "#a855f7",
    description: "Automate dispatch, customer booking, and follow-ups so you never miss an emergency call.",
    useCases: ["24/7 AI booking agent", "Auto dispatch notifications", "Customer follow-ups", "Review requests"],
  },
  {
    icon: PawPrint,
    name: "Veterinary",
    color: "#f97316",
    description: "Streamline appointment scheduling, reminders, and pet owner communication.",
    useCases: ["Appointment booking", "Vaccination reminders", "Pet owner follow-ups", "Intake form automation"],
  },
  {
    icon: HardHat,
    name: "Roofing",
    color: "#64748b",
    description: "Capture leads from every channel and automate estimates, follow-ups, and scheduling.",
    useCases: ["Lead capture automation", "Estimate follow-ups", "Job scheduling", "Review collection"],
  },
  {
    icon: UtensilsCrossed,
    name: "Restaurants",
    color: "#dc2626",
    description: "Automate reservations, customer feedback, and marketing campaigns to fill more seats.",
    useCases: ["Reservation management", "Customer feedback automation", "Loyalty campaigns", "Menu update alerts"],
  },
  {
    icon: TreePine,
    name: "Landscaping",
    color: "#16a34a",
    description: "Automate quote requests, seasonal reminders, and crew scheduling.",
    useCases: ["Quote request automation", "Seasonal service reminders", "Crew scheduling", "Invoice automation"],
  },
  {
    icon: Smile,
    name: "Dentists",
    color: "#0ea5e9",
    description: "Reduce no-shows and automate patient intake, reminders, and recall campaigns.",
    useCases: ["Appointment reminders", "Patient intake forms", "Recall campaigns", "Insurance verification"],
  },
  {
    icon: Smartphone,
    name: "Electronics Repair",
    color: "#6366f1",
    description: "Track repairs, notify customers automatically, and manage inventory with AI.",
    useCases: ["Repair status updates", "Customer notifications", "Inventory tracking", "Quote automation"],
  },
  {
    icon: Store,
    name: "Franchises",
    color: "#0891b2",
    description: "Standardize operations across locations with automated reporting and communication.",
    useCases: ["Multi-location reporting", "Franchisee onboarding", "Brand compliance checks", "Performance dashboards"],
  },
  {
    icon: Car,
    name: "Automotive",
    color: "#1e40af",
    description: "Automate service reminders, lead follow-ups, and customer communication for your dealership or shop.",
    useCases: ["Service reminders", "Lead follow-ups", "Appointment booking", "Customer satisfaction surveys"],
  },
  {
    icon: Scissors,
    name: "Salons",
    color: "#e879f9",
    description: "Fill your chairs with automated booking, reminders, and rebooking campaigns.",
    useCases: ["Online booking automation", "No-show reminders", "Rebooking campaigns", "Loyalty rewards"],
  },
  {
    icon: Flower2,
    name: "Funeral Homes",
    color: "#78716c",
    description: "Handle sensitive communications with care — automate scheduling, forms, and follow-ups.",
    useCases: ["Arrangement scheduling", "Document processing", "Family follow-ups", "Service coordination"],
  },
  {
    icon: Bug,
    name: "Pest Control",
    color: "#84cc16",
    description: "Automate seasonal campaigns, service scheduling, and customer retention.",
    useCases: ["Seasonal campaigns", "Service scheduling", "Customer retention", "Route optimization"],
  },
  {
    icon: Wind,
    name: "HVAC",
    color: "#38bdf8",
    description: "Never miss a service call — automate dispatch, maintenance reminders, and invoicing.",
    useCases: ["Dispatch automation", "Maintenance reminders", "Invoice generation", "Emergency call routing"],
  },
  {
    icon: Wrench,
    name: "Plumbing",
    color: "#2563eb",
    description: "Automate emergency dispatch, estimates, and follow-ups to grow your plumbing business.",
    useCases: ["Emergency dispatch", "Estimate automation", "Customer follow-ups", "Review requests"],
  },
  {
    icon: Hammer,
    name: "Construction",
    color: "#d97706",
    description: "Streamline project management, subcontractor communication, and client updates.",
    useCases: ["Project status updates", "Subcontractor coordination", "Client reporting", "Document management"],
  },
  {
    icon: Activity,
    name: "Chiropractor",
    color: "#14b8a6",
    description: "Automate patient scheduling, intake forms, and treatment plan follow-ups.",
    useCases: ["Patient scheduling", "Intake form automation", "Treatment reminders", "Recall campaigns"],
  },
];

export default function Industries() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);
  const visibleIndustries = showAll ? industries : industries.slice(0, 8);

  return (
    <section id="industries" className="section-padding relative overflow-hidden">
      <div
        className="glow-orb w-[400px] h-[400px] -top-40 -right-40"
        style={{ background: "#6366f1" }}
      />
      <div
        className="glow-orb w-[300px] h-[300px] bottom-0 -left-40"
        style={{ background: "#06b6d4" }}
      />

      <div className="container-max relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label mb-4 block">
            <span className="w-8 h-px inline-block align-middle mr-2" style={{ background: "var(--accent)" }} />
            Who We Help
            <span className="w-8 h-px inline-block align-middle ml-2" style={{ background: "var(--accent)" }} />
          </span>
          <h2 className="section-title mb-5">
            AI Automation for{" "}
            <span className="gradient-text">Every Industry</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            We build custom automation solutions tailored to your industry. No matter your niche,
            we'll find the workflows that save you the most time and money.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {visibleIndustries.map((ind, i) => {
            const Icon = ind.icon;
            const isOpen = openIndex === i;

            return (
              <button
                key={ind.name}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full text-left rounded-2xl p-6 transition-all duration-300"
                style={{
                  background: isOpen
                    ? `linear-gradient(135deg, ${ind.color}15 0%, ${ind.color}08 100%)`
                    : "var(--card)",
                  border: isOpen
                    ? `1px solid ${ind.color}40`
                    : "1px solid var(--border)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${ind.color}18` }}
                    >
                      <Icon size={20} style={{ color: ind.color }} />
                    </div>
                    <span
                      className="text-lg font-bold"
                      style={{ fontFamily: "'Syne',sans-serif", color: "var(--text)" }}
                    >
                      {ind.name}
                    </span>
                  </div>
                  <ChevronDown
                    size={20}
                    className="transition-transform duration-300 flex-shrink-0"
                    style={{
                      color: "var(--muted)",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </div>

                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: isOpen ? "300px" : "0", opacity: isOpen ? 1 : 0 }}
                >
                  <p className="text-sm mt-4 mb-4" style={{ color: "var(--muted)" }}>
                    {ind.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {ind.useCases.map((uc) => (
                      <div key={uc} className="flex items-center gap-2">
                        <CheckCircle size={14} style={{ color: ind.color, flexShrink: 0 }} />
                        <span className="text-sm" style={{ color: "var(--muted)" }}>{uc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Show More / Show Less */}
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="btn-secondary px-6 py-3 text-sm"
          >
            {showAll ? "Show Less" : `Show All ${industries.length} Industries`}
            <ChevronDown
              size={16}
              className="transition-transform duration-300"
              style={{ transform: showAll ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <p className="text-sm mb-5" style={{ color: "var(--muted)" }}>
            Don't see your industry? We work with businesses of all types.
          </p>
          <button
            onClick={() => {
              const el = document.querySelector("#contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-primary px-8 py-4 text-base"
          >
            Start Your 7-Day Free Trial
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
