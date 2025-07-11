import { CollectionDetails } from "./CollectionDetails";
import { FunctionComponent } from "react";
import { FetchCollectionsDetailsPage } from "./lib/FetchCollectionDetailsPage";
import { Locale } from "next-intl";

interface CollectionDetailsBoundaryProps {
  slug: string;
  locale: Locale;
}

const CollectionDetailsBoundary: FunctionComponent<
  CollectionDetailsBoundaryProps
> = async ({ slug, locale }) => {
  const collection = await FetchCollectionsDetailsPage.execute(slug, locale);

  return <CollectionDetails collection={collection.data} />;
};

export default CollectionDetailsBoundary;
