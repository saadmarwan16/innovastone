import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from "@/components/ThemeProvider";
import { Playfair_Display, Montserrat } from 'next/font/google';
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Toaster } from "@/components/ui/toaster";

// Initialize the fonts
const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'InnovaStone Design | Luxury Natural Stone Solutions',
  description: 'Premium natural stone solutions for luxury spaces. Discover our curated collection of marble, travertine, and exclusive design materials.',
  keywords: 'natural stone, marble, travertine, luxury design, interior design, exterior design, Denizli, Turkey',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${montserrat.variable}`}>
      <head />
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}