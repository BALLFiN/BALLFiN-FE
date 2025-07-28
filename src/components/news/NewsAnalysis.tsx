import { X, Copy } from "lucide-react";
import { NewsItem, getNewsDetail } from "../../api/news/index";
import { useState, useEffect } from "react";
import Loading from "../common/Loading";
import Toast from "../common/Toast";

interface NewsAnalysisProps {
  news: NewsItem | null;
  onClose: () => void;
}

// Impact Score 컴포넌트
const ImpactScore = ({ score }: { score?: number }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  if (!score) return null;

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-red-600";
    if (score >= 6) return "text-orange-600";
    if (score >= 4) return "text-yellow-600";
    return "text-green-600";
  };

  const getScoreText = (score: number) => {
    if (score >= 8) return "매우 높음";
    if (score >= 6) return "높음";
    if (score >= 4) return "보통";
    return "낮음";
  };

  return (
    <div className="relative">
      <div
        className={`text-sm ${getScoreColor(score)}`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <span className="text-gray-600">Impact Score</span>{" "}
        <span className="font-bold">{score}</span>
      </div>

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-10">
          Impact Score: {score}/10 ({getScoreText(score)})
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </div>
  );
};

export default function NewsAnalysis({ news, onClose }: NewsAnalysisProps) {
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
          <span>•</span>
          <ImpactScore
            score={displayNews?.impact_score || news.impact_score || 5}
          />
        </div>

        <div className="transition-all duration-500 ease-in-out">
          {isLoading[news.id] ? (
            <div className="flex justify-center items-center h-32">
              <Loading />
            </div>
          ) : isAnalyzing[news.id] ? (
            <div className="flex flex-col items-center justify-center h-32">
              <Loading />
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900">요약</h3>
                  <button
                    onClick={() =>
                      handleCopy(displayNews?.summary || "", "summary")
                    }
                    className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
                    title="복사하기"
                  >
                    <Copy
                      className={`w-4 h-4 ${copyStatus["summary"] ? "text-[#0A5C2B]" : "text-gray-500"}`}
                    />
                  </button>
                </div>
                <p className="text-gray-600">{displayNews?.summary}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 overflow-auto">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900">상세 분석</h3>
                  <button
                    onClick={() =>
                      handleCopy(displayNews?.analysis || "", "analysis")
                    }
                    className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
                    title="복사하기"
                  >
                    <Copy
                      className={`w-4 h-4 ${copyStatus["analysis"] ? "text-[#0A5C2B]" : "text-gray-500"}`}
                    />
                  </button>
                </div>
                <p className="text-gray-600 max-h-[300px] overflow-y-auto">
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
      </div>
      {showToast && (
        <Toast
          message="클립보드에 복사되었습니다"
          type="success"
          onClose={() => setShowToast(false)}
          duration={2000}
        />
      )}
    </div>
  );
}
