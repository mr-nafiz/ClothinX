import HeroSection from "@/components/layout/HeroSection";

import ProductGrid from "@/components/product/ProductGrid";
import {
  getBestSelling,
  getFeaturedProducts,
  getHotDeals,
  getNewArrivals,
} from "@/sanity/lib/fetchers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clothing X – Premium Pakistani 3-Piece Suits | Luxury Lawn & Chiffon",
  description:
    "Shop premium Pakistani 3-piece suits at Clothing X. Luxury lawn, chiffon & embroidered dresses. New arrivals, best sellers, and exclusive deals with fast worldwide delivery.",
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

export default async function Home() {
  const [featured, newArrivals, hotDeals, bestSelling] = await Promise.all([
    getFeaturedProducts(8),
    getNewArrivals(8),
    getHotDeals(8),
    getBestSelling(8),
  ]);
  return (
    <section className="py-16">
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
      />
      ;
      <p className="sr-only">
        Welcome to <strong>Clothing X</strong>, your trusted destination for
        premium Pakistani 3-piece suits crafted from luxury lawn, chiffon, and
        elegant embroidered fabrics. Explore our latest collections featuring
        modern styles, festive outfits, and trending designs. Shop confidently
        at <strong>clothing-x.com</strong> with fast shipping, secure payments,
        and unbeatable quality.
      </p>
      <HeroSection />
      <ProductGrid
        products={featured}
        title="Featured Products"
        description="Handpicked Pakistani suits designed with luxurious fabrics, detailed
  embroidery, and exceptional craftsmanship."
      />
      <ProductGrid
        products={newArrivals}
        title="New Arrivals"
        description="Explore the newest Pakistani 3-piece suits at Clothing X — fresh designs,
  premium embroidery, and updated styles every week."
      />
      <ProductGrid
        products={hotDeals}
        title="Hot Deals"
        description="Enjoy exclusive discounts on premium 3-piece suits. Limited-time deals only
  at clothing-x.com."
      />
      <ProductGrid
        products={bestSelling}
        title="Best Selling"
        description="Shop our best-selling Pakistani suits loved for their premium fabric,
  elegant stitching, and timeless designs."
      />
    </section>
  );
}
