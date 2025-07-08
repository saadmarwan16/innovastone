import { useState, useEffect, FunctionComponent } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useDebounce } from "../hooks/useDebounce";
import { CollectionsParams } from "../types/params";
import { GenerateUrlQueryString } from "../lib/GenerateUrlQueryString";
import { useTranslations } from 'next-intl';

interface SearchBarProps {
  searchParams: CollectionsParams;
}

const SearchBar: FunctionComponent<SearchBarProps> = ({ searchParams }) => {
  const [search, setSearch] = useState(searchParams.search ?? "");
  const router = useRouter();
  const debouncedValue = useDebounce(search, 500);
  const t = useTranslations('CollectionsPage.search');
  useEffect(() => {
    router.push(GenerateUrlQueryString.search(searchParams, debouncedValue), {
      scroll: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, searchParams.category, searchParams.sort, searchParams]);

  return (
    <div className="mb-8">
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-charcoal/40" />
        <Input
          type="text"
          placeholder={t('placeholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-white/80 backdrop-blur-sm border-stone-gold/20 focus:border-stone-gold focus:ring-stone-gold/20"
        />
      </div>
    </div>
  );
};

export default SearchBar;
