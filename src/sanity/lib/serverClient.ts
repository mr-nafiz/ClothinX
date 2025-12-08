// lib/sanityServerClient.ts
import { createClient } from "next-sanity";

export const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-12-01",
  token:
    "sk3SzbsrpnB1Upe9bvkpGZmIhDo4lVq52mnVvkQJWGzSMkLjk6k1bhDIDdBi0ToVqCQdTsOpaJOkBm7Ykl6pK86XAmNWLaNZWoeZ2jDFScPe8WMP5VWF3pD1Wvvwzr3hyxK9jsj2uJJog5MNr4XVsDOYNHQbH3PwqgF6Y6RfE5N5GwH8JZN7", // must have create/update permissions
  useCdn: false,
});
