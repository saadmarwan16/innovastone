import { collections } from "@/lib/data/collections";
import { CollectionDetails } from "./CollectionDetails";

interface CollectionDetailsPageProps {
  params: {
    id: string;
  };
}

export default function CollectionDetailsPage({
  params,
}: CollectionDetailsPageProps) {
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
}
