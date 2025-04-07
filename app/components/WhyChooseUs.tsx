import { FunctionComponent } from "react";
import { 
    Gem, 
    PenTool as Tool, 
    Users, 
  } from "lucide-react";

interface WhyChooseUsProps {
    
}
 
const WhyChooseUs: FunctionComponent<WhyChooseUsProps> = () => {
    return ( <section className="py-24 bg-stone-charcoal text-white">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 leading-tight">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Gem className="h-12 w-12 text-stone-gold" />,
                title: "Premium Materials",
                description: "Sourced from top quarries worldwide",
              },
              {
                icon: <Tool className="h-12 w-12 text-stone-gold" />,
                title: "Expert Craftsmanship",
                description: "Skilled artisans, flawless execution",
              },
              {
                icon: <Users className="h-12 w-12 text-stone-gold" />,
                title: "Custom Designs",
                description: "Tailored luxury solutions",
              },
            ].map((feature, index) => (
              <div 
                key={index} 
                className="text-center p-8 rounded-lg luxury-gradient"
              >
                <div className="mb-6 flex justify-center">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-stone-marble/70 font-light tracking-wide">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> );
}
 
export default WhyChooseUs;