"use client";

import { useState, FunctionComponent, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import Hero from "./components/Hero";
import CTA from "./components/CTA";
import { TCollectionsPageData } from "./lib/types";
import CollectionGrid from "./components/CollectionGrid";
import { CollectionsParams } from "./types/params";
import SearchBar from "./components/SearchBar";
import DesktopCollectionsFilterSortContainer from "./components/DesktopCollectionsFilterSortContainer";
import MobileCollectionsFilterSortContainer from "./components/MobileCollectionsFilterSortContainer";
import { Locale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { QueryParams } from "next-intl/navigation";
import { GenerateNewQuery } from "./lib/GenerateNewQuery";

interface CollectionsClientProps {
  data: TCollectionsPageData;
  params: CollectionsParams;
  locale: Locale;
}

const CollectionsClient: FunctionComponent<CollectionsClientProps> = ({
  data,
  params,
  locale,
}) => {
  const t = useTranslations("CollectionsPage.filters");
  const [tempFilters, setTempFilters] = useState<CollectionsParams>(params);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  // Reset temp filters when params change (e.g., from URL navigation)
  useMemo(() => {
    setTempFilters(params);
  }, [params]);

  const handleApplyFilters = () => {
    router.push(
      {
        pathname: "/collections",
        query: GenerateNewQuery.execute(tempFilters),
      },
      {
        scroll: false,
      }
    );
    setIsDialogOpen(false);
  };

  const handleDialogOpen = (open: boolean) => {
    if (open) {
      // Reset temp filters to current params when opening dialog
      setTempFilters(params);
    }
    setIsDialogOpen(open);
  };

  const handleCancelFilters = () => {
    // Reset temp filters to current params when cancelling
    setTempFilters(params);
    setIsDialogOpen(false);
  };

  return (
    <main className="min-h-screen">
      <Hero data={data.hero} />

      {/* Collections Section */}
      <section
        id="collections"
        className="py-24 bg-white relative overflow-hidden"
      >
        <div className="absolute inset-0 marble-pattern" />
        <div className="container relative">
          {/* Search Bar */}
          <SearchBar searchParams={params} />

          {/* Mobile Filter Button */}
          <div className="mb-8 lg:hidden">
            <Dialog open={isDialogOpen} onOpenChange={handleDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full bg-white border-stone-gold/20 text-stone-charcoal hover:bg-stone-gold/5"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {t("filterSort")}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{t("filterCollections")}</DialogTitle>
                </DialogHeader>
                <MobileCollectionsFilterSortContainer
                  params={tempFilters}
                  data={data}
                  setTempFilters={(filters) => setTempFilters(filters)}
                  locale={locale}
                />
                <DialogFooter className="flex gap-2 sm:gap-0">
                  <Button
                    variant="outline"
                    className="flex-1 sm:flex-none"
                    onClick={handleCancelFilters}
                  >
                    {t("cancel")}
                  </Button>
                  <Button
                    className="flex-1 sm:flex-none bg-stone-gold hover:bg-stone-gold/90"
                    onClick={handleApplyFilters}
                  >
                    {t("applyFilters")}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <DesktopCollectionsFilterSortContainer
            data={data}
            params={params}
            locale={locale}
          />

          <CollectionGrid params={params} locale={locale} />

          <CTA data={data.cta} />
        </div>
      </section>
    </main>
  );
};

export default CollectionsClient;
