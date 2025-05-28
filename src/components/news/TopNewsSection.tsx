import { Clock } from "lucide-react";
import { NewsItem } from "../../api/news/index";

interface TopNewsSectionProps {
  topNews: NewsItem[];
  onNewsClick: (news: NewsItem) => void;
  isLoading?: boolean;
}

export default function TopNewsSection({
  topNews,
  onNewsClick,
  isLoading = false,
}: TopNewsSectionProps) {
  if (isLoading) {
    return (
      <div className="max-w-[90rem] mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-gradient-to-r from-[#0A5C2B] to-[#0A5C2B]/80 p-2 rounded-lg shadow-sm">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-[#0A5C2B] to-[#0A5C2B]/80 bg-clip-text text-transparent">
            실시간 인기 뉴스 Top 5
          </h2>
        </div>
        <div className="grid grid-cols-5 gap-6">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-100 overflow-hidden relative bg-white shadow-md animate-pulse"
            >
              <div className="aspect-video bg-gray-200" />
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[90rem] mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-gradient-to-r from-[#0A5C2B] to-[#0A5C2B]/80 p-2 rounded-lg shadow-sm">
          <Clock className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-[#0A5C2B] to-[#0A5C2B]/80 bg-clip-text text-transparent">
          실시간 인기 뉴스 Top 5
        </h2>
      </div>
      <div className="grid grid-cols-5 gap-6">
        {topNews.map((news, index) => (
          <div
            key={news.id}
            className="rounded-xl border border-gray-100 hover:border-[#0A5C2B]/20 cursor-pointer transition-all duration-300 overflow-hidden relative bg-white shadow-md hover:shadow-xl transform hover:-translate-y-1"
            onClick={() => onNewsClick(news)}
          >
            <div
              className={`absolute top-3 left-3 w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm z-2 shadow-lg ${
                index === 0
                  ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                  : index === 1
                    ? "bg-gradient-to-br from-gray-400 to-gray-600"
                    : index === 2
                      ? "bg-gradient-to-br from-amber-600 to-amber-800"
                      : "bg-gradient-to-br from-gray-700 to-gray-900"
              }`}
            >
              {index + 1}
            </div>
            <div className="aspect-video relative overflow-hidden">
              <img
                src={news.image_url || "https://via.placeholder.com/400x225"}
                alt={news.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <div className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                {news.title}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{news.press}</span>
                <span>•</span>
                <span>{new Date(news.published_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
