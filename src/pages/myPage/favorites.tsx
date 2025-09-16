import { useEffect, useMemo, useState } from "react";
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
import { getFavorites, removeFavorite } from "@/api/user/favoritesApi";
import { getStockInfoByCode } from "@/api/stock";

export default function FavoritesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [favoriteStocks, setFavoriteStocks] = useState<
    {
      symbol: string;
      name: string;
      price: number;
      change: number;
      changePercent: number;
      volume?: string | number;
      marketCap?: string | number;
    }[]
  >([]);

  useEffect(() => {
    let cancelled = false;
    const fetchFavoritesAndDetails = async () => {
      try {
        const res = await getFavorites();
        const codes = Array.isArray(res)
          ? res
          : res && typeof res === "object" && "favorites" in res
            ? (res as any).favorites
            : [];

        if (!Array.isArray(codes)) {
          setFavoriteStocks([]);
          return;
        }

        if (cancelled) return;

        // 각 코드별 상세 정보 병렬 조회
        const details = await Promise.all(
          codes.map(async (code) => {
            try {
              const data = await getStockInfoByCode(code);
              const price =
                typeof data["현재가"] === "number" ? data["현재가"] : 0;
              const name =
                typeof data["기업명"] === "string" ? data["기업명"] : code;
              const changePercent =
                typeof data["등락"] === "number" ? data["등락"] : 0;
              const changeAmount =
                typeof data["전일대비"] === "number" ? data["전일대비"] : 0;
              const volume =
                typeof data["거래량"] === "number" ? data["거래량"] : undefined;
              const marketCap =
                typeof data["시가총액"] === "number"
                  ? data["시가총액"]
                  : undefined;

              return {
                symbol: code,
                name,
                price,
                change: changeAmount,
                changePercent,
                volume,
                marketCap,
              };
            } catch {
              return {
                symbol: code,
                name: code,
                price: 0,
                change: 0,
                changePercent: 0,
              };
            }
          })
        );

        if (cancelled) return;
        setFavoriteStocks(details);
      } finally {
      }
    };

    fetchFavoritesAndDetails();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleRemoveFavorite = async (symbol: string) => {
    try {
      // 낙관적 업데이트
      setFavoriteStocks((prev) => prev.filter((s) => s.symbol !== symbol));

      await removeFavorite(symbol);
    } catch (e) {
      // 실패 시 목록을 다시 불러와 복구
      try {
        const res = await getFavorites();
        const codes = Array.isArray(res)
          ? res
          : res && typeof res === "object" && "favorites" in res
            ? (res as any).favorites
            : [];
        if (Array.isArray(codes)) {
          const details = await Promise.all(
            codes.map(async (code) => {
              try {
                const data = await getStockInfoByCode(code);
                const price =
                  typeof data["현재가"] === "number" ? data["현재가"] : 0;
                const name =
                  typeof data["기업명"] === "string" ? data["기업명"] : code;
                const changePercent =
                  typeof data["등락"] === "number" ? data["등락"] : 0;
                const changeAmount =
                  typeof data["전일대비"] === "number" ? data["전일대비"] : 0;
                const volume =
                  typeof data["거래량"] === "number"
                    ? data["거래량"]
                    : undefined;
                const marketCap =
                  typeof data["시가총액"] === "number"
                    ? data["시가총액"]
                    : undefined;
                return {
                  symbol: code,
                  name,
                  price,
                  change: changeAmount,
                  changePercent,
                  volume,
                  marketCap,
                };
              } catch {
                return {
                  symbol: code,
                  name: code,
                  price: 0,
                  change: 0,
                  changePercent: 0,
                };
              }
            })
          );
          setFavoriteStocks(details);
        }
      } catch {
        // 무시
      }
    }
  };

  const filteredStocks = useMemo(
    () =>
      favoriteStocks.filter(
        (stock) =>
          stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          stock.symbol.includes(searchTerm)
      ),
    [favoriteStocks, searchTerm]
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
              key={stock.symbol}
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
                      ₩{Number(stock.price || 0).toLocaleString()}
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
                        {Number(stock.change || 0).toLocaleString()}(
                        {stock.changePercent >= 0 ? "+" : ""}
                        {Number(stock.changePercent || 0)}%)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                    <span>거래량: {stock.volume ?? "-"}</span>
                    <span>시총: {stock.marketCap ?? "-"}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleRemoveFavorite(stock.symbol)}
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
