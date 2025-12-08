import ProductCard from "@/components/product/ProductCard";
import Container from "@/components/utils/Container";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { Product } from "../../../../../sanity.types";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getCategoryData(slug: string) {
  const query = groq`
    *[_type == "category" && slug.current == $slug][0]{
      _id,
      name,
      slug,
      "products": *[
        _type == "product" &&
        references(^._id)
      ]{
        _id,
        name,
        price,
        stock,
        brand->{name, slug},
        category->{name, slug},
        images
      }
    }
  `;

  return client.fetch(query, { slug });
}

const page = async ({ params }: Props) => {
  const { slug } = await params; // slug is already a string

  const category: {
    _id: string;
    name: string;
    products: Product[];
  } = await getCategoryData(slug); // await here is fine because getCategoryData is async

  if (!category) {
    return (
      <div className="container py-12">
        <h1 className="text-2xl font-semibold">Category not found</h1>
      </div>
    );
  }

  return (
    <section className="py-20">
      <Container>
        <h1 className="text-3xl font-heading font-bold mb-6">
          {category.name}
        </h1>

        {category.products.length === 0 && (
          <p>No products found in this category.</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {category.products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default page;
