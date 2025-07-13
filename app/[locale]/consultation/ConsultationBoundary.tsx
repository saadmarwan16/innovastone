import { JsonLd } from "@/lib/seo";
import ConsultationClient from "./ConsultationClient";
import { FetchConsultationPage } from "./lib/FetchConsultationPage";
import { Locale } from "next-intl";
import { FunctionComponent } from "react";

interface ConsultationBoundaryProps {
  locale: Locale;
}

const ConsultationBoundary: FunctionComponent<
  ConsultationBoundaryProps
> = async ({ locale }) => {
  const consultation = await FetchConsultationPage.execute(locale);

  return (
    <>
      <ConsultationClient data={consultation.data} />
      <JsonLd data={consultation.data.seo.structuredData} />
    </>
  );
};

export default ConsultationBoundary;
