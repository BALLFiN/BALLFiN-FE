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
}

type TabType = "summary" | "pattern" | "volatility" | "volume";

export default function TechnicalAnalysis({
  stock: _stock,
  historicalData: _historicalData,
}: TechnicalAnalysisProps) {
  const [activeTab, setActiveTab] = useState<TabType>("summary");

  // 기술적 지표 계산 (실제로는 더 정확한 계산 필요)
  const rsi = 28.4;
  const dailyRange = 2.8;
  const weeklyRange = 45.2;
  const currentVolume = 15234567;
  const avgVolume = 12456789;
  const volumeRatio = (((currentVolume - avgVolume) / avgVolume) * 100).toFixed(
    1
  );

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
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium text-gray-700">
                    이동평균선
                  </span>
                </div>
                <div className="text-lg font-bold text-green-600">상승</div>
                <div className="text-xs text-gray-500 mt-1">
                  5일선 &gt; 20일선
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium text-gray-700">
                    스토캐스틱
                  </span>
                </div>
                <div className="text-lg font-bold text-red-600">하락</div>
                <div className="text-xs text-gray-500 mt-1">과매도 구간</div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium text-gray-700">CCI</span>
                </div>
                <div className="text-lg font-bold text-blue-600">중립</div>
                <div className="text-xs text-gray-500 mt-1">-100 ~ +100</div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium text-gray-700">
                    종합 신호
                  </span>
                </div>
                <div className="text-lg font-bold text-green-600">매수</div>
                <div className="text-xs text-gray-500 mt-1">3/4 지표 매수</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center mb-2">
                <Activity className="w-4 h-4 text-blue-600 mr-2" />
                <span className="font-medium text-blue-900">분석 요약</span>
              </div>
              <p className="text-sm text-blue-800 leading-relaxed">
                이동평균선이 상승세를 보이고 있으며, 스토캐스틱은 과매도
                구간에서 반등 신호를 보이고 있습니다. 종합적으로 매수 신호가
                우세한 상황입니다.
              </p>
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

              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="text-sm font-medium text-gray-700 mb-2">
                  RSI
                </div>
                <div className="text-lg font-bold text-orange-600">{rsi}</div>
                <div className="text-xs text-gray-500">과매도 구간</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <span className="text-sm font-medium text-gray-700">MACD</span>
                <span className="text-sm font-bold text-blue-600">
                  골든크로스 형성 중
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <span className="text-sm font-medium text-gray-700">
                  볼린저밴드
                </span>
                <span className="text-sm font-bold text-green-600">
                  하단 밴드 근접
                </span>
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
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
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
                  style={{ width: `${Math.min(dailyRange * 10, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>71,200원</span>
                <span>73,500원</span>
              </div>
            </div>

            {/* 52주 변동폭 */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-700">
                  52주 변동폭
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {weeklyRange}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(weeklyRange, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>최저: 58,400원</span>
                <span>최고: 84,800원</span>
              </div>
            </div>

            {/* 변동성 분석 요약 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span className="font-medium text-blue-900">변동성 분석</span>
              </div>
              <p className="text-sm text-blue-800 leading-relaxed">
                일일 변동폭은 평균적인 수준이며, 52주 변동폭은 시장 평균 대비
                높은 편입니다. 현재 가격은 52주 범위의 중간 지점에 위치하고 있어
                안정적인 거래가 가능합니다.
              </p>
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

            {/* 거래량 해석 */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span className="font-medium text-blue-900">거래량 해석</span>
              </div>
              <p className="text-sm text-blue-800 leading-relaxed">
                평균 대비 {volumeRatio}% 높은 거래량을 보이고 있어 매수세 유입이
                감지되고 있습니다. 이는 가격 상승의 지지 요인으로 작용할 수
                있습니다.
              </p>
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
