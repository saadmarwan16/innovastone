import { FunctionComponent } from "react";
import { TCollectionsDetailsPageImage } from "../lib/types";
import { ZoomIn } from "lucide-react";
import Image from "next/image";
import Masonry from "react-masonry-css";
import { ConstructImageLink } from "@/utils/ConstrucImageLink";
import { useTranslations } from "next-intl";

interface GalleryProps {
  name: string;
  data: TCollectionsDetailsPageImage[];
  setIsDialogOpen: (open: boolean) => void;
  setSelectedImageIndex: (index: number) => void;
}

const Gallery: FunctionComponent<GalleryProps> = ({
  name,
  data,
  setIsDialogOpen,
  setSelectedImageIndex,
}) => {
  const t = useTranslations("CollectionDetailsPage.gallery");
  
  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsDialogOpen(true);
  };

  return (
    <section
      id="gallery"
      className="py-24 bg-stone-marble relative overflow-hidden"
    >
      <div className="absolute inset-0 marble-pattern opacity-30" />
      <div className="container relative">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-stone-charcoal mb-16">
          {t("title")}
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
          {data.map((image, index) => (
            <div
              key={index}
              className="mb-4 cursor-pointer group"
              onClick={() => handleImageClick(index)}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg glass-effect hover-lift">
                <Image
                  src={ConstructImageLink.execute(image.url)}
                  alt={`Image #${index + 1} of ${name}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-stone-charcoal/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex flex-col items-center gap-2">
                    <ZoomIn className="h-8 w-8 text-white" />
                    <p className="text-white font-medium tracking-wide">
                      {t("clickToView")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Masonry>
      </div>
    </section>
  );
};

export default Gallery;
