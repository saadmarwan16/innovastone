import { FunctionComponent } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface CTAProps {
  name: string;
}

const CTA: FunctionComponent<CTAProps> = ({ name }) => {
  return (
    <section className="py-24 bg-stone-gold text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2070')] bg-cover bg-center opacity-10" />
      <div className="container text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
          Transform Your Space
        </h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto font-light">
          Ready to bring the timeless elegance of {name} to your project?
        </p>
        <Button
          size="lg"
          className="bg-white text-stone-gold hover:bg-white/90 transition-all duration-500 hover:scale-105"
          asChild
        >
          <Link href="/consultation">
            Schedule a Consultation
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CTA;
