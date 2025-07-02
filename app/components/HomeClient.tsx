"use client";

import { FunctionComponent, useEffect, useState } from "react";
import Hero from "./Hero";
import Introduction from "./Introduction";
import FeaturedProjects from "./FeaturedProjects";
import WhyChooseUs from "./WhyChooseUs";
import FAQs from "./FAQs";
import QuickStats from "./QuickStats";
import { THomepageData } from "../lib/types";
import Testimonials from "./Testimonials";

interface HomeClientProps {
  data: THomepageData;
}

const HomeClient: FunctionComponent<HomeClientProps> = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <main className="min-h-screen">
        <Hero isVisible={isVisible} data={data.hero} />
        <QuickStats data={data.stats} />
        <Introduction data={data.who_we_are} />
        <FeaturedProjects data={data.featured_collections} />
        <WhyChooseUs data={data.why_choose_us} />
        <Testimonials data={data.testimonials} />
        <FAQs data={data.faq} />
      </main>
    </>
  );
};

export default HomeClient;
