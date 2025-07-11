import { Fragment, FunctionComponent, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import useSWRInfinite from "swr/infinite";
import Image from "next/image";
import { CollectionsParams } from "../types/params";
import { FetchCollections } from "../lib/FetchCollections";
import { ConstructImageLink } from "@/utils/ConstrucImageLink";
import { Locale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface CollectionGridProps {
  params: CollectionsParams;
  locale: Locale;
}

const CollectionGrid: FunctionComponent<CollectionGridProps> = ({
  params,
  locale,
}) => {
  const t = useTranslations("CollectionsPage.collections");
  const {
    data: collections,
    size,
    setSize,
    isLoading,
    error,
    isValidating,
  } = useSWRInfinite(
    (pageIdx) => {
      return {
        ...params,
        page: pageIdx + 1,
      };
    },
    async (params) => {
      const { data } = await FetchCollections.execute(params, locale);

      return data;
    },
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  );

  const hasMore = useMemo(
    () => collections?.[size - 1]?.length !== 0,
    [collections, size]
  );

  const handleLoadMore = useCallback(() => setSize(size + 1), [size, setSize]);

  // Loading state for initial load
  if (isLoading && !collections) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="glass-effect rounded-2xl overflow-hidden">
            <Skeleton className="aspect-[4/3] w-full" />
            <div className="p-6">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (error && !collections) {
    return (
      <div className="glass-effect rounded-2xl p-12 text-center">
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-xl font-bold text-stone-charcoal mb-2">
          {t("error.title")}
        </h3>
        <p className="text-stone-charcoal/70 mb-6">{t("error.message")}</p>
        <Button
          onClick={() => window.location.reload()}
          className="bg-stone-gold hover:bg-stone-gold/90 text-white inline-flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          {t("error.retryButton")}
        </Button>
      </div>
    );
  }

  return (
    <>
      {size === 1 && collections?.[0]?.length === 0 ? (
        <div className="glass-effect rounded-2xl p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-stone-gold/10 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-stone-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-stone-charcoal mb-2">
            {t("emptyState")}
          </h3>
          <p className="text-stone-charcoal/70">{t("emptyStateDetails")}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections?.map((page, idx) => (
              <Fragment key={idx}>
                {page.map((collection) => (
                  <Link
                    key={collection.id}
                    href={{
                      pathname: "/collections/[slug]",
                      params: { slug: collection.slug },
                    }}
                    className="group"
                  >
                    <div className="glass-effect rounded-2xl overflow-hidden hover-lift">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={ConstructImageLink.execute(
                            collection.hero_image.url
                          )}
                          alt={collection.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {collection.is_new && (
                          <span className="absolute top-4 right-4 bg-stone-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                            {t("newBadge")}
                          </span>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-stone-charcoal mb-2">
                          {collection.name}
                        </h3>
                        <p className="text-stone-charcoal/70 mb-4 line-clamp-3">
                          {collection.description}
                        </p>
                        <Button className="w-full bg-stone-gold/10 hover:bg-stone-gold hover:text-white text-stone-gold transition-all duration-300">
                          {t("viewCollection")}
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                ))}
              </Fragment>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-12 flex items-center justify-center">
              <Button
                onClick={handleLoadMore}
                disabled={isLoading || isValidating}
                className="bg-stone-gold hover:bg-stone-gold/90 text-white min-w-[200px] flex items-center gap-2"
              >
                {t("viewMoreCollections")}
                {isLoading || isValidating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CollectionGrid;
