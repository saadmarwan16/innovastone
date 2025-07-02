import { FunctionComponent } from "react";
import { TContactPageConnect } from "../lib/types";
import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";

interface ConnectProps {
  data: TContactPageConnect;
}

const icons: { [key: string]: JSX.Element } = {
  facebook: <Facebook className="h-5 w-5" />,
  instagram: <Instagram className="h-5 w-5" />,
  linkedin: <Linkedin className="h-5 w-5" />,
};

const Connect: FunctionComponent<ConnectProps> = ({ data }) => {
  return (
    <div className="glass-effect rounded-2xl p-8">
      <h3 className="text-xl font-bold text-stone-charcoal mb-6">
        Connect With Us
      </h3>
      <div className="flex items-center gap-4">
        {data.map((social, index) => (
          <Link
            key={index}
            href={social.href}
            target="_blank"
            className="w-12 h-12 rounded-full bg-stone-gold/10 flex items-center justify-center text-stone-gold hover:bg-stone-gold hover:text-white transition-all duration-300"
            aria-label={social.label}
          >
            {icons[social.icon]}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Connect;
