import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/shared/MobileMenu";
import Image from "next/image";
import { Locale, useTranslations } from "next-intl";
import { getPathname, Link } from "@/i18n/navigation";
import { LanguageSelector } from "./LanguageSelector";
import { FunctionComponent } from "react";

type Href = Parameters<typeof getPathname>[0]["href"];

interface HeaderProps {
  locale: Locale;
}

const Header: FunctionComponent<HeaderProps> = ({ locale }) => {
  const t = useTranslations("Shared.header");
  const tNavigation = useTranslations("Shared.header.navigation");

  const translatedNavigation: Array<{ name: string; href: Href }> = [
    { name: tNavigation("home"), href: "/" },
    { name: tNavigation("collection"), href: "/collections" },
    { name: tNavigation("about"), href: "/about" },
    { name: tNavigation("contact"), href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-stone-charcoal/20 backdrop-blur-md border-b border-white/10" />
      <div className="container relative">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="block w-24 h-16 relative">
            <Image src="/logo.png" alt="Logo" fill className="object-fill" />
          </Link>
          <nav className="hidden lg:flex items-center gap-x-4">
            {translatedNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-montserrat text-stone-marble/90 transition-colors duration-300 hover:bg-white/10 px-3 py-1 rounded-sm"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-x-4">
            <Button
              className="hidden lg:inline-flex bg-stone-gold hover:bg-stone-gold/90 text-white transition-all duration-500"
              asChild
            >
              <Link href="/consultation">{t("scheduleConsultation")}</Link>
            </Button>
            <div className="hidden lg:block">
              <LanguageSelector locale={locale} />
            </div>

            <MobileMenu
              navigation={translatedNavigation}
              scheduleConsultationText={t("scheduleConsultation")}
              locale={locale}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
