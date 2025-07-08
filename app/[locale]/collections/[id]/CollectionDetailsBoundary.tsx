import { CollectionDetails } from "./CollectionDetails";
import { FunctionComponent } from "react";
import { FetchCollectionsDetailsPage } from "./lib/FetchCollectionDetailsPage";
import { Locale } from "next-intl";

interface CollectionDetailsBoundaryProps {
  id: string;
  locale: Locale;
}

const CollectionDetailsBoundary: FunctionComponent<
  CollectionDetailsBoundaryProps
> = async ({ id, locale }) => {
  const collection = await FetchCollectionsDetailsPage.execute(id, locale);

  return <CollectionDetails collection={collection.data} />;
};

export default CollectionDetailsBoundary;
