import { useState, useEffect, useMemo, useCallback } from "react";
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
import BotButton from "@/components/chat/BotButton";

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
  const [isChartLoading, setIsChartLoading] = useState(true);
  const [isTechnicalLoading, setIsTechnicalLoading] = useState(true);

  // 로딩 상태 최적화
  const loadingStates = useMemo(
    () => ({
      isNewsLoading: news.length === 0,
      isFinancialLoading: financialData == null,
      isChartLoading,
      isTechnicalLoading,
      isAnalysisLoading,
    }),
    [
      news.length,
      financialData,
      isChartLoading,
      isTechnicalLoading,
      isAnalysisLoading,
    ]
  );

  // 뉴스 페이지네이션 최적화
  const NEWS_PAGE_SIZE = 5;
  const [newsPage, setNewsPage] = useState(1);

  const { totalNewsPages, pagedNews } = useMemo(() => {
    const totalPages = Math.max(1, Math.ceil(news.length / NEWS_PAGE_SIZE));
    const start = (newsPage - 1) * NEWS_PAGE_SIZE;
    const paged = news.slice(start, start + NEWS_PAGE_SIZE);
    return { totalNewsPages: totalPages, pagedNews: paged };
  }, [news, newsPage]);

  // 뉴스 데이터 변경 시 페이지 리셋
  useEffect(() => {
    setNewsPage(1);
  }, [news]);

  // 뉴스 페이지네이션 핸들러 최적화
  const handleNewsPageChange = useCallback((page: number) => {
    setNewsPage(page);
  }, []);

  // 데이터 변환 함수들을 메모이제이션
  const transformStockData = useCallback(
    (priceInfo: any, code: string): StockDetail => ({
      id: 0,
      name: typeof priceInfo["기업명"] === "string" ? priceInfo["기업명"] : "",
      code,
      price: typeof priceInfo["현재가"] === "number" ? priceInfo["현재가"] : 0,
      change: typeof priceInfo["등락"] === "number" ? priceInfo["등락"] : 0,
      changeAmount:
        typeof priceInfo["전일대비"] === "number" ? priceInfo["전일대비"] : 0,
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
          ? { price: priceInfo["52주최고"], date: priceInfo["최고일"] ?? "" }
          : undefined,
      week52Low:
        typeof priceInfo["52주최저"] === "number"
          ? { price: priceInfo["52주최저"], date: priceInfo["최저일"] ?? "" }
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
    }),
    []
  );

  const transformChartData = useCallback(
    (chartRes: any): HistoricalData[] =>
      chartRes.candles.map((c: any) => ({
        date: c.date,
        open: c.open,
        high: c.high,
        low: c.low,
        close: c.close,
        volume: c.volume,
      })),
    []
  );

  const transformNewsData = useCallback(
    (companyNews: any[]): NewsListItem[] =>
      companyNews.map((n) => ({
        id: n.id,
        title: n.title,
        source: n.press,
        date: n.published_at,
        sentiment: (n.impact as any) ?? "neutral",
      })),
    []
  );

  // 메인 데이터 로딩 useEffect
  useEffect(() => {
    if (!code) return;

    let cancelled = false;
    const abortController = new AbortController();

    const loadData = async () => {
      try {
        // 1단계: 핵심 데이터 병렬 로딩 (우선순위 높음)
        const [priceInfo, companyInfo, chartRes] = await Promise.all([
          getStockInfoByCode(code),
          getCompanyInfoByCode(code),
          getStockChart(code, "D", 7),
        ]);

        if (cancelled) return;

        // 즉시 UI 업데이트
        const stockData = transformStockData(priceInfo, code);
        const chartData = transformChartData(chartRes);

        setStock(stockData);
        setHistoricalData(chartData);
        setIsChartLoading(false);

        // 2단계: 기술적 분석 데이터 처리 (동기)
        if (companyInfo) {
          const initialAnalysis = {
            company_analysis: "재무 분석 정보를 불러오고 있습니다.",
            company_data: companyInfo.company_analysis ?? companyInfo,
            main_analysis: "분석 정보를 불러오고 있습니다.",
            volume_analysis: "분석 정보를 불러오고 있습니다.",
            volatility_analysis: "분석 정보를 불러오고 있습니다.",
            combined_technical_analysis: "분석 정보를 불러오고 있습니다.",
            fin_total_analysis: "분석 정보를 불러오고 있습니다.",
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
        }

        // 3단계: 백그라운드 데이터 로딩 (우선순위 낮음)
        const backgroundTasks = [
          // 뉴스 로딩
          getNewsByCompany(code, 10)
            .then((newsData) => {
              if (!cancelled) {
                setNews(transformNewsData(newsData));
              }
            })
            .catch((error) => console.error("뉴스 로딩 실패:", error)),

          // LLM 분석 로딩
          getTotalAnalysis(code)
            .then((totalAnalysis) => {
              if (!cancelled && companyInfo) {
                const mergedAnalysis = {
                  ...totalAnalysis,
                  company_analysis: totalAnalysis.company_analysis,
                  company_data: companyInfo.company_analysis ?? companyInfo,
                  main_analysis: totalAnalysis.main_analysis,
                  volume_analysis: totalAnalysis.volume_analysis,
                  volatility_analysis: totalAnalysis.volatility_analysis,
                  combined_technical_analysis:
                    totalAnalysis.combined_technical_analysis,
                  fin_total_analysis: totalAnalysis.fin_total_analysis,
                  main_analysis_data: companyInfo.main_analysis,
                  volatility_analysis_data: companyInfo.volatility_analysis,
                  volume_analysis_data: companyInfo.volume_analysis,
                };
                setCompanyAnalysis(mergedAnalysis);
                setIsAnalysisLoading(false);
              }
            })
            .catch((error) => {
              console.error("LLM 분석 로딩 실패:", error);
              if (!cancelled) {
                setIsAnalysisLoading(false);
              }
            }),
        ];

        // 백그라운드 작업들을 병렬로 실행하되 결과를 기다리지 않음
        Promise.allSettled(backgroundTasks);
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
        if (!cancelled) {
          // 폴백 데이터 설정
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
          };
          setStock(fallback);
          setIsChartLoading(false);
          setIsTechnicalLoading(false);
          setIsAnalysisLoading(false);
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
      abortController.abort();
    };
  }, [code, transformStockData, transformChartData, transformNewsData]);

  // 메모이제이션된 컴포넌트 props
  const stockHeaderProps = useMemo(
    () => ({
      name: stock?.name ?? "",
      code: stock?.code ?? code ?? "",
      isFavorite,
      onToggleFavorite: () => setIsFavorite(!isFavorite),
      currentPrice: stock?.price ?? 0,
      changeAmount: stock?.changeAmount ?? 0,
      changePercent: stock?.change ?? 0,
      previousVolume: stock?.previousVolume,
      currentVolume: stock?.currentVolume,
      tradingAmount: stock?.tradingAmount,
      week52High: stock?.week52High,
      week52Low: stock?.week52Low,
      upperLimit: stock?.upperLimit,
      lowerLimit: stock?.lowerLimit,
    }),
    [stock, code, isFavorite]
  );

  const chartProps = useMemo(
    () => ({
      code: stock?.code ?? code ?? "",
      data: historicalData,
      isLoading: loadingStates.isChartLoading,
    }),
    [stock?.code, code, historicalData, loadingStates.isChartLoading]
  );

  const technicalAnalysisProps = useMemo(
    () => ({
      stock: stock ?? placeholderStock,
      historicalData,
      analysis: companyAnalysis,
      isAnalysisLoading: loadingStates.isAnalysisLoading,
      isTechnicalLoading: loadingStates.isTechnicalLoading,
    }),
    [
      stock,
      placeholderStock,
      historicalData,
      companyAnalysis,
      loadingStates.isAnalysisLoading,
      loadingStates.isTechnicalLoading,
    ]
  );

  const financialStatementProps = useMemo(
    () => ({
      data: financialData || {
        revenue: 0,
        netIncome: 0,
        debtRatio: 0,
        roe: 0,
        per: 0,
        pbr: 0,
        dividendYield: 0,
      },
      analysis: companyAnalysis,
      isAnalysisLoading: loadingStates.isAnalysisLoading,
    }),
    [financialData, companyAnalysis, loadingStates.isAnalysisLoading]
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <div className="bg-white shadow-sm ">
        <div className="container mx-auto px-4 py-4">
          <StockHeader {...stockHeaderProps} />
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container mx-auto px-4 py-6">
        {/* 차트와 기술적 분석 영역 */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-w-0 order-1 lg:order-none">
            <StockChartPrice {...chartProps} />
          </div>

          {/* 기술적 분석 사이드바 */}
          <div className="w-full lg:w-[472px] flex-shrink-0 order-0 lg:order-none">
            <TechnicalAnalysis {...technicalAnalysisProps} />
          </div>
        </div>

        {/* 하단 섹션들 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
          {/* 관련 뉴스 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              관련 뉴스
            </h3>
            {loadingStates.isNewsLoading ? (
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
                    onPageChange={handleNewsPageChange}
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
            {loadingStates.isFinancialLoading ? (
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
              <FinancialStatement {...financialStatementProps} />
            )}
          </div>
        </div>
      </div>
      <BotButton />
    </div>
  );
}
