import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// Emitted as /robots.txt — lets every crawler in and points to the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://bodyformer.app/sitemap.xml",
    host: "https://bodyformer.app",
  };
}
