import { unstable_cache } from "next/cache";
import { client } from "./client";
import { serverClient } from "./serverClient";
import imageUrlBuilder from "@sanity/image-url";
import {
  featuredQuery,
  newArrivalsQuery,
  hotDealsQuery,
  bestSellingQuery,
} from "./queries";
import { CartItem } from "../../../store";
import { mapZustandToSanity, SanityCart, SanityCartItem } from "@/lib/types";

export const getFeaturedProducts = unstable_cache(
  async (limit = 12) => {
    const raw = await client.fetch(
      featuredQuery.replace("[0...12]", `[0...${limit}]`)
    );
    return raw;
  },
  ["sanity", "featured"],
  { revalidate: 1 }
);
export const getNewArrivals = unstable_cache(
  async (limit = 12) => {
    const raw = await client.fetch(
      newArrivalsQuery.replace("[0...12]", `[0...${limit}]`)
    );
    return raw;
  },
  ["sanity", "new-arrivals"],
  { revalidate: 60 }
);
export const getHotDeals = unstable_cache(
  async (limit = 12) => {
    const raw = await client.fetch(
      hotDealsQuery.replace("[0...12]", `[0...${limit}]`)
    );
    return raw;
  },
  ["sanity", "hot-deals"],
  { revalidate: 60 }
);
export const getBestSelling = unstable_cache(
  async (limit = 12) => {
    const raw = await client.fetch(
      bestSellingQuery.replace("[0...12]", `[0...${limit}]`)
    );
    return raw;
  },
  ["sanity", "best-selling"],
  { revalidate: 120 }
);

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  cache = false,
}: {
  query: string;
  params?: Record<string, any>;
  cache?: boolean;
}): Promise<QueryResponse> {
  return client.fetch(query, params, {
    cache: "no-store",
    next: { revalidate: 0 },
  });
}
// export async function sanityFetch<QueryResponse>({
//   query,
//   params = {},
//   cache = true,
// }: {
//   query: string;
//   params?: Record<string, any>;
//   cache?: boolean;
// }): Promise<QueryResponse> {
//   return client.fetch(query, params, {
//     cache: cache ? "force-cache" : "no-store",
//     next: { revalidate: cache ? 60 : 0 },
//   });
// }

export async function getUserCart(userId: string): Promise<CartItem[]> {
  const cart = await client.fetch(
    `*[_type == "cart" && userId == $userId][0]{
      items[]{
        quantity,
        variant,
        product->{
          _id,
          name,
          slug,
          price,
          discountPrice,
          images,
          colorVariants,
          description
          // add any other fields your Product type expects
        }
      }
    }`,
    { userId }
  );
  if (!cart?.items) return [];

  interface CartItemResponse {
    product: {
      _id: string;
      name: string;
      slug: string;
      price: number;
      discountPrice?: number;
      images: string[];
      colorVariants: string[];
      description: string;
    };
    quantity: number;
    variant: string;
  }

  return cart.items.map((item: CartItemResponse) => ({
    product: item.product,
    quantity: item.quantity,
    variant: item.variant,
  }));
}

/**
 * Create or update user's cart in Sanity
 */
export async function saveUserCart(userId: string, cart: CartItem[]) {
  const sanityCartItems: SanityCartItem[] = mapZustandToSanity(cart);

  const existingCart = await client.fetch(
    `*[_type == "cart" && userId == $userId][0]{_id}`,
    { userId }
  );

  if (existingCart?._id) {
    return serverClient
      .patch(existingCart._id)
      .set({ items: sanityCartItems })
      .commit();
  } else {
    return serverClient.create({
      _type: "cart",
      userId,
      items: sanityCartItems,
    });
  }
}
