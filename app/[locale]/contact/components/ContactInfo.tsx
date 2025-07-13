import { FunctionComponent, JSX } from "react";
import { TContactPageContact } from "../lib/types";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

interface ContactInfoProps {
  data: TContactPageContact;
}

const icons: { [key: string]: JSX.Element } = {
  map: <MapPin className="h-6 w-6 text-stone-gold" />,
  phone: <Phone className="h-6 w-6 text-stone-gold" />,
  mail: <Mail className="h-6 w-6 text-stone-gold" />,
};

const ContactInfo: FunctionComponent<ContactInfoProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
      {data.map((info, index) => (
        <div
          key={index}
          className="glass-effect rounded-xl p-8 text-center hover-lift"
        >
          <div className="mb-6 flex justify-center">
            <div className="w-14 h-14 rounded-full bg-stone-gold/10 flex items-center justify-center">
              {icons[info.icon]}
            </div>
          </div>
          <h3 className="text-xl font-bold text-stone-charcoal mb-3">
            {info.title}
          </h3>
          <p className="text-stone-charcoal/70 mb-4">{info.content}</p>
          <a
            href={info.link}
            className="text-stone-gold hover:text-stone-gold/80 font-medium transition-colors duration-300"
            target={info.link.startsWith("http") ? "_blank" : undefined}
          >
            {info.link_text}
          </a>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;
