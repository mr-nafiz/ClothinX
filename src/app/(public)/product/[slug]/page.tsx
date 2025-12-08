import { client } from "@/sanity/lib/client";
import { productBySlugQuery } from "@/sanity/lib/queries";

import { notFound } from "next/navigation";
import SingleProduct from "./single-product";

interface Props {
  params: { slug: string };
}

import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/fetchers";
import { Product } from "../../../../../sanity.types";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const product: Product = await sanityFetch({
    query: productBySlugQuery,
    params: { slug },
  });

  if (!product)
    return {
      title: "Product not found",
    };

  return {
    title: `${product.name} | YourStore`,
    description:
      product.description?.[0]?.children?.[0]?.text ?? "Product details",
    openGraph: {
      title: product.name,
      description: product.description?.[0]?.children?.[0]?.text ?? "",
      images: [
        {
          url: product.images?.[0]
            ? urlFor(product.images[0]).url()
            : "/placeholder.png",
          width: 800,
          height: 800,
        },
      ],
    },
  };
}

export default async function ProductPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const product = await sanityFetch({
    query: productBySlugQuery,
    params: { slug },
  });

  if (!product) return notFound();

  return <SingleProduct product={product as Product} />;
}
