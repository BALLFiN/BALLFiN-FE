import { useState, useEffect } from "react";
import SearchBar from "../common/SearchBar";
import NewsFilter from "./NewsFilter";
import NewsCard from "./NewsCard";
import Pagination from "./Pagination";
import { NewsListProps } from "./types";
import { searchNews, NewsSearchParams, NewsItem } from "../../api/news/index";

export default function NewsList({ selectedNews, onNewsClick }: NewsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<NewsSearchParams["sort_by"]>("newest");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [selectedImpacts, setSelectedImpacts] = useState<string[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [allNews, setAllNews] = useState<NewsItem[] | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const limit = 10;
  const initialLoadCount = 20;

  // 최초 50개만 빠르게 불러오기
  const fetchInitialNews = async () => {
    setIsLoading(true);
    try {
      const params: NewsSearchParams = {
        keyword: searchTerm ? undefined : undefined,
        sort_by: searchTerm ? "newest" : sortBy,
        start_date: dateRange.start || undefined,
        end_date: dateRange.end || undefined,
        page: 1,
        limit: initialLoadCount,
      };
      if (selectedImpacts.length === 1) {
        const impact = selectedImpacts[0];
        if (
          impact === "positive" ||
          impact === "negative" ||
          impact === "neutral"
        ) {
          params.impact = impact;
        }
      }
      let response;
      try {
        response = await searchNews(params);
      } catch (e) {
        if (sortBy === "relevance") {
          // 연관도 정렬 실패 시 최신순으로 폴백
          response = await searchNews({ ...params, sort_by: "newest" });
        } else {
          throw e;
        }
      }
      setNews(response.results);
      const total =
        typeof response.total === "number"
          ? response.total
          : response.results.length;
      setTotalPages(Math.ceil(total / limit));
    } catch (error) {
      setNews([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  // 전체 데이터 백그라운드 로딩
  const fetchAllNews = async () => {
    try {
      let allResults: NewsItem[] = [];
      let page = 1;
      const limit = 20;
      while (true) {
        const params: NewsSearchParams = {
          keyword: searchTerm ? undefined : undefined,
          sort_by: searchTerm ? "newest" : sortBy,
          start_date: dateRange.start || undefined,
          end_date: dateRange.end || undefined,
          page,
          limit,
        };
        if (selectedImpacts.length === 1) {
          const impact = selectedImpacts[0];
          if (
            impact === "positive" ||
            impact === "negative" ||
            impact === "neutral"
          ) {
            params.impact = impact;
          }
        }
        // 네트워크/서버 에러 시 정렬 폴백 시도
        let response;
        try {
          response = await searchNews(params);
        } catch (e) {
          if (sortBy === "relevance") {
            response = await searchNews({ ...params, sort_by: "newest" });
          } else {
            throw e;
          }
        }
        if (!response.results || response.results.length === 0) break;
        allResults = allResults.concat(response.results);
        if (response.results.length < limit) break; // 마지막 페이지
        page += 1;
      }
      setAllNews(allResults);
      setTotalPages(Math.ceil(allResults.length / 10));
    } catch (error) {
      // 전체 로딩 실패 시 캐시 초기화만 수행 (UI는 초기 1페이지만 표시)
      setAllNews(null);
      console.error("전체 뉴스 로딩 실패", error);
    }
  };

  // 최초 마운트 시 50개만 빠르게 불러오기
  useEffect(() => {
    fetchInitialNews();
  }, [searchTerm, sortBy, dateRange, selectedImpacts]);

  // 50개 불러온 후 전체 데이터 백그라운드 로딩
  useEffect(() => {
    if (news.length > 0 && allNews === null) {
      fetchAllNews();
    }
  }, [news, allNews]);

  // 제목 검색/영향 필터를 클라이언트에서도 보장
  const baseList = allNews || news;
  const filteredByImpact =
    selectedImpacts.length === 1 &&
    ["positive", "negative", "neutral"].includes(selectedImpacts[0])
      ? baseList.filter((item) => item.impact === selectedImpacts[0])
      : baseList;
  const filteredBySearch = searchTerm
    ? filteredByImpact.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredByImpact;
  const pagedNews = filteredBySearch.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCardClick = (item: NewsItem) => {
    onNewsClick(item);
  };

  const handleSearch = () => {
    setSearchTerm(searchQuery);
    setCurrentPage(1);
    // 새로운 검색 시 기존 전체 데이터 캐시 초기화
    setAllNews(null);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort as NewsSearchParams["sort_by"]);
    setCurrentPage(1);
    // 정렬 변경 시 전체 데이터 캐시 초기화
    setAllNews(null);
  };

  const handleDateRangeChange = (range: { start: string; end: string }) => {
    setDateRange(range);
    setCurrentPage(1);
    // 날짜 범위 변경 시 전체 데이터 캐시 초기화
    setAllNews(null);
  };

  const handleImpactFilterChange = (impacts: string[]) => {
    setSelectedImpacts(impacts);
    setCurrentPage(1);
    // 영향도 필터 변경 시 전체 데이터 캐시 초기화
    setAllNews(null);
  };

  // 필터/검색 변경 시 총 페이지 수 갱신
  useEffect(() => {
    const total = Math.ceil(
      (allNews ? filteredBySearch.length : filteredBySearch.length) / limit
    );
    setTotalPages(total > 0 ? total : 1);
  }, [allNews, news, searchTerm, selectedImpacts]);

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

        {/* 뉴스 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {isLoading ? (
            // 스켈레톤 UI
            Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-gray-200 animate-pulse h-[88px]"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start gap-3">
                    {/* 영향도 아이콘 스켈레톤 */}
                    <div className="w-5 h-5 bg-gray-200 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      {/* 제목 스켈레톤 */}
                      <div className="h-5 bg-gray-200 rounded w-full mb-1"></div>
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                      {/* 메타 정보 스켈레톤 */}
                      <div className="flex items-center gap-2">
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : pagedNews && pagedNews.length > 0 ? (
            pagedNews.map((item) => (
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
        <div className="mt-4 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
