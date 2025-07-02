import { env } from "@/env";
import { ContactPageSchema, TContactPage } from "./types";
import { fetchWithZod } from "@/utils/fetchWithZod";
import qs from "qs";

export class FetchContactPage {
  private static readonly ENDPOINT = `${env.NEXT_PUBLIC_BACKEND_URL}/api/contact-page`;

  public static async execute(): Promise<TContactPage> {
    try {
      return fetchWithZod(
        ContactPageSchema,
        `${this.ENDPOINT}?${this.generateQueryString()}`
      );
    } catch (error) {
      console.error("Failed to fetch contact page data:", error); // Log the error to an error loggin service for debugging
      throw error;
    }
  }

  private static generateQueryString(): string {
    return qs.stringify(
      {
        fields: ["id", "locale", "iframe_link"],
        populate: {
          hero: {
            fields: ["title", "description"],
            populate: {
              image: {
                fields: ["url"],
              },
            },
          },
          contact: {
            fields: ["icon", "title", "content", "link", "link_text"],
          },
          connect: {
            fields: ["icon", "href", "label"],
          },
        },
        locale: "en",
      },
      { encodeValuesOnly: true }
    );
  }
}
