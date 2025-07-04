import { CollectionsParams } from "../types/params";
import { ConvertParamsObjectToString } from "./ConvertParamsObjectToString";

export class GenerateUrlQueryString {
  public static search(params: CollectionsParams, search?: string): string {
    return ConvertParamsObjectToString.execute({ ...params, search });
  }

  public static category(
    params: CollectionsParams,
    category?: string | string[]
  ): string {
    return ConvertParamsObjectToString.execute({ ...params, category });
  }

  public static colors(
    params: CollectionsParams,
    colors?: string | string[]
  ): string {
    return ConvertParamsObjectToString.execute({ ...params, colors });
  }

  public static uses(
    params: CollectionsParams,
    uses?: string | string[]
  ): string {
    return ConvertParamsObjectToString.execute({ ...params, uses });
  }

  public static sort(params: CollectionsParams, sort?: string): string {
    return ConvertParamsObjectToString.execute({ ...params, sort });
  }
}
