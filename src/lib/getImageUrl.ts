import { urlFor } from "@/sanity/lib/image";

export function getImageUrl(image: any): string {
  if (!image) return "/placeholder.png";

  // If it's a string -> return directly
  if (typeof image === "string") {
    return image;
  }

  // If it's a sanity image object with asset._ref
  if (image?.asset?._ref) {
    return urlFor(image).url();
  }

  return "/placeholder.png";
}
