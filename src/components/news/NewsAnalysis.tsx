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

interface NewsAnalysisProps {
  news: NewsItem | null;
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

export default function NewsAnalysis({ news }: NewsAnalysisProps) {
  if (!news) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        뉴스를 선택해주세요
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          {getImpactIcon(news.impact)}
          <h2 className="text-xl font-bold text-gray-900">{news.title}</h2>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>{news.source}</span>
          <span>•</span>
          <span>{news.date}</span>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-2">뉴스 요약</h3>
          <p className="text-gray-600">{news.summary}</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-2">AI 분석</h3>
          <p className="text-gray-600">{news.analysis}</p>
        </div>
      </div>
    </div>
  );
}
