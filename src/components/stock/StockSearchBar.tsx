import { useState, useEffect, useRef } from "react";
import { Search, Clock, TrendingUp, X } from "lucide-react";
import { StockItem } from "@/api/stock";
import { useStockSearch } from "@/features/stock/hooks";

interface StockSearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
  allStocks?: StockItem[];
}

export default function StockSearchBar({
  onSearch,
  placeholder = "종목명 또는 종목코드 검색",
  className = "",
  allStocks = [],
}: StockSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<StockItem[]>([]);
  const [searchParams, setSearchParams] = useState<{
    stock_codes: string;
  } | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // 실제 API 검색 (현재는 사용하지 않음, 향후 확장용)
  const { data: searchResponse } = useStockSearch(
    searchParams || { stock_codes: "" }
  );

  // 컴포넌트 마운트 시 로컬스토리지에서 최근 검색어 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("recentStockSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // 검색어 변경 시 필터링
  useEffect(() => {
    if (searchQuery.trim()) {
      // 로컬 필터링 (기존 allStocks에서 검색)
      const filtered = allStocks.filter(
        (stock) =>
          stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          stock.code.includes(searchQuery)
      );
      setFilteredStocks(filtered.slice(0, 5)); // 최대 5개만 표시
      setIsDropdownOpen(true);

      // 실제 API 검색도 수행 (선택적)
      if (searchQuery.length >= 2) {
        // 검색어가 2글자 이상일 때만 API 검색
        const matchingStocks = allStocks.filter(
          (stock) =>
            stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            stock.code.includes(searchQuery)
        );

        if (matchingStocks.length > 0) {
          const stockCodes = matchingStocks
            .map((stock) => stock.code)
            .join(",");
          setSearchParams({ stock_codes: stockCodes });
        }
      }
    } else {
      setFilteredStocks([]);
      setIsDropdownOpen(false);
      setSearchParams(null);
    }
  }, [searchQuery, allStocks]);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 최근 검색어 저장
  const saveRecentSearch = (query: string) => {
    const updated = [
      query,
      ...recentSearches.filter((item) => item !== query),
    ].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentStockSearches", JSON.stringify(updated));
  };

  // 검색어 제거
  const removeRecentSearch = (query: string) => {
    const updated = recentSearches.filter((item) => item !== query);
    setRecentSearches(updated);
    localStorage.setItem("recentStockSearches", JSON.stringify(updated));
  };

  // 종목 선택 처리 (필터링용)
  const handleStockSelect = (stock: StockItem) => {
    setSearchQuery(stock.name);
    saveRecentSearch(stock.name);
    setIsDropdownOpen(false);
    onSearch?.(stock.name);
  };

  // 검색어 선택 처리
  const handleSearchSelect = (query: string) => {
    setSearchQuery(query);
    saveRecentSearch(query);
    setIsDropdownOpen(false);
    onSearch?.(query);
  };

  // 검색 실행
  const handleSearch = () => {
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery);
      onSearch?.(searchQuery);
      setIsDropdownOpen(false);
    }
  };

  // Enter 키 처리
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 최근 검색어 모두 삭제
  const clearAllRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentStockSearches");
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* 검색 입력창 */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-900 shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsDropdownOpen(true)}
          onKeyPress={handleKeyPress}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* 드롭다운 */}
      {isDropdownOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {/* 검색 결과 */}
          {searchQuery && filteredStocks.length > 0 && (
            <div className="p-3 border-b border-gray-100">
              <div className="text-xs font-medium text-gray-500 mb-2">
                검색 결과
              </div>
              {filteredStocks.map((stock) => (
                <div
                  key={stock.id}
                  onClick={() => handleStockSelect(stock)}
                  className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                >
                  <div className="font-medium">{stock.name}</div>
                </div>
              ))}
            </div>
          )}

          {/* 최근 검색어 */}
          {!searchQuery && recentSearches.length > 0 && (
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-medium text-gray-500 flex items-center gap-1">
                  <Clock size={12} />
                  최근 검색어
                </div>
                <button
                  onClick={clearAllRecentSearches}
                  className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1 "
                >
                  모두 삭제
                </button>
              </div>
              {recentSearches.map((query, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                >
                  <div
                    onClick={() => handleSearchSelect(query)}
                    className="flex-1"
                  >
                    {query}
                  </div>
                  <button
                    onClick={() => removeRecentSearch(query)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* 인기 종목: 최근 검색어가 없을 때만 노출 */}
          {!searchQuery &&
            recentSearches.length === 0 &&
            allStocks.length > 0 && (
              <div className="p-3">
                <div className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
                  <TrendingUp size={12} />
                  인기 종목
                </div>
                {allStocks.slice(0, 5).map((stock) => (
                  <div
                    key={stock.id}
                    onClick={() => handleStockSelect(stock)}
                    className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                  >
                    <div className="font-medium">{stock.name}</div>
                  </div>
                ))}
              </div>
            )}

          {/* 검색 결과가 없을 때 */}
          {searchQuery && filteredStocks.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
