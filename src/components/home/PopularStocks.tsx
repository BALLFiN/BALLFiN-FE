import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ExternalLink } from "lucide-react";

interface Stock {
  id: string;
  name: string;
  code: string;
  currentPrice: number;
  change: {
    value: number;
    percentage: number;
    isPositive: boolean;
  };
  marketCap: string;
  sector: string;
  rank: number;
}

const popularStocks: Stock[] = [
  {
    id: "samsung",
    name: "삼성전자",
    code: "005930",
    currentPrice: 75000,
    change: {
      value: 1500,
      percentage: 2.04,
      isPositive: true,
    },
    marketCap: "447조원",
    sector: "전자제품",
    rank: 1,
  },
  {
    id: "sk-hynix",
    name: "SK하이닉스",
    code: "000660",
    currentPrice: 145000,
    change: {
      value: -2500,
      percentage: -1.69,
      isPositive: false,
    },
    marketCap: "105조원",
    sector: "반도체",
    rank: 2,
  },
  {
    id: "naver",
    name: "네이버",
    code: "035420",
    currentPrice: 185000,
    change: {
      value: 3500,
      percentage: 1.93,
      isPositive: true,
    },
    marketCap: "30조원",
    sector: "인터넷",
    rank: 3,
  },
  {
    id: "kakao",
    name: "카카오",
    code: "035720",
    currentPrice: 52000,
    change: {
      value: 800,
      percentage: 1.56,
      isPositive: true,
    },
    marketCap: "23조원",
    sector: "인터넷",
    rank: 4,
  },
  {
    id: "lg-chem",
    name: "LG화학",
    code: "051910",
    currentPrice: 420000,
    change: {
      value: -8000,
      percentage: -1.87,
      isPositive: false,
    },
    marketCap: "29조원",
    sector: "화학",
    rank: 5,
  },
];

export default function PopularStocks() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (stockId: string) => {
    setFavorites((prev) =>
      prev.includes(stockId)
        ? prev.filter((id) => id !== stockId)
        : [...prev, stockId]
    );
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString();
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? "+" : "";
    return `${sign}${change.toLocaleString()}`;
  };

  const formatPercentage = (percentage: number) => {
    const sign = percentage >= 0 ? "+" : "";
    return `${sign}${percentage.toFixed(2)}%`;
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-500 text-white";
      case 2:
        return "bg-gray-400 text-white";
      case 3:
        return "bg-orange-500 text-white";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            실시간 인기 종목 Top 5
          </h2>
        </div>
        <button
          onClick={() => navigate("/stock")}
          className="text-sm text-[#0A5C2B] hover:underline cursor-pointer"
        >
          더보기
        </button>
      </div>

      <div className="space-y-3">
        {popularStocks.map((stock) => (
          <div
            key={stock.id}
            className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-3 border border-gray-100 hover:shadow-md transition-all duration-300"
          >
            {/* 데스크톱 레이아웃 */}
            <div className="hidden sm:flex items-center justify-between">
              {/* 순위 및 종목 정보 */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* 순위 배지 */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${getRankColor(stock.rank)} flex-shrink-0`}
                >
                  {stock.rank}
                </div>

                {/* 종목 기본 정보 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 truncate">
                      {stock.name}
                    </h3>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {stock.code}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {stock.sector} • {stock.marketCap}
                  </div>
                </div>
              </div>

              {/* 가격 정보 */}
              <div className="flex items-center gap-3 mr-3 flex-shrink-0">
                <div className="text-right">
                  <div className="text-base font-bold text-gray-900">
                    {formatPrice(stock.currentPrice)}원
                  </div>
                  <div
                    className={`flex items-center gap-1 text-xs font-medium ${
                      stock.change.isPositive
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stock.change.isPositive ? (
                      <div className="w-0 h-0 border-l-[2px] border-l-transparent border-b-[4px] border-b-green-600 border-r-[2px] border-r-transparent"></div>
                    ) : (
                      <div className="w-0 h-0 border-l-[2px] border-l-transparent border-t-[4px] border-t-red-600 border-r-[2px] border-r-transparent"></div>
                    )}
                    <span>{formatChange(stock.change.value)}</span>
                    <span>({formatPercentage(stock.change.percentage)})</span>
                  </div>
                </div>
              </div>

              {/* 액션 버튼들 */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => toggleFavorite(stock.id)}
                  className={`p-1.5 rounded-full transition-colors ${
                    favorites.includes(stock.id)
                      ? "text-red-500 bg-red-50"
                      : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                  }`}
                >
                  <Heart
                    size={16}
                    fill={
                      favorites.includes(stock.id) ? "currentColor" : "none"
                    }
                  />
                </button>
                <button
                  onClick={() => navigate(`/stock/${stock.code}`)}
                  className="bg-[#0A5C2B] text-white text-xs py-1.5 px-3 rounded-lg hover:bg-[#0A5C2B]/90 transition-colors flex items-center gap-1"
                >
                  <ExternalLink size={12} />
                  <span className="hidden md:inline">상세 보기</span>
                  <span className="md:hidden">보기</span>
                </button>
              </div>
            </div>

            {/* 모바일 레이아웃 */}
            <div className="sm:hidden">
              {/* 첫 번째 줄: 순위, 종목명, 가격 */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getRankColor(stock.rank)} flex-shrink-0`}
                  >
                    {stock.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <h3 className="font-bold text-gray-900 truncate text-sm">
                        {stock.name}
                      </h3>
                      <span className="text-xs text-gray-500 flex-shrink-0">
                        {stock.code}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-bold text-gray-900">
                    {formatPrice(stock.currentPrice)}원
                  </div>
                </div>
              </div>

              {/* 두 번째 줄: 섹터, 시가총액, 등락률 */}
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-gray-500 truncate flex-1">
                  {stock.sector} • {stock.marketCap}
                </div>
                <div
                  className={`flex items-center gap-1 text-xs font-medium flex-shrink-0 ${
                    stock.change.isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stock.change.isPositive ? (
                    <div className="w-0 h-0 border-l-[2px] border-l-transparent border-b-[4px] border-b-green-600 border-r-[2px] border-r-transparent"></div>
                  ) : (
                    <div className="w-0 h-0 border-l-[2px] border-l-transparent border-t-[4px] border-t-red-600 border-r-[2px] border-r-transparent"></div>
                  )}
                  <span>{formatChange(stock.change.value)}</span>
                  <span>({formatPercentage(stock.change.percentage)})</span>
                </div>
              </div>

              {/* 세 번째 줄: 액션 버튼들 */}
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => toggleFavorite(stock.id)}
                  className={`p-1 rounded-full transition-colors ${
                    favorites.includes(stock.id)
                      ? "text-red-500 bg-red-50"
                      : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                  }`}
                >
                  <Heart
                    size={14}
                    fill={
                      favorites.includes(stock.id) ? "currentColor" : "none"
                    }
                  />
                </button>
                <button
                  onClick={() => navigate(`/stock/${stock.code}`)}
                  className="bg-[#0A5C2B] text-white text-xs py-1 px-2 rounded-lg hover:bg-[#0A5C2B]/90 transition-colors flex items-center gap-1"
                >
                  <ExternalLink size={12} />
                  보기
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
