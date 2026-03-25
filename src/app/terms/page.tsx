import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service — Accelyx AI",
};

export default function TermsOfService() {
  return (
    <div>
      <Navbar />

      <main style={{ backgroundColor: "var(--bg)" }}>
        <div className="container-max section-padding pt-28 pb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors duration-200 hover:opacity-80"
            style={{ color: "var(--accent)" }}
          >
            ← Back to Home
          </Link>

          <h1
            className="text-4xl md:text-5xl font-bold mb-3"
            style={{ fontFamily: "'Syne',sans-serif", color: "var(--text)" }}
          >
            Terms of Service
          </h1>
          <p className="text-sm mb-12" style={{ color: "var(--muted)" }}>
            Last updated: March 25, 2026
          </p>

          <div className="max-w-4xl space-y-10 text-base leading-7" style={{ color: "var(--muted)" }}>
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>
                1. Services
              </h2>
              <p>
                Accelyx AI provides custom AI automation solutions including workflow automation, AI chatbots,
                email automation, CRM integration, document processing, and analytics. All services are scoped
                and agreed upon during a strategy call before work begins.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>
                2. Payments
              </h2>
              <p className="mb-4">Payment terms are outlined in the project proposal or invoice sent after the strategy call.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payments are processed securely through <strong style={{ color: "var(--text)" }}>Stripe</strong></li>
                <li>All fees are due according to the agreed schedule</li>
                <li>Late payments may result in paused work until the balance is resolved</li>
                <li>Refund eligibility is determined on a case-by-case basis</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>
                3. Third-Party Tools & Costs
              </h2>
              <p>
                Our pricing covers the design, development, and maintenance of your automation systems.
                Any third-party tools or services required to run your automations are <strong style={{ color: "var(--text)" }}>paid for separately by the client</strong>.
                We will recommend the best tools for your needs during the strategy call. All accounts and data remain fully owned by you.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>
                4. Project Scope & Revisions
              </h2>
              <p className="mb-4">
                Each project includes a defined scope of work. Minor adjustments are included at no extra cost.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Significant changes to the scope may require a revised quote</li>
                <li>We will communicate any scope changes before proceeding</li>
                <li>Additional revisions beyond the agreed scope will be billed separately</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>
                5. Intellectual Property
              </h2>
              <p>
                Upon full payment, all custom automation systems, workflows, and integrations built for your project
                are <strong style={{ color: "var(--text)" }}>owned by you</strong>. We retain the right to use general
                methodologies and non-proprietary techniques in future work.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>
                6. Confidentiality
              </h2>
              <p>
                We treat all client data, business processes, and project details as confidential. We will not share
                your information with third parties without your consent, except as required to deliver the agreed services.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>
                7. Limitation of Liability
              </h2>
              <p>
                Accelyx AI is not liable for indirect, incidental, or consequential damages arising from the use
                of our services. Our total liability is limited to the amount paid for the specific project in question.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>
                8. Termination
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Either party may terminate a project with <strong style={{ color: "var(--text)" }}>14 days</strong> written notice</li>
                <li>Payment is due for all work completed up to the termination date</li>
                <li>Any delivered work remains yours upon payment</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>
                9. Contact
              </h2>
              <p>
                For questions about these terms, contact us at{" "}
                <a href="mailto:hello@accelyx.ai" className="font-medium underline underline-offset-2" style={{ color: "var(--accent)" }}>
                  hello@accelyx.ai
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
