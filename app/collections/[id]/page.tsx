import { collections } from "@/lib/data/collections";
import { CollectionDetails } from "./CollectionDetails";
import { FunctionComponent } from "react";
import { Metadata } from "next";

interface CollectionDetailsPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: CollectionDetailsPageProps): Promise<Metadata> {
  // Find the current collection
  const currentCollection = collections.find((c) => c.id.toString() === params.id) || collections[0];
  
  return {
    title: `${currentCollection.name} | InnovaStone Design`,
    description: currentCollection.description,
    keywords: `${currentCollection.name}, ${currentCollection.category}, ${currentCollection.colors.join(', ')}, ${currentCollection.finishes.join(', ')}, ${currentCollection.uses.join(', ')}, natural stone, innovastone, design, doğaltaş`,
    openGraph: {
      title: `${currentCollection.name} | ${currentCollection.subtitle}`,
      description: currentCollection.description,
      images: [
        {
          url: currentCollection.heroImage,
          width: 1200,
          height: 630,
          alt: `InnovaStone Design - ${currentCollection.name}`,
        },
      ],
    },
  };
}

const CollectionDetailsPage: FunctionComponent<CollectionDetailsPageProps> = ({
  params,
}) => {
  // Find the current collection
  const currentCollection =
    collections.find((c) => c.id.toString() === params.id) || collections[0];

  // Get similar collections using the similar field
  const similarCollections = currentCollection.similar
    .map((id) => collections.find((c) => c.id === id))
    .filter(Boolean);

  // Prepare gallery images from products
  const galleryImages = currentCollection.images.map((image) => ({
    src: image,
    alt: `Image of ${currentCollection.name}`,
  }));

  return (
    <CollectionDetails
      collection={currentCollection}
      similarCollections={similarCollections}
      galleryImages={galleryImages}
    />
  );
};

export const runtime = "edge";

export default CollectionDetailsPage;
