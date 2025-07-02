import { FunctionComponent } from "react";
import { TAboutPageTeam } from "../lib/types";
import Image from "next/image";
import { ConstructImageLink } from "@/utils/ConstrucImageLink";

interface TeamProps {
  data: TAboutPageTeam;
}

const Team: FunctionComponent<TeamProps> = ({ data }) => {
  return (
    <section className="py-24 bg-gradient-to-b from-stone-marble to-white relative overflow-hidden">
      <div className="absolute inset-0 marble-pattern" />
      <div className="container relative">
        <h2 className="text-4xl font-bold text-center text-stone-charcoal mb-16">
          Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((member, index) => (
            <div
              key={index}
              className="glass-effect rounded-xl p-6 text-center hover-lift"
            >
              <div className="relative w-40 h-40 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <Image
                    src={ConstructImageLink.execute(member.image.url)}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="160px"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-stone-charcoal mb-2">
                {member.name}
              </h3>
              <p className="text-stone-gold mb-4">{member.role}</p>
              <p className="text-stone-charcoal/70 text-sm">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
