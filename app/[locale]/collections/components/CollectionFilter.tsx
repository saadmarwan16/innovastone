import { FunctionComponent } from "react";

interface CollectionFilterProps {
  title: string;
  Icon: React.ElementType;
  options: string[];
  onChange: (selected: string[]) => void;
  selected: string | string[];
}

const CollectionFilter: FunctionComponent<CollectionFilterProps> = ({
  title,
  Icon,
  selected,
  options,
  onChange,
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
            if (selected.includes(option.toLowerCase())) {
              onChange(
                Array.isArray(selected)
                  ? selected.filter((item) => item !== option.toLowerCase())
                  : []
              );
            } else {
              onChange(
                Array.isArray(selected)
                  ? [...selected, option]
                  : [selected, option]
              );
            }
          }}
          className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
            selected.includes(option.toLowerCase())
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

export default CollectionFilter;
