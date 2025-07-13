import { QueryParams } from "next-intl/navigation";
import { CollectionsParams } from "../types/params";

export class GenerateNewQuery {
  public static execute(params: CollectionsParams): QueryParams {
    return {
      ...params,
      category: this.category(params, params.category).category,
      colors: this.colors(params, params.colors).colors,
      uses: this.uses(params, params.uses).uses,
      sort: this.sort(params, params.sort).sort,
    };
  }

  public static search(
    params: CollectionsParams,
    search?: string
  ): QueryParams {
    if (!search) {
      const { search: _, ...rest } = params;
      return rest;
    }

    return {
      ...params,
      search: search.toLowerCase(),
    };
  }

  public static category(
    params: CollectionsParams,
    category?: string | string[]
  ): QueryParams {
    if (!category) {
      const { category: _, ...rest } = params;
      return rest;
    }

    return {
      ...params,
      category: Array.isArray(category)
        ? category.map((cat) => cat.toLowerCase())
        : [category.toLowerCase()],
    };
  }

  public static colors(
    params: CollectionsParams,
    colors?: string | string[]
  ): QueryParams {
    if (!colors) {
      const { colors: _, ...rest } = params;
      return rest;
    }

    return {
      ...params,
      colors: Array.isArray(colors)
        ? colors.map((color) => color.toLowerCase())
        : [colors.toLowerCase()],
    };
  }

  public static uses(
    params: CollectionsParams,
    uses?: string | string[]
  ): QueryParams {
    if (!uses) {
      const { uses: _, ...rest } = params;
      return rest;
    }

    return {
      ...params,
      uses: Array.isArray(uses)
        ? uses.map((use) => use.toLowerCase())
        : [uses.toLowerCase()],
    };
  }

  public static sort(params: CollectionsParams, sort?: string): QueryParams {
    if (!sort) {
      const { sort: _, ...rest } = params;
      return rest;
    }

    return {
      ...params,
      sort: sort.toLowerCase(),
    };
  }
}
