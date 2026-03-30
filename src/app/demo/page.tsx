import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AutomationDemo from "@/components/AutomationDemo";

export const metadata = {
  title: "Live Demo — Accelyx AI Automation",
  description:
    "See how AI automation works in real time. Watch leads flow into Google Sheets, calendar meetings get booked, and confirmation emails sent — all automatically.",
};

export default function DemoPage() {
  return (
    <>
      <Navbar />
      <main>
        <AutomationDemo />
      </main>
      <Footer />
    </>
  );
}
