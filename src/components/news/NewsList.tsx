import { NewsItem } from "../../mock/newsData";
import { useState } from "react";
import SearchBar from "../common/SearchBar";
import NewsFilter from "./NewsFilter";
import NewsCard from "./NewsCard";
import Pagination from "./Pagination";
import { NewsListProps } from "./types";
import { Star } from "lucide-react";

export default function NewsList({
  news,
  selectedNews,
  onNewsClick,
}: NewsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [selectedImpacts, setSelectedImpacts] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const itemsPerPage = 10;

  // 즐겨찾기 토글 함수
  const toggleFavorite = (newsId: string) => {
    setFavorites((prev) =>
      prev.includes(newsId)
        ? prev.filter((id) => id !== newsId)
        : [...prev, newsId]
    );
  };

  // 검색어로 필터링
  let filteredNews = news.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 즐겨찾기 필터링
  if (showOnlyFavorites) {
    filteredNews = filteredNews.filter((item) => favorites.includes(item.id));
  }

  // 날짜 범위로 필터링
  if (dateRange.start && dateRange.end) {
    filteredNews = filteredNews.filter((item) => {
      const itemDate = item.date;
      return itemDate >= dateRange.start && itemDate <= dateRange.end;
    });
  }

  // 영향으로 필터링
  if (selectedImpacts.length > 0) {
    filteredNews = filteredNews.filter((item) =>
      selectedImpacts.includes(item.impact)
    );
  }

  // 정렬
  filteredNews.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      default:
        if (searchTerm) {
          const aMatch = a.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const bMatch = b.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          if (aMatch && !bMatch) return -1;
          if (!aMatch && bMatch) return 1;
        }
        return 0;
    }
  });

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, endIndex);

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
    setSortBy(sort);
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

        {/* 뉴스 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {currentNews.map((item) => (
            <NewsCard
              key={item.id}
              item={item}
              isSelected={selectedNews?.id === item.id}
              onClick={handleCardClick}
            />
          ))}
        </div>

        {/* 페이지네이션 */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
