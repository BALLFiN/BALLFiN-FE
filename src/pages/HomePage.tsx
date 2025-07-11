import { motion } from "framer-motion";
import BotButton from "@/components/chat/BotButton";
import MarketOverview from "@/components/home/MarketOverview";
import PopularStocks from "@/components/home/PopularStocks";
import TrendingKeywords from "@/components/home/TrendingKeywords";
import TrendingNews from "@/components/home/TrendingNews";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          {/* 실시간 인기 뉴스를 중앙에 배치 */}
          <div className="flex justify-center">
            <div className="w-full max-w-3xl">
              <TrendingNews />
            </div>
          </div>
        </div>

        {/* 시장 개요 */}
        <div className="mb-8">
          <MarketOverview />
        </div>

        {/* 인기 종목 및 키워드 */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-2">
          <PopularStocks />
          <TrendingKeywords />
        </div>

        {/* 챗봇 버튼 */}
        <BotButton />
      </div>
    </motion.div>
  );
};

export default Home;
