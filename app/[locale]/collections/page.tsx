import { Metadata } from "next";
import { CollectionsParams } from "./types/params";
import { Locale } from "next-intl";
import { FunctionComponent, Suspense } from "react";
import CollectionsBoundary from "./CollectionsBoundary";
import Loading from "@/components/shared/Loading";
import { FetchCollectionsPage } from "./lib/FetchCollectionsPage";
import { ConvertJsonToMetadata } from "@/lib/ConvertJsonToMetadata";

interface CollectionsPageProps {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<CollectionsParams>;
}

export const generateMetadata = async ({
  params,
}: CollectionsPageProps): Promise<Metadata> => {
  const { locale } = await params;
  const collectionsPage = await FetchCollectionsPage.execute(locale);

  return ConvertJsonToMetadata.execute(collectionsPage.data.seo);
};

const CollectionsPage: FunctionComponent<CollectionsPageProps> = async ({
  params,
  searchParams,
}) => {
  const { locale } = await params;

  return (
    <Suspense fallback={<Loading />}>
      <CollectionsBoundary searchParams={await searchParams} locale={locale} />
    </Suspense>
  );
};

export const revalidate = 60;

export default CollectionsPage;
