import { Metadata } from "next";
import { Locale } from "next-intl";
import { FunctionComponent, Suspense } from "react";
import Loading from "@/components/shared/Loading";
import HomeBoundary from "./HomeBoundary";
import { FetchHomePage } from "./lib/FetchHomePage";
import { ConvertJsonToMetadata } from "@/lib/ConvertJsonToMetadata";

interface HomePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export const generateMetadata = async ({
  params,
}: HomePageProps): Promise<Metadata> => {
  const { locale } = await params;
  const homepage = await FetchHomePage.execute(locale);

  return ConvertJsonToMetadata.execute(homepage.data.seo);
};

const HomePage: FunctionComponent<HomePageProps> = async ({ params }) => {
  const { locale } = await params;

  return (
    <Suspense fallback={<Loading />}>
      <HomeBoundary locale={locale} />
    </Suspense>
  );
};

export const revalidate = 60;

export default HomePage;
