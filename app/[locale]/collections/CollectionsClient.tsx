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
import { useRouter } from "next/navigation";
import { ConvertParamsObjectToString } from "./lib/ConvertParamsObjectToString";
import { Locale, useTranslations } from "next-intl";

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
  const memoizedParams = useMemo(() => params, [params]);
  const [initialFilters, setInitialFilters] = useState(memoizedParams);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleApplyFilters = () => {
    router.push(ConvertParamsObjectToString.execute(initialFilters), {
      scroll: false,
    });
    setIsDialogOpen(false);
  };

  const handleDialogOpen = (open: boolean) => {
    setIsDialogOpen(open);
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
                  params={params}
                  data={data}
                  setInitialFilters={(filters) => setInitialFilters(filters)}
                  locale={locale}
                />
                <DialogFooter className="flex gap-2 sm:gap-0">
                  <DialogClose asChild>
                    <Button variant="outline" className="flex-1 sm:flex-none">
                      {t("cancel")}
                    </Button>
                  </DialogClose>
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
