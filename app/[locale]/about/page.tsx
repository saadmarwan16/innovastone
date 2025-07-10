import { Metadata } from "next";
import { Locale } from "next-intl";
import { FunctionComponent, Suspense } from "react";
import AboutBoundary from "./AboutBoundary";
import Loading from "@/components/shared/Loading";
import { FetchAboutPage } from "./lib/FetchAboutPage";
import { ConvertJsonToMetadata } from "@/lib/ConvertJsonToMetadata";

interface AboutPageProps {
  params: Promise<{ locale: Locale }>;
}

export const generateMetadata = async ({
  params,
}: AboutPageProps): Promise<Metadata> => {
  const { locale } = await params;
  const aboutPage = await FetchAboutPage.execute(locale);

  return ConvertJsonToMetadata.execute(aboutPage.data.seo);
};

const AboutPage: FunctionComponent<AboutPageProps> = async ({ params }) => {
  const { locale } = await params;

  return (
    <Suspense fallback={<Loading />}>
      <AboutBoundary locale={locale} />
    </Suspense>
  );
};

export default AboutPage;
