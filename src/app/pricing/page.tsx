import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Pricing — Accelyx AI",
};

export default function PricingPage() {
  return (
    <div>
      <Navbar />
      <main style={{ backgroundColor: "var(--bg)" }}>
        <div className="pt-20">
          <Pricing />
        </div>
      </main>
      <Footer />
    </div>
  );
}
