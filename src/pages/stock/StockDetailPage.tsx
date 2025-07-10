import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StockHeader from "@/components/stockDetail/StockHeader";
import StockChart from "@/components/stockDetail/StockChart";
import StockNews from "@/components/stockDetail/StockNews";
import TechnicalAnalysis from "@/components/stockDetail/TechnicalAnalysis";
import FinancialStatement from "@/components/stockDetail/FinancialStatement";
import Loading from "@/components/common/Loading";

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
}

interface HistoricalData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ma5?: number;
  ma20?: number;
  ma60?: number;
  ma120?: number;
}

interface NewsItem {
  id: number;
  title: string;
  source: string;
  date: string;
  sentiment: "positive" | "negative" | "neutral";
  url: string;
}

interface FinancialData {
  revenue: number;
  netIncome: number;
  debtRatio: number;
  roe: number;
  per: number;
  pbr: number;
  dividendYield: number;
}

export default function StockDetailPage() {
  const { code } = useParams<{ code: string }>();
  const [stock, setStock] = useState<StockDetail | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showMA, setShowMA] = useState({
    ma5: true,
    ma20: true,
    ma60: false,
    ma120: false,
  });
  const [timeRange, setTimeRange] = useState<
    "1m" | "5m" | "15m" | "30m" | "1h" | "1d" | "1w" | "1m" | "3m" | "1y"
  >("1d");
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [financialData, setFinancialData] = useState<FinancialData | null>(
    null
  );

  useEffect(() => {
    // TODO: API 호출로 대체
    const mockStock: StockDetail = {
      id: 1,
      name: "삼성전자",
      code: "005930",
      price: 72400,
      change: -1.63,
      score: 75,
      sentiment: "positive",
      newsCount: 12,
      prediction: {
        targetPrice: 80000,
        confidence: 85,
        recommendation: "buy",
      },
    };

    const mockHistoricalData: HistoricalData[] = Array.from(
      { length: 30 },
      (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        open: 70000 + Math.random() * 10000,
        high: 75000 + Math.random() * 10000,
        low: 65000 + Math.random() * 10000,
        close: 70000 + Math.random() * 10000,
        volume: Math.floor(Math.random() * 1000000),
        ma5: 72000 + Math.random() * 5000,
        ma20: 71000 + Math.random() * 3000,
        ma60: 70500 + Math.random() * 2000,
        ma120: 70000 + Math.random() * 1500,
      })
    );

    const mockNews: NewsItem[] = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      title: `삼성전자, ${i + 1}분기 실적 발표... 시장 예상치 상회`,
      source: "한국경제",
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      sentiment: ["positive", "negative", "neutral"][
        Math.floor(Math.random() * 3)
      ] as any,
      url: "#",
    }));

    const mockFinancialData: FinancialData = {
      revenue: 279600000000000,
      netIncome: 15400000000000,
      debtRatio: 23.4,
      roe: 15.8,
      per: 12.3,
      pbr: 1.2,
      dividendYield: 2.1,
    };

    setStock(mockStock);
    setHistoricalData(mockHistoricalData);
    setNews(mockNews);
    setFinancialData(mockFinancialData);
  }, [code]);

  const handleToggleMA = (maType: "ma5" | "ma20" | "ma60" | "ma120") => {
    setShowMA((prev) => ({
      ...prev,
      [maType]: !prev[maType],
    }));
  };

  if (!stock) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <div className="bg-white shadow-sm ">
        <div className="container mx-auto px-4 py-4">
          <StockHeader
            name={stock.name}
            code={stock.code}
            isFavorite={isFavorite}
            onToggleFavorite={() => setIsFavorite(!isFavorite)}
          />
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container mx-auto px-4 py-6">
        {/* 차트와 기술적 분석 영역 */}
        <div className="flex gap-6 mb-8">
          {/* 차트 영역 */}
          <div className="flex-1">
            <StockChart
              data={historicalData}
              showMA={showMA}
              timeRange={timeRange}
              onTimeRangeChange={setTimeRange}
              onToggleMA={handleToggleMA}
            />
          </div>

          {/* 기술적 분석 사이드바 */}
          <div className="w-118">
            {/* 현재가 정보 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  현재가
                </h2>
                <div className="text-2xl font-bold text-gray-900">
                  {stock.price.toLocaleString()}원
                </div>
                <div
                  className={`text-sm font-medium ${
                    stock.change >= 0 ? "text-red-500" : "text-blue-500"
                  }`}
                >
                  {stock.change >= 0 ? "+" : ""}
                  {stock.change.toFixed(2)}%
                </div>
              </div>
            </div>

            <TechnicalAnalysis stock={stock} historicalData={historicalData} />
          </div>
        </div>

        {/* 하단 섹션들 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 관련 뉴스 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              관련 뉴스
            </h3>
            <StockNews news={news} />
          </div>

          {/* 재무제표 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              재무제표
            </h3>
            {financialData && <FinancialStatement data={financialData} />}
          </div>
        </div>

        {/* 예정사항 영역 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">예정사항</h3>
          <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">추가 콘텐츠 영역</p>
          </div>
        </div>
      </div>
    </div>
  );
}
