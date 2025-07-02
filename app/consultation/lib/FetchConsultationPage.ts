import { env } from "@/env";
import { ConsultationPageSchema, TConsultationPage } from "./types";
import { fetchWithZod } from "@/utils/fetchWithZod";
import qs from "qs";

export class FetchConsultationPage {
  private static readonly ENDPOINT = `${env.NEXT_PUBLIC_BACKEND_URL}/api/consultation`;

  public static async execute(): Promise<TConsultationPage> {
    try {
      return fetchWithZod(
        ConsultationPageSchema,
        `${this.ENDPOINT}?${this.generateQueryString()}`
      );
    } catch (error) {
      console.error("Failed to fetch consultation page data:", error); // Log the error to an error loggin service for debugging
      throw error;
    }
  }

  private static generateQueryString(): string {
    return qs.stringify(
      {
        fields: ["id", "locale", "consultation_link"],
        populate: {
          hero: {
            fields: ["title", "description"],
            populate: {
              image: {
                fields: ["url"],
              },
            },
          },
        },
        locale: "en",
      },
      { encodeValuesOnly: true }
    );
  }
}
