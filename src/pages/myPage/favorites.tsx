import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Trash2, Search, Filter, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FavoritesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"stocks" | "news">("stocks");
  const [searchTerm, setSearchTerm] = useState("");

  const favoriteStocks = [
    {
      id: 1,
      symbol: "005930",
      name: "삼성전자",
      price: "75,800",
      change: "+2.3%",
      changeType: "up",
      sector: "전자",
    },
    {
      id: 2,
      symbol: "000660",
      name: "SK하이닉스",
      price: "142,000",
      change: "-1.2%",
      changeType: "down",
      sector: "반도체",
    },
    {
      id: 3,
      symbol: "035420",
      name: "NAVER",
      price: "198,500",
      change: "+0.8%",
      changeType: "up",
      sector: "IT",
    },
  ];

  const favoriteNews = [
    {
      id: 1,
      title: "삼성전자, 2분기 실적 예상치 상회",
      press: "한국경제",
      published_at: "2024-01-15",
      impact: "positive",
    },
    {
      id: 2,
      title: "SK하이닉스 메모리 가격 상승세",
      press: "매일경제",
      published_at: "2024-01-14",
      impact: "positive",
    },
    {
      id: 3,
      title: "NAVER AI 기술 개발 현황",
      press: "조선일보",
      published_at: "2024-01-13",
      impact: "neutral",
    },
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "positive":
        return "text-green-600 bg-green-50 border-green-200";
      case "negative":
        return "text-red-600 bg-red-50 border-red-200";
      case "neutral":
        return "text-gray-600 bg-gray-50 border-gray-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getImpactText = (impact: string) => {
    switch (impact) {
      case "positive":
        return "긍정";
      case "negative":
        return "부정";
      case "neutral":
        return "중립";
      default:
        return "중립";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">즐겨찾기</h1>
          <div className="w-9"></div>
        </div>
      </div>

      {/* 검색바 */}
      <div className="px-4 py-4 bg-white border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="즐겨찾기 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A5C2B]/20 focus:border-[#0A5C2B]"
          />
        </div>
      </div>

      {/* 탭 */}
      <div className="bg-white border-b border-gray-100">
        <div className="flex px-4">
          <button
            onClick={() => setActiveTab("stocks")}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "stocks"
                ? "border-[#0A5C2B] text-[#0A5C2B]"
                : "border-transparent text-gray-500"
            }`}
          >
            관심 종목 ({favoriteStocks.length})
          </button>
          <button
            onClick={() => setActiveTab("news")}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "news"
                ? "border-[#0A5C2B] text-[#0A5C2B]"
                : "border-transparent text-gray-500"
            }`}
          >
            관심 뉴스 ({favoriteNews.length})
          </button>
        </div>
      </div>

      <div className="px-4 py-4">
        {activeTab === "stocks" ? (
          <div className="space-y-3">
            {favoriteStocks.map((stock, index) => (
              <motion.div
                key={stock.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {stock.name}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {stock.symbol}
                      </span>
                      <Heart className="w-4 h-4 text-red-500 fill-current" />
                    </div>
                    <p className="text-sm text-gray-600">{stock.sector}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{stock.price}</p>
                    <p
                      className={`text-sm font-medium ${
                        stock.changeType === "up"
                          ? "text-red-600"
                          : "text-blue-600"
                      }`}
                    >
                      {stock.change}
                    </p>
                  </div>
                  <button className="ml-3 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {favoriteNews.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getImpactColor(news.impact)}`}
                      >
                        {getImpactText(news.impact)}
                      </span>
                      <Heart className="w-4 h-4 text-red-500 fill-current" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                      {news.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{news.press}</span>
                      <span>•</span>
                      <span>{news.published_at}</span>
                    </div>
                  </div>
                  <button className="ml-3 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
