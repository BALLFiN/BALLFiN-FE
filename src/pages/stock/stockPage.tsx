import { useState } from "react";
import { ArrowUpDown, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StockSearchBar from "../../components/stock/StockSearchBar";
import AutoTradingSection from "../../components/stock/AutoTradingSection";

interface StockItem {
  id: number;
  name: string;
  code: string;
  price: number;
  change: number;
  score: number;
  sentiment: "positive" | "negative" | "neutral";
  newsCount: number;
  prediction: {
    targetPrice: number;
    confidence: number;
    recommendation: "buy" | "sell" | "hold";
  };
  isFavorite?: boolean;
}

export default function StockPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"score" | "price" | "change">("score");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filter, setFilter] = useState<
    "all" | "positive" | "negative" | "favorite"
  >("all");
  const [favoriteStocks, setFavoriteStocks] = useState<number[]>([]);

  // 임시 데이터
  const allStocks: StockItem[] = [
    {
      id: 1,
      name: "삼성전자",
      code: "005930",
      price: 75000,
      change: 2.5,
      score: 85,
      sentiment: "positive",
      newsCount: 12,
      prediction: {
        targetPrice: 82000,
        confidence: 0.78,
        recommendation: "buy",
      },
    },
    {
      id: 2,
      name: "현대자동차",
      code: "005380",
      price: 185000,
      change: -1.2,
      score: 35,
      sentiment: "negative",
      newsCount: 8,
      prediction: {
        targetPrice: 170000,
        confidence: 0.65,
        recommendation: "sell",
      },
    },
    {
      id: 3,
      name: "SK하이닉스",
      code: "000660",
      price: 120000,
      change: 1.8,
      score: 75,
      sentiment: "positive",
      newsCount: 10,
      prediction: {
        targetPrice: 135000,
        confidence: 0.72,
        recommendation: "buy",
      },
    },
    {
      id: 4,
      name: "LG전자",
      code: "066570",
      price: 95000,
      change: -0.5,
      score: 45,
      sentiment: "negative",
      newsCount: 6,
      prediction: {
        targetPrice: 90000,
        confidence: 0.58,
        recommendation: "hold",
      },
    },
  ];

  // 즐겨찾기 토글 함수
  const toggleFavorite = (stockId: number) => {
    setFavoriteStocks((prev) => {
      if (prev.includes(stockId)) {
        return prev.filter((id) => id !== stockId);
      } else {
        return [...prev, stockId];
      }
    });
  };

  // 상세 페이지로 이동
  const handleViewDetail = (stockCode: string) => {
    navigate(`/stock/${stockCode}`);
  };

  // 필터링 및 정렬된 데이터 계산
  const filteredAndSortedStocks = allStocks
    .filter((stock) => {
      // 검색어 필터링
      const matchesSearch = searchQuery
        ? stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          stock.code.includes(searchQuery)
        : true;

      // 감성 필터링
      const matchesFilter =
        filter === "all"
          ? true
          : filter === "favorite"
            ? favoriteStocks.includes(stock.id)
            : stock.sentiment === filter;

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      // 정렬 기준에 따라 비교
      let comparison = 0;
      if (sortBy === "score") {
        comparison = a.score - b.score;
      } else if (sortBy === "price") {
        comparison = a.price - b.price;
      } else if (sortBy === "change") {
        comparison = a.change - b.change;
      }

      // 정렬 방향에 따라 반환
      return sortOrder === "asc" ? comparison : -comparison;
    });

  // 검색 처리 함수
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 검색 및 필터 영역 */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1">
            <StockSearchBar
              onSearch={handleSearch}
              placeholder="종목명 또는 종목코드 검색"
              allStocks={allStocks}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg ${
                filter === "all"
                  ? "bg-[#0A5C2B] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setFilter("positive")}
              className={`px-4 py-2 rounded-lg ${
                filter === "positive"
                  ? "bg-[#0A5C2B] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              호재
            </button>
            <button
              onClick={() => setFilter("negative")}
              className={`px-4 py-2 rounded-lg ${
                filter === "negative"
                  ? "bg-[#0A5C2B] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              악재
            </button>
            <button
              onClick={() => setFilter("favorite")}
              className={`px-4 py-2 rounded-lg ${
                filter === "favorite"
                  ? "bg-[#0A5C2B] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              즐겨찾기
            </button>
          </div>
        </div>

        {/* 정렬 옵션 */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setSortBy("score");
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            }}
            className={`flex items-center gap-1 px-3 py-1 rounded ${
              sortBy === "score" ? "bg-gray-100" : ""
            }`}
          >
            <span>스코어</span>
            <ArrowUpDown className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setSortBy("price");
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            }}
            className={`flex items-center gap-1 px-3 py-1 rounded ${
              sortBy === "price" ? "bg-gray-100" : ""
            }`}
          >
            <span>가격</span>
            <ArrowUpDown className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setSortBy("change");
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            }}
            className={`flex items-center gap-1 px-3 py-1 rounded ${
              sortBy === "change" ? "bg-gray-100" : ""
            }`}
          >
            <span>변동률</span>
            <ArrowUpDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 주식 목록 테이블 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                종목
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                현재가
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                변동률
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                스코어
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                예측가
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                추천
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                액션
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAndSortedStocks.map((stock) => (
              <tr key={stock.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium">{stock.name}</div>
                  <div className="text-sm text-gray-500">{stock.code}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {stock.price.toLocaleString()}원
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap ${
                    stock.change >= 0 ? "text-red-500" : "text-blue-500"
                  }`}
                >
                  {stock.change >= 0 ? "+" : ""}
                  {stock.change}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        stock.sentiment === "positive"
                          ? "bg-green-500"
                          : stock.sentiment === "negative"
                            ? "bg-red-500"
                            : "bg-gray-500"
                      }`}
                    />
                    {stock.score}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {stock.prediction.targetPrice.toLocaleString()}원
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      stock.prediction.recommendation === "buy"
                        ? "bg-green-100 text-green-800"
                        : stock.prediction.recommendation === "sell"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {stock.prediction.recommendation === "buy"
                      ? "매수"
                      : stock.prediction.recommendation === "sell"
                        ? "매도"
                        : "관망"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewDetail(stock.code)}
                      className="px-2 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 text-gray-700"
                    >
                      조회
                    </button>
                    <button
                      onClick={() => toggleFavorite(stock.id)}
                      className={`p-1 rounded-full hover:bg-gray-100 ${
                        favoriteStocks.includes(stock.id)
                          ? "text-yellow-500"
                          : "text-gray-400"
                      }`}
                    >
                      <Star size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 자동거래 시작하기 */}
      <AutoTradingSection />
    </div>
  );
}
