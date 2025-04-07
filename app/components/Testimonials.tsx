import { FunctionComponent } from "react";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";

interface TestimonialsProps {
    
}
 
const Testimonials: FunctionComponent<TestimonialsProps> = () => {
    return ( <section className="relative py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 testimonial-pattern" />
        <div className="container relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-charcoal mb-4 leading-tight">
              Client Testimonials
            </h2>
            <div className="elegant-divider mx-auto w-1/3" />
          </div>
          <div className="max-w-5xl mx-auto px-8">
            <Carousel className="relative">
              <CarouselContent>
                {[
                  {
                    quote: "InnovaStone Design transformed our space into something truly extraordinary. Their attention to detail and commitment to quality is unmatched.",
                    author: "Jean-Pierre Dubois",
                    title: "Luxury Hotel Owner",
                    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&h=200&q=80"
                  },
                  {
                    quote: "The level of craftsmanship and expertise they bring to each project is remarkable. A true mark of excellence in natural stone design.",
                    author: "Isabella Romano",
                    title: "Interior Designer",
                    image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=200&h=200&q=80"
                  },
                  {
                    quote: "Their understanding of luxury and attention to detail has exceeded our expectations. A pleasure to work with from start to finish.",
                    author: "Marcus Schmidt",
                    title: "Property Developer",
                    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=200&h=200&q=80"
                  }
                ].map((testimonial, index) => (
                  <CarouselItem key={index}>
                    <div className="decorative-frame glass-effect rounded-2xl py-12 px-4 sm:px-12">
                      <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="relative shrink-0">
                          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-stone-gold/20">
                            <div className="relative w-full h-full">
                              <Image 
                                src={testimonial.image} 
                                alt={testimonial.author}
                                fill
                                sizes="96px"
                                className="object-cover"
                                style={{ objectFit: 'cover' }}
                              />
                            </div>
                          </div>
                          <div className="absolute -top-4 -right-4 text-stone-gold text-6xl font-serif opacity-20 select-none">
                            &quot;
                          </div>
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-xl mb-6 text-stone-charcoal/80 font-light italic leading-relaxed">
                            {testimonial.quote}
                          </p>
                          <div className="flex items-center gap-4">
                            <div className="h-px flex-1 bg-stone-gold/20" />
                            <div>
                              <p className="font-bold text-stone-charcoal">{testimonial.author}</p>
                              <p className="text-stone-charcoal/70 font-light text-sm">{testimonial.title}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute -left-4 top-1/2 -translate-y-1/2">
                <CarouselPrevious className="text-stone-gold border-stone-gold/20 hover:bg-stone-gold hover:text-white" />
              </div>
              <div className="absolute -right-4 top-1/2 -translate-y-1/2">
                <CarouselNext className="text-stone-gold border-stone-gold/20 hover:bg-stone-gold hover:text-white" />
              </div>
            </Carousel>
          </div>
        </div>
      </section> );
}
 
export default Testimonials;