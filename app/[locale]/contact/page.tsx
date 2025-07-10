import { Metadata } from "next";
import { FetchContactPage } from "./lib/FetchContactPage";
import { Locale } from "next-intl";
import { FunctionComponent, Suspense } from "react";
import ContactBoundary from "./ContactBoundary";
import Loading from "@/components/shared/Loading";
import { ConvertJsonToMetadata } from "@/lib/ConvertJsonToMetadata";

interface ContactPageProps {
  params: Promise<{ locale: Locale }>;
}

export const generateMetadata = async ({
  params,
}: ContactPageProps): Promise<Metadata> => {
  const { locale } = await params;
  const contactPage = await FetchContactPage.execute(locale);

  return ConvertJsonToMetadata.execute(contactPage.data.seo);
};

const ContactPage: FunctionComponent<ContactPageProps> = async ({ params }) => {
  const { locale } = await params;

  return (
    <Suspense fallback={<Loading />}>
      <ContactBoundary locale={locale} />
    </Suspense>
  );
};

export default ContactPage;
