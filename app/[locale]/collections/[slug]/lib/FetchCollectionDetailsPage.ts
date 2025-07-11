import { fetchWithZod } from "@/utils/fetchWithZod";
import qs from "qs";
import { CollectionsDetailsPageSchema, TCollectionsDetailsPage } from "./types";
import { env } from "@/env.js";
import { getTranslations } from "next-intl/server";
import { Locale } from "next-intl";

export class FetchCollectionsDetailsPage {
  private static readonly ENDPOINT = `${env.NEXT_PUBLIC_BACKEND_URL}/api/collections`;

  public static async execute(
    slug: string,
    locale: Locale
  ): Promise<TCollectionsDetailsPage> {
    const t = await getTranslations();

    try {
      return await fetchWithZod(
        CollectionsDetailsPageSchema,
        `${this.ENDPOINT}/${slug}?${this.generateQueryString(locale)}`
      );
    } catch (error) {
      console.error("Failed to fetch collection details page data:", error); // Log the error to an error loggin service for debugging
      throw new Error(
        t("ErrorPage.message", { name: t("CollectionDetailsPage.name") })
      );
    }
  }

  private static generateQueryString(locale: Locale): string {
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
            fields: ["name", "subtitle", "is_new", "slug"],
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
