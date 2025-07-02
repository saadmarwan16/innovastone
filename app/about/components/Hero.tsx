import { FunctionComponent, useEffect, useState } from "react";
import { TAboutPageHero } from "../lib/types";
import { ConstructImageLink } from "@/utils/ConstrucImageLink";

interface HeroProps {
  data: TAboutPageHero;
}

const Hero: FunctionComponent<HeroProps> = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:h-[70vh] flex items-center justify-center py-20 sm:py-24 md:py-32">
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
      <div
        className={`relative container mx-auto px-4 text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-stone-marble mb-6 hero-text-shadow">
          {data.title}
        </h1>
        <p className="text-lg sm:text-xl text-stone-marble/90 max-w-3xl mx-auto">
          {data.description}
        </p>
      </div>
    </section>
  );
};

export default Hero;
