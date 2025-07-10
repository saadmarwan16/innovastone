import { env } from "@/env";
import { AboutPageSchema, TAboutPage } from "./types";
import { fetchWithZod } from "@/utils/fetchWithZod";
import qs from "qs";
import { getTranslations } from "next-intl/server";
import { Locale } from "next-intl";

export class FetchAboutPage {
  private static readonly ENDPOINT = `${env.NEXT_PUBLIC_BACKEND_URL}/api/about-page`;

  public static async execute(locale: Locale): Promise<TAboutPage> {
    const t = await getTranslations();

    try {
      return await fetchWithZod(
        AboutPageSchema,
        `${this.ENDPOINT}?${this.generateQueryString(locale)}`
      );
    } catch (error) {
      console.error("Failed to fetch about page data:", error); // Log the error to an error loggin service for debugging
      throw new Error(t("ErrorPage.message", { name: t("AboutPage.name") }));
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
