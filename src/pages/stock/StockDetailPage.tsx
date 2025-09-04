import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import StockHeader from "@/components/stockDetail/StockHeader";

import StockNews from "@/components/stockDetail/StockNews";
import TechnicalAnalysis from "@/components/stockDetail/TechnicalAnalysis";
import FinancialStatement from "@/components/stockDetail/FinancialStatement";
// Loading 컴포넌트 대신 심플 스켈레톤을 사용합니다
import {
  getStockInfoByCode,
  getCompanyInfoByCode,
  getStockChart,
  getTotalAnalysis,
} from "@/api/stock";
import { getNewsByCompany } from "@/api/news";

import StockChartPrice from "@/components/stockDetail/chart";
import RelatedCompanies from "@/components/stockDetail/RelatedCompanies";
import Pagination from "@/components/news/Pagination";

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

interface NewsListItem {
  id: string;
  title: string;
  source: string;
  date: string;
  sentiment: "positive" | "negative" | "neutral";
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
  const [news, setNews] = useState<NewsListItem[]>([]);
  const [financialData, setFinancialData] = useState<FinancialData | null>(
    null
  );
  const [companyAnalysis, setCompanyAnalysis] = useState<any | null>(null);
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(true);
  // const [techSummary, setTechSummary] = useState<any | null>(null);

  // 기술적 분석을 로딩 중에도 렌더링하기 위한 기본 스톡 값
  const placeholderStock: StockDetail = {
    id: 0,
    name: "",
    code: code ?? "",
    price: 0,
    change: 0,
    changeAmount: 0,
    score: 0,
    sentiment: "neutral",
    newsCount: 0,
    prediction: { targetPrice: 0, confidence: 0, recommendation: "hold" },
  };

  // 섹션별 로딩 상태
  const [isHeaderLoading, setIsHeaderLoading] = useState(true);
  const [isChartLoading, setIsChartLoading] = useState(true);
  const [isTechnicalLoading, setIsTechnicalLoading] = useState(true);
  const isNewsLoading = news.length === 0;
  const isFinancialLoading = financialData == null;

  // 뉴스 페이지네이션 (5개씩)
  const NEWS_PAGE_SIZE = 5;
  const [newsPage, setNewsPage] = useState(1);
  const totalNewsPages = Math.max(1, Math.ceil(news.length / NEWS_PAGE_SIZE));
  const pagedNews = useMemo(() => {
    const start = (newsPage - 1) * NEWS_PAGE_SIZE;
    return news.slice(start, start + NEWS_PAGE_SIZE);
  }, [news, newsPage]);
  useEffect(() => {
    setNewsPage(1);
  }, [news]);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        if (!code) return;

