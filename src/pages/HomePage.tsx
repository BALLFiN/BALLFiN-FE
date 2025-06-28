import NewsSummary from "@/components/home/NewsSummary";
import StockSummary from "@/components/home/StockSummary";
import BotButton from "@/components/chat/BotButton";
import MarketOverview from "@/components/home/MarketOverview";
import AIRecommendations from "@/components/home/AIRecommendations";
import PopularStocks from "@/components/home/PopularStocks";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 환영 메시지 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          안녕하세요, Barbell님!{" "}
          <span className="text-[#0A5C2B]">AI 투자 인사이트</span>가
          준비되었습니다.
        </h1>
        <button className="mt-4 px-6 py-2 bg-[#0A5C2B] text-white rounded-lg hover:bg-[#0A5C2B]/90 transition-colors">
          투자 시작하기
        </button>
      </div>

      {/* 시장 개요 */}
      <div className="mb-8">
        <MarketOverview />
      </div>

      {/* 인기 종목 */}
      <div className="mb-8">
        <PopularStocks />
      </div>

      {/* AI 추천 종목 */}
      <div className="mt-8">
        <AIRecommendations />
      </div>

      {/* 뉴스 요약 및 주식 요약 */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <NewsSummary />
        <StockSummary />
      </div>

      {/* 챗봇 버튼 */}
      <BotButton />
    </div>
  );
};

export default Home;
