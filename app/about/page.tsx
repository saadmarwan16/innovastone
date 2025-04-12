"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Award,
  Leaf,
  Gem,
  Pencil,
  Search,
  Package,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const teamMembers = [
    {
      name: "Mamadou Ndiaye",
      role: "Founder & CEO",
      image: "/team/founder.jpeg",
      bio: "With over 10 years of experience in natural stone craftsmanship, Mamadou brings unparalleled expertise and vision to every project.",
    },
    {
      name: "Kıymet Koçlar",
      role: "Accountant",
      image: "/team/accountant.jpeg",
      bio: "A meticulous and reliable financial expert who ensures accuracy, compliance, and has strategic insight",
    },
  ];

  const processSteps = [
    {
      icon: <Pencil className="h-12 w-12 text-stone-gold" />,
      title: "Design Consultation",
      description:
        "Our experts work closely with you to understand your vision and requirements, providing professional guidance on material selection and design possibilities.",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    },
    {
      icon: <Search className="h-12 w-12 text-stone-gold" />,
      title: "Stone Curation",
      description:
        "We meticulously select the finest stones from premium quarries worldwide, ensuring each piece meets our exacting standards for quality and aesthetics.",
      image:
        "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80",
    },
    {
      icon: <Package className="h-12 w-12 text-stone-gold" />,
      title: "Quality Assurance",
      description:
        "Each stone undergoes rigorous quality checks, ensuring perfect color matching, consistency, and material integrity before selection.",
      image:
        "https://images.unsplash.com/photo-1604762524889-3e2fcc145683?w=800&q=80",
    },
    {
      icon: <Truck className="h-12 w-12 text-stone-gold" />,
      title: "Global Export",
      description:
        "We handle all logistics for secure worldwide shipping, ensuring your carefully selected stones reach their destination in perfect condition.",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    },
  ];

  const values = [
    {
      icon: <Gem className="h-12 w-12 text-stone-gold" />,
      title: "Luxury Excellence",
      description:
        "Uncompromising quality in every piece of stone we select and craft.",
    },
    {
      icon: <Award className="h-12 w-12 text-stone-gold" />,
      title: "Innovation",
      description:
        "Pushing boundaries in stone design and application techniques.",
    },
    {
      icon: <Leaf className="h-12 w-12 text-stone-gold" />,
      title: "Sustainability",
      description:
        "Responsible sourcing and eco-friendly practices in all operations.",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:h-[70vh] flex items-center justify-center py-20 sm:py-24 md:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-stone-charcoal/70 via-stone-charcoal/60 to-transparent" />
        </div>
        <div
          className={`relative container mx-auto px-4 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-stone-marble mb-6 hero-text-shadow">
            Our Story
          </h1>
          <p className="text-lg sm:text-xl text-stone-marble/90 max-w-3xl mx-auto">
            Crafting excellence in natural stone since 2015, transforming spaces
            with unparalleled artistry and innovation.
          </p>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 marble-pattern" />
        <div className="container relative">
          <h2 className="text-4xl font-bold text-center text-stone-charcoal mb-16">
            Our Process
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {processSteps.map((step, index) => (
              <div key={index} className="group">
                <div className="glass-effect rounded-2xl overflow-hidden hover-lift">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-charcoal/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-14 h-14 rounded-full bg-stone-charcoal/90 backdrop-blur-sm flex items-center justify-center">
                          {step.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-white">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-white/90 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-stone-charcoal text-white relative overflow-hidden">
        <div className="container relative">
          <h2 className="text-4xl font-bold text-center mb-16">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-lg luxury-gradient hover-lift"
              >
                <div className="mb-6 flex justify-center">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-stone-marble/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 marble-pattern" />
        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[600px] rounded-2xl overflow-hidden">
              <Image
                src="/team/founder.jpeg"
                alt="Mamadou Ndiaye - Founder"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="decorative-frame glass-effect rounded-2xl p-12">
              <h2 className="text-4xl font-bold text-stone-charcoal mb-6">
                Meet Our Founder
              </h2>
              <div className="elegant-divider w-1/3 mb-8" />
              <p className="text-lg text-stone-charcoal/80 mb-6 leading-relaxed">
                Mamadou Ndiaye&apos;s journey in natural stone began over a
                decades ago. His passion for craftsmanship and innovative design
                has transformed InnovaStone into a global leader in luxury stone
                solutions. With a commitment to excellence and sustainability,
                Mamadou continues to push the boundaries of what&apos;s possible
                in natural stone design.
              </p>
              <p className="text-lg text-stone-charcoal/80 mb-8 leading-relaxed">
                Under his leadership, InnovaStone has completed prestigious
                projects across 15+ countries, earning recognition for our
                innovative approach and uncompromising quality standards.
              </p>
              <Link href='https://www.linkedin.com/in/mamadou-ndiaye-99b37aa3' target="_blank">
                <Button className="w-full bg-stone-gold hover:bg-stone-gold/90 text-white transition-all duration-500 hover:-translate-y-1">
                  Read Full Story
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gradient-to-b from-stone-marble to-white relative overflow-hidden">
        <div className="absolute inset-0 marble-pattern" />
        <div className="container relative">
          <h2 className="text-4xl font-bold text-center text-stone-charcoal mb-16">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="glass-effect rounded-xl p-6 text-center hover-lift"
              >
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <Image
                      src={member.image}
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
                <p className="text-stone-charcoal/70 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-stone-gold text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2070')] bg-cover bg-center opacity-10" />
        <div className="container text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Get to Know Us Better
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto font-light">
            Ready to collaborate on your next project? Our team is here to bring
            your vision to life.
          </p>
          <Button
            size="lg"
            className="bg-white text-stone-gold hover:bg-white/90 transition-all duration-500 hover:scale-105"
            asChild
          >
            <Link href="/contact">
              Contact Our Team
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export const runtime = "edge";

export default AboutPage;
