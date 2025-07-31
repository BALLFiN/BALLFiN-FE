import { X, Copy, ExternalLink } from "lucide-react";
import { NewsItem, getNewsDetail } from "../../api/news/index";
import { useState, useEffect } from "react";
import Loading from "../common/Loading";
import Toast from "../common/Toast";
import ImpactScore from "./ImpactScore";

interface NewsAnalysisProps {
  news: NewsItem | null;
  onClose: () => void;
  onNavigateToDetail?: (newsId: string) => void;
}

export default function NewsAnalysis({
  news,
  onClose,
  onNavigateToDetail,
}: NewsAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});
  const [displayNews, setDisplayNews] = useState<NewsItem | null>(null);
  const [copyStatus, setCopyStatus] = useState<{ [key: string]: boolean }>({});
  const [showToast, setShowToast] = useState(false);

  const handleCopy = async (text: string, section: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus((prev) => ({ ...prev, [section]: true }));
      setShowToast(true);

      setTimeout(() => {
        setCopyStatus((prev) => ({ ...prev, [section]: false }));
        setShowToast(false);
      }, 2000);
    } catch (err) {
      console.error("클립보드 복사 실패:", err);
    }
  };

  useEffect(() => {
    if (news) {
      setIsLoading((prev) => ({ ...prev, [news.id]: true }));
      getNewsDetail(news.id)
        .then((detail) => {
          setDisplayNews(detail);
          setIsAnalyzing((prev) => ({ ...prev, [news.id]: false }));
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
    <div className="relative">
      <div
        className={`p-6 animate-slide-in max-w-2xl mx-auto transition-all duration-500 ease-in-out bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 ${
          !isAnalyzing[news.id] && !isLoading[news.id]
            ? "min-h-[400px]"
            : "min-h-[200px]"
        }`}
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-semibold text-gray-900 leading-tight pr-4">
            {displayNews?.title || news.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-50 rounded-full transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 pb-4 border-b border-gray-100">
          <span className="font-medium text-gray-700">
            {displayNews?.press || news.press}
          </span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-600">
            {new Date(
              displayNews?.published_at || news.published_at
            ).toLocaleDateString()}
          </span>
          <span className="text-gray-300">•</span>
          <a
            href={displayNews?.link || news.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 transition-colors font-medium"
          >
            원문 보기
          </a>
          {onNavigateToDetail && (
            <button
              onClick={() => onNavigateToDetail(news.id)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              title="뉴스 상세 페이지로 이동"
            >
              <ExternalLink className="w-4.5 h-4.5 text-gray-500" />
            </button>
          )}
        </div>

        <div className="transition-all duration-500 ease-in-out">
          {isLoading[news.id] ? (
            <div className="flex justify-center items-center h-40">
              <Loading />
            </div>
          ) : isAnalyzing[news.id] ? (
            <div className="flex flex-col items-center justify-center h-40">
              <Loading />
            </div>
          ) : (
            <div className="space-y-5 animate-fade-in">
              <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
                <ImpactScore
                  score={displayNews?.impact_score || news.impact_score || 9}
                />
              </div>
              <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-900 text-lg">요약</h3>
                  <button
                    onClick={() =>
                      handleCopy(displayNews?.summary || "", "summary")
                    }
                    className="p-2 hover:bg-gray-200/50 rounded-full transition-colors"
                    title="복사하기"
                  >
                    <Copy
                      className={`w-4 h-4 ${copyStatus["summary"] ? "text-blue-500" : "text-gray-400"}`}
                    />
                  </button>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {displayNews?.summary}
                </p>
              </div>

              <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    상세 분석
                  </h3>
                  <button
                    onClick={() =>
                      handleCopy(displayNews?.analysis || "", "analysis")
                    }
                    className="p-2 hover:bg-gray-200/50 rounded-full transition-colors"
                    title="복사하기"
                  >
                    <Copy
                      className={`w-4 h-4 ${copyStatus["analysis"] ? "text-blue-500" : "text-gray-400"}`}
                    />
                  </button>
                </div>
                <div className="max-h-[300px] overflow-y-auto pr-2">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {displayNews?.analysis}
                  </p>
                </div>
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
      </div>
      {showToast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <Toast
            message="클립보드에 복사되었습니다"
            type="success"
            onClose={() => setShowToast(false)}
            duration={2000}
          />
        </div>
      )}
    </div>
  );
}
