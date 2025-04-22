import { Metadata } from "next";
import AboutClient from "@/app/about/AboutClient";

export const metadata: Metadata = {
  title: "About InnovaStone Design | Our Story & Values",
  description: "Crafting excellence in natural stone since 2015, transforming spaces with unparalleled artistry and innovation. Learn about our process, values, and team.",
  keywords: "natural stone, about innovastone, stone craftsmanship, luxury stone, stone process, stone values, stone team, natural stone, innovastone, design, doğaltaş",
  openGraph: {
    title: "About InnovaStone Design | Our Story & Values",
    description: "Crafting excellence in natural stone since 2015, transforming spaces with unparalleled artistry and innovation.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "InnovaStone Design - Our Story",
      },
    ],
  },
};

export const runtime = "edge";

export default function AboutPage() {
  return <AboutClient />;
}
