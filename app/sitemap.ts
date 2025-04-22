import { MetadataRoute } from "next";
import { collections } from "@/lib/data/collections";

export default function sitemap(): MetadataRoute.Sitemap {
  // Base URL for the site
  const baseUrl = "https://innovastone.co";

  // Get current date for lastModified
  const currentDate = new Date();

  // Define static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/collections`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/consultation`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Generate dynamic routes for collections
  const collectionRoutes: MetadataRoute.Sitemap = collections.map(
    (collection) => ({
      url: `${baseUrl}/collections/${collection.id}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  // Combine static and dynamic routes
  return [...staticRoutes, ...collectionRoutes];
}
