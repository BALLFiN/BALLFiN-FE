import { useState, useEffect } from "react";
import NewsList from "../../components/news/NewsList";
import NewsAnalysis from "../../components/news/NewsAnalysis";
import { NewsItem, searchNews, getMyFeed } from "../../api/news/index";
import NewsTimeline from "../../components/news/NewsTimeline";
import TopNewsSection from "../../components/news/TopNewsSection";
import { motion } from "framer-motion";
import BotButton from "@/components/chat/BotButton";

export default function NewsPage() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [topNews, setTopNews] = useState<NewsItem[]>([]);
  const [myFeedNews, setMyFeedNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMyFeed = async () => {
    try {
      // email 파라미터 제거, limit만 넘기거나 파라미터 없이 호출
      const feed = await getMyFeed({ limit: 20 });
      setMyFeedNews(feed);
    } catch (error) {
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
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
              <TopNewsSection
                topNews={topNews}
                onNewsClick={handleNewsClick}
                isLoading={isLoading}
              />
            </div>
          </div>
          {/* 메인 뉴스 목록 */}
          <div className="container mx-auto px-4 py-8">
            <NewsList
              selectedNews={selectedNews}
              onNewsClick={handleNewsClick}
            />
          </div>
          {/* 뉴스 타임라인과 맞춤형 뉴스 피드 */}
          <div className="container mx-auto px-4 py-8 border-t border-gray-100">
            <div className="max-w-[90rem] mx-auto grid gap-8">
              {/* 뉴스 타임라인 */}
              <div>
                <div className="flex items-center justify-between mb-6"></div>
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
      <BotButton />
    </motion.div>
  );
}
