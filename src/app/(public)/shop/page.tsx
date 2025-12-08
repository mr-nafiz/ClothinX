import ShopFilters from "./ShopFilters";
import Container from "@/components/utils/Container";
import { client } from "@/sanity/lib/client";

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
