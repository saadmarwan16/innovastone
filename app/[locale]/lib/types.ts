import { z } from "zod";

export const HomepageSchema = z.object({
  data: z.object({
    id: z.number(),
    documentId: z.string(),
    locale: z.string(),
    hero: z.object({
      id: z.number(),
      prefix: z.string(),
      suffix: z.string(),
      description: z.string(),
      image: z.object({
        id: z.number(),
        documentId: z.string(),
        url: z.string(),
      }),
    }),
    stats: z.array(
      z.object({
        id: z.number(),
        label: z.string(),
        value: z.number(),
        icon: z.string(),
      })
    ),
    who_we_are: z.object({
      id: z.number(),
      description: z.string(),
      images: z.array(
        z.object({
          id: z.number(),
          small_image: z.object({
            id: z.number(),
            documentId: z.string(),
            url: z.string(),
          }),
          large_image: z.object({
            id: z.number(),
            documentId: z.string(),
            url: z.string(),
          }),
        })
      ),
    }),
    featured_collections: z.array(
      z.object({
        id: z.number(),
        documentId: z.string(),
        name: z.string(),
        subtitle: z.string(),
        is_new: z.boolean(),
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
    why_choose_us: z.array(
      z.object({
        id: z.number(),
        title: z.string(),
        subtitle: z.string(),
        icon: z.string(),
      })
    ),
    faq: z.array(
      z.object({
        id: z.number(),
        question: z.string(),
        answer: z.string(),
        icon: z.string(),
      })
    ),
    testimonials: z.array(
      z.object({
        id: z.number(),
        quote: z.string(),
        author: z.string(),
        title: z.string(),
        image: z.object({
          id: z.number(),
          documentId: z.string(),
          url: z.string(),
        }),
      })
    ),
  }),
});

export type THomepage = z.infer<typeof HomepageSchema>;
export type THomepageData = THomepage["data"];
export type THomepageHero = THomepage["data"]["hero"];
export type THomepageStats = THomepage["data"]["stats"];
export type THomepageWhoWeAre = THomepage["data"]["who_we_are"];
export type THomepageFeaturedCollections =
  THomepage["data"]["featured_collections"];
export type THomepageWhyChooseUs = THomepage["data"]["why_choose_us"];
export type THomepageFAQ = THomepage["data"]["faq"];
export type THomepageTestimonials = THomepage["data"]["testimonials"];
