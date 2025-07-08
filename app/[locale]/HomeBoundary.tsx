import { FunctionComponent } from "react";
import HomeClient from "./components/HomeClient";
import { FetchHomePage } from "./lib/FetchHomePage";
import { Locale } from "next-intl";

interface HomeBoundaryProps {
  locale: Locale;
}

const HomeBoundary: FunctionComponent<HomeBoundaryProps> = async ({
  locale,
}) => {
  const homepage = await FetchHomePage.execute(locale);

  return <HomeClient data={homepage.data} />;
};

export default HomeBoundary;
