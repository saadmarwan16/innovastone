import { FunctionComponent } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";

interface FAQsProps {
    
}
 
const FAQs: FunctionComponent<FAQsProps> = () => {
    return ( <section className="relative py-24 bg-gradient-to-b from-white to-stone-marble overflow-hidden">
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
              {[
                {
                  question: "Where do you source your stone?",
                  answer: "We source our materials from premium quarries worldwide, ensuring the highest quality natural stone for our clients. Each piece is carefully selected for its unique characteristics and aesthetic appeal.",
                  icon: "🌍"
                },
                {
                  question: "Do you ship internationally?",
                  answer: "Yes, we offer worldwide shipping and handling, with careful packaging to ensure safe delivery of your materials. Our logistics team specializes in international transportation of delicate stone products.",
                  icon: "🚢"
                },
                {
                  question: "Can I request a specific cut or finish?",
                  answer: "Absolutely! We offer custom cutting and finishing services to meet your exact specifications and design requirements. Our artisans can create any finish from polished to brushed, honed to leather.",
                  icon: "✨"
                },
                {
                  question: "How do I care for my marble/travertine?",
                  answer: "We provide detailed care instructions with every purchase and offer maintenance services to keep your stone looking pristine. Our team can guide you through daily care routines and professional maintenance schedules.",
                  icon: "💎"
                },
              ].map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="faq-item-hover border-none bg-white/40 rounded-lg overflow-hidden"
                >
                  <AccordionTrigger 
                    className="px-6 py-4 text-stone-charcoal hover:text-stone-gold transition-colors duration-300 hover:no-underline"
                  >
                    <div className="flex items-center gap-4 text-left w-full">
                      <div className="faq-icon-container w-10 h-10 flex items-center justify-center rounded-full bg-stone-gold/10 text-xl">
                        {faq.icon}
                      </div>
                      <p className="flex-1 text-base sm:text-lg font-medium">{faq.question}</p>
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
      </section> );
}
 
export default FAQs;