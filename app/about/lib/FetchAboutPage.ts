import { env } from "@/env";
import { AboutPageSchema, TAboutPage } from "./types";
import { fetchWithZod } from "@/utils/fetchWithZod";
import qs from "qs";

export class FetchAboutPage {
  private static readonly ENDPOINT = `${env.NEXT_PUBLIC_BACKEND_URL}/api/about-page`;

  public static async execute(): Promise<TAboutPage> {
    try {
      return fetchWithZod(
        AboutPageSchema,
        `${this.ENDPOINT}?${this.generateQueryString()}`
      );
    } catch (error) {
      console.error("Failed to fetch about page data:", error); // Log the error to an error loggin service for debugging
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
          process: {
            fields: ["title", "description", "icon"],
            populate: {
              image: {
                fields: ["url"],
              },
            },
          },
          values: {
            fields: ["title", "description", "icon"],
          },
          founder: {
            fields: ["description"],
            populate: {
              image: {
                fields: ["url"],
              },
            },
          },
          team: {
            fields: ["name", "description", "role"],
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
        },
        locale: "en",
      },
      { encodeValuesOnly: true }
    );
  }
}
