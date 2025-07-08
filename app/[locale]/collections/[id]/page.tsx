import { collections } from "@/lib/data/collections";
import { CollectionDetails } from "./CollectionDetails";
import { FunctionComponent, Suspense } from "react";
import { Metadata } from "next";
import { FetchCollectionsDetailsPage } from "./lib/FetchCollectionDetailsPage";
import { Locale } from "next-intl";
import Loading from "@/components/shared/Loading";

interface CollectionDetailsPageProps {
  params: {
    id: string;
    locale: Locale;
  };
}

export async function generateMetadata({
  params,
}: CollectionDetailsPageProps): Promise<Metadata> {
  // Find the current collection
  const currentCollection =
    collections.find((c) => c.id.toString() === params.id) || collections[0];

  return {
    title: `${currentCollection.name} | InnovaStone Design`,
    description: currentCollection.description,
    keywords: `${currentCollection.name}, ${
      currentCollection.category
    }, ${currentCollection.colors.join(
      ", "
    )}, ${currentCollection.finishes.join(", ")}, ${currentCollection.uses.join(
      ", "
    )}, natural stone, innovastone, design, doğaltaş`,
    openGraph: {
      title: `${currentCollection.name} | ${currentCollection.subtitle}`,
      description: currentCollection.description,
      images: [
        {
          url: currentCollection.heroImage,
          width: 1200,
          height: 630,
          alt: `InnovaStone Design - ${currentCollection.name}`,
        },
      ],
    },
  };
}

const CollectionDetailsPage: FunctionComponent<
  CollectionDetailsPageProps
> = async ({ params: { locale, id } }) => {
  const collection = await FetchCollectionsDetailsPage.execute(id, locale);

  return (
    <Suspense fallback={<Loading />}>
      <CollectionDetails collection={collection.data} />
    </Suspense>
  );
};

export const runtime = "edge";

export default CollectionDetailsPage;
