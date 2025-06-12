import { useState } from "react";
import {
  ArrowUpDown,
  BarChart2,
  Settings,
  Clock,
  AlertCircle,
} from "lucide-react";

interface Strategy {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  parameters: {
    [key: string]: any;
  };
}

export default function TransactionPage() {
  const [selectedStrategy, setSelectedStrategy] = useState<string>("news");
  const [isAutoTrading, setIsAutoTrading] = useState(false);

  const strategies: Strategy[] = [
    {
      id: "news",
      name: "뉴스 기반 매매",
      description: "메인 뉴스 기반 오전장 예측 전략",
      isActive: true,
      parameters: {
        newsWeight: 0.7,
        volumeWeight: 0.3,
        buyTime: "15:20",
        sellTime: "09:30",
      },
    },
    {
      id: "technical",
      name: "기술적 지표 기반",
      description: "골든크로스 기반 매매 전략",
      isActive: true,
      parameters: {
        shortTerm: 5,
        longTerm: 20,
        volumeThreshold: 1.5,
      },
    },
    {
      id: "fundamental",
      name: "기본적 지표 기반",
      description: "PBR, PER 기반 매매 전략",
      isActive: true,
      parameters: {
        maxPER: 20,
        maxPBR: 3,
        minROE: 10,
      },
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 섹션 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">자동매매 시스템</h1>
        <p className="text-gray-600">
          뉴스 분석과 거래량 분석을 기반으로 한 자동매매 시스템입니다.
        </p>
      </div>

      {/* 메인 컨트롤 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* 자동매매 상태 카드 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">자동매매 상태</h2>
            <div
              className={`w-3 h-3 rounded-full ${
                isAutoTrading ? "bg-green-500" : "bg-gray-300"
              }`}
            />
          </div>
          <button
            onClick={() => setIsAutoTrading(!isAutoTrading)}
            className={`w-full py-3 rounded-lg font-medium ${
              isAutoTrading
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-[#0A5C2B] hover:bg-[#084825] text-white"
            }`}
          >
            {isAutoTrading ? "자동매매 중지" : "자동매매 시작"}
          </button>
        </div>

        {/* 거래 시간 설정 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold">거래 시간 설정</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                매수 시간
              </label>
              <input
                type="time"
                className="w-full p-2 border border-gray-300 rounded-lg"
                defaultValue="15:20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                매도 시간
              </label>
              <input
                type="time"
                className="w-full p-2 border border-gray-300 rounded-lg"
                defaultValue="09:30"
              />
            </div>
          </div>
        </div>

        {/* 백테스팅 결과 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold">백테스팅 결과</h2>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">수익률</span>
              <span className="font-medium text-green-500">+15.3%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">승률</span>
              <span className="font-medium">68.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">평균 보유 기간</span>
              <span className="font-medium">2.3일</span>
            </div>
          </div>
        </div>
      </div>

      {/* 전략 설정 섹션 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Settings className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-semibold">매매 전략 설정</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {strategies.map((strategy) => (
            <div
              key={strategy.id}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                selectedStrategy === strategy.id
                  ? "border-[#0A5C2B] bg-green-50"
                  : "border-gray-200 hover:border-[#0A5C2B]"
              }`}
              onClick={() => setSelectedStrategy(strategy.id)}
            >
              <h3 className="font-medium mb-2">{strategy.name}</h3>
              <p className="text-sm text-gray-600 mb-3">
                {strategy.description}
              </p>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    strategy.isActive ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
                <span className="text-sm text-gray-500">
                  {strategy.isActive ? "활성화" : "비활성화"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 유의사항 섹션 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-yellow-500" />
          <h2 className="text-lg font-semibold">유의사항</h2>
        </div>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start">
            <span className="text-yellow-500 mr-2">•</span>
            <span>
              현재 시스템은 뉴스 분석과 14일간의 거래량 평균을 기반으로 매매를
              진행합니다.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-500 mr-2">•</span>
            <span>
              매수는 15:20, 매도는 다음날 09:30을 기준으로 진행됩니다.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-500 mr-2">•</span>
            <span>
              기술적 지표는 골든크로스를, 기본적 지표는 PBR과 PER의 정상 수치를
              판단합니다.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-500 mr-2">•</span>
            <span>
              시스템은 지속적으로 업데이트되며, 새로운 매매 기법이 추가될 수
              있습니다.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
