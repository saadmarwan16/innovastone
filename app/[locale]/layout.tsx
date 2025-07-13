import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Playfair_Display, Montserrat } from "next/font/google";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Toaster } from "@/components/ui/toaster";
import { Locale, NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { FunctionComponent, PropsWithChildren } from "react";
import { setRequestLocale } from "next-intl/server";

// Initialize the fonts
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
});

interface LocaleLayoutProps extends PropsWithChildren {
  params: Promise<{ locale: Locale }>;
}

export const metadata: Metadata = {
  title: "Luxury Natural Stone Solutions | InnovaStone Design",
  description:
    "Premium natural stone solutions for luxury spaces. Discover our curated collection of marble, travertine, and exclusive design materials.",
  keywords:
    "natural stone, marble, travertine, luxury design, interior design, exterior design, Denizli, Turkey",
};

const LocaleLayout: FunctionComponent<LocaleLayoutProps> = async ({
  children,
  params,
}) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${playfair.variable} ${montserrat.variable}`}
    >
      <head />
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <Header locale={locale} />
            {children}
            <Footer />
            <Toaster />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

export default LocaleLayout;
