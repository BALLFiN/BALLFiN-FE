import { useState } from "react";
import { TrendingUp, BarChart3, Activity, Target, Layers } from "lucide-react";

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

type TabType = "summary" | "pattern" | "volatility" | "volume";

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

  const main = analysis?.main_analysis;
  const vola = analysis?.volatility_analysis;
  const vol = analysis?.volume_analysis;

  const isAnalysisLoading = !analysis;

  // 기술적 지표 값 (없으면 기본값)
  const rsi = main?.rsi?.value ?? 28.4;
  const dailyRange = vola?.volatility?.value?.volatility_percent ?? 2.8;
  const avgVolatility = vola?.volatility?.value?.avg_volatility_percent ?? 2.8;
  const currentVolume = toNum(vol?.volume?.value?.volume) || 15234567;
  const avgVolume = toNum(vol?.volume?.value?.avg_volume_20) || 12456789;
  const volumeRatio = (
    ((currentVolume - avgVolume) / (avgVolume || 1)) *
    100
  ).toFixed(1);
  const mfiValue =
    typeof vol?.mfi?.value === "number" ? vol.mfi.value : undefined;
  const obvValue = toNum(vol?.obv?.value?.obv);
  const obvMa20Value = toNum(vol?.obv?.value?.obv_ma20);

  const tabs = [
    { id: "summary", label: "주요 지표", icon: Target },
    { id: "pattern", label: "차트 패턴", icon: BarChart3 },
    { id: "volatility", label: "가격 변동성", icon: TrendingUp },
    { id: "volume", label: "거래량 분석", icon: Layers },
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
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium text-gray-700">
                    이동평균선
                  </span>
                </div>
                <div
                  className={`text-lg font-bold ${statusColor(main?.moving_average?.arrangement?.status)}`}
                >
                  {isAnalysisLoading ? (
                    <SkeletonText widthClass="w-28" />
                  ) : (
                    (main?.moving_average?.arrangement?.status ?? "정보 없음")
                  )}
                </div>
                {hoveredKey === "summary_ma" && (
                  <div className="absolute z-50 pointer-events-none top-full left-0 right-0 mt-2 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg">
                    <div>
                      {main?.moving_average?.arrangement?.description ??
                        main?.moving_average?.price_vs_ma20?.description ??
                        ""}
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
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium text-gray-700">
                    스토캐스틱
                  </span>
                </div>
                <div
                  className={`text-lg font-bold ${statusColor(main?.stochastic?.status)}`}
                >
                  {isAnalysisLoading ? (
                    <SkeletonText widthClass="w-20" />
                  ) : (
                    (main?.stochastic?.status ?? "정보 없음")
                  )}
                </div>
                {hoveredKey === "summary_stoch" && (
                  <div className="absolute z-50 pointer-events-none top-full left-0 right-0 mt-2 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg">
                    <div>{main?.stochastic?.analysis ?? ""}</div>
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
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium text-gray-700">RSI</span>
                </div>
                <div
                  className={`text-lg font-bold ${statusColor(main?.rsi?.status)}`}
                >
                  {isAnalysisLoading ? (
                    <SkeletonText widthClass="w-16" />
                  ) : (
                    (main?.rsi?.status ?? "중립")
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
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium text-gray-700">
                    종합 신호
                  </span>
                </div>
                <div
                  className={`text-lg font-bold ${statusColor(main?.rsi?.status)}`}
                >
                  {isAnalysisLoading ? (
                    <SkeletonText widthClass="w-20" />
                  ) : (
                    (main?.rsi?.status ?? "중립")
                  )}
                </div>
                {hoveredKey === "summary_total" && (
                  <div className="absolute z-50 pointer-events-none top-full left-0 right-0 mt-2 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg">
                    <div>{main?.macd?.analysis ?? ""}</div>
                    <div className="absolute bottom-full left-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center mb-2">
                <Activity className="w-4 h-4 text-blue-600 mr-2" />
                <span className="font-medium text-blue-900">분석 요약</span>
              </div>
              {isAnalysisLoading ? (
                <div className="space-y-2">
                  <SkeletonText widthClass="w-5/6" />
                  <SkeletonText widthClass="w-3/6" />
                </div>
              ) : (
                <p className="text-sm text-blue-800 leading-relaxed">
                  {main?.total_analysis ?? "분석 정보를 불러오고 있습니다."}
                </p>
              )}
            </div>
          </div>
        );
      case "pattern":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="text-sm font-medium text-gray-700 mb-2">
                  패턴
                </div>
                <div className="text-lg font-bold text-red-600">
                  하락 쐐기형
                </div>
              </div>

              <div
                className="relative bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
                onMouseEnter={() => setHoveredKey("pattern_rsi")}
                onMouseLeave={() => setHoveredKey(null)}
              >
                <div className="text-sm font-medium text-gray-700 mb-2">
                  RSI
                </div>
                <div className="text-lg font-bold text-orange-600">{rsi}</div>
                {hoveredKey === "pattern_rsi" && (
                  <div className="absolute z-50 pointer-events-none bottom-full left-0 right-0 mb-2 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg">
                    <div>
                      과매도/중립 구간 등 RSI 해석: {main?.rsi?.analysis ?? ""}
                    </div>
                    <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    MACD
                  </span>
                  {main?.macd?.value != null && (
                    <span className="text-xs font-medium text-gray-500">
                      {main.macd.value}
                    </span>
                  )}
                </div>
                <div className="text-sm text-blue-700 leading-relaxed break-words whitespace-pre-line">
                  {isAnalysisLoading ? (
                    <div className="space-y-2">
                      <SkeletonText widthClass="w-4/6" />
                      <SkeletonText widthClass="w-2/6" />
                    </div>
                  ) : (
                    (main?.macd?.analysis ?? "정보 없음")
                  )}
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    스토캐스틱
                  </span>
                  <span
                    className={`text-xs font-semibold ${statusColor(main?.stochastic?.status)}`}
                  >
                    {main?.stochastic?.status ?? ""}
                  </span>
                </div>
                <div className="text-sm text-gray-700 leading-relaxed break-words whitespace-pre-line">
                  {isAnalysisLoading ? (
                    <div className="space-y-2">
                      <SkeletonText widthClass="w-5/6" />
                      <SkeletonText widthClass="w-3/6" />
                    </div>
                  ) : (
                    (main?.stochastic?.analysis ?? "정보 없음")
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span className="font-medium text-purple-900">패턴 해석</span>
              </div>
              <p className="text-sm text-purple-800 leading-relaxed">
                현재 하락 쐐기형 패턴이 완성되어 가고 있으며, RSI가 과매도
                구간에 진입하여 반등 가능성이 높아지고 있습니다.
              </p>
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
                    <div>
                      RVI:{" "}
                      {typeof vola?.rvi?.value?.rvi === "number"
                        ? vola.rvi.value.rvi.toFixed(4)
                        : "-"}{" "}
                      | ATR: {vola?.atr?.value?.atr ?? "-"}
                    </div>
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
                  className={`text-base font-semibold ${statusColor(vola?.atr?.status)}`}
                >
                  {isAnalysisLoading ? (
                    <SkeletonText widthClass="w-16" />
                  ) : (
                    (vola?.atr?.status ?? "정보 없음")
                  )}
                </div>
                {hoveredKey === "vol_atr" && (
                  <div className="absolute z-50 pointer-events-none top-full left-0 right-0 mt-2 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg">
                    <div>{vola?.atr?.analysis ?? ""}</div>
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
                  className={`text-base font-semibold ${statusColor(vola?.rvi?.status)}`}
                >
                  {isAnalysisLoading ? (
                    <SkeletonText widthClass="w-16" />
                  ) : (
                    (vola?.rvi?.status ?? "정보 없음")
                  )}
                </div>
                {hoveredKey === "vol_rvi" && (
                  <div className="absolute z-50 pointer-events-none top-full left-0 right-0 mt-2 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg">
                    <div>{vola?.rvi?.analysis ?? ""}</div>
                    <div className="absolute bottom-full left-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
                  </div>
                )}
              </div>
            </div>

            {/* 변동성 분석 요약 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span className="font-medium text-blue-900">변동성 분석</span>
              </div>
              {isAnalysisLoading ? (
                <div className="space-y-2">
                  <SkeletonText widthClass="w-5/6" />
                  <SkeletonText widthClass="w-4/6" />
                </div>
              ) : (
                <p className="text-sm text-blue-800 leading-relaxed">
                  {vola?.total_analysis ??
                    vola?.volatility?.analysis ??
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
                    +{volumeRatio}%
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
                  className={`text-lg font-bold ${statusColor(vol?.mfi?.status)}`}
                >
                  {isAnalysisLoading ? (
                    <SkeletonText widthClass="w-16" />
                  ) : (
                    (vol?.mfi?.status ?? "정보 없음")
                  )}
                </div>
                {hoveredKey === "vol_mfi_card" && (
                  <div className="absolute z-50 pointer-events-none top-full left-0 right-0 mt-2 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg">
                    <div>
                      {typeof mfiValue === "number"
                        ? `값 ${mfiValue.toFixed(2)}`
                        : ""}
                    </div>
                    <div>{vol?.mfi?.analysis ?? ""}</div>
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
                  className={`text-lg font-bold ${statusColor(vol?.obv?.status)}`}
                >
                  {isAnalysisLoading ? (
                    <SkeletonText widthClass="w-16" />
                  ) : (
                    (vol?.obv?.status ?? "정보 없음")
                  )}
                </div>
                {hoveredKey === "vol_obv_card" && (
                  <div className="absolute z-50 pointer-events-none top-full left-0 right-0 mt-2 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg">
                    <div>
                      {obvValue ? obvValue.toLocaleString() : "-"} / MA20{" "}
                      {obvMa20Value ? obvMa20Value.toLocaleString() : "-"}
                    </div>
                    <div>{vol?.obv?.analysis ?? ""}</div>
                    <div className="absolute bottom-full left-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
                  </div>
                )}
              </div>
            </div>

            {/* 거래량 해석 */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span className="font-medium text-blue-900">거래량 해석</span>
              </div>
              {isAnalysisLoading ? (
                <div className="space-y-2">
                  <SkeletonText widthClass="w-5/6" />
                  <SkeletonText widthClass="w-2/6" />
                </div>
              ) : (
                <p className="text-sm text-blue-800 leading-relaxed">
                  {vol?.total_analysis ??
                    vol?.volume?.analysis ??
                    `평균 대비 ${volumeRatio}% 수준의 거래량입니다.`}
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
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600 font-medium">실시간</span>
          </div>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="px-6 py-1 border-b border-gray-100 flex-shrink-0">
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
