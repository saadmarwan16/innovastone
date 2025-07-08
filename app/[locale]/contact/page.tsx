import { Metadata } from "next";
import ContactClient from "./ContactClient";
import { FetchContactPage } from "./lib/FetchContactPage";
import { Locale } from "next-intl";
import { FunctionComponent, Suspense } from "react";
import ContactBoundary from "./ContactBoundary";
import Loading from "@/components/shared/Loading";

export const metadata: Metadata = {
  title: "Contact Us | InnovaStone Design",
  description:
    "Get in touch with InnovaStone Design. Contact our team for inquiries about our premium natural stone solutions, consultations, or partnership opportunities.",
  keywords:
    "contact innovastone, stone company contact, natural stone inquiry, stone consultation, luxury stone contact, natural stone, innovastone, design, doğaltaş",
  openGraph: {
    title: "Contact Us | InnovaStone Design",
    description:
      "Get in touch with InnovaStone Design. Let's discuss your vision and create something extraordinary together.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "InnovaStone Design - Contact Us",
      },
    ],
  },
};

export const runtime = "edge";

interface ContactPageProps {
  params: { locale: Locale };
}

const ContactPage: FunctionComponent<ContactPageProps> = async ({
  params: { locale },
}) => {
  const contact = await FetchContactPage.execute(locale);

  return (
    <Suspense fallback={<Loading />}>
      <ContactBoundary locale={locale} />
    </Suspense>
  );
};

export default ContactPage;
