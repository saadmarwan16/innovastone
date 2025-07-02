import { Metadata } from "next";
import ConsultationClient from "./ConsultationClient";
import { FetchConsultationPage } from "./lib/FetchConsultationPage";

export const metadata: Metadata = {
  title: "Schedule a Consultation | InnovaStone Design",
  description:
    "Let's discuss your vision and create something extraordinary together. Book a consultation with our natural stone experts to bring your project to life.",
  keywords:
    "stone consultation, design consultation, natural stone experts, book appointment, innovastone consultation, natural stone, innovastone, design, doğaltaş",
  openGraph: {
    title: "Schedule a Consultation | InnovaStone Design",
    description:
      "Let's discuss your vision and create something extraordinary together with premium natural stone.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "InnovaStone Design - Schedule a Consultation",
      },
    ],
  },
};

export const runtime = "edge";

const ConsultationPage = async () => {
  const consultation = await FetchConsultationPage.execute();

  return <ConsultationClient data={consultation.data} />;
};

export default ConsultationPage;
