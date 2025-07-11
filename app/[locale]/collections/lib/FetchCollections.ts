import { env } from "@/env";
import { fetchWithZod } from "@/utils/fetchWithZod";
import qs from "qs";
import { CollectionsParams } from "../types/params";
import { GenerateQueryString } from "./GenerateQueryString";
import { CollectionsSchema, TCollections } from "../types/collections";
import { Locale } from "next-intl";

export class FetchCollections {
  private static readonly ENDPOINT = `${env.NEXT_PUBLIC_BACKEND_URL}/api/collections`;

  public static async execute(
    params: CollectionsParams,
    locale: Locale
  ): Promise<TCollections> {
    try {
      console.log("Fetching collections list data with params:", params);
      const query = `${this.generateQueryString(
        locale,
        params.page
      )}&${GenerateQueryString.execute(params)}`;
      console.log("Generated query string:", query);

      return await fetchWithZod(CollectionsSchema, `${this.ENDPOINT}?${query}`);
    } catch (error) {
      console.error("Failed to fetch collections list data:", error); // Log the error to an error loggin service for debugging
      throw error;
    }
  }

  private static generateQueryString(locale: Locale, page?: number): string {
    return qs.stringify(
      {
        fields: ["name", "description", "is_new", "slug"],
        populate: {
          hero_image: {
            fields: ["url"],
          },
        },
        pagination: {
          pageSize: 9,
          page: page ?? 1,
        },
        locale: locale,
      },
      { encodeValuesOnly: true }
    );
  }
}
