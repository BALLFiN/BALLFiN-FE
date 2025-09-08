import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  TrendingUp,
  TrendingDown,
  Star,
  Search,
  MoreVertical,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FavoritesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const [favoriteStocks] = useState([
    {
      id: 1,
      symbol: "005930",
      name: "삼성전자",
      price: 71500,
      change: 1500,
      changePercent: 2.14,
      volume: "12.5M",
      marketCap: "427조",
      isFavorite: true,
    },
    {
      id: 2,
      symbol: "000660",
      name: "SK하이닉스",
      price: 128000,
      change: -2000,
      changePercent: -1.54,
      volume: "3.2M",
      marketCap: "93조",
      isFavorite: true,
    },
    {
      id: 3,
      symbol: "035420",
      name: "NAVER",
      price: 198500,
      change: 3500,
      changePercent: 1.79,
      volume: "1.8M",
      marketCap: "32조",
      isFavorite: true,
    },
    {
      id: 4,
      symbol: "051910",
      name: "LG화학",
      price: 425000,
      change: -5000,
      changePercent: -1.16,
      volume: "0.8M",
      marketCap: "30조",
      isFavorite: true,
    },
  ]);

  const handleRemoveFavorite = (id: number) => {
    console.log("즐겨찾기 제거:", id);
  };

  const filteredStocks = favoriteStocks.filter(
    (stock) =>
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.symbol.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* 헤더 - 모바일에서만 표시 */}
      <div className="lg:hidden bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/mypage")}
            className="p-2 rounded-full hover:bg-gray-100/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">즐겨찾기</h1>
          <div className="w-9"></div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-8 space-y-6">
        {/* 검색 및 필터 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="종목명 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0A5C2B]/20 focus:border-[#0A5C2B] transition-all"
            />
          </div>
        </motion.div>

        {/* 즐겨찾기 주식 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              즐겨찾기 주식
            </h2>
            <span className="text-sm text-gray-500">
              {filteredStocks.length}개
            </span>
          </div>

          {filteredStocks.map((stock, index) => (
            <motion.div
              key={stock.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {stock.name}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {stock.symbol}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-lg font-bold text-gray-900">
                      ₩{stock.price.toLocaleString()}
                    </span>
                    <div
                      className={`flex items-center space-x-1 ${
                        stock.change >= 0 ? "text-red-500" : "text-blue-500"
                      }`}
                    >
                      {stock.change >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span>
                        {stock.change >= 0 ? "+" : ""}
                        {stock.change.toLocaleString()}(
                        {stock.changePercent >= 0 ? "+" : ""}
                        {stock.changePercent}%)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                    <span>거래량: {stock.volume}</span>
                    <span>시총: {stock.marketCap}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleRemoveFavorite(stock.id)}
                    className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Heart className="w-5 h-5 fill-current" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 빈 상태 */}
        {filteredStocks.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center py-12"
          >
            <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Star className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              즐겨찾기 주식이 없습니다
            </h3>
            <p className="text-gray-600">
              관심 있는 주식을 즐겨찾기에 추가해보세요
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
