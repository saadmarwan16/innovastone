"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Filter,
  SlidersHorizontal,
  X,
  Search,
  ChevronRight,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { collections } from "@/lib/data/collections";

interface Filters {
  colors: string[];
  finishes: string[];
  uses: string[];
  sort: string;
}

const filters = {
  colors: [
    "White",
    "Beige",
    "Gray",
    "Black",
    "Exotic",
    "Multi",
    "Green",
    "Pink",
    "Blue",
    "Yellow",
  ],
  finishes: ["Polished", "Honed", "Brushed", "Textured", "Natural", "Backlit"],
  uses: [
    "Flooring",
    "Walls",
    "Countertops",
    "Exteriors",
    "Bathrooms",
    "Feature Walls",
    "Bedrooms"
  ],
  sort: [
    "Popularity",
    "New Arrivals",
    "Most Luxurious",
    "Price: Low to High",
    "Price: High to Low",
  ],
};

interface FilterSectionProps {
  title: string;
  icon: React.ElementType;
  options: string[];
  selected: string[] | string;
  onChange: (category: string, value: string) => void;
  category: string;
}

const FilterSection = ({
  title,
  icon: Icon,
  options,
  selected,
  onChange,
  category,
}: FilterSectionProps) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <Icon className="h-5 w-5 text-stone-gold" />
      <h3 className="font-bold text-stone-charcoal">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(category, option)}
          className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
            category === "sort"
              ? selected === option
                ? "bg-stone-gold text-white"
                : "bg-stone-gold/10 text-stone-charcoal hover:bg-stone-gold/20"
              : Array.isArray(selected) && selected.includes(option)
              ? "bg-stone-gold text-white"
              : "bg-stone-gold/10 text-stone-charcoal hover:bg-stone-gold/20"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

