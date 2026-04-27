import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms & Conditions — Accelyx AI",
};

export default function TermsAndConditions() {
  return (
    <div>
      <Navbar />
      <main style={{ backgroundColor: "var(--bg)" }}>
        <div className="container-max section-padding pt-28 pb-16">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors duration-200 hover:opacity-80" style={{ color: "var(--accent)" }}>
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ fontFamily: "'Syne',sans-serif", color: "var(--text)" }}>
            Terms &amp; Conditions
          </h1>
          <p className="text-sm mb-12" style={{ color: "var(--muted)" }}>Last updated: April 14, 2026</p>

          <div className="max-w-4xl space-y-10 text-base leading-7" style={{ color: "var(--muted)" }}>

            <section>
              <div className="rounded-lg p-6 mb-6" style={{ background: "var(--card)", border: "2px solid var(--accent)" }}>
                <p className="font-semibold mb-3 text-lg" style={{ color: "var(--text)" }}>SMS Program — Soho MedSpa</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Soho MedSpa / Accelyx AI operates an SMS appointment reminder program.</li>
                  <li>By providing your phone number, you consent to receive SMS messages regarding your appointments.</li>
                  <li>Message frequency varies based on your scheduled appointments.</li>
                  <li>Message and data rates may apply.</li>
                  <li>To opt out, reply <strong style={{ color: "var(--text)" }}>STOP</strong>, <strong style={{ color: "var(--text)" }}>STOPALL</strong>, <strong style={{ color: "var(--text)" }}>UNSUBSCRIBE</strong>, <strong style={{ color: "var(--text)" }}>CANCEL</strong>, <strong style={{ color: "var(--text)" }}>END</strong>, or <strong style={{ color: "var(--text)" }}>QUIT</strong>. You will receive one final confirmation message.</li>
                  <li>For help, reply <strong style={{ color: "var(--text)" }}>HELP</strong> or contact <a href="mailto:mika777mr@gmail.com" style={{ color: "var(--accent)" }}>mika777mr@gmail.com</a> / (773) 318-5462.</li>
                  <li>We do not share your phone number with third parties for marketing purposes.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>
                1. Acceptance of Terms
              </h2>
              <p>By accessing or using accelyx.ai and our services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.</p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>
                2. Services
              </h2>
              <p className="mb-4">Accelyx AI provides AI automation services including workflow automation, AI chatbots, voice agents, and related integrations. Services are provided on a subscription basis following a one-time setup fee.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All automations and assets built for you remain your property upon payment</li>
                <li>We do not lock you into contracts — cancel anytime</li>
                <li>Service delivery timelines are estimates and may vary by project scope</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>
                3. Billing &amp; Payments
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>A one-time setup fee is charged before work begins</li>
                <li>Monthly subscription fees are billed in advance and include all necessary tools and services provided by Accelyx AI</li>
                <li>All third-party integrations and tools required for your automations are provided and maintained by Accelyx AI as part of your subscription</li>
                <li>You are not responsible for separately purchasing or maintaining integration tools</li>
                <li>Payments are processed securely via Stripe</li>
                <li>We do not store credit card information on our servers</li>
                <li>Refunds are evaluated on a case-by-case basis within 7 days of payment</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>
                4. User Responsibilities
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You agree to provide accurate information when booking or subscribing</li>
                <li>You are responsible for maintaining the security of access credentials we provide</li>
                <li>You agree not to use our services for unlawful purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>
                5. Intellectual Property
              </h2>
              <p>All content on accelyx.ai — including designs, copy, and code — is the property of Accelyx AI unless otherwise stated. Automations and integrations built specifically for your business are delivered to you upon completion and become your property.</p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>
                6. Limitation of Liability
              </h2>
              <p>Accelyx AI is not liable for indirect, incidental, or consequential damages arising from use of our services. Our total liability shall not exceed the amount paid by you in the 30 days preceding the claim.</p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>
                7. Changes to Terms
              </h2>
              <p>We reserve the right to update these terms at any time. Continued use of our services after changes constitutes acceptance of the updated terms.</p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>
                8. Contact
              </h2>
              <p>
                Questions about these terms? Contact us at{" "}
                <a href="mailto:hello@accelyx.ai" className="font-medium underline underline-offset-2" style={{ color: "var(--accent)" }}>
                  hello@accelyx.ai
                </a>{" "}
                or (773) 318-5462.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
