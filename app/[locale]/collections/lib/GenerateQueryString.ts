import qs from "qs";
import { CollectionsParams } from "../types/params";

const sort: { [key: string]: string } = {
  most_popularity: "popularity:desc",
  least_popularity: "popularity:asc",
  most_luxurious: "luxury_score:desc",
  least_luxurious: "luxury_score:asc",
  alphabetical: "name:asc",
  reverse_alphabetical: "name:desc",
};

export class GenerateQueryString {
  public static execute(params: CollectionsParams): string {
    const searchString = this.generateSearchQueryString(params.search);
    const filterString = this.generateUnifiedFilterQueryString(
      this.prepareParams(params.category),
      this.prepareParams(params.uses),
      this.prepareParams(params.colors)
    );
    const sortString = this.generateSortQueryString(params.sort);

    const query = `${searchString}${filterString}${sortString}`;
    if (query.length > 0 && query[0] === "&") {
      return query.slice(1); // Remove leading '&' if present
    }
    
    return query;
  }

  private static prepareParams(value: string | string[] | undefined): string[] {
    if (!value) {
      return [];
    }

    if (typeof value === "string") {
      return [value];
    }

    return value;
  }

  private static generateSearchQueryString(search: string | undefined): string {
    if (typeof search !== "string") {
      return "";
    }

    const query = qs.stringify(
      {
        filters: {
          name: {
            $containsi: search,
          },
        },
      },
      { encodeValuesOnly: true }
    );

    return query;
  }

  private static generateUnifiedFilterQueryString(
    category: string[],
    uses: string[],
    colors: string[]
  ): string {
    const query = qs.stringify(
      {
        filters: {
          $and: [
            this.generateCategoryQueryString(category),
            this.generateUsesQueryString(uses),
            this.generateColorsQueryString(colors),
          ],
        },
      },
      { encodeValuesOnly: true }
    );

    return !!query ? `&${query}` : "";
  }

  private static generateCategoryQueryString(search: string[]) {
    const query = {
      $or: search.map((value) => ({
        category: {
          value: {
            $eqi: value,
          },
        },
      })),
    };

    return query;
  }

  private static generateUsesQueryString(search: string[]) {
    const query = {
      $or: search.map((value) => ({
        uses: {
          value: {
            $eqi: value,
          },
        },
      })),
    };

    return query;
  }

  private static generateColorsQueryString(search: string[]) {
    const query = {
      $or: search.map((value) => ({
        colors: {
          value: {
            $eqi: value,
          },
        },
      })),
    };

    return query;
  }

  private static generateSortQueryString(value: string | undefined): string {
    if (typeof value !== "string") {
      return "";
    }

    const sortValue: string | undefined = sort[value];
    if (!sortValue) {
      return "";
    }

    const query = qs.stringify(
      {
        sort: [sortValue],
      },
      { encodeValuesOnly: true }
    );

    return !!query ? `&${query}` : "";
  }
}
