import { z } from "zod";

export const CollectionsSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      documentId: z.string(),
      name: z.string(),
      description: z.string(),
      is_new: z.boolean(),
      hero_image: z.object({
        id: z.number(),
        documentId: z.string(),
        url: z.string(),
      }),
    })
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

export type TCollections = z.infer<typeof CollectionsSchema>;
export type TCollection = TCollections["data"][number];
export type TCollectionsMeta = TCollections["meta"];
