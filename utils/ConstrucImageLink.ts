import { env } from "@/env";

export class ConstructImageLink {
  private static readonly ENDPOINT = env.NEXT_PUBLIC_BACKEND_URL;

  static execute(imageUrl: string): string {
    if (this.isUrlFormatted(imageUrl)) {
      return imageUrl;
    } else {
      return `${this.ENDPOINT}${imageUrl}`;
    }
  }

  private static isUrlFormatted(url: string): boolean {
    return url.startsWith("http://") || url.startsWith("https://");
  }
}
