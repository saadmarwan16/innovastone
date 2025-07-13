import { FetchAboutPage } from "./lib/FetchAboutPage";
import AboutClient from "./AboutClient";
import { Locale } from "next-intl";
import { FunctionComponent } from "react";
import { JsonLd } from "@/lib/seo";

interface AboutBoundaryProps {
  locale: Locale;
}

const AboutBoundary: FunctionComponent<AboutBoundaryProps> = async ({
  locale,
}) => {
  const aboutpage = await FetchAboutPage.execute(locale);

  return (
    <>
      <AboutClient data={aboutpage.data} />
      <JsonLd data={aboutpage.data.seo.structuredData} />
    </>
  );
};

export default AboutBoundary;
