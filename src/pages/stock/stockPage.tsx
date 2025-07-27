import { useState } from "react";
import StockSearchBar from "@/components/stock/StockSearchBar";
import StockList from "@/components/stock/StockList";
import AutoTradingSection from "@/components/stock/AutoTradingSection";
import LivePriceIndicator from "@/components/stock/LivePriceIndicator";
import { useStockList } from "@/features/stock/hooks";
import { StockItem } from "@/api/stock";
import { Filter, SortAsc, Star, Loader2 } from "lucide-react";

export default function StockPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mainFilter, setMainFilter] = useState<"all" | "favorite">("all");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [favoriteStocks, setFavoriteStocks] = useState<number[]>([]);

  // API에서 주식 데이터 가져오기
  const { data: stockResponse, isLoading, error } = useStockList();
  const allStocks: StockItem[] =
    stockResponse?.data?.map((stock) => ({
      ...stock,
      changePercent: stock.change_percent || stock.changePercent || 0,
    })) || [];

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

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="animate-spin text-blue-600" size={24} />
          <span className="text-gray-600">주식 데이터를 불러오는 중...</span>
        </div>
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-2">
            데이터를 불러오는데 실패했습니다.
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

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
