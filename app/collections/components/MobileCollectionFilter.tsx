import { FunctionComponent } from "react";

interface MobileCollectionFilterProps {
  title: string;
  Icon: React.ElementType;
  selected: string | string[];
  options: string[];
  onChange: (filter: string | string[]) => void;
}

const MobileCollectionFilter: FunctionComponent<
  MobileCollectionFilterProps
> = ({ title, Icon, options, selected, onChange }) => {
  return (
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
};

export default MobileCollectionFilter;
