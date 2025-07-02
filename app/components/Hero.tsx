import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { FunctionComponent } from "react";
import Link from "next/link";
import { THomepageHero } from "../lib/types";
import { ConstructImageLink } from "@/utils/ConstrucImageLink";

interface HeroProps {
  isVisible: boolean;
  data: THomepageHero;
}

const Hero: FunctionComponent<HeroProps> = ({ isVisible, data }) => {
  return (
    <section className="relative h-screen md:h-[85vh] lg:h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${ConstructImageLink.execute(
            data.image.url
          )}')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-stone-charcoal/70 via-stone-charcoal/60 to-transparent" />
      </div>
      <div className="relative h-full container mx-auto px-4 flex items-center justify-center">
        <div
          className={`max-w-4xl transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-stone-marble mb-6 md:mb-8 hero-text-shadow leading-tight">
              {data.prefix}
              <span className="block mt-2">{data.suffix}</span>
            </h1>
            <p className="text-lg sm:text-xl text-stone-marble/90 mb-8 md:mb-10 font-medium tracking-wide">
              {data.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto sm:min-w-[200px] bg-stone-gold hover:bg-stone-gold/90 text-white transition-all duration-500 hover:scale-105"
                asChild
              >
                <Link href="/collections">
                  Discover Our Collection
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                className="w-full sm:w-auto sm:min-w-[200px] bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 transition-all duration-500 hover:scale-105"
                asChild
              >
                <Link href="/consultation">Schedule Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
