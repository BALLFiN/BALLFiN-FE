import { TrendingUp, TrendingDown, AlertCircle, X } from "lucide-react";
import { NewsItem, getNewsDetail } from "../../api/news/index";
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
  const [displayNews, setDisplayNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    if (news) {
      setIsLoading((prev) => ({ ...prev, [news.id]: true }));
      getNewsDetail(news.id)
        .then((detail) => {
          setDisplayNews(detail);
          setIsAnalyzing((prev) => ({ ...prev, [news.id]: true }));
          // 3초 후 분석 완료로 설정
          setTimeout(() => {
            setIsAnalyzing((prev) => ({ ...prev, [news.id]: false }));
          }, 3000);
        })
        .catch((error) => {
          console.error("뉴스 상세 정보 로딩 중 오류:", error);
        })
        .finally(() => {
          setIsLoading((prev) => ({ ...prev, [news.id]: false }));
        });
    }
  }, [news]);

  if (!news) return null;

  return (
    <div
      className={`p-4 animate-slide-in max-w-2xl mx-auto transition-all duration-500 ease-in-out ${
        !isAnalyzing[news.id] && !isLoading[news.id]
          ? "min-h-[400px]"
          : "min-h-[200px]"
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          {displayNews?.title || news.title}
        </h2>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span>{displayNews?.press || news.press}</span>
        <span>•</span>
        <span>
          {new Date(
            displayNews?.published_at || news.published_at
          ).toLocaleDateString()}
        </span>
        <span>•</span>
        <a
          href={displayNews?.link || news.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0A5C2B] hover:underline"
        >
          원문 보기
        </a>
      </div>

      {isLoading[news.id] ? (
        <div className="flex justify-center items-center h-32">
          <Loading />
        </div>
      ) : isAnalyzing[news.id] ? (
        <div className="flex flex-col items-center justify-center h-32">
          <Loading />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">요약</h3>
            <p className="text-gray-600">{displayNews?.summary}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4" overflow-auto>
            <h3 className="font-medium text-gray-900 mb-2">상세 분석</h3>
            <p className="text-gray-600 max-h-[200px] overflow-y-auto">
              {displayNews?.analysis}
            </p>
          </div>
          {/* <div className="bg-gray-50 rounded-lg p-4">
             <h3 className="font-medium text-gray-900 mb-2">관련 종목</h3>
            <div className="flex flex-wrap gap-2">
              {(displayNews?.related_companies || []).map((company, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#0A5C2B]/10 text-[#0A5C2B] rounded-full text-sm"
                >
                  {company}
                </span>
              ))}
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
}
