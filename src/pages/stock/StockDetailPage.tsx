import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StockHeader from "@/components/stockDetail/StockHeader";

import StockNews from "@/components/stockDetail/StockNews";
import TechnicalAnalysis from "@/components/stockDetail/TechnicalAnalysis";
import FinancialStatement from "@/components/stockDetail/FinancialStatement";
// Loading 컴포넌트 대신 심플 스켈레톤을 사용합니다
import { getStockInfoByCode } from "@/api/stock";

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
    let cancelled = false;
    const run = async () => {
      try {
        if (!code) return;
        const data = await getStockInfoByCode(code);

        const mapped: StockDetail = {
          id: 0,
          name: typeof data["기업명"] === "string" ? data["기업명"] : "",
          code,
          price: typeof data["현재가"] === "number" ? data["현재가"] : 0,
          change: typeof data["등락"] === "number" ? data["등락"] : 0,
          changeAmount:
            typeof data["전일대비"] === "number" ? data["전일대비"] : 0,
          score: 0,
          sentiment: "neutral",
          newsCount: 0,
          previousVolume:
            typeof data["전일거래량"] === "number"
              ? data["전일거래량"]
              : undefined,
          currentVolume:
            typeof data["거래량"] === "number" ? data["거래량"] : undefined,
          tradingAmount:
            typeof data["거래대금"] === "number"
              ? data["거래대금"] * 100_000_000
              : undefined,
          week52High:
            typeof data["52주최고"] === "number"
              ? { price: data["52주최고"], date: data["최고일"] ?? "" }
              : undefined,
          week52Low:
            typeof data["52주최저"] === "number"
              ? { price: data["52주최저"], date: data["최저일"] ?? "" }
              : undefined,
          upperLimit:
            typeof data["상한가"] === "number" ? data["상한가"] : undefined,
          lowerLimit:
            typeof data["하한가"] === "number" ? data["하한가"] : undefined,
          prediction: { targetPrice: 0, confidence: 0, recommendation: "hold" },
        };

        if (!cancelled) setStock(mapped);

        // 아래는 차트/뉴스/재무는 당장 API 스펙이 없으므로 기존과 동일하게 더미 구성
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
          title: `${mapped.name || code} 관련 뉴스 ${i + 1}`,
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

        if (!cancelled) {
          setHistoricalData(mockHistoricalData);
          setNews(mockNews);
          setFinancialData(mockFinancialData);
        }
      } catch {
        // 실패 시 기존 목데이터로 유지 (아래와 동일)
        if (!cancelled) {
          const fallback: StockDetail = {
            id: 1,
            name: "",
            code: code || "",
            price: 0,
            change: 0,
            changeAmount: 0,
            score: 0,
            sentiment: "neutral",
            newsCount: 0,
            prediction: {
              targetPrice: 0,
              confidence: 0,
              recommendation: "hold",
            },
          } as StockDetail;
          setStock(fallback);
        }
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [code]);

  // 항상 페이지를 렌더링하고, 헤더 텍스트 스켈레톤은 StockHeader 내부에서 처리

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <div className="bg-white shadow-sm ">
        <div className="container mx-auto px-4 py-4">
          <StockHeader
            name={stock?.name ?? ""}
            code={stock?.code ?? code ?? ""}
            isFavorite={isFavorite}
            onToggleFavorite={() => setIsFavorite(!isFavorite)}
            currentPrice={stock?.price ?? 0}
            changeAmount={stock?.changeAmount ?? 0}
            changePercent={stock?.change ?? 0}
            previousVolume={stock?.previousVolume}
            currentVolume={stock?.currentVolume}
            tradingAmount={stock?.tradingAmount}
            week52High={stock?.week52High}
            week52Low={stock?.week52Low}
            upperLimit={stock?.upperLimit}
            lowerLimit={stock?.lowerLimit}
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
            {stock ? (
              <TechnicalAnalysis
                stock={stock}
                historicalData={historicalData}
              />
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-[650px]">
                <div className="w-full h-full bg-gray-100 rounded animate-pulse" />
              </div>
            )}
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
