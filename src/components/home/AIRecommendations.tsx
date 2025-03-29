import { useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Stock {
  name: string;
  code: string;
  price: string;
  change: {
    value: string;
    percentage: string;
    isPositive: boolean;
  };
  category: string;
  prediction: "buy" | "hold" | "sell";
}

const stocks: Stock[] = [
  {
    name: "삼성전자",
    code: "005930.KS",
    price: "87,300원",
    change: {
      value: "+2,700",
      percentage: "+3.2%",
      isPositive: true,
    },
    category: "대형주 · 반도체",
    prediction: "buy",
  },
  {
    name: "현대차",
    code: "005380.KS",
    price: "219,500원",
    change: {
      value: "+3,500",
      percentage: "+1.6%",
      isPositive: true,
    },
    category: "대형주 · 자동차",
    prediction: "hold",
  },
  {
    name: "네이버",
    code: "035420.KS",
    price: "163,000원",
    change: {
      value: "-3,000",
      percentage: "-1.8%",
      isPositive: false,
    },
    category: "대형주 · IT/플랫폼",
    prediction: "buy",
  },
  {
    name: "SK하이닉스",
    code: "000660.KS",
    price: "176,500원",
    change: {
      value: "-1,500",
      percentage: "-0.8%",
      isPositive: false,
    },
    category: "대형주 · 반도체",
    prediction: "sell",
  },
];

const filterTabs = ["전체", "대형주", "성장주", "가치주", "배당주"];

export default function AIRecommendations() {
  const [activeTab, setActiveTab] = useState("전체");

  const getPredictionColor = (prediction: Stock["prediction"]) => {
    switch (prediction) {
      case "buy":
        return "bg-green-100 text-green-800";
      case "hold":
        return "bg-yellow-100 text-yellow-800";
      case "sell":
        return "bg-red-100 text-red-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">AI 추천 종목</h2>
        <button className="text-sm text-[#0A5C2B] hover:text-[#0A5C2B]/80">
          더 많은 종목 보기 →
        </button>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeTab === tab
                ? "bg-[#0A5C2B] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {stocks.map((stock, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 hover:border-[#0A5C2B] transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-medium text-gray-900">{stock.name}</div>
                <div className="text-sm text-gray-500">{stock.code}</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-900">{stock.price}</div>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    stock.change.isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stock.change.isPositive ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>
                    {stock.change.percentage} ({stock.change.value})
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">{stock.category}</div>
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium ${getPredictionColor(
                  stock.prediction
                )}`}
              >
                AI 분석:{" "}
                {stock.prediction === "buy"
                  ? "매수 추천"
                  : stock.prediction === "hold"
                    ? "보유 추천"
                    : "매도 추천"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
