import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "검색",
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-[70vh]">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5C2B] focus:border-transparent transition-all duration-200"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && onSearch) {
              onSearch();
            }
          }}
        />
      </div>
      <button
        onClick={onSearch}
        className="p-2.5 bg-[#0A5C2B] text-white rounded-lg hover:bg-[#0A5C2B]/90 transition-colors"
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
}
