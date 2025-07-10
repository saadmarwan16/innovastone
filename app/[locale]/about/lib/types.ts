import { SeoMetadataSchema } from "@/lib/types";
import { z } from "zod";

export const AboutPageSchema = z.object({
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
    process: z.array(
      z.object({
        id: z.number(),
        title: z.string(),
        description: z.string(),
        icon: z.string(),
        image: z.object({
          id: z.number(),
          documentId: z.string(),
          url: z.string(),
        }),
      })
    ),
    values: z.array(
      z.object({
        id: z.number(),
        title: z.string(),
        description: z.string(),
        icon: z.string(),
      })
    ),
    founder: z.object({
      id: z.number(),
      description: z.string(),
      image: z.object({
        id: z.number(),
        documentId: z.string(),
        url: z.string(),
      }),
    }),
    team: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
        role: z.string(),
        image: z.object({
          id: z.number(),
          documentId: z.string(),
          url: z.string(),
        }),
      })
    ),
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
    seo: SeoMetadataSchema
  }),
});

export type TAboutPage = z.infer<typeof AboutPageSchema>;
export type TAboutPageData = TAboutPage["data"];
export type TAboutPageHero = TAboutPageData["hero"];
export type TAboutPageProcess = TAboutPageData["process"];
export type TAboutPageValues = TAboutPageData["values"];
export type TAboutPageFounder = TAboutPageData["founder"];
export type TAboutPageTeam = TAboutPageData["team"];
export type TAboutPageCta = TAboutPageData["cta"];
