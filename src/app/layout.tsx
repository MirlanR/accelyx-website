import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "CATCH — Men's Premium Clothing",
  description: "CATCH — Define your look. Premium menswear crafted for the modern man.",
  keywords: ["catch", "menswear", "premium clothing", "streetwear", "fashion"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-catch-black text-catch-light antialiased">
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ChatWidget />
        </CartProvider>
      </body>
    </html>
  );
}
