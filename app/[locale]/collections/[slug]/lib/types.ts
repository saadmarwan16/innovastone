import { SeoMetadataSchema } from "@/lib/types";
import { z } from "zod";

export const CollectionsDetailsPageSchema = z.object({
  data: z.object({
    id: z.number(),
    documentId: z.string(),
    name: z.string(),
    subtitle: z.string(),
    description: z.string(),
    hero_image: z.object({
      id: z.number(),
      documentId: z.string(),
      url: z.string(),
    }),
    images: z.array(
      z.object({ id: z.number(), documentId: z.string(), url: z.string() })
    ),
    similar: z.array(
      z.object({
        id: z.number(),
        documentId: z.string(),
        name: z.string(),
        subtitle: z.string(),
        is_new: z.boolean(),
        slug: z.string(),
        hero_image: z.object({
          id: z.number(),
          documentId: z.string(),
          url: z.string(),
        }),
        category: z.object({
          id: z.number(),
          documentId: z.string(),
          value: z.string(),
        }),
        features: z.array(z.object({ id: z.number(), title: z.string() })),
      })
    ),
    features: z.array(
      z.object({
        id: z.number(),
        icon: z.string(),
        title: z.string(),
        description: z.string(),
      })
    ),
    seo: SeoMetadataSchema,
  }),
});

export type TCollectionsDetailsPage = z.infer<
  typeof CollectionsDetailsPageSchema
>;
export type TCollectionsDetailsPageData = TCollectionsDetailsPage["data"];
export type TCollectionsDetailsPageFeature =
  TCollectionsDetailsPageData["features"][number];
export type TCollectionsDetailsPageImage =
  TCollectionsDetailsPageData["images"][number];
export type TCollectionsDetailsPageSimilar =
  TCollectionsDetailsPageData["similar"][number];
