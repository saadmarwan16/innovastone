import { useState, useEffect, FunctionComponent } from "react";
import { Filter, SlidersHorizontal } from "lucide-react";
import { TCollectionsPageData } from "../lib/types";
import { CollectionsParams } from "../types/params";
import MobileCollectionFilter from "./MobileCollectionFilter";
import MobileCollectionSort from "./MobileCollectionSort";

interface MobileCollectionsFilterSortContainerProps {
  data: TCollectionsPageData;
  params: CollectionsParams;
  setInitialFilters: (filters: CollectionsParams) => void;
}

const MobileCollectionsFilterSortContainer: FunctionComponent<
  MobileCollectionsFilterSortContainerProps
> = ({ data, params, setInitialFilters }) => {
  console.log("MobileCollectionsFilterSortContainer params:", params);

  return (
    <div className="space-y-6 py-4 max-h-[60vh] overflow-y-auto">
      <MobileCollectionFilter
        title="Categories"
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
        title="Color Palette"
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
        title="Best Uses"
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
        title="Sort By"
        Icon={SlidersHorizontal}
        options={data.sorts.map((sort) => sort.value)}
        selected={params.sort}
        onChange={(filter) => {
          setInitialFilters({
            ...params,
            sort: filter,
          });
        }}
      />
    </div>
  );
};

export default MobileCollectionsFilterSortContainer;
