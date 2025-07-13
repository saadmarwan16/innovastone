import { FunctionComponent } from "react";
import { Filter, SlidersHorizontal } from "lucide-react";
import { TCollectionsPageData } from "../lib/types";
import { CollectionsParams } from "../types/params";
import MobileCollectionFilter from "./MobileCollectionFilter";
import MobileCollectionSort from "./MobileCollectionSort";
import { Locale, useTranslations } from "next-intl";

interface MobileCollectionsFilterSortContainerProps {
  data: TCollectionsPageData;
  params: CollectionsParams;
  setTempFilters: (filters: CollectionsParams) => void;
  locale: Locale;
}

const MobileCollectionsFilterSortContainer: FunctionComponent<
  MobileCollectionsFilterSortContainerProps
> = ({ data, params, setTempFilters, locale }) => {
  const t = useTranslations("CollectionsPage.filters");

  return (
    <div className="space-y-6 py-4 max-h-[60vh] overflow-y-auto">
      <MobileCollectionFilter
        title={t("categories")}
        Icon={Filter}
        options={data.categories.map((category) => category.value)}
        selected={params.category ?? []}
        onChange={(filter) => {
          setTempFilters({
            ...params,
            category: Array.isArray(filter)
              ? filter.map((cat) => cat.toLowerCase())
              : [filter.toLowerCase()],
          });
        }}
      />
      <MobileCollectionFilter
        title={t("colorPalette")}
        Icon={Filter}
        options={data.colors.map((color) => color.value)}
        selected={params.colors ?? []}
        onChange={(filter) => {
          setTempFilters({
            ...params,
            colors: Array.isArray(filter)
              ? filter.map((color) => color.toLowerCase())
              : [filter.toLowerCase()],
          });
        }}
      />
      <MobileCollectionFilter
        title={t("bestUses")}
        Icon={Filter}
        options={data.uses.map((use) => use.value)}
        selected={params.uses ?? []}
        onChange={(filter) => {
          setTempFilters({
            ...params,
            uses: Array.isArray(filter)
              ? filter.map((use) => use.toLowerCase())
              : [filter.toLowerCase()],
          });
        }}
      />
      <MobileCollectionSort
        title={t("sortBy")}
        Icon={SlidersHorizontal}
        options={data.sorts.map((sort) => sort.value)}
        selected={params.sort}
        onChange={(filter) => {
          setTempFilters({
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
