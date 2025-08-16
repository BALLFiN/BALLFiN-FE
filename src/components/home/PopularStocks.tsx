import { useState } from "react";
import type { KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Star, ChevronRight } from "lucide-react";

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

  const handleRowKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    stockCode: string
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      navigate(`/stock/${stockCode}`);
    }
  };

  return (
    <div className="rounded-3xl border border-white/70 bg-white/70 backdrop-blur-md shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="text-[17px] font-semibold text-gray-900">
          실시간 인기 종목 Top 5
        </h2>
        <button
          onClick={() => navigate("/stock")}
          className="text-[13px] font-medium text-[#0A5C2B] px-3 py-1.5 rounded-full hover:font-bold transition-colors"
        >
          더보기
        </button>
      </div>

      <div className="border-y border-black/10 divide-y divide-black/10">
        {popularStocks.map((stock) => (
          <div
            key={stock.id}
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/stock/${stock.code}`)}
            onKeyDown={(e) => handleRowKeyDown(e, stock.code)}
            className="group flex items-center gap-3 px-4 py-4 sm:py-5 cursor-pointer select-none transition-colors hover:bg-black/5 active:bg-black/10"
          >
            {/* Rank */}
            <div
              className={`h-8 w-8 sm:h-9 sm:w-9 rounded-full flex items-center justify-center text-[11px] sm:text-xs font-bold ${getRankColor(
                stock.rank
              )} shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)]`}
            >
              {stock.rank}
            </div>

            {/* Main info */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-[15px] font-semibold text-gray-900">
                  {stock.name}
                </h3>
                <span className="flex-shrink-0 text-[12px] text-gray-500">
                  {stock.code}
                </span>
              </div>
              <div className="mt-0.5 text-[12px] text-gray-500 truncate">
                {stock.sector} • {stock.marketCap}
              </div>
            </div>

            {/* Price & change */}
            <div className="text-right mr-1 hidden sm:block">
              <div className="text-[15px] font-semibold text-gray-900">
                {formatPrice(stock.currentPrice)}원
              </div>
              <div
                className={`flex items-center justify-end gap-1 text-[12px] font-medium ${
                  stock.change.isPositive ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {stock.change.isPositive ? (
                  <div className="w-0 h-0 border-l-[2px] border-l-transparent border-b-[4px] border-b-emerald-600 border-r-[2px] border-r-transparent"></div>
                ) : (
                  <div className="w-0 h-0 border-l-[2px] border-l-transparent border-t-[4px] border-t-red-600 border-r-[2px] border-r-transparent"></div>
                )}
                <span>{formatChange(stock.change.value)}</span>
                <span>({formatPercentage(stock.change.percentage)})</span>
              </div>
            </div>

            {/* Accessories */}
            <div className="ml-auto flex items-center gap-1">
              <button
                aria-pressed={favorites.includes(stock.id)}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(stock.id);
                }}
                className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                  favorites.includes(stock.id)
                    ? "text-amber-500"
                    : "text-gray-400 hover:bg-black/10"
                }`}
              >
                <Star
                  size={18}
                  strokeWidth={1.75}
                  className={
                    favorites.includes(stock.id) ? "text-amber-500" : ""
                  }
                  fill={favorites.includes(stock.id) ? "currentColor" : "none"}
                />
              </button>
              <span className="pointer-events-none h-8 w-8 rounded-full flex items-center justify-center text-gray-400 group-hover:text-gray-500">
                <ChevronRight size={18} strokeWidth={2} />
              </span>
            </div>

            {/* row divider handled by parent using divide-y */}
          </div>
        ))}
      </div>
    </div>
  );
}
