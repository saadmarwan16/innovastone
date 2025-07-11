import { useState, useEffect, FunctionComponent } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, X, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { TCollectionsDetailsPageImage } from "../lib/types";
import { ConstructImageLink } from "@/utils/ConstrucImageLink";
import { useTranslations } from "next-intl";

interface ImageDialogProps {
  name: string;
  data: TCollectionsDetailsPageImage[];
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  selectedImageIndex: number | null;
  setSelectedImageIndex: (index: number) => void;
}

const ImageDialog: FunctionComponent<ImageDialogProps> = ({
  name,
  data,
  isDialogOpen,
  setIsDialogOpen,
  selectedImageIndex,
  setSelectedImageIndex,
}) => {
  const t = useTranslations("CollectionDetailsPage.imageDialog");
  
  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === 0 ? data.length - 1 : selectedImageIndex - 1
      );
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === data.length - 1 ? 0 : selectedImageIndex + 1
      );
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-[95vw] h-[95vh] p-0 bg-stone-charcoal/98 border-stone-gold/20">
        <DialogTitle className="sr-only">{t("title")}</DialogTitle>
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
                src={ConstructImageLink.execute(data[selectedImageIndex].url)}
                alt={`Image #${selectedImageIndex + 1} of ${name}`}
                fill
                className="object-contain"
                sizes="95vw"
                priority
              />
            </div>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 bg-stone-charcoal/40 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
              {selectedImageIndex + 1} / {data.length}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;
