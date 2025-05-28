import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { NewsCardProps } from "./types";

const getImpactIcon = (impact: "positive" | "negative" | "neutral") => {
  switch (impact) {
    case "positive":
      return <TrendingUp className="w-5 h-5 text-green-500" />;
    case "negative":
      return <TrendingDown className="w-5 h-5 text-red-500" />;
    default:
      return <AlertCircle className="w-5 h-5 text-gray-500" />;
  }
};

export default function NewsCard({ item, isSelected, onClick }: NewsCardProps) {
  return (
    <div
      id={`news-card-${item.id}`}
      onClick={() => onClick(item)}
      className={`p-4 rounded-lg transition-all duration-300 border ${
        isSelected
          ? "border-[#0A5C2B] bg-[#0A5C2B] text-white scale-105 shadow-lg"
          : "border-gray-200 hover:border-[#0A5C2B] hover:shadow-md cursor-pointer"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start gap-3 mb-2">
          {getImpactIcon(item.impact)}
          <div className="flex-1">
            <h2 className="font-medium mb-1 line-clamp-2">{item.title}</h2>
            <div className="flex items-center gap-2 text-sm">
              <span className={isSelected ? "text-white/80" : "text-gray-500"}>
                {item.press}
              </span>
              <span className={isSelected ? "text-white/80" : "text-gray-500"}>
                {new Date(item.published_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
