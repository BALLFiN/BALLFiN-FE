import { useState, useEffect } from "react";
import SearchBar from "../common/SearchBar";
import NewsFilter from "./NewsFilter";
import NewsCard from "./NewsCard";
import Pagination from "./Pagination";
import { NewsListProps } from "./types";
import { searchNews, NewsSearchParams, NewsItem } from "../../api/news";

export default function NewsList({ selectedNews, onNewsClick }: NewsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] =
    useState<NewsSearchParams["sort_by"]>("relevance");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [selectedImpacts, setSelectedImpacts] = useState<string[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const params: NewsSearchParams = {
        keyword: searchTerm || undefined,
        sort_by: sortBy,
        start_date: dateRange.start || undefined,
        end_date: dateRange.end || undefined,
        limit: itemsPerPage,
        offset: (currentPage - 1) * itemsPerPage,
      };

      if (selectedImpacts.length === 1) {
        params.impact = selectedImpacts[0] as "positive" | "negative";
      }

      const response = await searchNews(params);
      console.log("API 응답:", response);
      setNews(response.results || []);
      setTotalPages(Math.ceil((response.total || 0) / itemsPerPage));
    } catch (error) {
      console.error("뉴스 검색 중 오류 발생:", error);
      setNews([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 데이터 로딩
  useEffect(() => {
    fetchNews();
  }, []);

  // 검색 조건 변경 시 데이터 로딩
  useEffect(() => {
    if (!isLoading) {
      fetchNews();
    }
  }, [searchTerm, sortBy, dateRange, selectedImpacts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCardClick = (item: NewsItem) => {
    if (selectedNews?.id === item.id) {
      const card = document.getElementById(`news-card-${item.id}`);
      if (card) {
        card.classList.add("animate-close");
        setTimeout(() => {
          onNewsClick(item);
        }, 300);
      }
    } else {
      onNewsClick(item);
    }
  };

  const handleSearch = () => {
    setSearchTerm(searchQuery);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort as NewsSearchParams["sort_by"]);
    setCurrentPage(1);
  };

  const handleDateRangeChange = (range: { start: string; end: string }) => {
    setDateRange(range);
    setCurrentPage(1);
  };

  const handleImpactFilterChange = (impacts: string[]) => {
    setSelectedImpacts(impacts);
    setCurrentPage(1);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6">
        <div className="mb-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            placeholder="뉴스 제목으로 검색"
          />
        </div>

        <div className="mb-6">
          <NewsFilter
            onSortChange={handleSortChange}
            onDateRangeChange={handleDateRangeChange}
            onImpactFilterChange={handleImpactFilterChange}
            showOnlyFavorites={showOnlyFavorites}
            onShowOnlyFavoritesChange={setShowOnlyFavorites}
          />
        </div>

        {/* 로딩 상태 표시 */}
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <>
            {/* 뉴스 카드 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {news && news.length > 0 ? (
                news.map((item) => (
                  <NewsCard
                    key={item.id}
                    item={item}
                    isSelected={selectedNews?.id === item.id}
                    onClick={handleCardClick}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 col-span-2">
                  검색 결과가 없습니다.
                </div>
              )}
            </div>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
