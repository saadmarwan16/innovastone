import { fetchWithZod } from "@/utils/fetchWithZod";
import qs from "qs";
import { HomepageSchema, THomepage } from "./types";
import { env } from "@/env.js";
import { getTranslations } from "next-intl/server";
import { Locale } from "next-intl";

export class FetchHomePage {
  private static readonly ENDPOINT = `${env.NEXT_PUBLIC_BACKEND_URL}/api/home-page`;

  public static async execute(locale: Locale): Promise<THomepage> {
    const t = await getTranslations();

    try {
      return await fetchWithZod(
        HomepageSchema,
        `${this.ENDPOINT}?${this.generateQueryString(locale)}`
      );
    } catch (error) {
      console.error("Failed to fetch home page data:", error); // Log the error to an error loggin service for debugging
      throw new Error(t("ErrorPage.message", { name: t("HomePage.name") }));
    }
  }

  private static generateQueryString(locale: Locale): string {
    return qs.stringify(
      {
        fields: ["id", "locale"],
        populate: {
          hero: {
            fields: ["prefix", "suffix", "description"],
            populate: {
              image: {
                fields: ["url"],
              },
            },
          },
          stats: {
            fields: ["label", "value", "icon"],
          },
          who_we_are: {
            fields: ["description"],
            populate: {
              images: {
                populate: {
                  small_image: {
                    fields: ["url"],
                  },
                  large_image: {
                    fields: ["url"],
                  },
                },
              },
            },
          },
          featured_collections: {
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
          why_choose_us: {
            fields: ["title", "subtitle", "icon"],
          },
          faq: {
            fields: ["question", "answer", "icon"],
          },
          testimonials: {
            fields: ["quote", "author", "title"],
            populate: {
              image: {
                fields: ["url"],
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
