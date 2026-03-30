import Navbar from "@/components/Navbar";
import ZoomDemo from "@/components/ZoomDemo";

export const metadata = {
  title: "Live Client Demo — Accelyx AI",
  description: "Live automation demo for client Zoom calls.",
};

export default function LiveDemoPage() {
  return (
    <>
      <Navbar />
      <main>
        <ZoomDemo />
      </main>
    </>
  );
}
