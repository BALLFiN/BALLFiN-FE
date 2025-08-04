import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StockHeader from "@/components/stockDetail/StockHeader";

import StockNews from "@/components/stockDetail/StockNews";
import TechnicalAnalysis from "@/components/stockDetail/TechnicalAnalysis";
import FinancialStatement from "@/components/stockDetail/FinancialStatement";
import Loading from "@/components/common/Loading";

import StockChartPrice from "@/components/stockDetail/chart";
import RelatedCompanies from "@/components/stockDetail/RelatedCompanies";

interface StockDetail {
  id: number;
  name: string;
  code: string;
  price: number;
  change: number;
  changeAmount: number;
  score: number;
  sentiment: "positive" | "negative" | "neutral";
  newsCount: number;
  previousVolume?: number;
  currentVolume?: number;
  tradingAmount?: number;
  week52High?: {
    price: number;
    date: string;
  };
  week52Low?: {
    price: number;
    date: string;
  };
  upperLimit?: number;
  lowerLimit?: number;
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
      changeAmount: -1200,
      score: 75,
      sentiment: "positive",
      newsCount: 12,
      previousVolume: 15000000,
      currentVolume: 18000000,
      tradingAmount: 1303200000000,
      week52High: {
        price: 85000,
        date: "2024-01-15",
      },
      week52Low: {
        price: 65000,
        date: "2024-06-20",
      },
      upperLimit: 79640,
      lowerLimit: 65160,
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
            currentPrice={stock.price}
            changeAmount={stock.changeAmount}
            changePercent={stock.change}
            previousVolume={stock.previousVolume}
            currentVolume={stock.currentVolume}
            tradingAmount={stock.tradingAmount}
            week52High={stock.week52High}
            week52Low={stock.week52Low}
            upperLimit={stock.upperLimit}
            lowerLimit={stock.lowerLimit}
          />
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container mx-auto px-4 py-6 mb-24">
        {/* 차트와 기술적 분석 영역 */}
        <div className="flex gap-6">
          <div className="flex-1">
            <StockChartPrice data={historicalData} />
          </div>

          {/* 기술적 분석 사이드바 */}
          <div className="w-118">
            <TechnicalAnalysis stock={stock} historicalData={historicalData} />
          </div>
        </div>

        {/* 하단 섹션들 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
          {/* 관련 뉴스 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              관련 뉴스
            </h3>
            <StockNews news={news} />
          </div>

          {/* 관련 회사 영역 */}
          <RelatedCompanies />

          {/* 재무제표 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              재무제표
            </h3>
            {financialData && <FinancialStatement data={financialData} />}
          </div>
        </div>
      </div>
    </div>
  );
}
