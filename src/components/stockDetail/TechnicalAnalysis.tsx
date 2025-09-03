import { useState } from "react";
import { TrendingUp, Activity, Target, Layers, FileText } from "lucide-react";

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

interface TechnicalAnalysisProps {
  stock: StockDetail;
  historicalData: HistoricalData[];
  analysis?: any; // /info/company/{code} 응답 전체 또는 필요한 섹션 포함 객체
}

type TabType = "summary" | "volatility" | "volume" | "overview";

export default function TechnicalAnalysis({
  stock: _stock,
  historicalData: _historicalData,
  analysis,
}: TechnicalAnalysisProps) {
  const [activeTab, setActiveTab] = useState<TabType>("summary");
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  // 간단 스켈레톤 컴포넌트
  const SkeletonText = ({ widthClass = "w-24" }: { widthClass?: string }) => (
    <div className={`h-4 rounded bg-gray-200 animate-pulse ${widthClass}`} />
  );

  // API 데이터 매핑 헬퍼
  const toNum = (v: any): number => {
    if (typeof v === "number") return v;
    if (typeof v === "string") {
      const n = Number(v.replace(/,/g, ""));
      return isNaN(n) ? 0 : n;
    }
    return 0;
  };

  const statusColor = (text?: string) => {
    if (!text) return "text-gray-600";
    if (/상승|매수|정배열/.test(text)) return "text-green-600";
    if (/하락|매도|과매도/.test(text)) return "text-red-600";
    return "text-blue-600";
  };

  // API 응답이 문자열이므로 직접 사용
  const mainAnalysisText = analysis?.main_analysis;
  const volatilityAnalysisText = analysis?.volatility_analysis;
  const volumeAnalysisText = analysis?.volume_analysis;
  const combinedAnalysisText = analysis?.combined_technical_analysis;

  // 기존 기술적 지표 데이터
  const mainData = analysis?.main_analysis_data;
  const volaData = analysis?.volatility_analysis_data;
  const volData = analysis?.volume_analysis_data;

  const isAnalysisLoading = !analysis;

  // 기술적 지표 값 (실제 데이터 사용)
  const rsi = mainData?.rsi?.value ?? 28.4;
  const dailyRange = volaData?.volatility?.value?.volatility_percent ?? 2.8;
  const avgVolatility =
    volaData?.volatility?.value?.avg_volatility_percent ?? 2.8;
  const currentVolume = toNum(volData?.volume?.value?.volume) || 15234567;
  const avgVolume = toNum(volData?.volume?.value?.avg_volume_20) || 12456789;
  const volumeRatio = (
    ((currentVolume - avgVolume) / (avgVolume || 1)) *
    100
  ).toFixed(1);
  const mfiValue =
    typeof volData?.mfi?.value === "number" ? volData.mfi.value : undefined;
  const obvValue = toNum(volData?.obv?.value?.obv);
  const obvMa20Value = toNum(volData?.obv?.value?.obv_ma20);

  const tabs = [
    { id: "summary", label: "주요 지표", icon: Target },
    { id: "volatility", label: "가격 변동성", icon: TrendingUp },
    { id: "volume", label: "거래량 분석", icon: Layers },
    { id: "overview", label: "종합 해석", icon: FileText },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "summary":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div
                className="relative bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
                onMouseEnter={() => setHoveredKey("summary_ma")}
                onMouseLeave={() => setHoveredKey(null)}
              >
                <div className="flex items-center mb-3">
                  <span className="text-sm font-medium text-gray-700">
                    이동평균선
                  </span>
                </div>
                <div
                  className={`text-lg font-bold ${statusColor(mainData?.moving_average?.arrangement?.status)}`}
                >
                  {isAnalysisLoading ? (
                    <SkeletonText widthClass="w-28" />
                  ) : (
                    (mainData?.moving_average?.arrangement?.status ??
                    "정보 없음")
                  )}
                </div>
                {hoveredKey === "summary_ma" && (
                  <div className="absolute z-50 pointer-events-none top-full left-0 right-0 mt-2 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg">
                    <div>
                      {mainData?.moving_average?.arrangement?.description ??
                        mainData?.moving_average?.price_vs_ma20?.description ??
                        "이동평균선 분석 정보"}
                    </div>
                    <div className="absolute bottom-full left-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
                  </div>
                )}
              </div>

              <div
                className="relative bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
                onMouseEnter={() => setHoveredKey("summary_stoch")}
                onMouseLeave={() => setHoveredKey(null)}
              >
                <div className="flex items-center mb-3">
                  <span className="text-sm font-medium text-gray-700">
                    스토캐스틱
                  </span>
                </div>
                <div
                  className={`text-lg font-bold ${statusColor(mainData?.stochastic?.status)}`}
                >
                  {isAnalysisLoading ? (
                    <SkeletonText widthClass="w-20" />
                  ) : (
                    (mainData?.stochastic?.status ?? "정보 없음")
                  )}
                </div>
                {hoveredKey === "summary_stoch" && (
                  <div className="absolute z-50 pointer-events-none top-full left-0 right-0 mt-2 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg">
                    <div>
                      {mainData?.stochastic?.analysis ?? "스토캐스틱 분석 정보"}
                    </div>
                    <div className="absolute bottom-full left-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
                  </div>
                )}
              </div>

              <div
                className="relative bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
                onMouseEnter={() => setHoveredKey("summary_rsi")}
                onMouseLeave={() => setHoveredKey(null)}
              >
                <div className="flex items-center mb-3">
                  <span className="text-sm font-medium text-gray-700">RSI</span>
                </div>
                <div
                  className={`text-lg font-bold ${statusColor(mainData?.rsi?.status)}`}
                >
                  {isAnalysisLoading ? (
                    <SkeletonText widthClass="w-16" />
                  ) : (
                    (mainData?.rsi?.status ?? "중립")
                  )}
                </div>
                {hoveredKey === "summary_rsi" && (
                  <div className="absolute z-50 pointer-events-none top-full left-0 right-0 mt-2 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg">
                    <div>RSI 값 {rsi}</div>
                    <div className="absolute bottom-full left-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
                  </div>
                )}
              </div>

              <div
                className="relative bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
                onMouseEnter={() => setHoveredKey("summary_total")}
                onMouseLeave={() => setHoveredKey(null)}
              >
                <div className="flex items-center mb-3">
                  <span className="text-sm font-medium text-gray-700">
                    종합 신호
                  </span>
                </div>
                <div
                  className={`text-lg font-bold ${statusColor(mainData?.macd?.status)}`}
                >
                  {isAnalysisLoading ? (
                    <SkeletonText widthClass="w-20" />
                  ) : (
                    (mainData?.macd?.status ?? "중립")
                  )}
                </div>
                {hoveredKey === "summary_total" && (
                  <div className="absolute z-50 pointer-events-none top-full left-0 right-0 mt-2 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg">
                    <div>{mainData?.macd?.analysis ?? "종합 신호 분석"}</div>
                    <div className="absolute bottom-full left-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center mb-2">
                <Activity className="w-4 h-4 text-blue-600 mr-2" />
                <span className="font-medium text-blue-900">주요지표 분석</span>
              </div>
              {isAnalysisLoading ? (
                <div className="space-y-2">
                  <SkeletonText widthClass="w-5/6" />
                  <SkeletonText widthClass="w-3/6" />
                </div>
              ) : (
                <p className="text-sm text-blue-800 leading-relaxed">
                  {mainAnalysisText ?? "분석 정보를 불러오고 있습니다."}
                </p>
              )}
            </div>
          </div>
        );

      case "volatility":
        return (
          <div className="space-y-4">
            {/* 일일 변동폭 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 일일 변동폭 */}
              <div
                className="relative bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
                onMouseEnter={() => setHoveredKey("vol_daily")}
                onMouseLeave={() => setHoveredKey(null)}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-700">
                    일일 변동폭
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    {dailyRange}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(dailyRange, 100)}%` }}
                  ></div>
                </div>
                {hoveredKey === "vol_daily" && (
                  <div className="absolute z-50 pointer-events-none top-full left-0 right-0 mt-2 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg">
                    <div>일일 변동성 관련 참고 값</div>
                    <div className="absolute bottom-full left-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
                  </div>
                )}
              </div>

              {/* 평균 변동성 */}
              <div
                className="relative bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
                onMouseEnter={() => setHoveredKey("vol_avg")}
                onMouseLeave={() => setHoveredKey(null)}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-700">
                    평균 변동성
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    {avgVolatility}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(avgVolatility, 100)}%` }}
                  ></div>
                </div>
                {hoveredKey === "vol_avg" && (
                  <div className="absolute z-50 pointer-events-none top-full left-0 right-0 mt-2 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg">
                    <div>RVI: - | ATR: -</div>
                    <div className="absolute bottom-full left-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
                  </div>
                )}
              </div>
            </div>

            {/* 보조 지표 (ATR / RVI 상태) */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className="relative bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
                onMouseEnter={() => setHoveredKey("vol_atr")}
                onMouseLeave={() => setHoveredKey(null)}
              >
                <div className="text-sm font-medium text-gray-700 mb-2">
                  ATR
                </div>
                <div
                  className={`text-base font-semibold ${statusColor(volaData?.atr?.status)}`}
                >
                  {isAnalysisLoading ? (
                    <SkeletonText widthClass="w-16" />
                  ) : (
                    (volaData?.atr?.status ?? "정보 없음")
                  )}
                </div>
                {hoveredKey === "vol_atr" && (
                  <div className="absolute z-50 pointer-events-none top-full left-0 right-0 mt-2 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg">
                    <div>{volaData?.atr?.analysis ?? "ATR 분석 정보"}</div>
                    <div className="absolute bottom-full left-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
                  </div>
                )}
              </div>

              <div
                className="relative bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
                onMouseEnter={() => setHoveredKey("vol_rvi")}
                onMouseLeave={() => setHoveredKey(null)}
              >
                <div className="text-sm font-medium text-gray-700 mb-2">
                  RVI
                </div>
                <div
                  className={`text-base font-semibold ${statusColor(volaData?.rvi?.status)}`}
                >
                  {isAnalysisLoading ? (
                    <SkeletonText widthClass="w-16" />
                  ) : (
                    (volaData?.rvi?.status ?? "정보 없음")
                  )}
                </div>
                {hoveredKey === "vol_rvi" && (
                  <div className="absolute z-50 pointer-events-none top-full left-0 right-0 mt-2 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg">
                    <div>{volaData?.rvi?.analysis ?? "RVI 분석 정보"}</div>
                    <div className="absolute bottom-full left-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
                  </div>
                )}
              </div>
            </div>

            {/* 변동성 분석 요약 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center mb-2">
                <Activity className="w-4 h-4 text-blue-600 mr-2" />
                <span className="font-medium text-blue-900">변동성 분석</span>
              </div>
              {isAnalysisLoading ? (
                <div className="space-y-2">
                  <SkeletonText widthClass="w-5/6" />
                  <SkeletonText widthClass="w-4/6" />
                </div>
              ) : (
                <p className="text-sm text-blue-800 leading-relaxed">
                  {volatilityAnalysisText ??
                    "변동성 분석 정보를 불러오고 있습니다."}
                </p>
              )}
            </div>
          </div>
        );

      case "volume":
        return (
          <div className="space-y-4">
            {/* 현재 거래량 */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-700">
                  현재 거래량
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {currentVolume.toLocaleString()}주
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min((currentVolume / avgVolume) * 100, 100)}%`,
                  }}
                ></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    평균 거래량
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {avgVolume.toLocaleString()}주
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                  <div className="text-sm font-medium text-green-700 mb-1">
                    거래량 비율
                  </div>
                  <div className="text-lg font-bold text-green-600">
                    {volumeRatio}%
                  </div>
                </div>
              </div>
            </div>

            {/* MFI / OBV */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className="relative bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
                onMouseEnter={() => setHoveredKey("vol_mfi_card")}
                onMouseLeave={() => setHoveredKey(null)}
              >
                <div className="text-sm font-medium text-gray-700 mb-1">
                  MFI
                </div>
                <div
                  className={`text-lg font-bold ${statusColor(volData?.mfi?.status)}`}
                >
                  {isAnalysisLoading ? (
                    <SkeletonText widthClass="w-16" />
                  ) : (
                    (volData?.mfi?.status ?? "정보 없음")
                  )}
                </div>
                {hoveredKey === "vol_mfi_card" && (
                  <div className="absolute z-50 pointer-events-none top-full left-0 right-0 mt-2 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg">
                    <div>
                      {typeof mfiValue === "number"
                        ? `값 ${mfiValue.toFixed(2)}`
                        : ""}
                    </div>
                    <div>{volData?.mfi?.analysis ?? "MFI 분석 정보"}</div>
                    <div className="absolute bottom-full left-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
                  </div>
                )}
              </div>

              <div
                className="relative bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
                onMouseEnter={() => setHoveredKey("vol_obv_card")}
                onMouseLeave={() => setHoveredKey(null)}
              >
                <div className="text-sm font-medium text-gray-700 mb-1">
                  OBV
                </div>
                <div
                  className={`text-lg font-bold ${statusColor(volData?.obv?.status)}`}
                >
                  {isAnalysisLoading ? (
                    <SkeletonText widthClass="w-16" />
                  ) : (
                    (volData?.obv?.status ?? "정보 없음")
                  )}
                </div>
                {hoveredKey === "vol_obv_card" && (
                  <div className="absolute z-50 pointer-events-none top-full left-0 right-0 mt-2 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg">
                    <div>
                      {obvValue ? obvValue.toLocaleString() : "-"} / MA20{" "}
                      {obvMa20Value ? obvMa20Value.toLocaleString() : "-"}
                    </div>
                    <div>{volData?.obv?.analysis ?? "OBV 분석 정보"}</div>
                    <div className="absolute bottom-full left-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
                  </div>
                )}
              </div>
            </div>

            {/* 거래량 분석 */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span className="font-medium text-blue-900">거래량 분석</span>
              </div>
              {isAnalysisLoading ? (
                <div className="space-y-2">
                  <SkeletonText widthClass="w-5/6" />
                  <SkeletonText widthClass="w-2/6" />
                </div>
              ) : (
                <p className="text-sm text-blue-800 leading-relaxed">
                  {volumeAnalysisText ??
                    `평균 대비 ${volumeRatio}% 수준의 거래량입니다.`}
                </p>
              )}
            </div>
          </div>
        );

      case "overview":
        return (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
              <div className="flex items-center mb-2">
                <FileText className="w-4 h-4 text-green-600 mr-2" />
                <span className="font-medium text-green-900">
                  기술적 분석 종합 해석
                </span>
              </div>
              {isAnalysisLoading ? (
                <div className="space-y-2">
                  <SkeletonText widthClass="w-5/6" />
                  <SkeletonText widthClass="w-4/6" />
                </div>
              ) : (
                <p className="text-sm text-green-800 leading-relaxed">
                  {combinedAnalysisText ??
                    "종합 분석 정보를 불러오고 있습니다."}
                </p>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden h-[650px] flex flex-col">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-slate-50 to-gray-50 px-6 py-2 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">기술적 분석</h3>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="px-6 py-2 border-b border-gray-100 flex-shrink-0">
        <div className="flex space-x-1 justify-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex flex-col items-center mx-2 my-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4 mb-1" />
                <span className="text-center leading-tight">
                  {tab.label.split(" ").map((word, index) => (
                    <span key={index}>
                      {word}
                      {index < tab.label.split(" ").length - 1 && <br />}
                    </span>
                  ))}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 탭 콘텐츠 */}
      <div className="p-6 flex-1 bg-gray-50/30 overflow-y-auto">
        {renderTabContent()}
      </div>
    </div>
  );
}
