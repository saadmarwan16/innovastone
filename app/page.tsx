"use client";

import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Introduction from "./components/Introduction";
import FeaturedProjects from "./components/FeaturedProjects";
import WhyChooseUs from "./components/WhyChooseUs";
// import Testimonials from "./components/Testimonials";
import FAQs from "./components/FAQs";
import QuickStats from "./components/QuickStats";

export default function Home() {
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
}