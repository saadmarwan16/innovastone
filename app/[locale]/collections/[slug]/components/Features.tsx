import { TCollectionsDetailsPageFeature } from "../lib/types";
import { FunctionComponent } from "react";
import {
  Diamond,
  Gem,
  Globe,
  Hammer,
  Layers,
  Shield,
  Star,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";

interface FeaturesProps {
  description: string;
  data: TCollectionsDetailsPageFeature[];
}

const iconMap = {
  globe: Globe,
  layers: Layers,
  diamond: Diamond,
  shield: Shield,
  gem: Gem,
  hammer: Hammer,
  star: Star,
  sparkles: Sparkles,
};

const renderIcon = (iconName: string) => {
  const IconComponent = iconMap[iconName as keyof typeof iconMap];
  return IconComponent ? (
    <IconComponent className="h-6 w-6 text-stone-gold" />
  ) : null;
};

const Features: FunctionComponent<FeaturesProps> = ({ description, data }) => {
  const t = useTranslations("CollectionDetailsPage.features");
  
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 marble-pattern" />
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-charcoal mb-6">
            {t("collectionOverview")}
          </h2>
          <p className="text-lg text-stone-charcoal/80">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((feature) => (
            <div
              key={feature.id}
              className="glass-effect rounded-xl p-8 text-center hover-lift"
            >
              <div className="mb-6 flex justify-center">
                {renderIcon(feature.icon)}
              </div>
              <h3 className="text-xl font-bold text-stone-charcoal mb-3">
                {feature.title}
              </h3>
              <p className="text-stone-charcoal/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