const CollectionsClient = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    colors: [],
    finishes: [],
    uses: [],
    sort: "Popularity",
  });
  const [tempFilters, setTempFilters] = useState<Filters>(selectedFilters);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [visibleCollections, setVisibleCollections] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleFilterChange = (category: string, value: string) => {
    const updateFilters = (prev: Filters): Filters => {
      if (category === "sort") {
        return { ...prev, sort: value };
      }

      const currentArray = prev[category as keyof Omit<Filters, "sort">];
      if (!Array.isArray(currentArray)) return prev;

      const updatedFilters = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value];

      return { ...prev, [category]: updatedFilters };
    };

    if (isDialogOpen) {
      setTempFilters(updateFilters);
    } else {
      setSelectedFilters(updateFilters);
    }
  };

  const handleApplyFilters = () => {
    setSelectedFilters(tempFilters);
    setIsDialogOpen(false);
  };

  const handleDialogOpen = (open: boolean) => {
    setIsDialogOpen(open);
    if (open) {
      setTempFilters(selectedFilters);
    }
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setVisibleCollections((prev) =>
        Math.min(prev + 6, filteredCollections.length)
      );
      setIsLoading(false);
    }, 500);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setVisibleCollections(6); // Reset pagination when searching
  };

  const filteredCollections = collections
    .filter((collection) => {
      const matchesSearch =
        searchQuery === "" ||
        collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        collection.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (
        selectedFilters.colors.length === 0 &&
        selectedFilters.finishes.length === 0 &&
        selectedFilters.uses.length === 0
      ) {
        return true;
      }

      const matchesColors =
        selectedFilters.colors.length === 0 ||
        selectedFilters.colors.some((color) =>
          collection.colors.includes(color)
        );
      const matchesFinishes =
        selectedFilters.finishes.length === 0 ||
        selectedFilters.finishes.some((finish) =>
          collection.finishes.includes(finish)
        );
      const matchesUses =
        selectedFilters.uses.length === 0 ||
        selectedFilters.uses.some((use) => collection.uses.includes(use));

      return matchesColors && matchesFinishes && matchesUses;
    })
    .sort((a, b) => {
      switch (selectedFilters.sort) {
        case "Popularity":
          return b.popularity - a.popularity;
        case "New Arrivals":
          return b.isNew ? 1 : -1;
        case "Most Luxurious":
          return b.luxuryScore - a.luxuryScore;
        case "Price: Low to High":
          return a.priceRange === "Luxury" ? 1 : -1;
        case "Price: High to Low":
          return b.priceRange === "Luxury" ? 1 : -1;
        default:
          return 0;
      }
    });

  const displayedCollections = filteredCollections.slice(0, visibleCollections);
  const hasMore = visibleCollections < filteredCollections.length;

  const filterSections = [
    {
      title: "Color Palette",
      icon: Filter,
      options: filters.colors,
      category: "colors",
    },
    {
      title: "Finish Type",
      icon: Filter,
      options: filters.finishes,
      category: "finishes",
    },
    {
      title: "Best Uses",
      icon: Filter,
      options: filters.uses,
      category: "uses",
    },
    {
      title: "Sort By",
      icon: SlidersHorizontal,
      options: filters.sort,
      category: "sort",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:h-[70vh] flex items-center justify-center py-20 sm:py-24 md:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-stone-charcoal/70 via-stone-charcoal/60 to-transparent" />
        </div>
        <div
          className={`relative container mx-auto px-4 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-stone-marble mb-6 hero-text-shadow">
            Stone Collections
          </h1>
          <p className="text-lg sm:text-xl text-stone-marble/90 max-w-3xl mx-auto mb-8">
            Discover the Finest Stone Collections—Timeless Elegance, Unmatched
            Quality
          </p>
          <Button
            size="lg"
            className="bg-stone-gold hover:bg-stone-gold/90 text-white transition-all duration-500 hover:scale-105"
            onClick={() => {
              const collectionsSection = document.getElementById("collections");
              collectionsSection?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore Our Collections
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Collections Section */}
      <section
        id="collections"
        className="py-24 bg-white relative overflow-hidden"
      >
        <div className="absolute inset-0 marble-pattern" />
        <div className="container relative">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-charcoal/40" />
              <Input
                type="text"
                placeholder="Search collections..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10 bg-white/80 backdrop-blur-sm border-stone-gold/20 focus:border-stone-gold focus:ring-stone-gold/20"
              />
            </div>
          </div>

          {/* Mobile Filter Button */}
          <div className="mb-8 lg:hidden">
            <Dialog open={isDialogOpen} onOpenChange={handleDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full bg-white border-stone-gold/20 text-stone-charcoal hover:bg-stone-gold/5"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter & Sort
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Filter Collections</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4 max-h-[60vh] overflow-y-auto">
                  {filterSections.map((section) => (
                    <FilterSection
                      key={section.category}
                      {...section}
                      selected={tempFilters[section.category as keyof Filters]}
                      onChange={handleFilterChange}
                    />
                  ))}
                </div>
                <DialogFooter className="flex gap-2 sm:gap-0">
                  <DialogClose asChild>
                    <Button variant="outline" className="flex-1 sm:flex-none">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    className="flex-1 sm:flex-none bg-stone-gold hover:bg-stone-gold/90"
                    onClick={handleApplyFilters}
                  >
                    Apply Filters
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Desktop Filters */}
          <div className="hidden lg:block mb-12">
            <div className="grid grid-cols-4 gap-6">
              {filterSections.map((section) => (
                <div
                  key={section.category}
                  className="glass-effect rounded-xl p-6"
                >
                  <FilterSection
                    {...section}
                    selected={
                      selectedFilters[section.category as keyof Filters]
                    }
                    onChange={handleFilterChange}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedCollections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.id}`}
                className="group"
              >
                <div className="glass-effect rounded-2xl overflow-hidden hover-lift">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={collection.heroImage}
                      alt={collection.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {collection.isNew && (
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
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-12 flex items-center justify-center">
              <Button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="bg-stone-gold hover:bg-stone-gold/90 text-white min-w-[200px] flex items-center gap-2"
              >
                View More Collections
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </div>
          )}

          {/* Consultation CTA */}
          <div className="mt-24 relative">
            <div className="absolute inset-0 bg-stone-charcoal rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070"
                alt="Luxury Stone Design"
                fill
                className="object-cover opacity-20"
                sizes="100vw"
              />
            </div>
            <div className="relative glass-effect rounded-2xl p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-charcoal mb-4">
                Not sure which stone suits your project?
              </h2>
              <p className="text-stone-charcoal/70 mb-8 max-w-2xl mx-auto">
                Our expert consultants are here to help you choose the perfect
                stone for your space. Let&apos;s create something extraordinary
                together.
              </p>
              <Button
                size="lg"
                className="bg-stone-gold hover:bg-stone-gold/90 text-white transition-all duration-500 hover:scale-105"
                asChild
              >
                <Link href="/consultation">
                  Request a Consultation
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CollectionsClient;