import { FunctionComponent } from "react";
import { Globe, Shield, Clock } from "lucide-react";
import { THomepageStats } from "../lib/types";

interface QuickStatsProps {
  data: THomepageStats;
}

const icons: { [key: string]: JSX.Element } = {
  clock: <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-stone-gold" />,
  shield: <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-stone-gold" />,
  globe: <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-stone-gold" />,
};

const QuickStats: FunctionComponent<QuickStatsProps> = ({ data }) => {
  return (
    <section className="relative sm:-mt-32 z-10">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="relative p-5 sm:p-8 md:p-12 bg-transparent sm:bg-stone-charcoal/95 sm:backdrop-blur-lg rounded-2xl sm:border sm:border-white/10 sm:shadow-2xl overflow-hidden">
          <div className="absolute inset-0 hidden sm:block bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-stone-gold/10 via-transparent to-transparent" />
          <div
            className="absolute inset-0 hidden sm:block"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L45 15H15L30 0zm0 60L15 45h30L30 60zm15-15L60 30V0L45 15v30zM0 30l15 15V15L0 30zm0-30v30L15 15V0H0zm45 0v15L60 0H45zM0 60h15L0 45v15zm45 0v-15l15 15H45z' fill='%23C9A26B' fill-opacity='0.05'/%3E%3C/svg%3E\")",
              backgroundSize: "30px 30px",
            }}
          />
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {data.map((stat, index) => (
              <div
                key={index}
                className="group relative flex flex-row items-center gap-3 sm:gap-6 p-4 sm:p-6 rounded-xl bg-stone-charcoal/95 sm:bg-white/5 backdrop-blur-sm sm:backdrop-blur-none border border-stone-gold/20 sm:border-white/10 shadow-lg sm:shadow-none transition-all duration-500 hover:bg-stone-charcoal/90 sm:hover:bg-white/10 hover:border-stone-gold/30 hover:translate-y-[-2px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-stone-gold/5 via-stone-gold/10 to-transparent sm:from-stone-gold/0 sm:via-stone-gold/5 opacity-10 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                <div className="shrink-0 p-2.5 sm:p-4 rounded-lg bg-stone-gold/10 transition-colors duration-500 group-hover:bg-stone-gold/20">
                  {icons[stat.icon]}
                </div>
                <div>
                  <p className="text-xl sm:text-2xl md:text-4xl font-bold text-stone-marble mb-0.5 sm:mb-1 tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-stone-marble/70 font-light tracking-wide">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickStats;
