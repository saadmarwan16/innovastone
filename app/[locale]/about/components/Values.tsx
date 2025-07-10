import { FunctionComponent, JSX } from "react";
import { TAboutPageValues } from "../lib/types";
import { Award, Leaf, Gem } from "lucide-react";
import { useTranslations } from "next-intl";

interface ValuesProps {
  data: TAboutPageValues;
}

const icons: { [key: string]: JSX.Element } = {
  gem: <Gem className="h-12 w-12 text-stone-gold" />,
  award: <Award className="h-12 w-12 text-stone-gold" />,
  leaf: <Leaf className="h-12 w-12 text-stone-gold" />,
};

const Values: FunctionComponent<ValuesProps> = ({ data }) => {
  const t = useTranslations("AboutPage.values");
  
  return (
    <section className="py-24 bg-stone-charcoal text-white relative overflow-hidden">
      <div className="container relative">
        <h2 className="text-4xl font-bold text-center mb-16">{t("title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {data.map((value, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-lg luxury-gradient hover-lift"
            >
              <div className="mb-6 flex justify-center">
                {icons[value.icon]}
              </div>
              <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
              <p className="text-stone-marble/70">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
