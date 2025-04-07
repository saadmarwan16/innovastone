'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  ChevronRight,
  Diamond,
  Gem,
  Globe,
  Hammer,
  Layers,
  Shield,
  Star,
  Sparkles,
  X,
  ChevronLeft,
  ZoomIn,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import Masonry from 'react-masonry-css';

// Map icon names to Lucide React components
const iconMap = {
  globe: Globe,
  layers: Layers,
  diamond: Diamond,
  shield: Shield,
  gem: Gem,
  hammer: Hammer,
  star: Star,
  sparkles: Sparkles,
};

interface GalleryImage {
  src: string;
  alt: string;
}

interface CollectionDetailsProps {
  collection: any;
  similarCollections: any[];
  galleryImages: GalleryImage[];
}

export function CollectionDetails({
  collection,
  similarCollections,
  galleryImages,
}: CollectionDetailsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Function to render icon based on icon name
  const renderIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? (
      <IconComponent className="h-6 w-6 text-stone-gold" />
    ) : null;
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsDialogOpen(true);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(() =>
        selectedImageIndex === 0
          ? galleryImages.length - 1
          : selectedImageIndex - 1
      );
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(() =>
        selectedImageIndex === galleryImages.length - 1
          ? 0
          : selectedImageIndex + 1
      );
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[500px] md:min-h-[600px] lg:h-[80vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${collection.heroImage}')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/60" />
        </div>
        <div
          className={`relative container mx-auto px-4 text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-stone-marble mb-4 hero-text-shadow">
            {collection.name}
          </h1>
          <p className="text-xl sm:text-2xl text-stone-marble/90 mb-8 font-light">
            {collection.subtitle}
          </p>
          <Button
            size="lg"
            className="bg-stone-gold hover:bg-stone-gold/90 text-white transition-all duration-500 hover:scale-105"
            onClick={() => {
              const gallerySection = document.getElementById('gallery');
              gallerySection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View Gallery
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 marble-pattern" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-charcoal mb-6">
              Collection Overview
            </h2>
            <p className="text-lg text-stone-charcoal/80">
              {collection.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {collection.features.map((feature: any, index: number) => (
              <div
                key={index}
                className="glass-effect rounded-xl p-8 text-center hover-lift"
              >
                <div className="mb-6 flex justify-center">
                  {renderIcon(feature.icon)}
                </div>
                <h3 className="text-xl font-bold text-stone-charcoal mb-3">
                  {feature.title}
                </h3>
                <p className="text-stone-charcoal/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        id="gallery"
        className="py-24 bg-stone-marble relative overflow-hidden"
      >
        <div className="absolute inset-0 marble-pattern opacity-30" />
        <div className="container relative">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-stone-charcoal mb-16">
            Gallery
          </h2>
          <Masonry
            breakpointCols={{
              default: 3,
              1100: 3,
              700: 2,
              500: 1,
            }}
            className="flex -ml-4 w-auto"
            columnClassName="pl-4 bg-clip-padding"
          >
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="mb-4 cursor-pointer group"
                onClick={() => handleImageClick(index)}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg glass-effect hover-lift">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-stone-charcoal/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex flex-col items-center gap-2">
                      <ZoomIn className="h-8 w-8 text-white" />
                      <p className="text-white font-medium tracking-wide">
                        Click to View
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Masonry>
        </div>
      </section>

      {/* Image Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[95vw] h-[95vh] p-0 bg-stone-charcoal/98 border-stone-gold/20">
          <DialogTitle className="sr-only">Image Gallery Preview</DialogTitle>
          {selectedImageIndex !== null && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Navigation Buttons */}
              <div className="fixed inset-x-8 top-1/2 -translate-y-1/2 flex justify-between z-20">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-16 w-16 rounded-full bg-stone-charcoal/40 hover:bg-stone-charcoal/60 text-white hover:text-stone-gold transition-all duration-300 backdrop-blur-sm"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-16 w-16 rounded-full bg-stone-charcoal/40 hover:bg-stone-charcoal/60 text-white hover:text-stone-gold transition-all duration-300 backdrop-blur-sm"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </div>

              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 h-12 w-12 rounded-full bg-stone-charcoal/40 hover:bg-stone-charcoal/60 text-white hover:text-stone-gold transition-all duration-300 backdrop-blur-sm z-50"
                onClick={() => setIsDialogOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Image Container */}
              <div className="relative w-full h-full p-8">
                <Image
                  src={galleryImages[selectedImageIndex].src}
                  alt={galleryImages[selectedImageIndex].alt}
                  fill
                  className="object-contain"
                  sizes="95vw"
                  priority
                />
              </div>

              {/* Image Counter */}
              <div className="absolute top-4 left-4 bg-stone-charcoal/40 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                {selectedImageIndex + 1} / {galleryImages.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Similar Collections Section */}
      {similarCollections.length > 0 && (
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 marble-pattern" />
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-charcoal mb-6">
                Similar Collections
              </h2>
              <p className="text-lg text-stone-charcoal/80">
                Explore more natural stone collections that complement your
                style
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarCollections.map((collection: any, index: number) => (
                <Link
                  key={index}
                  href={`/collections/${collection.id}`}
                  className="group"
                >
                  <div className="glass-effect rounded-2xl overflow-hidden hover-lift">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={collection.heroImage}
                        alt={collection.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {collection.isNew && (
                        <span className="absolute top-4 right-4 bg-stone-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                          New
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-stone-charcoal">
                          {collection.name}
                        </h3>
                        <span className="text-sm px-3 py-1 rounded-full bg-stone-gold/10 text-stone-gold">
                          {collection.category}
                        </span>
                      </div>
                      <p className="text-stone-charcoal/70 mb-4">
                        {collection.subtitle}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {collection.features
                          .slice(0, 2)
                          .map((feature: any, idx: number) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 rounded-full bg-stone-charcoal/5 text-stone-charcoal/70"
                            >
                              {feature.title}
                            </span>
                          ))}
                        {collection.features.length > 2 && (
                          <span className="text-xs px-2 py-1 rounded-full bg-stone-charcoal/5 text-stone-charcoal/70">
                            +{collection.features.length - 2}
                          </span>
                        )}
                      </div>
                      <Button className="w-full bg-stone-gold/10 hover:bg-stone-gold hover:text-white text-stone-gold transition-all duration-300">
                        View Collection
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-stone-gold text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2070')] bg-cover bg-center opacity-10" />
        <div className="container text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Transform Your Space
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto font-light">
            Ready to bring the timeless elegance of {collection.name} to your
            project?
          </p>
          <Button
            size="lg"
            className="bg-white text-stone-gold hover:bg-white/90 transition-all duration-500 hover:scale-105"
            asChild
          >
            <Link href="/consultation">
              Schedule a Consultation
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
