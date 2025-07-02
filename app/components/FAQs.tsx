import { FunctionComponent } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { THomepageFAQ } from "../lib/types";

interface FAQsProps {
  data: THomepageFAQ;
}

const icons: { [key: string]: string } = {
  globe: "🌍",
  ship: "🚢",
  stars: "✨",
  diamond: "💎",
};

const FAQs: FunctionComponent<FAQsProps> = ({ data }) => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-stone-marble overflow-hidden">
      <div className="absolute inset-0 faq-pattern" />
      <div className="container max-w-3xl relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-charcoal mb-4 leading-tight floating-element">
            Frequently Asked Questions
          </h2>
          <div className="elegant-divider mx-auto w-1/3" />
        </div>
        <div className="decorative-frame glass-effect rounded-2xl py-8 px-0 sm:px-8 md:px-12 md:p-12">
          <Accordion type="single" collapsible className="w-full space-y-6">
            {data.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={`item-${faq.id}`}
                className="faq-item-hover border-none bg-white/40 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 text-stone-charcoal hover:text-stone-gold transition-colors duration-300 hover:no-underline">
                  <div className="flex items-center gap-4 text-left w-full">
                    <div className="faq-icon-container w-10 h-10 flex items-center justify-center rounded-full bg-stone-gold/10 text-xl">
                      {icons[faq.icon]}
                    </div>
                    <p className="flex-1 text-base sm:text-lg font-medium">
                      {faq.question}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 md:px-20 pb-6 text-stone-charcoal border-none">
                  <div className="pl-14 md:pl-0 pt-4">
                    <div className="faq-answer-animation">
                      <p className="font-light leading-relaxed text-base lg:text-lg">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQs;
