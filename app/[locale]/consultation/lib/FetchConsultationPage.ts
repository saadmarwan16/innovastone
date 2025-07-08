import { env } from "@/env";
import { ConsultationPageSchema, TConsultationPage } from "./types";
import { fetchWithZod } from "@/utils/fetchWithZod";
import qs from "qs";
import { getTranslations } from "next-intl/server";
import { Locale } from "next-intl";

export class FetchConsultationPage {
  private static readonly ENDPOINT = `${env.NEXT_PUBLIC_BACKEND_URL}/api/consultation`;

  public static async execute(locale: Locale): Promise<TConsultationPage> {
    const t = await getTranslations();

    try {
      return await fetchWithZod(
        ConsultationPageSchema,
        `${this.ENDPOINT}?${this.generateQueryString(locale)}`
      );
    } catch (error) {
      console.error("Failed to fetch consultation page data:", error); // Log the error to an error loggin service for debugging
      throw new Error(
        t("ErrorPage.message", { name: t("ConsultationPage.name") })
      );
    }
  }

  private static generateQueryString(locale: Locale): string {
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
        locale: locale,
      },
      { encodeValuesOnly: true }
    );
  }
}
