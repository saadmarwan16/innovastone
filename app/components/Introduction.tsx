import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { FunctionComponent, useState, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface IntroductionProps {
    
}
 
const Introduction: FunctionComponent<IntroductionProps> = () => {
    const carouselItems = [
      {
        mainImage: {
          src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070",
          alt: "Luxury Stone Design - Marble Countertop"
        },
        overlayImage: {
          src: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?q=80&w=2070",
          alt: "Craftsmanship Detail - Marble Texture"
        }
      },
      {
        mainImage: {
          src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070",
          alt: "Elegant Stone Bathroom"
        },
        overlayImage: {
          src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070",
          alt: "Stone Craftsmanship Detail"
        }
      },
      {
        mainImage: {
          src: "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2070",
          alt: "Marble Kitchen Island"
        },
        overlayImage: {
          src: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=2070",
          alt: "Stone Detail Closeup"
        }
      }
    ];

    return ( <section className="relative py-24 bg-gradient-to-b from-stone-marble to-white overflow-hidden">
        <div className="absolute inset-0 marble-pattern" />
        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
            <div className="relative h-[700px]">
              <Carousel className="h-full [&>div]:h-full">
                <CarouselContent className="h-full">
                  {carouselItems.map((item, index) => (
                    <CarouselItem key={index} className="h-full">
                      <div className="relative group h-full">
                        <div className="h-full overflow-hidden transition-transform duration-700 group-hover:scale-[1.02] rounded-2xl">
                          <div className="relative h-full w-full overflow-hidden">
                            <Image 
                              src={item.mainImage.src}
                              alt={item.mainImage.alt}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover transition-all duration-700 group-hover:scale-110"
                              style={{ 
                                objectFit: 'cover'
                              }}
                            />
                          </div>
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-1/2 h-1/2 overflow-hidden shadow-2xl transition-all duration-700 group-hover:translate-x-2 group-hover:-translate-y-2 rounded-2xl">
                          <div className="relative w-full h-full">
                            <Image 
                              src={item.overlayImage.src}
                              alt={item.overlayImage.alt}
                              fill
                              sizes="(max-width: 768px) 40vw, 20vw"
                              className="object-cover transition-all duration-700 group-hover:scale-110"
                              style={{ 
                                objectFit: 'cover'
                              }}
                            />
                          </div>
                        </div>
                    </div>
                  </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="absolute bottom-8 left-16 z-10 flex gap-2 !h-fit">
                  <CarouselPrevious className="h-10 w-10 rounded-full bg-stone-gold/60 hover:bg-stone-gold/60 text-stone-gold border-none" />
                  <CarouselNext className="h-10 w-10 rounded-full bg-stone-gold/60 hover:bg-stone-gold/60 text-stone-gold border-none" />
                </div>
              </Carousel>
            </div>
            <div className="decorative-frame glass-effect rounded-2xl p-8 md:p-12 lg:p-16 border border-stone-gold/10 h-auto lg:h-[700px] lg:overflow-auto flex flex-col justify-between relative">
              <div className="relative z-10">
                <div className="mb-8 md:mb-12">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-charcoal mb-4 leading-tight floating-element">
                    Who We Are
                  </h2>
                  <div className="elegant-divider w-2/3 mb-6 md:mb-8" />
                </div>
                <p className="text-base md:text-lg text-stone-charcoal/90 leading-relaxed font-light">
                  At InnovaStone Design, we transform spaces into timeless masterpieces through our expertly curated selection of natural stone. Led by Mamadou Ndiaye, our team combines traditional craftsmanship with innovative design to create extraordinary environments that inspire and endure. With decades of collective experience and a passion for excellence, we source the finest materials from quarries worldwide, ensuring each project reflects our unwavering commitment to quality, sustainability, and the unique vision of our discerning clients.  
                </p>
              </div>
              <div className="relative z-10 mt-8">
                <Button 
                  className="w-full bg-stone-gold hover:bg-stone-gold/90 text-white transition-all duration-500 hover:-translate-y-1 text-base md:text-lg h-12 md:h-14"
                  asChild
                >
                  <a href="/about">
                    Learn Our Story
                    <ChevronRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section> );
}
 
export default Introduction;