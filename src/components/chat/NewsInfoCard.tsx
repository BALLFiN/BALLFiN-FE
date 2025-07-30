import { Card, CardContent } from "../ui/card";
import { Newspaper, Clock, X } from "lucide-react";

export interface NewsInfoCardProps {
  title: string;
  press?: string;
  published_at?: string;
  summary?: string;
  impact?: string;
  onRemove?: () => void;
  className?: string;
}

const getImpactColor = (impact?: string) => {
  switch (impact) {
    case "positive":
      return "text-green-600 bg-green-50 border-green-200";
    case "negative":
      return "text-red-600 bg-red-50 border-red-200";
    case "neutral":
      return "text-gray-600 bg-gray-50 border-gray-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
};

const getImpactText = (impact?: string) => {
  switch (impact) {
    case "positive":
      return "긍정";
    case "negative":
      return "부정";
    case "neutral":
      return "중립";
    default:
      return "중립";
  }
};

const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export default function NewsInfoCard({
  title,
  press,
  published_at,
  summary,
  impact,
  onRemove,
  className = "",
}: NewsInfoCardProps) {
  return (
    <Card className={`border bg-white shadow-sm ${className}`}>
      <CardContent className="px-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <div className="flex items-center gap-1.5">
                <Newspaper className="w-4 h-4 text-blue-600" />
                <h4 className="font-medium text-blue-900 text-sm sm:text-base">
                  뉴스 정보
                </h4>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium border ${getImpactColor(impact)}`}
              >
                {getImpactText(impact)}
              </span>
            </div>
            <h5 className="font-semibold text-gray-900 text-sm sm:text-base mb-2 line-clamp-2 leading-tight">
              {title}
            </h5>
            <div className="flex items-center gap-2 sm:gap-3 text-xs text-gray-500 mb-2 flex-wrap">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span className="hidden sm:inline">
                  {formatDate(published_at)}
                </span>
                <span className="sm:hidden">
                  {formatDate(published_at).split(" ")[0]}
                </span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="truncate">{press || "언론사 미상"}</span>
            </div>
            {summary && (
              <p className="text-xs text-gray-700 line-clamp-2 leading-relaxed">
                {summary}
              </p>
            )}
          </div>
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="flex-shrink-0 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
              aria-label="뉴스 정보 카드 삭제"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
