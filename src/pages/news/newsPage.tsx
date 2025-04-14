import { useState } from "react";
import NewsList from "../../components/news/NewsList";
import NewsAnalysis from "../../components/news/NewsAnalysis";
import { mockNews, NewsItem } from "../../mock/newsData";
import { Clock } from "lucide-react";
import NewsTimeline from "../../components/news/NewsTimeline";
import PersonalizedFeed from "../../components/news/PersonalizedFeed";

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
        <div className="h-full overflow-y-auto">
          {/* 상단 섹션 */}
          <div className="border-b border-gray-100">
            <div className="container mx-auto px-4 py-8">
              {/* 실시간 인기 뉴스 */}
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-[#0A5C2B]" />
                  <h2 className="text-lg font-semibold">실시간 인기 뉴스</h2>
                </div>
                <div className="relative">
                  <div className="overflow-hidden">
                    <div className="flex gap-4 pb-4 animate-slide">
                      {mockNews.slice(0, 5).map((news) => (
                        <div
                          key={news.id}
                          className="group min-w-[280px] rounded-lg border border-gray-100 hover:border-[#0A5C2B]/20 cursor-pointer transition-all duration-300 overflow-hidden"
                          onClick={() => handleNewsClick(news)}
                        >
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
            <NewsList
              news={mockNews}
              selectedNews={selectedNews}
              onNewsClick={handleNewsClick}
            />
          </div>

          {/* 뉴스 타임라인과 맞춤형 뉴스 피드 */}
          <div className="container mx-auto px-4 py-8 border-t border-gray-100">
            <div className="max-w-[90rem] mx-auto grid grid-cols-2 gap-8">
              {/* 뉴스 타임라인 */}
              <div className="h-[720px] overflow-y-auto">
                <NewsTimeline
                  events={mockNews.slice(0, 7).map((news) => ({
                    time: news.date,
                    title: news.title,
                    description: news.summary,
                    source: news.source,
                  }))}
                />
              </div>

              {/* 맞춤형 뉴스 피드 */}
              <div className="h-[720px] overflow-y-auto">
                <PersonalizedFeed
                  news={mockNews.slice(0, 5)}
                  interests={["주식", "부동산", "경제"]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 뉴스 상세 */}
      <div
        className={`p-4 fixed top-0 right-0 h-auto bg-white w-1/3 transition-all duration-500 ease-in-out transform rounded-lg shadow-lg ${
          selectedNews
            ? "translate-x-0 mt-30 mr-10 border border-gray-200"
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
