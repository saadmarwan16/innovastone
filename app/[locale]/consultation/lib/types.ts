import { z } from "zod"

export const ConsultationPageSchema = z.object({
  data: z.object({
    id: z.number(),
    documentId: z.string(),
    locale: z.string(),
    consultation_link: z.string(),
    hero: z.object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      image: z.object({
        id: z.number(),
        documentId: z.string(),
        url: z.string()
      })
    })
  }),
  meta: z.object({})
})
export type TConsultationPage = z.infer<typeof ConsultationPageSchema>
export type TConsultationPageData = TConsultationPage["data"]
export type TConsultationPageHero = TConsultationPageData["hero"]