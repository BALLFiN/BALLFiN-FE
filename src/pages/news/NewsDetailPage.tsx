import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNewsDetail } from "@/api/news/detail";
import { ArrowLeft } from "lucide-react";
import ImpactScore from "@/components/news/ImpactScore";

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getNewsDetail(id)
      .then(setNews)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500">뉴스 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-8 max-w-md">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
              onClick={() => navigate(-1)}
            >
              돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!news) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 메인 컨텐츠 */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
          {/* 뒤로가기 버튼과 뉴스 메타 정보 */}
          <div className="p-6 border-b border-gray-100">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
              <span className="font-medium text-gray-700">
                {news.press || "언론사 미상"}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-600">
                {news.published_at
                  ? new Date(news.published_at).toLocaleDateString()
                  : ""}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-600">
                조회수 {news.views?.toLocaleString()}
              </span>
            </div>

            <h1 className="text-2xl font-semibold text-gray-900 leading-tight mb-4">
              {news.title}
            </h1>

            {/* Impact Score */}
            {news.impact_score && (
              <div className="mb-4">
                <ImpactScore score={news.impact_score} />
              </div>
            )}

            {/* 뉴스 이미지 */}
            {news.image_url && (
              <div className="mb-4">
                <img
                  src={news.image_url}
                  alt={news.title}
                  className="w-full rounded-xl object-cover"
                />
              </div>
            )}
          </div>

          {/* 뉴스 내용 */}
          <div className="p-6 space-y-6">
            {/* 요약 */}
            {news.summary && (
              <div className="bg-gray-50/50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 text-lg mb-3">
                  요약
                </h3>
                <p className="text-gray-700 leading-relaxed">{news.summary}</p>
              </div>
            )}

            {/* AI 해설 */}
            {news.analysis && (
              <div className="bg-blue-50/50 rounded-xl p-5 border border-blue-100">
                <h3 className="font-semibold text-gray-900 text-lg mb-3">
                  AI 해설
                </h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {news.analysis}
                </div>
              </div>
            )}

            {/* 태그들 */}
            <div className="flex flex-wrap gap-2">
              {news.impact && (
                <span
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    background:
                      news.impact === "positive"
                        ? "#e6f9ed"
                        : news.impact === "negative"
                          ? "#ffeaea"
                          : "#f3f3f3",
                    color:
                      news.impact === "positive"
                        ? "#0A5C2B"
                        : news.impact === "negative"
                          ? "#d32f2f"
                          : "#888",
                  }}
                >
                  {news.impact === "positive"
                    ? "호재"
                    : news.impact === "negative"
                      ? "악재"
                      : "중립"}
                </span>
              )}
              {news.related_companies && news.related_companies.length > 0 && (
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                  관련:{" "}
                  {Array.isArray(news.related_companies)
                    ? news.related_companies.join(", ")
                    : news.related_companies}
                </span>
              )}
            </div>

            {/* 원문 링크 */}
            {news.link && (
              <div className="pt-4 border-t border-gray-100">
                <a
                  href={news.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                  원문 기사 바로가기
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
