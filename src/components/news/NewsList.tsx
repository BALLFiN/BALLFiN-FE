import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { NewsItem } from "../../mock/newsData";
import { useState } from "react";
import SearchBar from "../common/SearchBar";
import NewsFilter from "./NewsFilter";

interface NewsListProps {
  news: NewsItem[];
  selectedNews: NewsItem | null;
  onNewsClick: (news: NewsItem) => void;
}

const getImpactIcon = (impact: NewsItem["impact"]) => {
  switch (impact) {
    case "positive":
      return <TrendingUp className="w-5 h-5 text-green-500" />;
    case "negative":
      return <TrendingDown className="w-5 h-5 text-red-500" />;
    default:
      return <AlertCircle className="w-5 h-5 text-gray-500" />;
  }
};

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
  const itemsPerPage = 10;

  // 검색어로 필터링
  let filteredNews = news.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 날짜 범위로 필터링
  if (dateRange.start && dateRange.end) {
    filteredNews = filteredNews.filter((item) => {
      const itemDate = item.date; // 이미 YYYY-MM-DD 형식
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
        // 연관도순은 검색어와의 일치도로 정렬
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
        <h1 className="text-2xl font-bold text-gray-900 mb-6">최신 뉴스</h1>
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
          />
        </div>

        {/* 뉴스 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {currentNews.map((item) => (
            <div
              id={`news-card-${item.id}`}
              key={item.id}
              onClick={() => handleCardClick(item)}
              className={`p-4 rounded-lg transition-all duration-300 border ${
                selectedNews?.id === item.id
                  ? "border-[#0A5C2B] bg-[#0A5C2B] text-white scale-105 shadow-lg"
                  : "border-gray-200 hover:border-[#0A5C2B] hover:shadow-md cursor-pointer"
              }`}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-3 mb-2">
                  {getImpactIcon(item.impact)}
                  <div className="flex-1">
                    <h2 className="font-medium mb-1 line-clamp-2">
                      {item.title}
                    </h2>
                    <div className="flex items-center gap-2 text-sm">
                      <span
                        className={
                          selectedNews?.id === item.id
                            ? "text-white/80"
                            : "text-gray-500"
                        }
                      >
                        {item.source}
                      </span>
                      <span
                        className={
                          selectedNews?.id === item.id
                            ? "text-white/80"
                            : "text-gray-500"
                        }
                      >
                        {item.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded-lg ${
                currentPage === page
                  ? "bg-[#0A5C2B] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
