import { Metadata } from "next";
import CollectionsClient from "./CollectionsClient";
import { FetchCollectionsPage } from "./lib/FetchCollectionsPage";
import { CollectionsParams } from "./types/params";

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
  searchParams: CollectionsParams;
}

const CollectionsPage = async ({ searchParams }: CollectionsPageProps) => {
  const collections = await FetchCollectionsPage.execute();

  return <CollectionsClient data={collections.data} params={searchParams} />;
};

export default CollectionsPage;
