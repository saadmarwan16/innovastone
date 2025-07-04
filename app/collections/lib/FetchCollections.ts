import { env } from "@/env";
import { fetchWithZod } from "@/utils/fetchWithZod";
import qs from "qs";
import { CollectionsParams } from "../types/params";
import { GenerateQueryString } from "./GenerateQueryString";
import { CollectionsSchema, TCollections } from "../types/collections";

export class FetchCollections {
  private static readonly ENDPOINT = `${env.NEXT_PUBLIC_BACKEND_URL}/api/collections`;

  public static async execute(
    params: CollectionsParams
  ): Promise<TCollections> {
    try {
      const query = `${this.generateQueryString(
        params.page
      )}&${GenerateQueryString.execute(params)}`;

      const res = await fetchWithZod(CollectionsSchema, `${this.ENDPOINT}?${query}`);

      return res;
    } catch (error) {
      console.error("Failed to fetch collections page data:", error); // Log the error to an error loggin service for debugging
      throw error;
    }
  }

  private static generateQueryString(page?: number): string {
    return qs.stringify(
      {
        fields: ["name", "description", "is_new"],
        populate: {
          hero_image: {
            fields: ["url"],
          },
        },
        pagination: {
          pageSize: 1,
          page: page ?? 1,
        },
        locale: "en",
      },
      { encodeValuesOnly: true }
    );
  }
}
