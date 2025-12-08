import type { Metadata } from "next";
import { Outfit, Montserrat } from "next/font/google";
import "../globals.css";
import { Footer2 } from "@/components/footer2";
import { Navbar1 } from "@/components/navbar1";
import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({
  variable: "--font-outfit",
  display: "swap",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nafiz E-Commerce Store",
  description:
    "An e-commerce store built with Next.js, Tailwind CSS, and TypeScript. Buy the latest gadgets and electronics at unbeatable prices!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <Toaster />
      <html lang="en">
        <body
          className={`${outfit.variable} ${montserrat.variable} antialiased`}
        >
          <header>
            <Navbar1 />
          </header>
          <main>{children}</main>
          <footer>
            <Footer2 />
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
