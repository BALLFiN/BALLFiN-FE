import { useState, useEffect } from "react";
import type { KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Star, ChevronRight } from "lucide-react";

interface CompanyInfo {
  corp_name: string;
  stock_code: string;
  current_price: number;
  change: number;
  change_percent: number;
  week_52_high: number;
  week_52_low: number;
  volume: number;
  market_cap_billion: number;
}

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

// API 호출 함수
const getPopularCompanies = async (): Promise<CompanyInfo[]> => {
  try {
    const response = await fetch("/info/companies?sort_by=market_cap_desc");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching popular companies:", error);
    throw error;
  }
};

// 시가총액을 조원 단위로 변환하는 함수
const formatMarketCap = (marketCapBillion: number): string => {
  if (marketCapBillion >= 1000) {
    return `${(marketCapBillion / 1000).toFixed(1)}조원`;
  }
  return `${marketCapBillion}억원`;
};

export default function PopularStocks() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [popularStocks, setPopularStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularStocks = async () => {
      try {
        setLoading(true);
        setError(null);

        const companies = await getPopularCompanies();

        // 상위 5개 회사를 Stock 형식으로 변환
        const stocks: Stock[] = companies.slice(0, 5).map((company, index) => ({
          id: company.stock_code,
          name: company.corp_name,
          code: company.stock_code,
          currentPrice: company.current_price,
          change: {
            value: company.change,
            percentage: company.change_percent,
            isPositive: company.change_percent >= 0,
          },
          marketCap: formatMarketCap(company.market_cap_billion),
          sector: "기술", // API에서 섹터 정보가 없으므로 기본값 사용
          rank: index + 1,
        }));

        setPopularStocks(stocks);
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        console.error("Error fetching popular stocks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularStocks();
  }, []);

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

  if (loading) {
    return (
      <div className="rounded-3xl border border-white/70 bg-white/70 backdrop-blur-md shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-[17px] font-semibold text-gray-900">
            실시간 인기 종목 Top 5
          </h2>
        </div>
        <div className="border-y border-black/10 divide-y divide-black/10">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-4 py-4 sm:py-5"
            >
              <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-gray-200 animate-pulse"></div>
              <div className="min-w-0 flex-1">
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
              </div>
              <div className="text-right mr-1 hidden sm:block">
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-white/70 bg-white/70 backdrop-blur-md shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-[17px] font-semibold text-gray-900">
            실시간 인기 종목 Top 5
          </h2>
        </div>
        <div className="px-4 py-8 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

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
