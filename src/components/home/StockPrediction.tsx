import { useState } from "react";
import { TrendingUp } from "lucide-react";

const timeTabs = ["1개월", "3개월", "6개월"];

export default function StockPrediction() {
  const [activeTab, setActiveTab] = useState("6개월");

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#0A5C2B]" />
          <h2 className="text-xl font-bold text-gray-900">
            삼성전자 주가 예측
          </h2>
        </div>
        <div className="flex gap-2">
          {timeTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                activeTab === tab
                  ? "bg-[#0A5C2B] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {/* 차트 영역 */}
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-gray-500">차트 영역</div>
        </div>

        {/* 예측 정보 */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">1개월 후 예상</div>
            <div className="text-xl font-bold text-[#0A5C2B]">89,700원</div>
            <div className="text-sm text-green-600">현재 대비 +2.7%</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">3개월 후 예상</div>
            <div className="text-xl font-bold text-[#0A5C2B]">91,200원</div>
            <div className="text-sm text-green-600">현재 대비 +4.5%</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">6개월 후 예상</div>
            <div className="text-xl font-bold text-[#0A5C2B]">92,500원</div>
            <div className="text-sm text-green-600">현재 대비 +6.0%</div>
          </div>
        </div>

        {/* 신뢰도 표시 */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-gray-600">예측 신뢰도</div>
            <div className="text-sm font-medium text-[#0A5C2B]">87%</div>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0A5C2B] rounded-full"
              style={{ width: "87%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
