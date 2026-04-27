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
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors duration-200 hover:opacity-80" style={{ color: "var(--accent)" }}>
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ fontFamily: "'Syne',sans-serif", color: "var(--text)" }}>
            Privacy Policy
          </h1>
          <p className="text-sm mb-12" style={{ color: "var(--muted)" }}>Last updated: April 14, 2026</p>
          <div className="max-w-4xl space-y-10 text-base leading-7" style={{ color: "var(--muted)" }}>
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>1. Information We Collect</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name, email address, and phone number</li>
                <li>Company name and job title</li>
                <li>Preferred date and time for appointments or calls</li>
                <li>Browser type, device information, and pages visited</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>2. SMS Communications</h2>
              <div className="rounded-lg p-6" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <p className="font-semibold mb-3" style={{ color: "var(--text)" }}>SMS Program Disclosure</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>By providing your phone number, you consent to receive SMS appointment reminders from Soho MedSpa / Accelyx AI.</li>
                  <li>Message frequency varies based on your appointments.</li>
                  <li>Message and data rates may apply.</li>
                  <li>To opt out, reply <strong style={{ color: "var(--text)" }}>STOP</strong>. You will receive one confirmation and no further SMS.</li>
                  <li>For help, reply <strong style={{ color: "var(--text)" }}>HELP</strong> or contact <a href="mailto:mika777mr@gmail.com" style={{ color: "var(--accent)" }}>mika777mr@gmail.com</a> / (773) 318-5462.</li>
                  <li>We use <strong style={{ color: "var(--text)" }}>Twilio</strong> to send SMS. Your phone number is never shared for marketing.</li>
                </ul>
              </div>
            </section>
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Schedule and confirm appointments and strategy calls</li>
                <li>Send appointment reminders via SMS and email</li>
                <li>Deliver AI automation services</li>
                <li>Process payments securely via Stripe</li>
              </ul>
              <p className="mt-4">We do <strong style={{ color: "var(--text)" }}>not</strong> sell your personal data.</p>
            </section>
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>4. Third-Party Services</h2>
              <p className="mb-4">We use carefully selected third-party service providers to deliver our automation services. These services include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>SMS messaging and notification services for appointment reminders</li>
                <li>Calendar and scheduling services for appointment management</li>
                <li>Payment processing services for secure transactions</li>
                <li>Workflow automation and integration services</li>
              </ul>
              <p className="mt-4">All third-party service providers are contractually bound to protect your data and comply with applicable privacy laws. We only share the minimum information necessary to provide our services.</p>
            </section>
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>5. Your Rights</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Request access, correction, or deletion of your data</li>
                <li>Opt out of SMS at any time by replying STOP</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p className="mt-4">Contact: <a href="mailto:hello@accelyx.ai" className="underline" style={{ color: "var(--accent)" }}>hello@accelyx.ai</a> or (773) 318-5462</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
