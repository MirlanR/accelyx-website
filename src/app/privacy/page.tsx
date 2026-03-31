import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy — Accelyx AI",
};

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>
          <p className="text-sm mb-12" style={{ color: "var(--muted)" }}>
            Last updated: March 31, 2026
          </p>

          <div className="max-w-4xl space-y-10 text-base leading-7" style={{ color: "var(--muted)" }}>
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>
                1. Information We Collect
              </h2>
              <p className="mb-4">
                When you use our website, book a strategy call, or subscribe to one of our plans, we may collect the following information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your name, email address, and phone number</li>
                <li>Company name and job title</li>
                <li>Details about the services you are interested in</li>
                <li>Preferred date and time for strategy calls</li>
                <li>Browser type, device information, and pages visited</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>
                2. How We Use Your Information
              </h2>
              <p className="mb-4">We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Respond to your inquiries and schedule strategy calls</li>
                <li>Deliver and maintain our AI automation services</li>
                <li>Process billing for setup fees and monthly subscriptions</li>
                <li>Send relevant updates about our services and your account</li>
                <li>Improve our website experience and analytics</li>
              </ul>
              <p className="mt-4">We do <strong style={{ color: "var(--text)" }}>not</strong> sell your personal data to third parties.</p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>
                3. Data Storage &amp; Security
              </h2>
              <p>
                Your data is stored securely using industry-standard encryption. We use trusted third-party services
                (such as Google Workspace, Stripe, and our automation infrastructure) to process and store information.
                We take reasonable measures to protect your data from unauthorized access or disclosure.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>
                4. Third-Party Services
              </h2>
              <p className="mb-4">
                We may use third-party tools for analytics, payment processing, automation, and communication. These include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong style={{ color: "var(--text)" }}>Google Analytics</strong> — website traffic and usage data</li>
                <li><strong style={{ color: "var(--text)" }}>Google Calendar</strong> — scheduling and availability management</li>
                <li><strong style={{ color: "var(--text)" }}>Stripe</strong> — secure payment processing for setup fees and subscriptions</li>
                <li><strong style={{ color: "var(--text)" }}>n8n</strong> — workflow automation platform</li>
                <li><strong style={{ color: "var(--text)" }}>Email providers</strong> — communication and notifications</li>
              </ul>
              <p className="mt-4">Each third-party service operates under their own privacy policies.</p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>
                5. Automation &amp; AI Services
              </h2>
              <p>
                As part of our services, we may build AI chatbots, workflow automations, and integrations that process
                data on your behalf. Any data processed through automations we build for you remains your property.
                We do not use your business data to train AI models or share it with other clients. When your
                subscription ends, we will provide you with all assets and data, and remove access to your systems
                within 30 days unless otherwise agreed.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>
                6. Billing &amp; Subscriptions
              </h2>
              <p>
                Our plans include a one-time setup fee and a recurring monthly subscription. We process payments securely
                through Stripe. We do not store your credit card information on our servers. You may cancel your
                subscription at any time — there are no lock-in contracts. Upon cancellation, you retain ownership
                of all automations and assets we built for you.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>
                7. Cookies
              </h2>
              <p>
                We use cookies to remember your theme preference and improve site functionality. See our{" "}
                <Link href="/cookies" className="font-medium underline underline-offset-2" style={{ color: "var(--accent)" }}>
                  Cookie Policy
                </Link>{" "}
                for full details.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>
                8. Your Rights
              </h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Request access to your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent at any time</li>
                <li>Request a copy of all automations and assets built for you</li>
              </ul>
              <p className="mt-4">
                Contact us at{" "}
                <a href="mailto:hello@accelyx.ai" className="font-medium underline underline-offset-2" style={{ color: "var(--accent)" }}>
                  hello@accelyx.ai
                </a>{" "}
                and we will respond within 1 business hour.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>
                9. Contact
              </h2>
              <p>
                If you have questions about this privacy policy, contact us at{" "}
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
