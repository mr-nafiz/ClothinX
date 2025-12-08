// lib/userSync.ts
import { serverClient } from "@/sanity/lib/serverClient";
import { User } from "../../sanity.types";

export interface ClerkUser {
  id: string;
  email?: string;
  fullName?: string;
  profileImageUrl?: string;
}

/**
 * Ensure a Clerk user exists in Sanity.
 * If not, create a new user document.
 */
export async function syncClerkUser(clerkUser: ClerkUser): Promise<User> {
  if (!clerkUser?.id) {
    throw new Error("Invalid Clerk user");
  }

  // Try to fetch existing user by clerkId
  const existingUser: User | null = await serverClient.fetch(
    `*[_type == "user" && clerkId == $clerkId][0]`,
    { clerkId: clerkUser.id }
  );

  if (existingUser) {
    // User already exists
    return existingUser;
  }

  // Create new user
  const newUser: Omit<User, "_id" | "_rev" | "_createdAt" | "_updatedAt"> = {
    _type: "user",
    clerkId: clerkUser.id,
    email: clerkUser.email,
    name: clerkUser.fullName,
    image: clerkUser.profileImageUrl,
    addresses: [],
    wishlist: [],
    orders: [],
  };

  const createdUser = await serverClient.create(newUser);
  return createdUser;
}
