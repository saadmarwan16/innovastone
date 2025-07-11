import { Metadata } from "next";
import { TSeoMetadata } from "./types";
import { ConstructImageLink } from "@/utils/ConstrucImageLink";
import { env } from "@/env";

export class ConvertJsonToMetadata {
  private static toArrayKeywords(keywords: string): Metadata["keywords"] {
    return keywords.split(",").map((keyword) => keyword.trim());
  }

  private static parseRobots(value: string): Metadata["robots"] {
    const tokens = value.split(",").map((t) => t.trim().toLowerCase());

    return {
      index: !tokens.includes("noindex"),
      follow: !tokens.includes("nofollow"),
    };
  }

  public static execute(json: TSeoMetadata): Metadata {
    return {
      title: json.metaTitle,
      description: json.metaDescription,
      keywords: this.toArrayKeywords(json.keywords),
      robots: this.parseRobots(json.metaRobots),
      alternates: {
        canonical: json.canonicalURL,
      },
      icons: {
        icon: `${env.NEXT_PUBLIC_BASE_URL}/favicon.ico`,
      },
      assets: ConstructImageLink.execute(json.metaImage.url),
      openGraph: {
        title: json.openGraph.ogTitle,
        description: json.openGraph.ogDescription,
        url: json.openGraph.ogUrl,
        type: json.openGraph.ogType,
        siteName: "Innovastone Design",
        images: [
          {
            url: ConstructImageLink.execute(json.openGraph.ogImage.url),
            alt: json.openGraph.ogImage.alternativeText,
          },
        ],
      },
    };
  }
}
