import { useNavigate } from "react-router-dom";
import { TrendingUp, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { searchNews } from "@/api/news/search";

interface NewsItem {
  id: string;
  title: string;
  rank?: number;
  category: string;
  views: number;
  prevViews?: number;
  press?: string;
  isNew?: boolean;
}

export default function TrendingNews() {
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    searchNews({
      keyword: "",
      impact: undefined,
      sort_by: "views",
      start_date: undefined,
      end_date: undefined,
      page: 1,
      limit: 10,
    })
      .then((data) => {
        const arr = (data.results || data) as NewsItem[];
        arr.sort((a, b) => b.views - a.views);
        arr.forEach((item, idx) => (item.rank = idx + 1));
        setNewsList(arr);
      })
      .catch((e) => setError("뉴스를 불러오는 데 실패했습니다."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (isHovered || newsList.length === 0) return;
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % newsList.length);
        setIsAnimating(false);
      }, 300);
    }, 1500);
    return () => clearInterval(interval);
  }, [isHovered, newsList]);

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-red-500 font-bold";
      case 2:
        return "text-orange-500 font-bold";
      case 3:
        return "text-yellow-500 font-bold";
      default:
        return "text-gray-600";
    }
  };

  const getRankChangeIcon = (news: NewsItem) => {
    if (news.prevViews === undefined || news.prevViews === 0) {
      return <span className="text-[#D2B48C] text-base ml-2">+</span>;
    }
    if (news.views > news.prevViews) {
      return <span className="text-red-500 text-base ml-2">▲</span>;
    }
    if (news.views < news.prevViews) {
      return <span className="text-blue-500 text-base ml-2">▼</span>;
    }
    return <span className="text-gray-400 text-base ml-2">-</span>;
  };

  const formatViews = (views: number) => {
    if (views >= 10000) {
      return `${(views / 10000).toFixed(1)}만`;
    }
    return views.toLocaleString();
  };

  if (loading) {
    return (
      <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-6 text-center text-gray-500">
        실시간 인기 뉴스를 불러오는 중...
      </div>
    );
  }
  if (error) {
    return (
      <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-6 text-center text-red-500">
        {error}
      </div>
    );
  }
  if (newsList.length === 0) {
    return (
      <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-6 text-center text-gray-400">
        인기 뉴스가 없습니다.
      </div>
    );
  }

  return (
    <div
      className="bg-white relative overflow-visible p-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ zIndex: 50 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-[#0A5C2B]" />
          <h3 className="text-xl font-bold text-gray-900">실시간 인기 뉴스</h3>
        </div>
      </div>

      {/* 기본 표시 (현재 인덱스의 뉴스) */}
      <div className="space-y-2 relative h-auto">
        <div
          className="px-5 py-4 bg-white border-2 border-green-700 shadow rounded-xl w-full absolute flex items-center"
          style={{ position: "relative" }}
        >
          {/* 왼쪽 초록 포인트 바 */}
          <div className="w-1 h-12 rounded bg-[#0A5C2B] mr-4" />
          <div className="flex-1 min-w-0">
            <div
              className={`flex items-center gap-4 h-10 transition-all duration-700 cursor-pointer w-full ${
                isAnimating
                  ? "transform -translate-y-4 opacity-0"
                  : "transform translate-y-0 opacity-100"
              }`}
              onClick={() => navigate(`/news/${newsList[currentIndex].id}`)}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold ${getRankColor(newsList[currentIndex].rank ?? currentIndex + 1)} flex-shrink-0`}
              >
                {newsList[currentIndex].rank ?? currentIndex + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-base font-medium text-gray-900 truncate hover:text-[#0A5C2B] transition-colors">
                    {newsList[currentIndex].title}
                  </h4>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">
                    {newsList[currentIndex].press || "언론사 미상"}
                  </span>
                  <span className="text-sm text-gray-500">
                    조회수 {formatViews(newsList[currentIndex].views)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button
            className="ml-4 p-2 rounded-full hover:bg-green-100 transition-colors"
            aria-label="뉴스 전체 검색"
            onClick={() => navigate("/news")}
            type="button"
          >
            <Search className="w-6 h-6 text-[#0A5C2B] hover:text-green-700" />
          </button>
        </div>
      </div>

      {isHovered && (
        <div
          className="absolute left-0 right-0 bg-white rounded-xl shadow-lg p-6 transition-all duration-300 z-50 max-h-96 overflow-y-auto border border-gray-100"
          style={{ minWidth: 400, top: "100%" }}
        >
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            {newsList.map((news, idx) => (
              <div
                key={news.id}
                className="flex items-center justify-between px-2 py-1 hover:bg-gray-50 rounded cursor-pointer transition-colors"
                onClick={() => navigate(`/news/${news.id}`)}
              >
                <div className="flex items-center min-w-0">
                  <span className="text-lg font-semibold text-gray-900 w-6 text-left">
                    {news.rank ?? idx + 1}
                  </span>
                  <span className="ml-2 text-base text-gray-900 truncate max-w-[100px]">
                    {news.title}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    {news.press || "언론사 미상"}
                  </span>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  {getRankChangeIcon(news)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
