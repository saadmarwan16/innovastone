import { FunctionComponent } from "react";
import { TCollectionsDetailsPageSimilar } from "../lib/types";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { ConstructImageLink } from "@/utils/ConstrucImageLink";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface SimilarProps {
  data: TCollectionsDetailsPageSimilar[];
}

const Similar: FunctionComponent<SimilarProps> = ({ data }) => {
  const t = useTranslations("CollectionDetailsPage.similar");

  return (
    <>
      {data.length > 0 && (
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 marble-pattern" />
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-charcoal mb-6">
                {t("title")}
              </h2>
              <p className="text-lg text-stone-charcoal/80">
                {t("description")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.map((collection) => (
                <Link
                  key={collection.id}
                  href={{
                    pathname: "/collections/[id]",
                    params: { id: collection.documentId },
                  }}
                  className="group"
                >
                  <div className="glass-effect rounded-2xl overflow-hidden hover-lift">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={ConstructImageLink.execute(
                          collection.hero_image.url
                        )}
                        alt={collection.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {collection.is_new && (
                        <span className="absolute top-4 right-4 bg-stone-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                          {t("newBadge")}
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
                        {collection.features
                          .slice(0, 2)
                          .map((feature: any, idx: number) => (
                            <span
                              key={idx}
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
                        {t("viewCollection")}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Similar;
