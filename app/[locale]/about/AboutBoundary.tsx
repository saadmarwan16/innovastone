import { FetchAboutPage } from "./lib/FetchAboutPage";
import AboutClient from "./AboutClient";
import { Locale } from "next-intl";
import { FunctionComponent } from "react";

interface AboutBoundaryProps {
  locale: Locale;
}

const AboutBoundary: FunctionComponent<AboutBoundaryProps> = async ({
  locale,
}) => {
  const aboutpage = await FetchAboutPage.execute(locale);

  return <AboutClient data={aboutpage.data} />;
};

export default AboutBoundary;
