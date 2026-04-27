import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Cookie Policy — Accelyx AI",
};

export default function CookiePolicy() {
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
            Cookie Policy
          </h1>
          <p className="text-sm mb-12" style={{ color: "var(--muted)" }}>
            Last updated: April 14, 2026
          </p>

          <div className="max-w-4xl space-y-10 text-base leading-7" style={{ color: "var(--muted)" }}>
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>
                1. What Are Cookies
              </h2>
              <p>
                Cookies are small text files stored on your device when you visit a website. They help the site
                remember your preferences and improve your browsing experience.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>
                2. Cookies We Use
              </h2>
              <div className="mt-4 rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr style={{ background: "var(--card)" }}>
                      <th className="px-5 py-4 font-bold" style={{ color: "var(--text)" }}>Cookie</th>
                      <th className="px-5 py-4 font-bold" style={{ color: "var(--text)" }}>Purpose</th>
                      <th className="px-5 py-4 font-bold" style={{ color: "var(--text)" }}>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderTop: "1px solid var(--border)" }}>
                      <td className="px-5 py-4 font-medium" style={{ color: "var(--accent)" }}>accelyx-theme</td>
                      <td className="px-5 py-4">Saves your light/dark theme preference</td>
                      <td className="px-5 py-4">Persistent</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                We currently use only <strong style={{ color: "var(--text)" }}>essential cookies</strong> required
                for site functionality. We do not use advertising or tracking cookies.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>
                3. Third-Party Cookies
              </h2>
              <p>
                If we integrate analytics tools in the future (such as Google Analytics), they may place their own
                cookies. We will update this policy accordingly and notify users.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>
                4. Managing Cookies
              </h2>
              <p className="mb-4">You can control cookies through your browser settings:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Most browsers allow you to block or delete cookies</li>
                <li>You can clear cookies at any time in your browser preferences</li>
                <li>Disabling cookies may affect your theme preference on this site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "'Syne',sans-serif" }}>
                5. Contact
              </h2>
              <p>
                If you have questions about our use of cookies, contact us at{" "}
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
