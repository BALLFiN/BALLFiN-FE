import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StockHeader from "@/components/stockDetail/StockHeader";

import StockNews from "@/components/stockDetail/StockNews";
import TechnicalAnalysis from "@/components/stockDetail/TechnicalAnalysis";
import FinancialStatement from "@/components/stockDetail/FinancialStatement";
// Loading 컴포넌트 대신 심플 스켈레톤을 사용합니다
import { getStockInfoByCode, getCompanyInfoByCode } from "@/api/stock";

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
  const [companyAnalysis, setCompanyAnalysis] = useState<any | null>(null);
  const [techSummary, setTechSummary] = useState<any | null>(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        if (!code) return;
        const [priceInfo, companyInfo] = await Promise.all([
          getStockInfoByCode(code),
          getCompanyInfoByCode(code),
        ]);

        const mapped: StockDetail = {
          id: 0,
          name:
            typeof priceInfo["기업명"] === "string" ? priceInfo["기업명"] : "",
          code,
          price:
            typeof priceInfo["현재가"] === "number" ? priceInfo["현재가"] : 0,
          change: typeof priceInfo["등락"] === "number" ? priceInfo["등락"] : 0,
          changeAmount:
            typeof priceInfo["전일대비"] === "number"
              ? priceInfo["전일대비"]
              : 0,
          score: 0,
          sentiment: "neutral",
          newsCount: 0,
          previousVolume:
            typeof priceInfo["전일거래량"] === "number"
              ? priceInfo["전일거래량"]
              : undefined,
          currentVolume:
            typeof priceInfo["거래량"] === "number"
              ? priceInfo["거래량"]
              : undefined,
          tradingAmount:
            typeof priceInfo["거래대금"] === "number"
              ? priceInfo["거래대금"] * 100_000_000
              : undefined,
          week52High:
            typeof priceInfo["52주최고"] === "number"
              ? {
                  price: priceInfo["52주최고"],
                  date: priceInfo["최고일"] ?? "",
                }
              : undefined,
          week52Low:
            typeof priceInfo["52주최저"] === "number"
              ? {
                  price: priceInfo["52주최저"],
                  date: priceInfo["최저일"] ?? "",
                }
              : undefined,
          upperLimit:
            typeof priceInfo["상한가"] === "number"
              ? priceInfo["상한가"]
              : undefined,
          lowerLimit:
            typeof priceInfo["하한가"] === "number"
              ? priceInfo["하한가"]
              : undefined,
          prediction: { targetPrice: 0, confidence: 0, recommendation: "hold" },
        };

        if (!cancelled) setStock(mapped);

        // 기술적/재무 데이터 매핑
        if (!cancelled && companyInfo) {
          setTechSummary(companyInfo.main_analysis ?? null);
          setCompanyAnalysis(companyInfo);
          setFinancialData({
            revenue:
              (companyInfo.company_analysis?.["매출액"] ?? 0) * 1_000_000_000,
            netIncome:
              (companyInfo.company_analysis?.["순이익"] ?? 0) * 1_000_000_000,
            debtRatio: companyInfo.company_analysis?.["부채비율"] ?? 0,
            roe: companyInfo.company_analysis?.ROE ?? 0,
            per: companyInfo.company_analysis?.PER ?? 0,
            pbr: companyInfo.company_analysis?.PBR ?? 0,
            dividendYield: 0,
          });
        }

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
          // financialData는 company API에서 세팅됨 (실패 시에만 목데이터 유지)
          if (!financialData) setFinancialData(mockFinancialData);
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
            {stock && (
              <TechnicalAnalysis
                stock={stock}
                historicalData={historicalData}
                analysis={companyAnalysis}
              />
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
            {financialData && (
              <FinancialStatement
                data={financialData}
                analysis={companyAnalysis}
                companyName={stock?.name}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
