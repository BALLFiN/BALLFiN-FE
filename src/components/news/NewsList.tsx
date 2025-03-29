import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  source: string;
  date: string;
  impact: "positive" | "negative" | "neutral";
  summary: string;
  analysis: string;
}

interface NewsListProps {
  news: NewsItem[];
  selectedNews: NewsItem | null;
  onNewsClick: (news: NewsItem) => void;
}

const getImpactIcon = (impact: NewsItem["impact"]) => {
  switch (impact) {
    case "positive":
      return <TrendingUp className="w-5 h-5 text-green-500" />;
    case "negative":
      return <TrendingDown className="w-5 h-5 text-red-500" />;
    default:
      return <AlertCircle className="w-5 h-5 text-gray-500" />;
  }
};

export default function NewsList({
  news,
  selectedNews,
  onNewsClick,
}: NewsListProps) {
  return (
    <div className="p-6 h-full overflow-y-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">최신 뉴스</h1>
      <div className="space-y-4">
        {news.map((item) => (
          <div
            key={item.id}
            onClick={() => onNewsClick(item)}
            className={`p-4 rounded-lg cursor-pointer transition-all ${
              selectedNews?.id === item.id
                ? "bg-[#0A5C2B] text-white"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <div className="flex items-start gap-3">
              {getImpactIcon(item.impact)}
              <div>
                <h2 className="font-medium mb-1">{item.title}</h2>
                <div className="flex items-center gap-2 text-sm">
                  <span
                    className={
                      selectedNews?.id === item.id
                        ? "text-white/80"
                        : "text-gray-500"
                    }
                  >
                    {item.source}
                  </span>
                  <span
                    className={
                      selectedNews?.id === item.id
                        ? "text-white/80"
                        : "text-gray-500"
                    }
                  >
                    {item.date}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
