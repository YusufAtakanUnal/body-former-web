import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// Emitted as /sitemap.xml — submit this URL in Google Search Console.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://bodyformer.app",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