        // 1단계: Stock Header 데이터 로딩 (병렬 처리)
        console.log("1단계: Stock Header 로딩 시작");
        const [priceInfo, companyInfo, chartRes] = await Promise.all([
          getStockInfoByCode(code),
          getCompanyInfoByCode(code),
          getStockChart(code, "D", 7), // 차트도 병렬로 로딩 (7일로 더 줄임)
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

        if (!cancelled) {
          setStock(mapped);
          setIsHeaderLoading(false);
          console.log("1단계: Stock Header 로딩 완료");
        }

        // 2단계: 차트 데이터 처리 (이미 병렬로 로딩됨)
        console.log("2단계: 차트 데이터 처리 시작");
        const chartData: HistoricalData[] = chartRes.candles.map((c) => ({
          date: c.date,
          open: c.open,
          high: c.high,
          low: c.low,
          close: c.close,
          volume: c.volume,
        }));

        if (!cancelled) {
          setHistoricalData(chartData);
          setIsChartLoading(false);
          console.log("2단계: 차트 데이터 처리 완료");
        }

        // 3단계: 기술적 분석 데이터 로딩
        console.log("3단계: 기술적 분석 데이터 로딩 시작");
        if (!cancelled && companyInfo) {
          const initialAnalysis = {
            company_analysis: "재무 분석 정보를 불러오고 있습니다.",
            company_data: companyInfo.company_analysis ?? companyInfo,
            main_analysis: "분석 정보를 불러오고 있습니다.",
            volume_analysis: "분석 정보를 불러오고 있습니다.",
            volatility_analysis: "분석 정보를 불러오고 있습니다.",
            combined_technical_analysis: "분석 정보를 불러오고 있습니다.",
            fin_total_analysis: "분석 정보를 불러오고 있습니다.",
            // 기존 기술적 지표 데이터도 포함
            main_analysis_data: companyInfo.main_analysis,
            volatility_analysis_data: companyInfo.volatility_analysis,
            volume_analysis_data: companyInfo.volume_analysis,
          };
          setCompanyAnalysis(initialAnalysis);
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
          setIsTechnicalLoading(false);
          console.log("3단계: 기술적 분석 데이터 로딩 완료");
        }

        // 4단계: 뉴스 데이터 로딩 (백그라운드, 병렬 처리)
        console.log("4단계: 뉴스 데이터 로딩 시작");
        const loadNews = async () => {
          try {
            const companyNews = await getNewsByCompany(code, 10);
            const mappedNews: NewsListItem[] = companyNews.map((n) => ({
              id: n.id,
              title: n.title,
              source: n.press,
              date: n.published_at,
              sentiment: (n.impact as any) ?? "neutral",
            }));

            if (!cancelled) {
              setNews(mappedNews);
              console.log("4단계: 뉴스 데이터 로딩 완료");
            }
          } catch (error) {
            console.error("뉴스 데이터 로딩 실패:", error);
          }
        };

        // 뉴스를 백그라운드에서 로딩
        loadNews();

        // 5단계: LLM 종합 분석 요청 (비동기로 별도 처리)
        const loadAnalysis = async () => {
          try {
            console.log("5단계: LLM 분석 로딩 시작");
            const totalAnalysis = await getTotalAnalysis(code);
            console.log("Total Analysis Response:", totalAnalysis);

            if (!cancelled && companyInfo) {
              const mergedAnalysis = {
                ...totalAnalysis,
                company_analysis: totalAnalysis.company_analysis, // API에서 받은 재무 분석 텍스트
                company_data: companyInfo.company_analysis ?? companyInfo, // 기업 재무 데이터
                main_analysis: totalAnalysis.main_analysis,
                volume_analysis: totalAnalysis.volume_analysis,
                volatility_analysis: totalAnalysis.volatility_analysis,
                combined_technical_analysis:
                  totalAnalysis.combined_technical_analysis,
                fin_total_analysis: totalAnalysis.fin_total_analysis,
                // 기존 기술적 지표 데이터도 포함
                main_analysis_data: companyInfo.main_analysis,
                volatility_analysis_data: companyInfo.volatility_analysis,
                volume_analysis_data: companyInfo.volume_analysis,
              };
              setCompanyAnalysis(mergedAnalysis);
              console.log("5단계: LLM 분석 로딩 완료");
            }
          } catch (error) {
            console.error("Total Analysis API Error:", error);
            // API 실패 시에도 기본 분석 데이터는 유지
          } finally {
            if (!cancelled) {
              setIsAnalysisLoading(false);
            }
          }
        };

        // LLM 분석을 별도로 실행
        loadAnalysis();
      } catch {
        // 실패 시에도 목데이터로 모든 섹션 채워서 UI가 비지 않도록 처리
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
          setIsHeaderLoading(false);

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
          setHistoricalData(mockHistoricalData);
          setIsChartLoading(false);

          const mockNews: NewsListItem[] = Array.from(
            { length: 5 },
            (_, i) => ({
              id: String(i + 1),
              title: `${fallback.name || code} 관련 뉴스 ${i + 1}`,
              source: "한국경제",
              date: new Date(Date.now() - i * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0],
              sentiment: ["positive", "negative", "neutral"][
                Math.floor(Math.random() * 3)
              ] as any,
            })
          );
          setNews(mockNews);

          const mockFinancialData: FinancialData = {
            revenue: 279600000000000,
            netIncome: 15400000000000,
            debtRatio: 23.4,
            roe: 15.8,
            per: 12.3,
            pbr: 1.2,
            dividendYield: 2.1,
          };
          setFinancialData(mockFinancialData);
          setIsTechnicalLoading(false);
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
      <div className="container mx-auto px-4 py-6">
        {/* 차트와 기술적 분석 영역 */}
        <div className="flex gap-6">
          <div className="flex-1 min-w-0">
            <StockChartPrice
              code={stock?.code ?? code ?? ""}
              data={historicalData}
              isLoading={isChartLoading}
            />
          </div>

          {/* 기술적 분석 사이드바 */}
          <div className="w-[472px] flex-shrink-0">
            <TechnicalAnalysis
              stock={stock ?? placeholderStock}
              historicalData={historicalData}
              analysis={companyAnalysis}
              isAnalysisLoading={isAnalysisLoading}
              isTechnicalLoading={isTechnicalLoading}
            />
          </div>
        </div>

        {/* 하단 섹션들 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
          {/* 관련 뉴스 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              관련 뉴스
            </h3>
            {isNewsLoading ? (
              <div className="space-y-4">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-16 h-16 rounded bg-gray-200 animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
                      <div className="h-3 w-2/6 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <StockNews news={pagedNews} />
                {totalNewsPages > 1 && (
                  <Pagination
                    currentPage={newsPage}
                    totalPages={totalNewsPages}
                    onPageChange={(p) => setNewsPage(p)}
                  />
                )}
              </>
            )}
          </div>

          {/* 관련 회사 영역 */}
          <RelatedCompanies />

          {/* 재무제표 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              재무제표
            </h3>
            {isFinancialLoading ? (
              <div className="space-y-4">
                <div className="h-4 w-3/6 bg-gray-200 rounded animate-pulse" />
                <div className="grid grid-cols-2 gap-4">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="border border-gray-100 rounded-lg p-4"
                    >
                      <div className="h-3 w-2/6 bg-gray-200 rounded mb-2 animate-pulse" />
                      <div className="h-5 w-3/6 bg-gray-200 rounded mb-1 animate-pulse" />
                      <div className="h-3 w-1/6 bg-gray-200 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <FinancialStatement
                data={financialData}
                analysis={companyAnalysis}
                isAnalysisLoading={isAnalysisLoading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
