import { TrendingUp, TrendingDown, MoveRight } from "lucide-react";
import { NewsCardProps } from "./types";
import { useRef } from "react";

const getImpactIcon = (impact: "positive" | "negative" | "neutral") => {
  switch (impact) {
    case "positive":
      return <TrendingUp className="w-5 h-5 text-red-500" />;
    case "negative":
      return <TrendingDown className="w-5 h-5 text-blue-500" />;
    case "neutral":
      return <MoveRight className="w-5 h-5 text-gray-500" />;
    default:
      return <MoveRight className="w-5 h-5 text-gray-500" />;
  }
};

export default function NewsCard({ item, isSelected, onClick }: NewsCardProps) {
  const dragRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent) => {
    e.stopPropagation();
    const newsData = {
      id: item.id,
      title: item.title,
      press: item.press,
      published_at: item.published_at,
      summary: item.summary,
      impact: item.impact,
    };
    e.dataTransfer.setData("application/json", JSON.stringify(newsData));
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick(item);
  };

  return (
    <div
      ref={dragRef}
      id={`news-card-${item.id}`}
      draggable
      onDragStart={handleDragStart}
      onClick={handleClick}
      className={`p-4 rounded-lg transition-all duration-300 border ${
        isSelected
          ? "border-[#0A5C2B] shadow-md"
          : "border-gray-200 hover:border-[#0A5C2B] hover:shadow-md cursor-pointer"
      } hover:scale-[1.02] active:scale-[0.98]`}
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
