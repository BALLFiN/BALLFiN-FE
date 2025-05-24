import { useState } from "react";
import NewsList from "../../components/news/NewsList";
import NewsAnalysis from "../../components/news/NewsAnalysis";
import { mockNews, NewsItem } from "../../mock/newsData";
import { Clock } from "lucide-react";
import NewsTimeline from "../../components/news/NewsTimeline";

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
    <div className="flex min-h-screen bg-gray-50">
      {/* 뉴스 목록 */}
      <div
        className={`pt-4 w-full h-screen bg-white transition-all duration-500 ease-in-out ${
          selectedNews ? "w-1/2" : "w-full"
        }`}
      >
        {/* 상단 섹션 */}
        <div className="border-b border-gray-100">
          <div className="container mx-auto px-4 py-8">
            {/* 실시간 인기 뉴스 */}
            <div className="max-w-[90rem] mx-auto">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-gradient-to-r from-[#0A5C2B] to-[#0A5C2B]/80 p-2 rounded-lg shadow-sm">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-[#0A5C2B] to-[#0A5C2B]/80 bg-clip-text text-transparent">
                  실시간 인기 뉴스 Top 5
                </h2>
              </div>
              <div className="relative">
                <div className="w-full">
                  <div className="grid grid-cols-5 gap-6">
                    {mockNews.slice(0, 5).map((news, index) => (
                      <div
                        key={news.id}
                        className="rounded-xl border border-gray-100 hover:border-[#0A5C2B]/20 cursor-pointer transition-all duration-300 overflow-hidden relative bg-white shadow-md hover:shadow-xl transform hover:-translate-y-1"
                        onClick={() => handleNewsClick(news)}
                      >
                        {/* 순위 배지 */}
                        <div
                          className={`absolute top-3 left-3 w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm z-2 shadow-lg ${
                            index === 0
                              ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                              : index === 1
                                ? "bg-gradient-to-br from-gray-400 to-gray-600"
                                : index === 2
                                  ? "bg-gradient-to-br from-amber-600 to-amber-800"
                                  : "bg-gradient-to-br from-gray-700 to-gray-900"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div className="aspect-video relative overflow-hidden">
                          <img
                            src={
                              news.imageUrl ||
                              "https://via.placeholder.com/400x225"
                            }
                            alt={news.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <div className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                            {news.title}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{news.source}</span>
                            <span>•</span>
                            <span>{news.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 메인 뉴스 목록 */}
        <div className="container mx-auto px-4 py-8">
          <NewsList selectedNews={selectedNews} onNewsClick={handleNewsClick} />
        </div>
        {/* 뉴스 타임라인과 맞춤형 뉴스 피드 */}
        <div className="container mx-auto px-4 py-8 border-t border-gray-100">
          <div className="max-w-[90rem] mx-auto grid gap-8">
            {/* 뉴스 타임라인 */}
            <div>
              <NewsTimeline
                events={mockNews.slice(0, 7).map((news, index) => ({
                  time: news.date,
                  title: news.title,
                  description: news.summary,
                  source: news.source,
                  sentiment:
                    index % 3 === 0
                      ? "positive"
                      : index % 3 === 1
                        ? "negative"
                        : "neutral",
                }))}
                onEventClick={(event) => {
                  const newsItem = mockNews.find(
                    (news) => news.title === event.title
                  );
                  if (newsItem) {
                    handleNewsClick(newsItem);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* 뉴스 상세 */}
      <div
        className={`z-10 p-2 fixed top-0 right-0 bg-white w-1/3 transition-all duration-500 ease-in-out transform rounded-lg shadow-lg ${
          selectedNews
            ? "translate-x-0 mt-20 mr-10 border border-gray-200"
            : "translate-x-full"
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
