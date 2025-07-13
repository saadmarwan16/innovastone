import { JsonLd } from "@/lib/seo";
import ContactClient from "./ContactClient";
import { FetchContactPage } from "./lib/FetchContactPage";
import { Locale } from "next-intl";
import { FunctionComponent } from "react";

interface ContactBoundaryProps {
  locale: Locale;
}

const ContactBoundary: FunctionComponent<ContactBoundaryProps> = async ({
  locale,
}) => {
  const contact = await FetchContactPage.execute(locale);

  return (
    <>
      <ContactClient data={contact.data} />
      <JsonLd data={contact.data.seo.structuredData} />
    </>
  );
};

export default ContactBoundary;
