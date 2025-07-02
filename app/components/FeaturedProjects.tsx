import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FunctionComponent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { THomepageFeaturedCollections } from "../lib/types";
import { ConstructImageLink } from "@/utils/ConstrucImageLink";

interface FeaturedProjectsProps {
  data: THomepageFeaturedCollections;
}

const FeaturedProjects: FunctionComponent<FeaturedProjectsProps> = ({
  data,
}) => {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="absolute inset-0 marble-pattern" />
      <div className="container relative">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-stone-charcoal mb-16 leading-tight">
          Featured Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {data.map((collection) => (
            <Link key={collection.id} href={`/collections/${collection.id}`}>
              <Card className="overflow-hidden elegant-card-hover border-0 glass-effect">
                <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                  <Image
                    src={ConstructImageLink.execute(collection.hero_image.url)}
                    alt={collection.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    style={{ objectFit: "cover" }}
                  />
                  {collection.is_new && (
                    <span className="absolute top-4 right-4 bg-stone-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                      New
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-stone-charcoal">
                      {collection.name}
                    </h3>
                    <span className="text-sm px-3 py-1 rounded-full bg-stone-gold/10 text-stone-gold">
                      {collection.category.value}
                    </span>
                  </div>
                  <p className="text-stone-charcoal/70 mb-4">
                    {collection.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {collection.features.slice(0, 2).map((feature) => (
                      <span
                        key={feature.id}
                        className="text-xs px-2 py-1 rounded-full bg-stone-charcoal/5 text-stone-charcoal/70"
                      >
                        {feature.title}
                      </span>
                    ))}
                    {collection.features.length > 2 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-stone-charcoal/5 text-stone-charcoal/70">
                        +{collection.features.length - 2}
                      </span>
                    )}
                  </div>
                  <Button className="w-full bg-stone-gold/10 hover:bg-stone-gold hover:text-white text-stone-gold transition-all duration-300">
                    View Collection
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        <div className="text-center">
          <Button
            variant="outline"
            className="border-stone-gold text-stone-gold hover:bg-stone-gold hover:text-white transition-all duration-500"
            asChild
          >
            <Link href="/collections">
              View More Collections
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
