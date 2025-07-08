import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr", "tr"],
  defaultLocale: "en",
  localePrefix: {
    mode: "always",
    prefixes: {
      en: "/en",
      fr: "/fr",
      tr: "/tr",
    },
  },
  pathnames: {
    "/": "/",
    "/collections": {
      en: "/collections",
      fr: "/collections",
      tr: "/koleksiyonlar",
    },
    "/collections/[id]": {
      en: "/collections/[id]",
      fr: "/collections/[id]",
      tr: "/koleksiyonlar/[id]",
    },
    "/about": {
      en: "/about",
      fr: "/a-propos",
      tr: "/hakkinda",
    },
    "/consultation": {
      en: "/consultation",
      fr: "/consultation",
      tr: "/danisma",
    },
    "/contact": {
      en: "/contact",
      fr: "/contacter",
      tr: "/iletisim",
    },
  },
});
