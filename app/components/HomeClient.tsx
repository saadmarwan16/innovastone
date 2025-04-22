"use client";

import { FunctionComponent, useEffect, useState } from "react";
import Hero from "./Hero";
import Introduction from "./Introduction";
import FeaturedProjects from "./FeaturedProjects";
import WhyChooseUs from "./WhyChooseUs";
// import Testimonials from "./Testimonials";
import FAQs from "./FAQs";
import QuickStats from "./QuickStats";

const HomeClient: FunctionComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <main className="min-h-screen">
        <Hero isVisible={isVisible} />
        <QuickStats />
        <Introduction />
        <FeaturedProjects />
        <WhyChooseUs />
        {/* <Testimonials /> */}
        <FAQs />
      </main>
    </>
  );
};

export default HomeClient;