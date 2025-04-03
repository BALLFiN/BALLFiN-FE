import { useState } from "react";
import NewsList from "../../components/news/NewsList";
import NewsAnalysis from "../../components/news/NewsAnalysis";
import { mockNews, NewsItem } from "../../mock/newsData";

export default function NewsPage() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const handleNewsClick = (news: NewsItem) => {
    if (selectedNews?.id === news.id) {
      setSelectedNews(null);
    } else {
      setSelectedNews(news);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* 뉴스 목록 */}
      <div
        className={`pt-16 fixed top-0 left-0 w-full h-full bg-white transition-all duration-500 ease-in-out ${
          selectedNews ? "w-1/2" : "w-full"
        }`}
      >
        <NewsList
          news={mockNews}
          selectedNews={selectedNews}
          onNewsClick={handleNewsClick}
        />
      </div>

      {/* 뉴스 상세 */}
      <div
        className={`pt-16 fixed top-0 right-0 w-1/2 h-full bg-gray-50 transition-all duration-500 ease-in-out transform ${
          selectedNews ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <NewsAnalysis
          news={selectedNews}
          onClose={() => setSelectedNews(null)}
        />
      </div>
    </div>
  );
}
