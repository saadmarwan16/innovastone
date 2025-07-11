import { Locale } from "next-intl";
import { FunctionComponent } from "react";

interface CollectionSortProps {
  title: string;
  Icon: React.ElementType;
  options: string[];
  onChange: (selected: string | undefined) => void;
  selected: string | undefined;
  locale: Locale;
}

const sortOptions: { [key: string]: { [key: string]: string } } = {
  en: {
    "Price: High to Low": "luxury_score:desc",
    "Price: Low to High": "luxury_score:asc",
    "Most Popular": "popularity:desc",
    "Least Popular": "popularity:asc",
    "Alphabetical: A-Z": "name:asc",
    "Alphabetical: Z-A": "name:desc",
  },
  fr: {
    "Prix ​​: du plus élevé au plus bas": "luxury_score:desc",
    "Prix ​​: du plus bas au plus élevé": "luxury_score:asc",
    "Le plus populaire": "popularity:desc",
    "Le moins populaire": "popularity:asc",
    "Alphabétique : A-Z": "name:asc",
    "Alphabétique : Z-A": "name:desc",
  },
  tr: {
    "Fiyat: Yüksekten Düşüğe": "luxury_score:desc",
    "Fiyat: Düşükten yükseğe": "luxury_score:asc",
    "En Popüler": "popularity:desc",
    "En Az Popüler": "popularity:asc",
    "Alfabetik: A-Z": "name:asc",
    "Alfabetik: Z-A": "name:desc",
  },
};

const CollectionSort: FunctionComponent<CollectionSortProps> = ({
  title,
  Icon,
  options,
  onChange,
  selected,
  locale,
}) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <Icon className="h-5 w-5 text-stone-gold" />
      <h3 className="font-bold text-stone-charcoal">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => {
            if (selected === sortOptions[locale][option]) {
              return onChange(undefined); // Deselect if already selected
            }

            return onChange(sortOptions[locale][option]); // Select the new option
          }}
          className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
            selected === sortOptions[locale][option]
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

export default CollectionSort;
