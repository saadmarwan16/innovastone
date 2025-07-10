import { FunctionComponent, Suspense } from "react";
import { Metadata } from "next";
import { Locale } from "next-intl";
import Loading from "@/components/shared/Loading";
import { FetchCollections } from "../lib/FetchCollections";
import CollectionDetailsBoundary from "./CollectionDetailsBoundary";
import { FetchCollectionsDetailsPage } from "./lib/FetchCollectionDetailsPage";
import { ConvertJsonToMetadata } from "@/lib/ConvertJsonToMetadata";

interface CollectionDetailsPageProps {
  params: Promise<{
    id: string;
    locale: Locale;
  }>;
}

export const generateMetadata = async ({
  params,
}: CollectionDetailsPageProps): Promise<Metadata> => {
  const { id, locale } = await params;
  const collection = await FetchCollectionsDetailsPage.execute(id, locale);

  return ConvertJsonToMetadata.execute(collection.data.seo);
};

const CollectionDetailsPage: FunctionComponent<
  CollectionDetailsPageProps
> = async ({ params }) => {
  const { id, locale } = await params;

  return (
    <Suspense fallback={<Loading />}>
      <CollectionDetailsBoundary id={id} locale={locale} />
    </Suspense>
  );
};

export const generateStaticParams = async ({
  params,
}: CollectionDetailsPageProps) => {
  const { locale } = await params;
  const { data } = await FetchCollections.execute({ page: 1 }, locale);

  return data.map((collection) => ({
    id: collection.documentId,
    locale: locale,
  }));
};

export default CollectionDetailsPage;
