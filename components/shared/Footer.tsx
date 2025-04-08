import { FunctionComponent } from "react";
import {
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import Link from "next/link";
import { navigation } from "@/lib/utils/navigation";
import Image from "next/image";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <footer className="bg-stone-charcoal text-stone-marble">
      <div className="container py-16">
        {/* Upper Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="w-40 h-32 relative block">
              <Image src="/logo.png" alt="Logo" fill className="object-fill" />
            </Link>
            <p className="text-stone-marble/70 font-light leading-relaxed">
              Crafting timeless elegance through premium natural stone
              solutions. Your vision, our expertise.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-stone-gold/20 transition-colors duration-300"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-stone-gold/20 transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-stone-gold/20 transition-colors duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-stone-marble/70 hover:text-stone-gold transition-colors duration-300 flex items-center gap-2"
                  >
                    <ChevronRight className="h-4 w-4" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-stone-gold shrink-0 mt-1" />
                <p className="text-stone-marble/70">
                  Sümer Mahallesi
                  <br />
                  2482/2 Sokak Sky City B Blok
                  <br />
                  İş Merkezi No: 1 İç Kapı No:63
                  <br />
                  Merkezefendi, Denizli, Turkey
                </p>
              </li>
              <li>
                <Link
                  href="tel:+902581234567"
                  className="flex items-center gap-3 text-stone-marble/70 hover:text-stone-gold transition-colors duration-300"
                >
                  <Phone className="h-5 w-5 text-stone-gold" />
                  +90 531 762 84 48
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:info@innovastone.com"
                  className="flex items-center gap-3 text-stone-marble/70 hover:text-stone-gold transition-colors duration-300"
                >
                  <Mail className="h-5 w-5 text-stone-gold" />
                  info@innovastone.co
                </Link>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-lg font-bold mb-6">Business Hours</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-stone-gold shrink-0 mt-1" />
                <div className="text-stone-marble/70">
                  <p className="font-medium text-stone-marble">
                    Monday - Friday
                  </p>
                  <p>9:00 AM - 6:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-stone-gold shrink-0 mt-1" />
                <div className="text-stone-marble/70">
                  <p className="font-medium text-stone-marble">Saturday</p>
                  <p>10:00 AM - 4:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-stone-gold shrink-0 mt-1" />
                <div className="text-stone-marble/70">
                  <p className="font-medium text-stone-marble">Sunday</p>
                  <p>Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Lower Footer */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-end items-center gap-4">
            <p className="text-stone-marble/60 text-sm">
              &copy; {new Date().getFullYear()} InnovaStone Design. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
