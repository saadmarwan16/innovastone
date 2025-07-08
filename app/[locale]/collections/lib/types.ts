import { z } from "zod";

export const CollectionsPageSchema = z.object({
  data: z.object({
    id: z.number(),
    documentId: z.string(),
    locale: z.string(),
    hero: z.object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      image: z.object({
        id: z.number(),
        documentId: z.string(),
        url: z.string(),
      }),
    }),
    cta: z.object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      image: z.object({
        id: z.number(),
        documentId: z.string(),
        url: z.string(),
      }),
    }),
    categories: z.array(
      z.object({ id: z.number(), documentId: z.string(), value: z.string() })
    ),
    colors: z.array(
      z.object({ id: z.number(), documentId: z.string(), value: z.string() })
    ),
    uses: z.array(
      z.object({ id: z.number(), documentId: z.string(), value: z.string() })
    ),
    sorts: z.array(
      z.object({ id: z.number(), documentId: z.string(), value: z.string() })
    ),
  }),
});

export type TCollectionsPage = z.infer<typeof CollectionsPageSchema>;
export type TCollectionsPageData = TCollectionsPage["data"];
export type TCollectionsPageHero = TCollectionsPageData["hero"];
export type TCollectionsPageCta = TCollectionsPageData["cta"];
export type TCollectionsPageCategories = TCollectionsPageData["categories"];
export type TCollectionsPageColors = TCollectionsPageData["colors"];
export type TCollectionsPageUses = TCollectionsPageData["uses"];
export type TCollectionsPageSorts = TCollectionsPageData["sorts"];
