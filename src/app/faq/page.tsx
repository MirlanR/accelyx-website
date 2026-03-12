"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQSection = {
  category: string;
  items: FAQItem[];
};

const faqData: FAQSection[] = [
  {
    category: "Orders & Shipping",
    items: [
      {
        question: "How long does shipping take?",
        answer:
          "Standard shipping takes 3–5 business days within the US. Express shipping (1–2 business days) is available at checkout. International orders typically arrive within 7–14 business days depending on location.",
      },
      {
        question: "Do you offer free shipping?",
        answer:
          "Yes — we offer free standard shipping on all orders over $200. Orders under $200 have a flat shipping rate of $9.99.",
      },
      {
        question: "Can I track my order?",
        answer:
          "Absolutely. Once your order ships, you'll receive a confirmation email with a tracking link. You can also contact our support team with your order number and we'll check it for you right away.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes, CATCH ships worldwide. International shipping rates and delivery times are calculated at checkout based on your location. Import duties and taxes may apply and are the responsibility of the customer.",
      },
      {
        question: "Can I change or cancel my order?",
        answer:
          "Orders can be changed or cancelled within 1 hour of being placed. After that, the order enters fulfilment and we're unable to make changes. Contact us immediately at support@catchbrand.com if you need to amend an order.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    items: [
      {
        question: "What is your return policy?",
        answer:
          "We accept returns within 30 days of the delivery date. Items must be unworn, unwashed, and in their original packaging with tags attached. Sale items are final sale and cannot be returned.",
      },
      {
        question: "How do I start a return?",
        answer:
          "Email returns@catchbrand.com with your order number and reason for return. Our team will send you a prepaid return label within 24 hours. Once we receive and inspect the item, your refund will be processed within 3–5 business days.",
      },
      {
        question: "Can I exchange for a different size?",
        answer:
          "Yes. We offer free size exchanges on all full-price items. Start the process by emailing returns@catchbrand.com with your order number and the size you'd like. Subject to availability.",
      },
      {
        question: "How long does a refund take?",
        answer:
          "Once your return is received and approved, refunds are processed within 3–5 business days. The time it takes to appear in your account depends on your bank — typically 5–10 business days.",
      },
    ],
  },
  {
    category: "Sizing & Fit",
    items: [
      {
        question: "How do CATCH pieces fit?",
        answer:
          "CATCH is designed with a modern, relaxed silhouette. Most pieces have an oversized or boxy fit — we recommend sizing down if you prefer a closer fit. Each product page includes a detailed size guide.",
      },
      {
        question: "Where can I find the size guide?",
        answer:
          "Every product page has a 'Size Guide' link next to the size selector. It includes chest, waist, and length measurements for each size. If you're still unsure, reach out via live chat or email and we'll help you pick the right size.",
      },
      {
        question: "Do your sizes run large or small?",
        answer:
          "CATCH pieces are intentionally oversized — they run large by design. If you prefer a more fitted look, size down by one. For our trousers and jeans, sizes are standard waist measurements in inches.",
      },
    ],
  },
  {
    category: "Products & Materials",
    items: [
      {
        question: "Where are CATCH products made?",
        answer:
          "We manufacture exclusively in Europe and Japan. Our knitwear and cotton garments are made in Portugal, leather goods in Italy, and our selvedge denim pieces in Japan. Every production partner is chosen for their craftsmanship and ethical standards.",
      },
      {
        question: "How do I care for my CATCH pieces?",
        answer:
          "Each garment comes with care instructions on the label. In general: cold machine wash or hand wash, hang to dry, and avoid tumble drying. For leather and premium outerwear, we recommend professional cleaning.",
      },
      {
        question: "Are your products sustainable?",
        answer:
          "We are committed to responsible sourcing. We use organic and sustainably sourced cotton where possible, work with certified ethical factories, and are continuously reducing our environmental footprint. We believe quality and sustainability go hand in hand.",
      },
      {
        question: "Will sold-out items be restocked?",
        answer:
          "Some items are limited runs and will not be restocked. Others will be replenished — you can sign up for restock notifications on the product page or follow us on Instagram for drop announcements.",
      },
    ],
  },
  {
    category: "Payments & Security",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit and debit cards (Visa, Mastercard, Amex), Apple Pay, Google Pay, and Shop Pay. All transactions are processed securely and your card details are never stored on our servers.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Yes. All payments are processed through industry-standard SSL encryption. We use trusted payment processors and never store your card details. Your security is our priority.",
      },
      {
        question: "Do you offer buy now, pay later?",
        answer:
          "We are working on adding Klarna and Afterpay options. In the meantime, Shop Pay offers flexible installment options at checkout for eligible orders.",
      },
    ],
  },
];

function AccordionItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-catch-mid">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between py-5 text-left gap-4"
      >
        <span className="text-catch-white text-sm font-medium leading-snug">
          {item.question}
        </span>
        <span className="text-catch-muted mt-0.5 flex-shrink-0">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>
      {open && (
        <p className="text-catch-muted text-sm leading-relaxed pb-5 max-w-2xl">
          {item.answer}
        </p>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [activeSection, setActiveSection] = useState(faqData[0].category);

  return (
    <div className="bg-catch-black min-h-screen">
      {/* ─── HEADER ─────────────────────────────────────── */}
      <section className="section-padding pt-36 pb-16 border-b border-catch-mid">
        <p className="label-xs text-catch-muted mb-4">Support</p>
        <h1 className="heading-display text-6xl md:text-8xl leading-none">
          Frequently
          <br />
          Asked
        </h1>
      </section>

      <div className="section-padding py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-16">

          {/* ── Sidebar Navigation ─────────────────────── */}
          <aside className="lg:col-span-1">
            <p className="label-xs text-catch-muted mb-5">Categories</p>
            <nav className="flex flex-row lg:flex-col gap-2 flex-wrap">
              {faqData.map((section) => (
                <button
                  key={section.category}
                  onClick={() => setActiveSection(section.category)}
                  className={`text-left px-3 py-2 text-xs tracking-widest uppercase transition-all duration-200 border ${
                    activeSection === section.category
                      ? "bg-catch-white text-catch-black border-catch-white"
                      : "bg-transparent text-catch-muted border-catch-mid hover:border-catch-muted hover:text-catch-light"
                  }`}
                >
                  {section.category}
                </button>
              ))}
            </nav>

            {/* Still need help */}
            <div className="hidden lg:block mt-10 p-5 border border-catch-mid bg-catch-dark">
              <p className="label-xs text-catch-white mb-3">Still Need Help?</p>
              <p className="text-catch-muted text-xs leading-relaxed mb-4">
                Can&apos;t find your answer? Our team is available 24/7.
              </p>
              <Link href="/contact" className="btn-outline text-center block">
                Contact Us
              </Link>
            </div>
          </aside>

          {/* ── FAQ Items ──────────────────────────────── */}
          <div className="lg:col-span-3">
            {faqData
              .filter((s) => s.category === activeSection)
              .map((section) => (
                <div key={section.category}>
                  <h2 className="heading-display text-3xl md:text-4xl mb-8">
                    {section.category}
                  </h2>
                  <div className="border-t border-catch-mid">
                    {section.items.map((item) => (
                      <AccordionItem key={item.question} item={item} />
                    ))}
                  </div>
                </div>
              ))}

            {/* Mobile — Still need help */}
            <div className="lg:hidden mt-10 p-5 border border-catch-mid bg-catch-dark">
              <p className="label-xs text-catch-white mb-3">Still Need Help?</p>
              <p className="text-catch-muted text-xs leading-relaxed mb-4">
                Can&apos;t find your answer? Our team is available 24/7 via live chat or email.
              </p>
              <Link href="/contact" className="btn-outline text-center block">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
