import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.clothing-x.com/";
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/product/", "/about", "/category/", "/contact", "/shop"],
      disallow: ["/api/", "/terms-and-condition", "/privacy-policy", "/admin"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
