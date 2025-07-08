import { env } from "@/env";
import { ContactPageSchema, TContactPage } from "./types";
import { fetchWithZod } from "@/utils/fetchWithZod";
import qs from "qs";
import { getTranslations } from "next-intl/server";
import { Locale } from "next-intl";

export class FetchContactPage {
  private static readonly ENDPOINT = `${env.NEXT_PUBLIC_BACKEND_URL}/api/contact-page`;

  public static async execute(locale: Locale): Promise<TContactPage> {
    const t = await getTranslations();

    try {
      return await fetchWithZod(
        ContactPageSchema,
        `${this.ENDPOINT}?${this.generateQueryString(locale)}`
      );
    } catch (error) {
      console.error("Failed to fetch contact page data:", error); // Log the error to an error loggin service for debugging
      throw new Error(t("ErrorPage.message", { name: t("ContactPage.name") }));
    }
  }

  private static generateQueryString(locale: Locale): string {
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
        locale: locale,
      },
      { encodeValuesOnly: true }
    );
  }
}
