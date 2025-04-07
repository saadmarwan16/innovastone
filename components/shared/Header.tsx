import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/shared/MobileMenu";
import { navigation } from "@/lib/utils/navigation";
import Image from "next/image";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-stone-charcoal/20 backdrop-blur-md border-b border-white/10" />
      <div className="container relative">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="block w-24 h-16 relative">
            <Image src="/logo.png" alt="Logo" fill className="object-fill" />
          </Link>
          <nav className="hidden md:flex items-center gap-x-4">
            {navigation.map((item) => (
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
              className="hidden md:inline-flex bg-stone-gold hover:bg-stone-gold/90 text-white transition-all duration-500"
              asChild
            >
              <Link href="/consultation">Schedule Consultation</Link>
            </Button>
            <MobileMenu navigation={navigation} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
