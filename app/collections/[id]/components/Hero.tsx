import { useState, useEffect, FunctionComponent } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { ConstructImageLink } from "@/utils/ConstrucImageLink";

interface HeroProps {
  name: string;
  subtitle: string;
  image: string;
}

const Hero: FunctionComponent<HeroProps> = ({ name, subtitle, image }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] lg:h-[80vh] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${ConstructImageLink.execute(image)}')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/60" />
      </div>
      <div
        className={`relative container mx-auto px-4 text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-stone-marble mb-4 hero-text-shadow">
          {name}
        </h1>
        <p className="text-xl sm:text-2xl text-stone-marble/90 mb-8 font-light">
          {subtitle}
        </p>
        <Button
          size="lg"
          className="bg-stone-gold hover:bg-stone-gold/90 text-white transition-all duration-500 hover:scale-105"
          onClick={() => {
            const gallerySection = document.getElementById("gallery");
            gallerySection?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          View Gallery
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default Hero;
