import { MetadataRoute } from "next";
import { env } from "@/env";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { Locale } from "next-intl";
import { FetchAllSitemapData } from "@/lib/FetchAllSitemapData";

const BASE_URL = "https://innovastone.co";

interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: "weekly";
  priority: number;
}

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const collections = routing.locales.map(async (locale) => {
    const collections = await FetchAllSitemapData.execute(
      `${env.NEXT_PUBLIC_BACKEND_URL}/api/collections`,
      locale
    );

    return collections.map((activity) =>
      getLocalizedEntry(locale, activity.slug)
    );
  });
  const entries = await Promise.all(collections);
  return [
    ...routing.locales.map((locale) => getEntry("/", locale, 1.0)),
    ...routing.locales.map((locale) => getEntry("/about", locale, 0.9)),
    ...routing.locales.map((locale) => getEntry("/collections", locale, 0.8)),
    ...routing.locales.map((locale) => getEntry("/consultation", locale, 0.9)),
    ...routing.locales.map((locale) => getEntry("/contact", locale, 0.9)),
    ...entries.flat(),
  ];
};

type Href = Parameters<typeof getPathname>[0]["href"];

function getLocalizedEntry(locale: string, slug: string): SitemapEntry {
  const pathname = `${BASE_URL}${getPathname({
    href: "/collections",
    locale,
  })}/${slug}`;

  return {
    url: pathname,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  };
}

function getEntry(href: Href, locale: Locale, priority: number): SitemapEntry {
  return {
    url: getUrl(href, locale),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority,
  };
}

function getUrl(href: Href, locale: Locale) {
  const pathname = getPathname({ locale, href });

  return BASE_URL + pathname;
}

export default sitemap;
