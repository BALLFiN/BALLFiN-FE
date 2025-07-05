import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNewsDetail } from "@/api/news/detail";

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
      <div className="p-8 text-center text-gray-500">
        뉴스 정보를 불러오는 중...
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        {error}
        <button
          className="block mx-auto mt-4 px-4 py-2 bg-gray-200 rounded"
          onClick={() => navigate(-1)}
        >
          돌아가기
        </button>
      </div>
    );
  }
  if (!news) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-xs text-gray-500">
          {news.press || "언론사 미상"}
        </span>
        <span className="text-xs text-gray-400">
          {news.published_at
            ? new Date(news.published_at).toLocaleDateString()
            : ""}
        </span>
      </div>
      <h1 className="text-2xl font-bold mb-4 text-gray-900">{news.title}</h1>
      {news.image_url && (
        <img
          src={news.image_url}
          alt={news.title}
          className="mb-4 w-full rounded"
        />
      )}
      {news.summary && (
        <div className="mb-4 p-4 bg-gray-50 rounded text-gray-700">
          <div className="font-semibold mb-2">요약</div>
          <div>{news.summary}</div>
        </div>
      )}
      {news.analysis && (
        <div className="mb-4 p-4 bg-green-50 rounded text-gray-800">
          <div className="font-semibold mb-2">AI 해설</div>
          <div style={{ whiteSpace: "pre-line" }}>{news.analysis}</div>
        </div>
      )}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
          조회수 {news.views?.toLocaleString()}
        </span>
        {news.impact && (
          <span
            className="px-2 py-1 rounded text-xs font-semibold"
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
        {news.related_companies && (
          <span className="px-2 py-1 bg-blue-50 rounded text-xs text-blue-700">
            관련: {news.related_companies}
          </span>
        )}
      </div>
      {news.link && (
        <a
          href={news.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-6 text-blue-600 underline text-sm"
        >
          원문 기사 바로가기
        </a>
      )}
    </div>
  );
}
