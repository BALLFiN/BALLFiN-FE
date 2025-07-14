import { useState } from "react";
import StockSearchBar from "@/components/stock/StockSearchBar";
import StockList from "@/components/stock/StockList";
import AutoTradingSection from "@/components/stock/AutoTradingSection";

import LivePriceIndicator from "@/components/stock/LivePriceIndicator";
import { StockItem } from "@/components/stock/types";
import { Filter, SortAsc, Star } from "lucide-react";

export default function StockPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mainFilter, setMainFilter] = useState<"all" | "favorite">("all");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [favoriteStocks, setFavoriteStocks] = useState<number[]>([]);

  // 임의 데이터 10개
  const allStocks: StockItem[] = [
    {
      id: 1,
      name: "삼성전자",
      code: "005930",
      price: 75000,
      close: 75000,
      high: 76000,
      low: 74000,
      change: 2.5,
      changePercent: 3.45,
      volume: 15000000,
      score: 85,
      sentiment: "positive",
      newsCount: 12,
      prediction: {
        targetPrice: 82000,
        confidence: 0.78,
        recommendation: "buy",
      },
    },
    {
      id: 2,
      name: "현대자동차",
      code: "005380",
      price: 185000,
      close: 185000,
      high: 187000,
      low: 183000,
      change: -1.2,
      changePercent: -0.65,
      volume: 8000000,
      score: 35,
      sentiment: "negative",
      newsCount: 8,
      prediction: {
        targetPrice: 170000,
        confidence: 0.65,
        recommendation: "sell",
      },
    },
    {
      id: 3,
      name: "SK하이닉스",
      code: "000660",
      price: 120000,
      close: 120000,
      high: 122000,
      low: 118000,
      change: 1.8,
      changePercent: 1.52,
      volume: 12000000,
      score: 75,
      sentiment: "positive",
      newsCount: 10,
      prediction: {
        targetPrice: 135000,
        confidence: 0.72,
        recommendation: "buy",
      },
    },
    {
      id: 4,
      name: "LG전자",
      code: "066570",
      price: 95000,
      close: 95000,
      high: 96000,
      low: 94000,
      change: -0.5,
      changePercent: -0.52,
      volume: 6000000,
      score: 45,
      sentiment: "negative",
      newsCount: 6,
      prediction: {
        targetPrice: 90000,
        confidence: 0.58,
        recommendation: "hold",
      },
    },
    {
      id: 5,
      name: "NAVER",
      code: "035420",
      price: 220000,
      close: 220000,
      high: 225000,
      low: 218000,
      change: 3.2,
      changePercent: 1.47,
      volume: 5000000,
      score: 90,
      sentiment: "positive",
      newsCount: 15,
      prediction: {
        targetPrice: 240000,
        confidence: 0.85,
        recommendation: "buy",
      },
    },
    {
      id: 6,
      name: "카카오",
      code: "035720",
      price: 45000,
      close: 45000,
      high: 46000,
      low: 44000,
      change: -2.1,
      changePercent: -4.46,
      volume: 18000000,
      score: 30,
      sentiment: "negative",
      newsCount: 7,
      prediction: {
        targetPrice: 42000,
        confidence: 0.62,
        recommendation: "sell",
      },
    },
    {
      id: 7,
      name: "LG화학",
      code: "051910",
      price: 550000,
      close: 550000,
      high: 555000,
      low: 545000,
      change: 1.5,
      changePercent: 0.27,
      volume: 3000000,
      score: 70,
      sentiment: "positive",
      newsCount: 9,
      prediction: {
        targetPrice: 580000,
        confidence: 0.75,
        recommendation: "buy",
      },
    },
    {
      id: 8,
      name: "POSCO홀딩스",
      code: "005490",
      price: 450000,
      close: 450000,
      high: 452000,
      low: 448000,
      change: -0.8,
      changePercent: -0.18,
      volume: 4000000,
      score: 55,
      sentiment: "neutral",
      newsCount: 5,
      prediction: {
        targetPrice: 445000,
        confidence: 0.68,
        recommendation: "hold",
      },
    },
    {
      id: 9,
      name: "기아",
      code: "000270",
      price: 85000,
      close: 85000,
      high: 87000,
      low: 84000,
      change: 4.2,
      changePercent: 5.2,
      volume: 10000000,
      score: 88,
      sentiment: "positive",
      newsCount: 11,
      prediction: {
        targetPrice: 92000,
        confidence: 0.82,
        recommendation: "buy",
      },
    },
    {
      id: 10,
      name: "KB금융",
      code: "105560",
      price: 65000,
      close: 65000,
      high: 65500,
      low: 64500,
      change: 0.5,
      changePercent: 0.77,
      volume: 7000000,
      score: 60,
      sentiment: "neutral",
      newsCount: 4,
      prediction: {
        targetPrice: 66000,
        confidence: 0.7,
        recommendation: "hold",
      },
    },
  ];

  // 즐겨찾기 토글 함수
  const toggleFavorite = (stockId: number) => {
    setFavoriteStocks((prev) => {
      if (prev.includes(stockId)) {
        return prev.filter((id) => id !== stockId);
      } else {
        return [...prev, stockId];
      }
    });
  };

  // 검색 처리 함수
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // 필터링 및 정렬된 데이터 계산
  const filteredAndSortedStocks = allStocks
    .filter((stock) => {
      // 메인 필터
      const matchesMain =
        mainFilter === "all" ? true : favoriteStocks.includes(stock.id);
      // 검색어 필터
      const matchesSearch = searchQuery
        ? stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          stock.code.includes(searchQuery)
        : true;
      return matchesMain && matchesSearch;
    })
    .sort((a, b) => {
      // 변동률 정렬
      const comparison = a.change - b.change;
      return sortOrder === "asc" ? comparison : -comparison;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* 검색 및 필터 영역 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="mb-6">
            <StockSearchBar
              onSearch={handleSearch}
              placeholder="종목명 또는 종목코드 검색"
              allStocks={allStocks}
            />
          </div>

          {/* 필터 및 정렬 컨트롤 */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">필터:</span>
            </div>

            <button
              onClick={() => setMainFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                mainFilter === "all"
                  ? "bg-blue-100 text-blue-700 border border-blue-300 shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent"
              }`}
            >
              전체 종목
            </button>

            <button
              onClick={() => setMainFilter("favorite")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                mainFilter === "favorite"
                  ? "bg-yellow-100 text-yellow-700 border border-yellow-300 shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent"
              }`}
            >
              <Star size={14} />
              관심종목 ({favoriteStocks.length})
            </button>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <div className="flex items-center gap-2">
              <SortAsc size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">정렬:</span>
            </div>

            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200 transition-all duration-200"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                className="text-blue-700"
                style={{
                  transform:
                    sortOrder === "asc" ? "rotate(0deg)" : "rotate(180deg)",
                }}
              >
                <path d="M12 2L4 18L20 18L12 2Z" fill="currentColor" />
              </svg>
              등락률 {sortOrder === "asc" ? "오름차순" : "내림차순"}
            </button>
          </div>
        </div>

        {/* 주식 목록 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {mainFilter === "all" ? "전체 종목" : "관심종목"} (
                {filteredAndSortedStocks.length}개)
              </h2>
              <LivePriceIndicator />
            </div>
          </div>

          <StockList
            stocks={filteredAndSortedStocks}
            favoriteStocks={favoriteStocks}
            onToggleFavorite={toggleFavorite}
          />
        </div>

        {/* 자동거래 시작하기 - 우측 하단 고정 */}
        <div className="fixed bottom-6 right-6 z-50">
          <AutoTradingSection />
        </div>
      </div>
    </div>
  );
}
