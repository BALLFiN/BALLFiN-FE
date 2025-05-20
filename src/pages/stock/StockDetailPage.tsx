import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, Star, TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StockDetail {
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
  historicalData: {
    date: string;
    price: number;
    volume: number;
  }[];
}

export default function StockDetailPage() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [stock, setStock] = useState<StockDetail | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [timeRange, setTimeRange] = useState<"1d" | "1w" | "1m" | "3m" | "1y">(
    "1m"
  );

  useEffect(() => {
    // TODO: API 호출로 실제 데이터 가져오기
    // 임시 데이터
    setStock({
      id: 1,
      name: "삼성전자",
      code: code || "",
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
      historicalData: [
        { date: "2024-01-01", price: 70000, volume: 1000000 },
        { date: "2024-01-02", price: 72000, volume: 1200000 },
        // ... 더 많은 데이터
      ],
    });
  }, [code]);

  if (!stock) return <div>로딩 중...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold">{stock.name}</h1>
            <p className="text-gray-500">{stock.code}</p>
          </div>
        </div>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`p-2 rounded-full hover:bg-gray-100 ${
            isFavorite ? "text-yellow-500" : "text-gray-400"
          }`}
        >
          <Star size={24} />
        </button>
      </div>

      {/* 주요 정보 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold mb-2">현재가</h3>
          <div className="text-2xl font-bold">
            {stock.price.toLocaleString()}원
          </div>
          <div
            className={`text-sm ${
              stock.change >= 0 ? "text-red-500" : "text-blue-500"
            }`}
          >
            {stock.change >= 0 ? "+" : ""}
            {stock.change}%
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold mb-2">예측 정보</h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="text-xl font-bold">
              {stock.prediction.targetPrice.toLocaleString()}원
            </div>
            <div className="text-sm text-gray-500">
              (신뢰도: {Math.round(stock.prediction.confidence * 100)}%)
            </div>
          </div>
          <div
            className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${
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
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold mb-2">시장 심리</h3>
          <div className="flex items-center gap-2 mb-2">
            <div
              className={`w-3 h-3 rounded-full ${
                stock.sentiment === "positive"
                  ? "bg-green-500"
                  : stock.sentiment === "negative"
                    ? "bg-red-500"
                    : "bg-gray-500"
              }`}
            />
            <div className="text-xl font-bold">{stock.score}</div>
          </div>
          <div className="text-sm text-gray-500">
            {stock.newsCount}개의 관련 뉴스
          </div>
        </div>
      </div>

      {/* 차트 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">가격 차트</h2>
          <div className="flex gap-2">
            {["1d", "1w", "1m", "3m", "1y"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range as any)}
                className={`px-3 py-1 rounded ${
                  timeRange === range
                    ? "bg-[#0A5C2B] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[400px]">
          {/* TODO: 차트 라이브러리 추가 (예: recharts, chart.js) */}
          <div className="flex items-center justify-center h-full text-gray-500">
            차트 영역
          </div>
        </div>
      </div>

      {/* 뉴스 섹션 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold mb-6">관련 뉴스</h2>
        <div className="space-y-4">
          {/* TODO: 실제 뉴스 데이터 연동 */}
          <div className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-500">2024-03-20</span>
            </div>
            <h3 className="font-medium mb-2">
              삼성전자, 새로운 AI 칩 개발 발표... 주가 상승 전망
            </h3>
            <p className="text-sm text-gray-600">
              삼성전자가 새로운 AI 칩 개발을 발표하며 시장의 관심을 모으고
              있습니다...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
