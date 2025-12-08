import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  if (!q.trim()) return NextResponse.json([]);

  const query = `
    *[_type == "product" && (
      name match $q + "*" ||
      category->name match $q + "*"
    )]{
      _id,
      name,
      slug,
      price,
      discountPrice,
        images,
    }
  `;

  const products = await client.fetch(query, { q });

  return NextResponse.json(products);
}
