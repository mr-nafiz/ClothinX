import ShopFilters from "./ShopFilters";
import Container from "@/components/utils/Container";
import { client } from "@/sanity/lib/client";

export const metadata = {
  title: "Shop Pakistani 3-Piece Suits – Clothing X Online Store",
  description:
    "Browse the complete Clothing X collection. Premium Pakistani 3-piece suits, luxury lawn dresses, chiffon outfits & embroidered designs.",
  keywords: [
    "Shop Clothing X",
    "Pakistani 3-piece suits",
    "Pakistani dresses online",
    "Luxury lawn suits",
    "Clothing X collection",
  ],
  openGraph: {
    title: "Shop Clothing X – Pakistani Dresses & 3-Piece Suits",
    description:
      "Explore the full range of premium Pakistani dresses at Clothing X.",
    url: "https://clothing-x.com/shop",
    siteName: "Clothing X",
    images: [
      {
        url: "https://clothing-x.com/og-shop.jpg",
        width: 1200,
        height: 630,
        alt: "Clothing X Shop",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop Pakistani Suits – Clothing X",
    description:
      "Premium lawn, chiffon & embroidered Pakistani suits available now.",
    images: ["https://clothing-x.com/og-shop.jpg"],
  },
  robots: { index: true, follow: true },
};

export default async function ShopPage() {
  const products = await client.fetch(`
    *[_type == "product"]{
      _id,
      name,
      price,
      stock,
      images,
      "category": category->{ _id, name, "slug": slug.current },
      "brand": brand->{ _id, name, "slug": slug.current }
    }
  `);

  const categories = await client.fetch(`
    *[_type == "category"]{
      _id,
      name,
      "slug": slug.current
    }
  `);

  const brands = await client.fetch(`
    *[_type == "brand"]{
      _id,
      name,
      "slug": slug.current
    }
  `);
  return (
    <section className="py-20">
      <Container>
        <h1 className="text-3xl font-heading font-bold mb-6">Shop</h1>

        <ShopFilters
          products={products}
          categories={categories}
          brands={brands}
        />
      </Container>
    </section>
  );
}
