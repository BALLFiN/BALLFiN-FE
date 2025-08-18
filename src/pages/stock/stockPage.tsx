import { useState, useEffect } from "react";
import StockSearchBar from "@/components/stock/StockSearchBar";
import StockList from "@/components/stock/StockList";
import StockListSkeleton from "@/components/stock/StockListSkeleton";
import StockListError from "@/components/stock/StockListError";
import AutoTradingSection from "@/components/stock/AutoTradingSection";
import LivePriceIndicator from "@/components/stock/LivePriceIndicator";
import { useStockList } from "@/features/stock/hooks";
import { StockItem, SortBy } from "@/api/stock";
import { Filter, SortAsc, Star, ChevronDown, Check } from "lucide-react";
import { Listbox, RadioGroup } from "@headlessui/react";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "@/api/user/favoritesApi";

export default function StockPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mainFilter, setMainFilter] = useState<"all" | "favorite">("all");
  const [sortBy, setSortBy] = useState<SortBy>("market_cap_desc");
  const [favoriteStocks, setFavoriteStocks] = useState<string[]>([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);

  // API에서 주식 데이터 가져오기
  const {
    data: stockResponse,
    isLoading,
    error,
    refetch,
  } = useStockList(sortBy);
  const allStocks: StockItem[] =
    stockResponse?.data?.map((stock) => ({
      ...stock,
      changePercent: stock.change_percent || stock.changePercent || 0,
    })) || [];

  // 즐겨찾기 로딩
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesData = await getFavorites();
        if (
          favoritesData &&
          typeof favoritesData === "object" &&
          "favorites" in favoritesData
        ) {
          const favoritesArray = favoritesData.favorites;
          if (Array.isArray(favoritesArray)) {
            setFavoriteStocks(favoritesArray);
          }
        } else if (Array.isArray(favoritesData)) {
          setFavoriteStocks(favoritesData);
        }
      } catch (err) {
        // 즐겨찾기 로딩 실패는 전체 컴포넌트에 영향을 주지 않도록 함
      }
    };

    fetchFavorites();
  }, []);

  // 즐겨찾기 토글 함수
  const toggleFavorite = async (stockCode: string) => {
    try {
      setFavoritesLoading(true);

      if (favoriteStocks.includes(stockCode)) {
        // 즐겨찾기 제거
        await removeFavorite(stockCode);
        setFavoriteStocks((prev) => prev.filter((code) => code !== stockCode));
      } else {
        // 즐겨찾기 추가
        await addFavorite(stockCode);
        setFavoriteStocks((prev) => [...prev, stockCode]);
      }
    } catch (err) {
      // 에러 발생 시 사용자에게 알림 (선택사항)
    } finally {
      setFavoritesLoading(false);
    }
  };

  // 검색 처리 함수
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // 정렬 옵션들
  const sortOptions: { value: SortBy; label: string }[] = [
    { value: "market_cap_desc", label: "시가총액 높은 순" },
    { value: "market_cap_asc", label: "시가총액 낮은 순" },
    { value: "change_percent_desc", label: "등락률 높은 순" },
    { value: "change_percent_asc", label: "등락률 낮은 순" },
    { value: "volume_desc", label: "거래량 많은 순" },
    { value: "volume_asc", label: "거래량 적은 순" },
  ];

  // 필터링된 데이터 계산 (API에서 이미 정렬되어 오므로 추가 정렬 불필요)
  const filteredStocks = allStocks.filter((stock) => {
    // 메인 필터
    const matchesMain =
      mainFilter === "all" ? true : favoriteStocks.includes(stock.code);
    // 검색어 필터
    const matchesSearch = searchQuery
      ? stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.code.includes(searchQuery)
      : true;
    return matchesMain && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* 검색 및 필터 영역 */}
        <div className="bg-white rounded-3xl border border-white/70 shadow-sm p-6 mb-6">
          <div className="mb-6">
            <StockSearchBar
              onSearch={handleSearch}
              placeholder="종목명 또는 종목코드 검색"
              allStocks={allStocks}
            />
          </div>

          {/* 필터 및 정렬 컨트롤 */}
          <div className="flex gap-0">
            {/* 필터 섹션 */}
            <div className="w-1/4">
              <div className="flex items-center gap-2 mb-3">
                <Filter size={16} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700">필터</span>
              </div>

              <RadioGroup value={mainFilter} onChange={setMainFilter}>
                <div className="flex gap-2">
                  <RadioGroup.Option value="all">
                    {({ checked }) => (
                      <div
                        className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                          checked
                            ? "bg-[#0A5C2B]/10 text-[#0A5C2B] border border-[#0A5C2B]/20"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent"
                        }`}
                      >
                        전체 종목
                      </div>
                    )}
                  </RadioGroup.Option>

                  <RadioGroup.Option value="favorite">
                    {({ checked }) => (
                      <div
                        className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                          checked
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent"
                        }`}
                      >
                        <Star size={14} />
                        관심종목 ({favoriteStocks.length})
                      </div>
                    )}
                  </RadioGroup.Option>
                </div>
              </RadioGroup>
            </div>

            {/* 정렬 섹션 */}
            <div className="w-36">
              <div className="flex items-center gap-2 mb-3">
                <SortAsc size={16} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700">정렬</span>
              </div>

              <Listbox value={sortBy} onChange={setSortBy}>
                <div className="relative">
                  <Listbox.Button className="relative w-full px-4 py-2.5 text-left bg-gray-100 rounded-full border border-transparent hover:bg-gray-200 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0A5C2B]/20">
                    <span className="block truncate text-sm font-medium text-gray-700">
                      {
                        sortOptions.find((option) => option.value === sortBy)
                          ?.label
                      }
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDown
                        className="h-4 w-4 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-2xl bg-white py-1 shadow-lg border border-gray-200 focus:outline-none">
                    {sortOptions.map((option) => (
                      <Listbox.Option
                        key={option.value}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-3 px-4 text-sm transition-colors ${
                            active
                              ? "bg-[#0A5C2B]/5 text-[#0A5C2B]"
                              : "text-gray-900"
                          }`
                        }
                        value={option.value}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                            >
                              {option.label}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#0A5C2B]">
                                <Check className="h-4 w-4" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
          </div>
        </div>

        {/* 주식 목록 */}
        <div className="bg-white rounded-3xl border border-white/70 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-black/10 bg-gradient-to-r from-gray-50/50 to-gray-100/50">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {mainFilter === "all" ? "전체 종목" : "관심종목"} (
                {isLoading ? "..." : filteredStocks.length}개)
              </h2>
              <LivePriceIndicator />
            </div>
          </div>

          {isLoading ? (
            <StockListSkeleton />
          ) : error ? (
            <StockListError onRetry={() => refetch()} />
          ) : (
            <StockList
              stocks={filteredStocks}
              favoriteStocks={favoriteStocks}
              onToggleFavorite={toggleFavorite}
              favoritesLoading={favoritesLoading}
            />
          )}
        </div>

        {/* 자동거래 시작하기 - 우측 하단 고정 */}
        <div className="fixed bottom-6 right-6 z-50">
          <AutoTradingSection />
        </div>
      </div>
    </div>
  );
}
