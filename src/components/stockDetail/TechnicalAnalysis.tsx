import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Activity,
  Bell,
  Target,
  Zap,
  Layers,
} from "lucide-react";

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
            {/* 주요 지표 요약 */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                <Activity className="w-4 h-4 text-blue-500 mr-2" />
                주요 지표 요약
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-center p-2 bg-white rounded shadow">
                  <div className="text-green-500 font-bold">상승</div>
                  <div className="text-gray-600">이동평균선</div>
                </div>
                <div className="text-center p-2 bg-white rounded shadow">
                  <div className="text-red-500 font-bold">하락</div>
                  <div className="text-gray-600">스토캐스틱</div>
                </div>
                <div className="text-center p-2 bg-white rounded shadow">
                  <div className="text-blue-500 font-bold">중립</div>
                  <div className="text-gray-600">CCI</div>
                </div>
                <div className="text-center p-2 bg-white rounded shadow">
                  <div className="text-green-500 font-bold">매수</div>
                  <div className="text-gray-600">종합 신호</div>
                </div>
              </div>
            </div>
          </div>
        );
      case "pattern":
        return (
          <div className="bg-gradient-to-r from-pink-400 to-red-500 text-white rounded-lg p-4">
            <div className="flex items-center mb-3">
              <BarChart3 className="w-5 h-5 mr-2" />
              <h4 className="font-bold text-lg">차트 패턴</h4>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                <strong>패턴:</strong> 하락 쐐기형 패턴
              </p>
              <p>
                <strong>RSI:</strong> 과매도 구간 ({rsi})
              </p>
              <p>
                <strong>MACD:</strong> 골든크로스 형성 중
              </p>
              <p>
                <strong>볼린저밴드:</strong> 하단 밴드 근접
              </p>
              <div className="mt-3 p-2 bg-white bg-opacity-20 rounded">
                <p className="text-xs">
                  현재 하락 쐐기형 패턴이 완성되어 가고 있으며, RSI가 과매도
                  구간에 진입하여 반등 가능성이 높아지고 있습니다.
                </p>
              </div>
            </div>
          </div>
        );

      case "volatility":
        return (
          <div className="bg-gradient-to-r from-green-400 to-cyan-500 text-white rounded-lg p-4">
            <div className="flex items-center mb-3">
              <TrendingUp className="w-5 h-5 mr-2" />
              <h4 className="font-bold text-lg">가격 변동성</h4>
            </div>
            <div className="space-y-3">
              <div className="bg-white bg-opacity-20 rounded p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">일일 변동폭</span>
                  <span className="font-bold">{dailyRange}%</span>
                </div>
                <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
                  <div
                    className="bg-yellow-300 h-2 rounded-full"
                    style={{ width: `${dailyRange * 10}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>71,200</span>
                  <span>73,500</span>
                </div>
              </div>
              <div className="bg-white bg-opacity-20 rounded p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">52주 변동폭</span>
                  <span className="font-bold">{weeklyRange}%</span>
                </div>
                <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
                  <div
                    className="bg-red-400 h-2 rounded-full"
                    style={{ width: `${weeklyRange}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>최저: 58,400</span>
                  <span>최고: 84,800</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "volume":
        return (
          <div className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Layers className="w-5 h-5 mr-2" />
              <h4 className="font-bold text-lg">거래량 분석</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>현재 거래량:</span>
                <span className="font-bold">
                  {currentVolume.toLocaleString()}주
                </span>
              </div>
              <div className="flex justify-between">
                <span>평균 거래량:</span>
                <span>{avgVolume.toLocaleString()}주</span>
              </div>
              <div className="flex justify-between">
                <span>거래량 비율:</span>
                <span className="text-yellow-300 font-bold">
                  +{volumeRatio}%
                </span>
              </div>
              <div className="mt-3 p-2 bg-white bg-opacity-20 rounded">
                <p className="text-xs">
                  평균 대비 높은 거래량을 보이고 있어 매수세 유입이 감지되고
                  있습니다.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-xl p-6 max-h-[514px] overflow-y-hidden">
      <div className="space-y-6">
        {/* 헤더 */}
        <div className="text-center border-b pb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">기술적 분석</h3>
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm inline-flex items-center">
            <Zap className="w-4 h-4 mr-1" />
            실시간 분석
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex-1 flex items-center justify-center px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon className="w-3 h-3 mr-1" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 탭 콘텐츠 */}
        <div className="min-h-[400px]">{renderTabContent()}</div>
      </div>
    </div>
  );
}
