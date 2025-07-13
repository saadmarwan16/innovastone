import qs from "qs";
import { fetchWithZod } from "@/utils/fetchWithZod";
import { Locale } from "next-intl";
import { SitemapSchema, TSitemapData } from "./types";

export class FetchAllSitemapData {
  public static async execute(endpoint: string, locale: Locale) {
    let allData: TSitemapData = [];
    let currentPage = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      const response = await this.fetchPage(endpoint, locale, currentPage);

      if (!response) {
        console.error("Failed to fetch page data for sitemap");
        break;
      }

      allData = [...allData, ...response.data];

      hasNextPage = currentPage < response.meta.pagination.pageCount;
      currentPage++;
    }

    return allData;
  }

  private static async fetchPage(
    endpoint: string,
    locale: Locale,
    page?: number
  ) {
    try {
      const response = await fetchWithZod(
        SitemapSchema,
        `${endpoint}?${this.generateQueryString(locale, page)}`
      );

      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  private static generateQueryString(locale: Locale, page?: number): string {
    return qs.stringify(
      {
        fields: ["slug"],
        pagination: {
          pageSize: 500,
          page: page,
        },
        locale: locale,
      },
      { encodeValuesOnly: true }
    );
  }
}
