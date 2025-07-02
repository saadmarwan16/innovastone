import { FunctionComponent } from "react";
import { TAboutPageProcess } from "../lib/types";
import Image from "next/image";
import { ConstructImageLink } from "@/utils/ConstrucImageLink";
import { Pencil, Search, Package, Truck } from "lucide-react";

interface OurProcessProps {
  data: TAboutPageProcess;
}

const icons: { [key: string]: JSX.Element } = {
  pencil: <Pencil className="h-12 w-12 text-stone-gold" />,
  search: <Search className="h-12 w-12 text-stone-gold" />,
  package: <Package className="h-12 w-12 text-stone-gold" />,
  truck: <Truck className="h-12 w-12 text-stone-gold" />,
};

const OurProcess: FunctionComponent<OurProcessProps> = ({ data }) => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 marble-pattern" />
      <div className="container relative">
        <h2 className="text-4xl font-bold text-center text-stone-charcoal mb-16">
          Our Process
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {data.map((step, index) => (
            <div key={index} className="group">
              <div className="glass-effect rounded-2xl overflow-hidden hover-lift">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={ConstructImageLink.execute(step.image.url)}
                    alt={step.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-charcoal/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-14 h-14 rounded-full bg-stone-charcoal/90 backdrop-blur-sm flex items-center justify-center">
                        {icons[step.icon]}
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-white/90 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
