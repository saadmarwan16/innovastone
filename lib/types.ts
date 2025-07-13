import { z } from "zod";

export const SeoMetadataSchema = z.object({
  id: z.number(),
  metaTitle: z.string(),
  metaDescription: z.string(),
  keywords: z.string(),
  metaRobots: z.string(),
  metaViewport: z.string(),
  canonicalURL: z.string(),
  structuredData: z.unknown(),
  metaImage: z.object({
    id: z.number(),
    documentId: z.string(),
    url: z.string(),
    alternativeText: z.string().optional(),
  }),
  openGraph: z.object({
    id: z.number(),
    ogTitle: z.string(),
    ogDescription: z.string(),
    ogUrl: z.string(),
    ogType: z.enum(["website", "article", "profile"]),
    ogImage: z.object({
      id: z.number(),
      documentId: z.string(),
      url: z.string(),
      alternativeText: z.string().optional(),
    }),
  }),
});

export const SitemapSchema = z.object({
  data: z.array(
    z.object({ id: z.number(), documentId: z.string(), slug: z.string() })
  ),
  meta: z.object({
    pagination: z.object({
      page: z.number(),
      pageSize: z.number(),
      pageCount: z.number(),
      total: z.number(),
    }),
  }),
});

export type TSeoMetadata = z.infer<typeof SeoMetadataSchema>;
export type TSitemap = z.infer<typeof SitemapSchema>;
export type TSitemapData = TSitemap["data"];
