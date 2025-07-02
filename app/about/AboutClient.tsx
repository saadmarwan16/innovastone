"use client";

import { FunctionComponent } from "react";
import Hero from "./components/Hero";
import OurProcess from "./components/OurProcess";
import Values from "./components/Values";
import Founder from "./components/Founder";
import Team from "./components/Team";
import CTA from "./components/CTA";
import { TAboutPageData } from "./lib/types";

interface AboutClientProps {
  data: TAboutPageData;
}

const AboutClient: FunctionComponent<AboutClientProps> = ({ data }) => {
  return (
    <main className="min-h-screen">
      <Hero data={data.hero} />
      <OurProcess data={data.process} />
      <Values data={data.values} />
      <Founder data={data.founder} />
      <Team data={data.team} />
      <CTA data={data.cta} />
    </main>
  );
};

export default AboutClient;
