import React from "react";
import BALLFiNLogo from "@/assets/BALLFiN.svg";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const StockSummary = () => {
  const dummyStocks = [
    {
      name: "삼성전자",
      code: "005930",
      currentPrice: "75,300",
      change: "+2,300",
      changePercent: "+3.15%",
      recommendation: "buy",
      targetPrice: "80,000",
    },
    {
      name: "네이버",
      code: "035420",
      currentPrice: "245,000",
      change: "-5,000",
      changePercent: "-2.00%",
      recommendation: "hold",
      targetPrice: "250,000",
    },
    {
      name: "카카오",
      code: "035720",
      currentPrice: "52,800",
      change: "+800",
      changePercent: "+1.54%",
      recommendation: "buy",
      targetPrice: "55,000",
    },
  ];

  return (
    <Card className="h-[60vh]">
      <CardHeader>
        <CardTitle className="text-2xl text-[#0A5C2B]">
          주요 종목 분석
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {dummyStocks.map((stock, index) => (
          <div
            key={index}
            className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {stock.name}
                </h3>
                <span className="text-sm text-gray-500">{stock.code}</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-800">
                  {stock.currentPrice}
                </div>
                <div
                  className={`text-sm font-medium ${
                    stock.change.startsWith("+")
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                >
                  {stock.change} ({stock.changePercent})
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  stock.recommendation === "buy"
                    ? "bg-green-100 text-green-800"
                    : stock.recommendation === "sell"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {stock.recommendation === "buy"
                  ? "매수"
                  : stock.recommendation === "sell"
                    ? "매도"
                    : "관망"}
              </span>
              <div className="text-sm text-gray-600">
                목표가: <span className="font-medium">{stock.targetPrice}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default StockSummary;
