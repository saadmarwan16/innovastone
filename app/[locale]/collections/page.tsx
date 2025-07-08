import { Metadata } from "next";
import { CollectionsParams } from "./types/params";
import { Locale } from "next-intl";
import { FunctionComponent, Suspense } from "react";
import CollectionsBoundary from "./CollectionsBoundary";
import Loading from "@/components/shared/Loading";

export const metadata: Metadata = {
  title: "Stone Collections | InnovaStone Design",
  description:
    "Explore our curated collection of premium natural stones. Filter by color, finish, and usage to find the perfect stone for your luxury project.",
  keywords:
    "natural stone collections, marble collection, travertine, stone filters, luxury stone, stone catalog, premium stone, natural stone, innovastone, design, doğaltaş",
  openGraph: {
    title: "Stone Collections | InnovaStone Design",
    description:
      "Explore our curated collection of premium natural stones for your luxury project.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "InnovaStone Design - Stone Collections",
      },
    ],
  },
};

export const runtime = "edge";

interface CollectionsPageProps {
  params: { locale: Locale };
  searchParams: CollectionsParams;
}

const CollectionsPage: FunctionComponent<CollectionsPageProps> = ({
  params: { locale },
  searchParams,
}) => {
  return (
    <Suspense fallback={<Loading />}>
      <CollectionsBoundary searchParams={searchParams} locale={locale} />
    </Suspense>
  );
};

export default CollectionsPage;
