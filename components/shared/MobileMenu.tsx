'use client'

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface MobileMenuProps {
  navigation: Array<{ name: string; href: string; }>;
}

export function MobileMenu({ navigation }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="text-stone-marble hover:text-stone-gold hover:bg-white/10"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
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
            <Link
              href="/consultation"
              className="bg-stone-gold hover:bg-stone-gold/90 text-white transition-all duration-500 px-4 py-2 rounded-lg text-center"
              onClick={() => setIsOpen(false)}
            >
              Schedule Consultation
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}