import { FunctionComponent, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Loader2 } from "lucide-react";
import useSWRInfinite from "swr/infinite";
import Image from "next/image";
import Link from "next/link";
import { CollectionsParams } from "../types/params";
import { FetchCollections } from "../lib/FetchCollections";
import { ConstructImageLink } from "@/utils/ConstrucImageLink";

interface CollectionGridProps {
  params: CollectionsParams;
}

const CollectionGrid: FunctionComponent<CollectionGridProps> = ({ params }) => {
  const {
    data: collections,
    size,
    setSize,
    isLoading,
    isValidating,
  } = useSWRInfinite(
    (pageIdx) => {
      return {
        ...params,
        page: pageIdx + 1,
      };
    },
    async (params) => {
      const { data } = await FetchCollections.execute(params);

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

  return (
    <>
      {size === 1 && collections?.[0]?.length === 0 ? (
        <div>Empty state</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections?.map((page) => (
              <>
                {page.map((collection) => (
                  <Link
                    key={collection.id}
                    href={`/collections/${collection.id}`}
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
                            New
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
                          View Collection
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                ))}
              </>
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
                View More Collections
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
