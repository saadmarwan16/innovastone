import { FunctionComponent } from "react";
import { Gem, PenTool as Tool, Users } from "lucide-react";
import { THomepageWhyChooseUs } from "../lib/types";
import { useTranslations } from "next-intl";

interface WhyChooseUsProps {
  data: THomepageWhyChooseUs;
}

const icons: { [key: string]: JSX.Element } = {
  gem: <Gem className="h-12 w-12 text-stone-gold" />,
  tool: <Tool className="h-12 w-12 text-stone-gold" />,
  users: <Users className="h-12 w-12 text-stone-gold" />,
};

const WhyChooseUs: FunctionComponent<WhyChooseUsProps> = ({ data }) => {
  const t = useTranslations("HomePage.whyChooseUs");

  return (
    <section className="py-24 bg-stone-charcoal text-white">
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 leading-tight">
          {t("title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {data.map((feature) => (
            <div
              key={feature.id}
              className="text-center p-8 rounded-lg luxury-gradient"
            >
              <div className="mb-6 flex justify-center">
                {icons[feature.icon]}
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-stone-marble/70 font-light tracking-wide">
                {feature.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
