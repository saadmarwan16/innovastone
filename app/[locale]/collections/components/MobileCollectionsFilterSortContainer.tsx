import { useState, useEffect, FunctionComponent } from "react";
import { Filter, SlidersHorizontal } from "lucide-react";
import { TCollectionsPageData } from "../lib/types";
import { CollectionsParams } from "../types/params";
import MobileCollectionFilter from "./MobileCollectionFilter";
import MobileCollectionSort from "./MobileCollectionSort";
import { Locale, useTranslations } from "next-intl";

interface MobileCollectionsFilterSortContainerProps {
  data: TCollectionsPageData;
  params: CollectionsParams;
  setInitialFilters: (filters: CollectionsParams) => void;
  locale: Locale;
}

const MobileCollectionsFilterSortContainer: FunctionComponent<
  MobileCollectionsFilterSortContainerProps
> = ({ data, params, setInitialFilters, locale }) => {
  const t = useTranslations("CollectionsPage.filters");

  return (
    <div className="space-y-6 py-4 max-h-[60vh] overflow-y-auto">
      <MobileCollectionFilter
        title={t("categories")}
        Icon={Filter}
        options={data.categories.map((category) => category.value)}
        selected={params.category ?? []}
        onChange={(filter) => {
          setInitialFilters({
            ...params,
            category: filter,
          });
        }}
      />
      <MobileCollectionFilter
        title={t("colorPalette")}
        Icon={Filter}
        options={data.colors.map((color) => color.value)}
        selected={params.colors ?? []}
        onChange={(filter) => {
          setInitialFilters({
            ...params,
            colors: filter,
          });
        }}
      />
      <MobileCollectionFilter
        title={t("bestUses")}
        Icon={Filter}
        options={data.uses.map((use) => use.value)}
        selected={params.uses ?? []}
        onChange={(filter) => {
          setInitialFilters({
            ...params,
            uses: filter,
          });
        }}
      />
      <MobileCollectionSort
        title={t("sortBy")}
        Icon={SlidersHorizontal}
        options={data.sorts.map((sort) => sort.value)}
        selected={params.sort}
        onChange={(filter) => {
          setInitialFilters({
            ...params,
            sort: filter,
          });
        }}
        locale={locale}
      />
    </div>
  );
};

export default MobileCollectionsFilterSortContainer;
