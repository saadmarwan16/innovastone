import { FunctionComponent } from "react";

interface CollectionSortProps {
  title: string;
  Icon: React.ElementType;
  options: string[];
  onChange: (selected: string | undefined) => void;
  selected: string | undefined;
}

const sortOptions: { [key: string]: string } = {
  "Price: High to Low": "luxury_score:desc",
  "Price: Low to High": "luxury_score:asc",
  "Most Popular": "popularity:desc",
  "Least Popular": "popularity:asc",
  "Alphabetical: A-Z": "name:asc",
  "Alphabetical: Z-A": "name:desc",
};

const CollectionSort: FunctionComponent<CollectionSortProps> = ({
  title,
  Icon,
  options,
  onChange,
  selected,
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
            if (selected === sortOptions[option]) {
              return onChange(undefined); // Deselect if already selected
            }

            return onChange(sortOptions[option]); // Select the new option
          }}
          className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
            selected === sortOptions[option]
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
