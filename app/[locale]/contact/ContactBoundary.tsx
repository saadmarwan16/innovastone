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

  return <ContactClient data={contact.data} />;
};

export default ContactBoundary;
