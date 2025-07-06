import { fetchWithZod } from "@/utils/fetchWithZod";
import qs from "qs";
import { CollectionsDetailsPageSchema, TCollectionsDetailsPage } from "./types";
import { env } from "@/env.js";

export class FetchCollectionsDetailsPage {
  private static readonly ENDPOINT = `${env.NEXT_PUBLIC_BACKEND_URL}/api/collections`;

  public static async execute(id: string): Promise<TCollectionsDetailsPage> {
    try {
      return fetchWithZod(
        CollectionsDetailsPageSchema,
        `${this.ENDPOINT}/${id}?${this.generateQueryString()}`
      );
    } catch (error) {
      console.error("Failed to fetch collection details page data:", error); // Log the error to an error loggin service for debugging
      throw error;
    }
  }

  private static generateQueryString(): string {
    return qs.stringify(
      {
        fields: ["name", "subtitle", "description"],
        populate: {
          hero_image: {
            fields: ["url"],
          },
          images: {
            fields: ["url"],
          },
          similar: {
            fields: ["name", "subtitle", "is_new"],
            populate: {
              hero_image: {
                fields: ["url"],
              },
              category: {
                fields: ["value"],
              },
              features: {
                fields: ["title"],
              },
            },
          },
          features: {
            fields: ["icon", "title", "description"],
          },
        },
        locale: "en",
      },
      { encodeValuesOnly: true }
    );
  }
}
