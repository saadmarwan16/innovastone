"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { getPathname, Link } from "@/i18n/navigation";
import { LanguageSelector } from "./LanguageSelector";
import { Locale } from "next-intl";

type Href = Parameters<typeof getPathname>[0]["href"];

interface MobileMenuProps {
  navigation: Array<{ name: string; href: Href }>;
  scheduleConsultationText: string;
  locale: Locale;
}

export function MobileMenu({
  navigation,
  scheduleConsultationText,
  locale,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="text-stone-marble hover:text-stone-gold hover:bg-white/10"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 p-4 bg-stone-charcoal/95 backdrop-blur-lg border-b border-white/10">
          <nav className="flex flex-col space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-stone-marble/90 hover:text-stone-gold transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-white/5"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center justify-end mt-4 gap-6 flex-col sm:flex-row px-4">
              <div className="block lg:hidden w-full sm:w-auto">
                <LanguageSelector locale={locale} />
              </div>
              <Link
                href="/consultation"
                className="bg-stone-gold hover:bg-stone-gold/90 w-full sm:w-auto text-white transition-all duration-500 px-4 py-2 rounded-lg text-center"
                onClick={() => setIsOpen(false)}
              >
                {scheduleConsultationText}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
