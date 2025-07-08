import CollectionsClient from "./CollectionsClient";
import { FetchCollectionsPage } from "./lib/FetchCollectionsPage";
import { CollectionsParams } from "./types/params";
import { Locale } from "next-intl";
import { FunctionComponent } from "react";

interface CollectionsBoundaryProps {
  locale: Locale;
  searchParams: CollectionsParams;
}

const CollectionsBoundary: FunctionComponent<
  CollectionsBoundaryProps
> = async ({ locale, searchParams }) => {
  const collections = await FetchCollectionsPage.execute(locale);

  return (
    <CollectionsClient
      data={collections.data}
      params={searchParams}
      locale={locale}
    />
  );
};

export default CollectionsBoundary;
