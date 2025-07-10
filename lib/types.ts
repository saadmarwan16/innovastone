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
    alternativeText: z.string(),
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
      alternativeText: z.string(),
    }),
  }),
});

export type TSeoMetadata = z.infer<typeof SeoMetadataSchema>;
