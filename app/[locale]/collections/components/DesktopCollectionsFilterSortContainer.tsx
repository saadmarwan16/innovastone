import { FunctionComponent } from "react";
import { Filter, SlidersHorizontal } from "lucide-react";
import CollectionFilter from "./CollectionFilter";
import CollectionSort from "./CollectionSort";
import { TCollectionsPageData } from "../lib/types";
import { CollectionsParams } from "../types/params";
import { Locale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { GenerateNewQuery } from "../lib/GenerateNewQuery";

interface DesktopCollectionsFilterSortContainerProps {
  data: TCollectionsPageData;
  params: CollectionsParams;
  locale: Locale;
}

const DesktopCollectionsFilterSortContainer: FunctionComponent<
  DesktopCollectionsFilterSortContainerProps
> = ({ data, params, locale }) => {
  const router = useRouter();
  const t = useTranslations("CollectionsPage.filters");

  return (
    <div className="hidden lg:block mb-12">
      <div className="grid grid-cols-4 gap-6">
        <div className="glass-effect rounded-xl p-6">
          <CollectionFilter
            title={t("categories")}
            Icon={Filter}
            options={data.categories.map((category) => category.value)}
            selected={params.category ?? []}
            onChange={(selected) =>
              router.push(
                {
                  pathname: "/collections",
                  query: GenerateNewQuery.category(
                    params,
                    selected ? selected : undefined
                  ),
                },
                {
                  scroll: false,
                }
              )
            }
          />
        </div>
        <div className="glass-effect rounded-xl p-6">
          <CollectionFilter
            title={t("colorPalette")}
            Icon={Filter}
            options={data.colors.map((color) => color.value)}
            selected={params.colors ?? []}
            onChange={(selected) =>
              router.push(
                {
                  pathname: "/collections",
                  query: GenerateNewQuery.colors(
                    params,
                    selected ? selected : undefined
                  ),
                },
                {
                  scroll: false,
                }
              )
            }
          />
        </div>
        <div className="glass-effect rounded-xl p-6">
          <CollectionFilter
            title={t("bestUses")}
            Icon={Filter}
            options={data.uses.map((use) => use.value)}
            selected={params.uses ?? []}
            onChange={(selected) =>
              router.push(
                {
                  pathname: "/collections",
                  query: GenerateNewQuery.uses(
                    params,
                    selected ? selected : undefined
                  ),
                },
                {
                  scroll: false,
                }
              )
            }
          />
        </div>
        <div className="glass-effect rounded-xl p-6">
          <CollectionSort
            title={t("sortBy")}
            Icon={SlidersHorizontal}
            options={data.sorts.map((sort) => sort.value)}
            selected={params.sort}
            onChange={(selected) =>
              router.push(
                {
                  pathname: "/collections",
                  query: GenerateNewQuery.sort(
                    params,
                    selected ? selected : undefined
                  ),
                },
                {
                  scroll: false,
                }
              )
            }
            locale={locale}
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopCollectionsFilterSortContainer;
