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
  title: "Clothing X – Premium Pakistani 3-Piece Suits | Luxury Lawn & Chiffon",
  description:
    "Shop premium Pakistani 3-piece suits at Clothing X. Luxury lawn, chiffon & embroidered dresses. New arrivals, best sellers, and exclusive deals with fast worldwide delivery.",
  icons: {
    icon: [
      //! Android Icons
      {
        rel: "icon",
        type: "image/png",
        sizes: "36x36",
        url: "/favicon/android-icon-36x36.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "48x48",
        url: "/favicon/android-icon-48x48.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "72x72",
        url: "/favicon/android-icon-72x72.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        url: "/favicon/android-icon-96x96.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "144x144",
        url: "/favicon/android-icon-144x144.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/favicon/android-icon-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        url: "/favicon/android-icon-512x512.png",
      },

      //! Apple Icons
      {
        rel: "apple-touch-icon",
        type: "image/ico",
        url: "/favicon/apple-icon.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "57x57",
        url: "/favicon/apple-icon-57x57.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "60x60",
        url: "/favicon/apple-icon-60x60.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "72x72",
        url: "/favicon/apple-icon-72x72.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "76x76",
        url: "/favicon/apple-icon-76x76.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "114x114",
        url: "/favicon/apple-icon-114x114.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "120x120",
        url: "/favicon/apple-icon-120x120.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "144x144",
        url: "/favicon/apple-icon-144x144.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "152x152",
        url: "/favicon/apple-icon-152x152.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        url: "/favicon/apple-icon-180x180.png",
      },

      //! Favion Icons
      { rel: "icon", type: "image/ico", url: "/favicon/favicon.ico" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon/favicon-16x16.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        url: "/favicon/favicon-96x96.png",
      },
    ],

    //! Other Icons
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/favicon/apple-icon-precomposed.png",
      },
    ],
  },
  manifest: "/favicon/manifest.json",
  keywords: [
    "Clothing X",
    "clothing-x.com",
    "Pakistani 3-piece suits",
    "Pakistani dresses online",
    "Pakistani 3 piece price in bangladesh",
    "Luxury lawn suits",
    "Chiffon Pakistani suits",
  ],
  openGraph: {
    title: "Clothing X – Premium Pakistani 3-Piece Suits",
    description:
      "Discover premium Pakistani dresses, luxury lawn, chiffon suits & embroidered outfits. Shop new arrivals & exclusive offers.",
    url: "https://clothing-x.com",
    siteName: "Clothing X",
    images: [
      {
        url: "https://clothing-x.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Clothing X Pakistani Clothing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clothing X – Premium Pakistani Suits",
    description:
      "Luxury lawn and chiffon Pakistani dresses. Shop exclusive designs only at Clothing X.",
    images: ["https://clothing-x.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ClothingStore",
      name: "Clothing X",
      url: "https://clothing-x.com",
      logo: "https://clothing-x.com/logo.png",
      image: "https://clothing-x.com/og-image.jpg",
      description:
        "Clothing X offers premium Pakistani 3-piece suits, embroidered lawn, chiffon and festive dresses with fast worldwide delivery.",
      sameAs: [
        "https://www.instagram.com/cx_clothing_x/",
        "https://www.facebook.com/ClothingX",
        "https://x.com/BmMejba18544?t=-lZZxgkKfabZtaM90OE3OA&s=07 ",
        "https://www.youtube.com/@CLOTHING_X",
      ],
    }),
  }}
/>;

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
