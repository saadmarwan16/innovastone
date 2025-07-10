import { env } from "@/env";
import { CollectionsPageSchema, TCollectionsPage } from "./types";
import { fetchWithZod } from "@/utils/fetchWithZod";
import qs from "qs";
import { getTranslations } from "next-intl/server";
import { Locale } from "next-intl";

export class FetchCollectionsPage {
  private static readonly ENDPOINT = `${env.NEXT_PUBLIC_BACKEND_URL}/api/collections-page`;

  public static async execute(locale: Locale): Promise<TCollectionsPage> {
    const t = await getTranslations();

    try {
      return await fetchWithZod(
        CollectionsPageSchema,
        `${this.ENDPOINT}?${this.generateQueryString(locale)}`
      );
    } catch (error) {
      console.error("Failed to fetch collections page data:", error); // Log the error to an error loggin service for debugging
      throw new Error(
        t("ErrorPage.message", { name: t("CollectionsPage.name") })
      );
    }
  }

  private static generateQueryString(locale: Locale): string {
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
          seo: {
            fields: [
              "metaTitle",
              "metaDescription",
              "keywords",
              "metaRobots",
              "metaViewport",
              "canonicalURL",
              "structuredData",
            ],
            populate: {
              metaImage: {
                fields: ["url", "alternativeText"],
              },
              openGraph: {
                fields: ["ogTitle", "ogDescription", "ogUrl", "ogType"],
                populate: {
                  ogImage: {
                    fields: ["url", "alternativeText"],
                  },
                },
              },
            },
          },
        },
        locale: locale,
      },
      { encodeValuesOnly: true }
    );
  }
}
