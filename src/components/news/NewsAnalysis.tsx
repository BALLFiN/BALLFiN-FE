import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  X,
  PlayCircle,
} from "lucide-react";
import { NewsItem } from "../../api/news";
import { useState, useEffect } from "react";
import Loading from "../common/Loading";

interface NewsAnalysisProps {
  news: NewsItem | null;
  onClose: () => void;
}

export default function NewsAnalysis({ news, onClose }: NewsAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});

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
    <div
      className={`p-4 animate-slide-in max-w-2xl mx-auto transition-all duration-500 ease-in-out ${
        !isAnalyzing[news.id] && !isLoading[news.id]
          ? "h-[200px]"
          : "min-h-[200px]"
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold text-gray-900">{news.title}</h2>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span>{news.press}</span>
        <span>•</span>
        <span>{new Date(news.published_at).toLocaleDateString()}</span>
        <span>•</span>
        <a
          href={news.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0A5C2B] hover:underline"
        >
          원문 보기
        </a>
      </div>

      {isLoading[news.id] ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <Loading />
        </div>
      ) : !isAnalyzing[news.id] ? (
        <button
          onClick={() => setIsLoading((prev) => ({ ...prev, [news.id]: true }))}
          className="w-full py-2.5 bg-[#0A5C2B] text-white rounded-lg hover:bg-[#0A5C2B]/90 transition-colors flex items-center justify-center gap-2"
        >
          <PlayCircle className="w-4 h-4" />
          <span>분석 시작하기</span>
        </button>
      ) : (
        <div className="space-y-3">
          <div className="animate-fade-in bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-base font-semibold text-gray-900 mb-2">요약</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {news.summary}
            </p>
          </div>

          <div className="animate-fade-in bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              영향 분석
            </h3>
            <div className="flex items-center gap-2">
              {news.impact === "positive" ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : news.impact === "negative" ? (
                <TrendingDown className="w-4 h-4 text-red-500" />
              ) : (
                <AlertCircle className="w-4 h-4 text-gray-500" />
              )}
              <span className="text-gray-600 text-sm font-medium">
                {news.impact}
              </span>
            </div>
          </div>

          <div className="animate-fade-in bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              상세 분석
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {news.analysis}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
