"use client";

import { useState } from "react";
import { TCollectionsDetailsPageData } from "./lib/types";
import Hero from "./components/Hero";
import Features from "./components/Features";
import CTA from "./components/CTA";
import Similar from "./components/Similar";
import Gallery from "./components/Gallery";
import ImageDialog from "./components/ImageDialog";

interface CollectionDetailsProps {
  collection: TCollectionsDetailsPageData;
}

export function CollectionDetails({ collection }: CollectionDetailsProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <Hero
        name={collection.name}
        subtitle={collection.subtitle}
        image={collection.hero_image.url}
      />

      <Features
        description={collection.description}
        data={collection.features}
      />

      <Gallery
        name={collection.name}
        data={collection.images}
        setIsDialogOpen={(open: boolean) => setIsDialogOpen(open)}
        setSelectedImageIndex={(index: number) => setSelectedImageIndex(index)}
      />

      <ImageDialog
        name={collection.name}
        data={collection.images}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={(open) => setIsDialogOpen(open)}
        selectedImageIndex={selectedImageIndex}
        setSelectedImageIndex={(index) => setSelectedImageIndex(index)}
      />

      <Similar data={collection.similar} />
      <CTA name={collection.name} />
    </main>
  );
}
