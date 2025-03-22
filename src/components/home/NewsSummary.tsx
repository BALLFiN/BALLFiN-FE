import React from "react";
import BALLFiNLogo from "@/assets/BALLFiN.svg";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const NewsSummary = () => {
  const dummyNews = [
    {
      title: "삼성전자, 4분기 실적 발표",
      summary: "4분기 영업이익 2.8조원...",
      sentiment: "positive",
      date: "2024-01-25",
    },
    {
      title: "네이버, AI 서비스 확대",
      summary: "네이버 클로바 신규 기능 출시...",
      sentiment: "positive",
      date: "2024-01-24",
    },
    {
      title: "카카오, 광고 시장 진출",
      summary: "디지털 광고 플랫폼 런칭...",
      sentiment: "neutral",
      date: "2024-01-23",
    },
  ];

  return (
    <Card className="h-[60vh]">
      <CardHeader>
        <CardTitle className="text-2xl text-[#0A5C2B]">
          오늘의 주요 뉴스
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {dummyNews.map((news, index) => (
          <div
            key={index}
            className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {news.title}
              </h3>
              <span className="text-sm text-gray-500">{news.date}</span>
            </div>
            <p className="text-gray-600 mb-2">{news.summary}</p>
            <div className="flex items-center">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  news.sentiment === "positive"
                    ? "bg-green-100 text-green-800"
                    : news.sentiment === "negative"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                }`}
              >
                {news.sentiment === "positive"
                  ? "호재"
                  : news.sentiment === "negative"
                    ? "악재"
                    : "중립"}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default NewsSummary;
