import { z } from "zod";

export const ContactPageSchema = z.object({
  data: z.object({
    id: z.number(),
    documentId: z.string(),
    locale: z.string(),
    iframe_link: z.string(),
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
    contact: z.array(
      z.object({
        id: z.number(),
        icon: z.string(),
        title: z.string(),
        content: z.string(),
        link: z.string(),
        link_text: z.string(),
      })
    ),
    connect: z.array(
      z.object({
        id: z.number(),
        icon: z.string(),
        href: z.string(),
        label: z.string(),
      })
    ),
  }),
});

export type TContactPage = z.infer<typeof ContactPageSchema>;
export type TContactPageData = TContactPage["data"];
export type TContactPageHero = TContactPageData["hero"];
export type TContactPageContact = TContactPageData["contact"];
export type TContactPageConnect = TContactPageData["connect"];
