import { Metadata } from "next";
import { Locale } from "next-intl";
import { FunctionComponent, Suspense } from "react";
import Loading from "@/components/shared/Loading";
import ConsultationBoundary from "./ConsultationBoundary";
import { FetchConsultationPage } from "./lib/FetchConsultationPage";
import { ConvertJsonToMetadata } from "@/lib/ConvertJsonToMetadata";

interface ConsultationPageProps {
  params: Promise<{ locale: Locale }>;
}

export const generateMetadata = async ({
  params,
}: ConsultationPageProps): Promise<Metadata> => {
  const { locale } = await params;
  const consultationPage = await FetchConsultationPage.execute(locale);

  return ConvertJsonToMetadata.execute(consultationPage.data.seo);
};

const ConsultationPage: FunctionComponent<ConsultationPageProps> = async ({
  params,
}) => {
  const { locale } = await params;

  return (
    <Suspense fallback={<Loading />}>
      <ConsultationBoundary locale={locale} />
    </Suspense>
  );
};

export const revalidate = 60;

export default ConsultationPage;
