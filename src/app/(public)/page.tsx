import HeroSection from "@/components/layout/HeroSection";

import ProductGrid from "@/components/product/ProductGrid";
import {
  getBestSelling,
  getFeaturedProducts,
  getHotDeals,
  getNewArrivals,
} from "@/sanity/lib/fetchers";

export default async function Home() {
  const [featured, newArrivals, hotDeals, bestSelling] = await Promise.all([
    getFeaturedProducts(8),
    getNewArrivals(8),
    getHotDeals(8),
    getBestSelling(8),
  ]);
  return (
    <section className="py-16">
      <HeroSection />

      <ProductGrid
        products={featured}
        title="Featured Products"
        description="Handpicked designs showcasing premium quality and standout looks."
      />

      <ProductGrid
        products={newArrivals}
        title="New Arrivals"
        description="Explore the latest 3-piece suits with new prints, fresh colors, and elegant designs."
      />

      <ProductGrid
        products={hotDeals}
        title="Hot Deals"
        description="Grab stylish 3-piece suits at discounted prices. Limited-time deals!"
      />

      <ProductGrid
        products={bestSelling}
        title="Best Selling"
        description="Shop the most-loved outfits—our customer favorites that sell out fast."
      />
    </section>
  );
}
