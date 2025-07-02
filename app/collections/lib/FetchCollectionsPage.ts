import { env } from "@/env";
import { CollectionsPageSchema, TCollectionsPage } from "./types";
import { fetchWithZod } from "@/utils/fetchWithZod";
import qs from "qs";

export class FetchCollectionsPage {
  private static readonly ENDPOINT = `${env.NEXT_PUBLIC_BACKEND_URL}/api/collections-page`;

  public static async execute(): Promise<TCollectionsPage> {
    try {
      return fetchWithZod(
        CollectionsPageSchema,
        `${this.ENDPOINT}?${this.generateQueryString()}`
      );
    } catch (error) {
      console.error("Failed to fetch collections page data:", error); // Log the error to an error loggin service for debugging
      throw error;
    }
  }

  private static generateQueryString(): string {
    return qs.stringify(
      {
        fields: ["id", "locale"],
        populate: {
          hero: {
            fields: ["title", "description"],
            populate: {
              image: {
                fields: ["url"],
              },
            },
          },
          cta: {
            fields: ["title", "description"],
            populate: {
              image: {
                fields: ["url"],
              },
            },
          },
          categories: {
            fields: ["value"],
          },
          colors: {
            fields: ["value"],
          },
          uses: {
            fields: ["value"],
          },
          sorts: {
            fields: ["value"],
          },
        },
        locale: "en",
      },
      { encodeValuesOnly: true }
    );
  }
}
