import { FunctionComponent } from "react";
import { TAboutPageCta } from "../lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ConstructImageLink } from "@/utils/ConstrucImageLink";

interface CTAProps {
  data: TAboutPageCta;
}

const CTA: FunctionComponent<CTAProps> = ({ data }) => {
  return (
    <section className="py-24 bg-stone-gold text-white relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: `url(${ConstructImageLink.execute(data.image.url)})`,
        }}
      />
      <div className="container text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
          {data.title}
        </h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto font-light">
          {data.description}
        </p>
        <Button
          size="lg"
          className="bg-white text-stone-gold hover:bg-white/90 transition-all duration-500 hover:scale-105"
          asChild
        >
          <Link href="/contact">
            Contact Our Team
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CTA;
