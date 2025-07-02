import { FunctionComponent } from "react";
import { TAboutPageFounder } from "../lib/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { ConstructImageLink } from "@/utils/ConstrucImageLink";

interface FounderProps {
  data: TAboutPageFounder;
}

const Founder: FunctionComponent<FounderProps> = ({ data }) => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 marble-pattern" />
      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[600px] rounded-2xl overflow-hidden">
            <Image
              src={ConstructImageLink.execute(data.image.url)}
              alt="Mamadou Ndiaye - Founder"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="decorative-frame glass-effect rounded-2xl p-12">
            <h2 className="text-4xl font-bold text-stone-charcoal mb-6">
              Meet Our Founder
            </h2>
            <div className="elegant-divider w-1/3 mb-8" />
            <p className="text-lg text-stone-charcoal/80 mb-6 leading-relaxed">
              {data.description}
            </p>
            <Link
              href="https://www.linkedin.com/in/mamadou-ndiaye-99b37aa3"
              target="_blank"
            >
              <Button className="w-full bg-stone-gold hover:bg-stone-gold/90 text-white transition-all duration-500 hover:-translate-y-1">
                Read Full Story
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
