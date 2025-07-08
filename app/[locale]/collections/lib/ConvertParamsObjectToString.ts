import { CollectionsParams } from "../types/params";

export class ConvertParamsObjectToString {
  private static readonly ENDPOINT = `/collections`;

  public static execute(params: CollectionsParams) {
    const searchString = this.convertSearchToString(params.search);
    const categoryString = this.convertCategoryToString(params.category);
    const colorsString = this.convertColorsToString(params.colors);
    const usesString = this.convertUsesToString(params.uses);
    const sortString = this.convertSortToString(params.sort);
    const queryString = `${searchString}${categoryString}${colorsString}${usesString}${sortString}`;

    return `${this.ENDPOINT}?${
      queryString.startsWith("&") ? queryString.slice(1) : queryString
    }`;
  }

  private static convertSearchToString(
    search: string | string[] | undefined
  ): string {
    if (typeof search !== "string" || search.trim() === "") {
      return "";
    }

    return `search=${encodeURIComponent(search.toLowerCase())}`;
  }

  private static convertCategoryToString(
    category: string | string[] | undefined
  ): string {
    if (!category) {
      return "";
    }

    if (typeof category === "string") {
      return `&category=${encodeURIComponent(category.toLowerCase())}`;
    }

    return category
      .map(
        (category) => `&category=${encodeURIComponent(category.toLowerCase())}`
      )
      .join("");
  }

  private static convertColorsToString(
    colors: string | string[] | undefined
  ): string {
    if (!colors) {
      return "";
    }

    if (typeof colors === "string") {
      return `&colors=${encodeURIComponent(colors.toLowerCase())}`;
    }

    return colors
      .map((color) => `&colors=${encodeURIComponent(color.toLowerCase())}`)
      .join("");
  }

  private static convertUsesToString(
    uses: string | string[] | undefined
  ): string {
    if (!uses) {
      return "";
    }

    if (typeof uses === "string") {
      return `&uses=${encodeURIComponent(uses.toLowerCase())}`;
    }

    return uses
      .map((use) => `&uses=${encodeURIComponent(use.toLowerCase())}`)
      .join("");
  }

  private static convertSortToString(
    sort: string | string[] | undefined
  ): string {
    if (typeof sort !== "string") {
      return "";
    }

    return `&sort=${encodeURIComponent(sort.toLowerCase())}`;
  }
}
