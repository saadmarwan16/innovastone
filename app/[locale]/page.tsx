import { Metadata } from "next";
import { Locale } from "next-intl";
import { FunctionComponent, Suspense } from "react";
import Loading from "@/components/shared/Loading";
import HomeBoundary from "./HomeBoundary";

export const metadata: Metadata = {
  title: "InnovaStone Design | Elevating Spaces with Timeless Elegance",
  description:
    "Crafting luxury through natural stone mastery, transforming spaces with unparalleled artistry and timeless materials. Discover our collection of premium natural stone solutions.",
  keywords:
    "natural stone, marble, luxury design, timeless elegance, stone mastery, premium materials, innovastone, design, doğaltaş",
  openGraph: {
    title: "InnovaStone Design | Elevating Spaces with Timeless Elegance",
    description:
      "Crafting luxury through natural stone mastery, transforming spaces with unparalleled artistry and timeless materials.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "InnovaStone Design - Luxury Natural Stone Solutions",
      },
    ],
  },
};

export const runtime = "edge";

interface HomePageProps {
  params: {
    locale: Locale;
  };
}

const HomePage: FunctionComponent<HomePageProps> = ({ params: { locale } }) => {
  return (
    <Suspense fallback={<Loading />}>
      <HomeBoundary locale={locale} />
    </Suspense>
  );
};

export default HomePage;
