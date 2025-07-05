import { useState } from "react";
import StockSearchBar from "@/components/stock/StockSearchBar";
import StockList from "@/components/stock/StockList";
import AutoTradingSection from "@/components/stock/AutoTradingSection";

interface StockItem {
  id: number;
  name: string;
  code: string;
  price: number;
  change: number;
  score: number;
  sentiment: "positive" | "negative" | "neutral";
  newsCount: number;
  prediction: {
    targetPrice: number;
    confidence: number;
    recommendation: "buy" | "sell" | "hold";
  };
  isFavorite?: boolean;
}

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
      change: 2.5,
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
      change: -1.2,
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
      change: 1.8,
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
      change: -0.5,
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
      change: 3.2,
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
      change: -2.1,
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
      change: 1.5,
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
      change: -0.8,
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
      change: 4.2,
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
      change: 0.5,
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
    <div className="container mx-auto px-4 py-8">
      {/* 검색 및 필터 영역 */}
      <div className="mb-8">
        <div className="flex justify-center">
          <div className="w-5/6">
            <div className="mb-6">
              <StockSearchBar
                onSearch={handleSearch}
                placeholder="종목명 또는 종목코드 검색"
                allStocks={allStocks}
              />
            </div>
            {/* 필터 + 정렬 한 줄에 배치 */}
            <div className="flex items-center gap-2 mb-2">
              {/* 필터/정렬 (왼쪽) */}
              <button
                onClick={() => setMainFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors h-10 min-w-[64px] ${
                  mainFilter === "all"
                    ? "bg-gray-200 text-black border border-gray-800"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent"
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setMainFilter("favorite")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors h-10 min-w-[64px] ${
                  mainFilter === "favorite"
                    ? "bg-yellow-200 text-yellow-900 border border-yellow-400"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent"
                }`}
              >
                즐겨찾기
              </button>
              {/* 변동률 정렬 버튼 */}
              <button
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors h-10 min-w-[100px] bg-blue-100 text-blue-800 border border-blue-400`}
              >
                변동률 {sortOrder === "asc" ? "▲" : "▼"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 주식 목록 */}
      <div className="flex justify-center">
        <div className="w-5/6">
          <StockList
            stocks={filteredAndSortedStocks}
            favoriteStocks={favoriteStocks}
            onToggleFavorite={toggleFavorite}
          />
        </div>
      </div>

      {/* 자동거래 시작하기 - 우측 하단 고정 */}
      <div className="fixed bottom-6 right-6 z-50">
        <AutoTradingSection />
      </div>
    </div>
  );
}
