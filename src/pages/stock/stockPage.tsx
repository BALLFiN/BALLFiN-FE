import { useState } from "react";
import {
  Search,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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

  // Top 10 데이터 계산
  const topPositiveStocks = allStocks
    .filter((stock) => stock.sentiment === "positive")
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  const topNegativeStocks = allStocks
    .filter((stock) => stock.sentiment === "negative")
    .sort((a, b) => a.score - b.score)
    .slice(0, 10);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 검색 및 필터 영역 */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="종목명 또는 종목코드 검색"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5C2B]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* Top 10 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* 호재 Top 10 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <h2 className="text-lg font-semibold">호재 Top 10</h2>
          </div>
          <div className="space-y-4">
            {topPositiveStocks.map((stock) => (
              <div
                key={stock.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
              >
                <div>
                  <div className="font-medium">{stock.name}</div>
                  <div className="text-sm text-gray-500">{stock.code}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    {stock.price.toLocaleString()}원
                  </div>
                  <div
                    className={`text-sm ${stock.change >= 0 ? "text-red-500" : "text-blue-500"}`}
                  >
                    {stock.change >= 0 ? "+" : ""}
                    {stock.change}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 악재 Top 10 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-semibold">악재 Top 10</h2>
          </div>
          <div className="space-y-4">
            {topNegativeStocks.map((stock) => (
              <div
                key={stock.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
              >
                <div>
                  <div className="font-medium">{stock.name}</div>
                  <div className="text-sm text-gray-500">{stock.code}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    {stock.price.toLocaleString()}원
                  </div>
                  <div
                    className={`text-sm ${stock.change >= 0 ? "text-red-500" : "text-blue-500"}`}
                  >
                    {stock.change >= 0 ? "+" : ""}
                    {stock.change}%
                  </div>
                </div>
              </div>
            ))}
          </div>
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

      {/* 자동거래 시작 버튼 */}
      <div className="mt-8 p-8 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">자동거래 시작하기</h3>
          <div className="text-sm text-gray-600">
            <p className="font-medium mb-3">※ 유의사항</p>
            <ul className="space-y-2.5">
              <li className="flex items-start">
                <span className="text-[#0A5C2B] mr-2">•</span>
                <span>
                  자동거래는 실시간 시장 상황에 따라 자동으로 매매가
                  이루어집니다.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0A5C2B] mr-2">•</span>
                <span>투자 손실에 대한 책임은 투자자 본인에게 있습니다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0A5C2B] mr-2">•</span>
                <span>
                  자동거래 시작 전 반드시 투자 전략과 리스크를 충분히 이해하시기
                  바랍니다.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0A5C2B] mr-2">•</span>
                <span>
                  시스템 오류나 네트워크 문제로 인한 거래 지연이 발생할 수
                  있습니다.
                </span>
              </li>
            </ul>
          </div>
        </div>
        <button
          onClick={() => navigate("/transaction")}
          className="w-full py-4 text-lg font-medium bg-[#0A5C2B] text-white rounded-lg hover:bg-[#084825] transition-colors"
        >
          자동거래 시작하기
        </button>
      </div>
    </div>
  );
}
