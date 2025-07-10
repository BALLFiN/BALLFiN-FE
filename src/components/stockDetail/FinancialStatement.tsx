import { useState } from "react";
import { DollarSign, TrendingUp, TrendingDown, Info } from "lucide-react";

interface FinancialData {
  revenue: number;
  netIncome: number;
  debtRatio: number;
  roe: number;
  per: number;
  pbr: number;
  dividendYield: number;
}

interface FinancialStatementProps {
  data: FinancialData;
}

interface FinancialIndicator {
  label: string;
  value: string | number;
  unit: string;
  description: string;
  trend: "up" | "down" | "neutral";
  color: string;
}

export default function FinancialStatement({ data }: FinancialStatementProps) {
  const [hoveredIndicator, setHoveredIndicator] = useState<string | null>(null);

  const indicators: FinancialIndicator[] = [
    {
      label: "매출액",
      value: (data.revenue / 1000000000000).toFixed(1),
      unit: "조원",
      description:
        "회사의 총 매출액으로, 영업활동을 통해 벌어들인 수익의 총합입니다.",
      trend: "up",
      color: "text-green-600",
    },
    {
      label: "순이익",
      value: (data.netIncome / 1000000000000).toFixed(1),
      unit: "조원",
      description: "매출액에서 모든 비용을 차감한 후 남은 순수한 이익입니다.",
      trend: "up",
      color: "text-green-600",
    },
    {
      label: "부채비율",
      value: data.debtRatio.toFixed(1),
      unit: "%",
      description:
        "총부채를 자기자본으로 나눈 비율로, 기업의 재무 건전성을 나타냅니다.",
      trend: "down",
      color: "text-blue-600",
    },
    {
      label: "ROE",
      value: data.roe.toFixed(1),
      unit: "%",
      description:
        "자기자본수익률로, 투자한 자본 대비 얼마나 수익을 내는지 나타냅니다.",
      trend: "up",
      color: "text-green-600",
    },
    {
      label: "PER",
      value: data.per.toFixed(1),
      unit: "배",
      description:
        "주가수익비율로, 현재 주가가 1주당 순이익의 몇 배인지 나타냅니다.",
      trend: "neutral",
      color: "text-gray-600",
    },
    {
      label: "PBR",
      value: data.pbr.toFixed(1),
      unit: "배",
      description:
        "주가순자산비율로, 현재 주가가 1주당 순자산의 몇 배인지 나타냅니다.",
      trend: "neutral",
      color: "text-gray-600",
    },
    {
      label: "배당수익률",
      value: data.dividendYield.toFixed(1),
      unit: "%",
      description:
        "주가 대비 배당금의 비율로, 투자 대비 배당 수익을 나타냅니다.",
      trend: "up",
      color: "text-green-600",
    },
  ];

  const getTrendIcon = (trend: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <div className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* 종합 해석 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-center mb-2">
          <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
          <h4 className="font-semibold text-blue-800">종합 해석</h4>
        </div>
        <p className="text-sm text-blue-700 leading-relaxed">
          삼성전자는 안정적인 매출과 수익 구조를 보유하고 있으며, 낮은
          부채비율과 높은 ROE로 재무 건전성이 우수합니다. 현재 PER과 PBR이 적정
          수준을 유지하고 있어 투자 가치가 있는 종목으로 평가됩니다.
        </p>
      </div>

      {/* 재무 지표 그리드 */}
      <div className="grid grid-cols-2 gap-4">
        {indicators.map((indicator) => (
          <div
            key={indicator.label}
            className="relative bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            onMouseEnter={() => setHoveredIndicator(indicator.label)}
            onMouseLeave={() => setHoveredIndicator(null)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700">
                  {indicator.label}
                </span>
                <Info className="w-3 h-3 text-gray-400 ml-1" />
              </div>
              {getTrendIcon(indicator.trend)}
            </div>

            <div className="flex items-baseline">
              <span className={`text-xl font-bold ${indicator.color}`}>
                {indicator.value}
              </span>
              <span className="text-sm text-gray-500 ml-1">
                {indicator.unit}
              </span>
            </div>

            {/* 툴팁 */}
            {hoveredIndicator === indicator.label && (
              <div className="absolute z-10 bottom-full left-0 right-0 mb-2 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg">
                <div className="font-medium mb-1">{indicator.label}</div>
                <div>{indicator.description}</div>
                <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 주요 재무 현황 요약 */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-3">주요 재무 현황</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">총 자산:</span>
            <span className="font-medium">약 400조원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">총 부채:</span>
            <span className="font-medium">약 94조원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">자기자본:</span>
            <span className="font-medium">약 306조원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">영업이익률:</span>
            <span className="font-medium text-green-600">15.2%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
