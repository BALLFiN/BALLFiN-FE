import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  X,
  PlayCircle,
} from "lucide-react";
import { NewsItem } from "../../mock/newsData";
import { useState, useEffect } from "react";
import Loading from "../common/Loading";

interface NewsAnalysisProps {
  news: NewsItem | null;
  onClose: () => void;
}

export default function NewsAnalysis({ news, onClose }: NewsAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [isLoading, setIsLoading] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    if (news && isLoading[news.id]) {
      const timer = setTimeout(() => {
        setIsLoading((prev) => ({ ...prev, [news.id]: false }));
        setIsAnalyzing((prev) => ({ ...prev, [news.id]: true }));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, news]);

  if (!news) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">뉴스를 선택해주세요</p>
      </div>
    );
  }

  return (
    <div className="p-6 animate-slide-in">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{news.title}</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span>{news.source}</span>
        <span>•</span>
        <span>{news.date}</span>
      </div>

      {isLoading[news.id] ? (
        <div className="flex justify-center py-8 bg-white h-[50vh] p-6 rounded-2xl shadow-sm border border-gray-100">
          <Loading />
        </div>
      ) : !isAnalyzing[news.id] ? (
        <button
          onClick={() => setIsLoading((prev) => ({ ...prev, [news.id]: true }))}
          className="w-full py-3 bg-[#0A5C2B] text-white rounded-lg hover:bg-[#0A5C2B]/90 transition-colors flex items-center justify-center gap-2"
        >
          <PlayCircle className="w-5 h-5" />
          <span>분석 시작하기</span>
        </button>
      ) : (
        <div className="space-y-4">
          <div className="animate-fade-in bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">요약</h3>
            <p className="text-gray-600 leading-relaxed">{news.summary}</p>
          </div>

          <div className="animate-fade-in bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              영향 분석
            </h3>
            <div className="flex items-center gap-2">
              {news.impact === "positive" ? (
                <TrendingUp className="w-5 h-5 text-green-500" />
              ) : news.impact === "negative" ? (
                <TrendingDown className="w-5 h-5 text-red-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-gray-500" />
              )}
              <span className="text-gray-600 font-medium">{news.impact}</span>
            </div>
          </div>

          <div className="animate-fade-in bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              상세 분석
            </h3>
            <p className="text-gray-600 leading-relaxed">{news.analysis}</p>
          </div>
        </div>
      )}
    </div>
  );
}
