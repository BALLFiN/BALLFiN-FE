import { useNavigate } from "react-router-dom";
import { TrendingUp } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  rank: number;
  category: string;
  views: number;
  isNew?: boolean;
}

const trendingNews: NewsItem[] = [
  {
    id: "1",
    title: "삼성전자, AI 반도체 시장 진출 선언...주가 급등",
    rank: 1,
    category: "기업",
    views: 15420,
    isNew: true,
  },
  {
    id: "2",
    title: "연준 금리 인하 시사...글로벌 시장 반등",
    rank: 2,
    category: "경제",
    views: 12850,
  },
  {
    id: "3",
    title: "SK하이닉스, HBM4 개발 완료...엔비디아와 협력",
    rank: 3,
    category: "기업",
    views: 11230,
  },
  {
    id: "4",
    title: "중국 부동산 위기 심화...원자재 가격 급락",
    rank: 4,
    category: "경제",
    views: 9870,
  },
  {
    id: "5",
    title: "네이버, AI 챗봇 '클로바X' 업데이트...성능 대폭 개선",
    rank: 5,
    category: "기술",
    views: 8650,
  },
  {
    id: "6",
    title: "LG에너지솔루션, 2차전지 시장 점유율 1위 유지",
    rank: 6,
    category: "기업",
    views: 7430,
  },
  {
    id: "7",
    title: "원유 가격 급등...WTI 배럴당 90달러 돌파",
    rank: 7,
    category: "경제",
    views: 6540,
  },
  {
    id: "8",
    title: "카카오, 메타버스 플랫폼 '카카오월드' 출시",
    rank: 8,
    category: "기술",
    views: 5870,
  },
  {
    id: "9",
    title: "셀트리온, 신약 개발 성공...바이오 주도주 부상",
    rank: 9,
    category: "기업",
    views: 5230,
  },
  {
    id: "10",
    title: "환율 급등...달러당 1,400원 돌파",
    rank: 10,
    category: "경제",
    views: 4890,
  },
];

export default function TrendingNews() {
  const navigate = useNavigate();

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "기업":
        return "bg-blue-100 text-blue-700";
      case "경제":
        return "bg-green-100 text-green-700";
      case "기술":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatViews = (views: number) => {
    if (views >= 10000) {
      return `${(views / 10000).toFixed(1)}만`;
    }
    return views.toLocaleString();
  };

  return (
    <div className="bg-white group relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#0A5C2B]" />
          <h3 className="text-lg font-bold text-gray-900">실시간 인기 뉴스</h3>
        </div>
      </div>

      {/* 기본 표시 (1위만) */}
      <div className="space-y-2">
        <div
          className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
          onClick={() => navigate(`/news/${trendingNews[0].id}`)}
        >
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getRankColor(trendingNews[0].rank)} flex-shrink-0`}
          >
            {trendingNews[0].rank}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-sm font-medium text-gray-900 truncate hover:text-[#0A5C2B] transition-colors">
                {trendingNews[0].title}
              </h4>
              {trendingNews[0].isNew && (
                <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  NEW
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(trendingNews[0].category)}`}
              >
                {trendingNews[0].category}
              </span>
              <span className="text-xs text-gray-500">
                조회수 {formatViews(trendingNews[0].views)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover 시 전체 표시 */}
      <div className="absolute top-full left-0 right-0 bg-white rounded-xl   p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 max-h-96 overflow-y-auto">
        <div className="space-y-2">
          {trendingNews.map((news) => (
            <div
              key={news.id}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              onClick={() => navigate(`/news/${news.id}`)}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getRankColor(news.rank)} flex-shrink-0`}
              >
                {news.rank}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-medium text-gray-900 truncate hover:text-[#0A5C2B] transition-colors">
                    {news.title}
                  </h4>
                  {news.isNew && (
                    <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      NEW
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(news.category)}`}
                  >
                    {news.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    조회수 {formatViews(news.views)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
