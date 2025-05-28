import { useState, useEffect } from "react";
import NewsList from "../../components/news/NewsList";
import NewsAnalysis from "../../components/news/NewsAnalysis";
import { NewsItem, searchNews, getMyFeed } from "../../api/news/index";
import { Clock } from "lucide-react";
import NewsTimeline from "../../components/news/NewsTimeline";

export default function NewsPage() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [topNews, setTopNews] = useState<NewsItem[]>([]);
  const [myFeedNews, setMyFeedNews] = useState<NewsItem[]>([]);

  const fetchTopNews = async () => {
    try {
      // 인기 뉴스를 가져옵니다
      const response = await searchNews({
        sort_by: "views",
        offset: 0,
      });
      // 조회수 기준으로 상위 5개만 선택
      setTopNews(response.results.slice(0, 5));
    } catch (error) {
      console.error("인기 뉴스 로딩 중 오류 발생:", error);
    }
  };

  const fetchMyFeed = async () => {
    try {
      // TODO: 실제 사용자 이메일을 가져오는 로직으로 대체
      const userEmail =
        localStorage.getItem("user_email") || "user@example.com";
      const feed = await getMyFeed({ user_email: userEmail });
      setMyFeedNews(feed);
    } catch (error) {
      console.error("맞춤형 뉴스 피드 로딩 중 오류 발생:", error);
      // API가 아직 구현되지 않은 경우를 위한 임시 데이터
      if (error instanceof Error) {
        if (error.message.includes("즐겨찾기한 종목이 없습니다")) {
          // 즐겨찾기 없는 경우 최신 뉴스 표시
          try {
            const response = await searchNews({
              sort_by: "date",
              limit: 20,
              offset: 0,
            });
            console.log("최신 뉴스 데이터:", response);
            setMyFeedNews(response.results);
          } catch (searchError) {
            console.error("최신 뉴스 로딩 실패:", searchError);
            setMyFeedNews([]);
          }
        } else if (error.message.includes("아직 구현되지 않았습니다")) {
          // API 미구현 시 최신 뉴스 표시
          try {
            const response = await searchNews({
              sort_by: "date",
              limit: 20,
              offset: 0,
            });
            console.log("임시 뉴스 피드 데이터:", response);
            setMyFeedNews(response.results);
          } catch (searchError) {
            console.error("임시 뉴스 피드 로딩 실패:", searchError);
            setMyFeedNews([]);
          }
        }
      }
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([fetchTopNews(), fetchMyFeed()]);
      } catch (error) {
        console.error("데이터 로딩 중 오류 발생:", error);
      }
    };
    void loadData();
  }, []);

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
                    {topNews.map((news, index) => (
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
                              news.image_url ||
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
                            <span>{news.press}</span>
                            <span>•</span>
                            <span>
                              {new Date(news.published_at).toLocaleDateString()}
                            </span>
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
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-r from-[#0A5C2B] to-[#0A5C2B]/80 p-2 rounded-lg shadow-md">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-[#0A5C2B] to-[#0A5C2B]/80 bg-clip-text text-transparent">
                    {myFeedNews.length > 0 ? "맞춤형 뉴스 피드" : "최신 뉴스"}
                  </h3>
                </div>
              </div>
              {myFeedNews.length === 0 ? (
                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-lg text-center">
                  <div className="text-gray-500 mb-4">
                    즐겨찾기한 종목이 없습니다.
                  </div>
                  <div className="text-sm text-gray-400">
                    관심 있는 종목을 즐겨찾기에 추가하면
                    <br />
                    관련 뉴스를 맞춤형으로 받아볼 수 있습니다.
                  </div>
                </div>
              ) : (
                <NewsTimeline
                  events={myFeedNews.map((news) => ({
                    time: news.published_at,
                    title: news.title,
                    description: news.summary,
                    source: news.press,
                    sentiment: news.impact,
                  }))}
                  onEventClick={(event) => {
                    const newsItem = myFeedNews.find(
                      (news) => news.title === event.title
                    );
                    if (newsItem) {
                      handleNewsClick(newsItem);
                    }
                  }}
                />
              )}
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
