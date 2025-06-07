import { useState } from "react";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

interface NewsItem {
  source: string;
  time: string;
  title: string;
  sentiment: "positive" | "negative" | "neutral";
  reason: string;
}

const newsItems: NewsItem[] = [
  {
    source: "매일경제",
    time: "12분 전",
    title: "삼성전자, AI 반도체 신제품 출시 임박... 시장 점유율 확대 전망",
    sentiment: "positive",
    reason:
      "삼성전자의 AI 반도체 신제품이 다음 달 출시 예정으로, 글로벌 AI 시장에서의 점유율 확대가 기대됨. 특히 고성능 컴퓨팅 분야에서 경쟁력 강화가 예상되며 주가 상승 요인으로 작용할 전망.",
  },
  {
    source: "한국경제",
    time: "43분 전",
    title: "SK하이닉스, 중국 시장 점유율 하락... 현지 경쟁사 성장세 뚜렷",
    sentiment: "negative",
    reason:
      "SK하이닉스의 중국 내 메모리 시장 점유율이 전년 대비 2.5% 하락. 현지 경쟁업체들의 급속 성장과 가격 경쟁력이 주요 원인으로 분석되며, 단기적으로 실적에 부담 요인이 될 것으로 전망.",
  },
  {
    source: "서울경제",
    time: "1시간 전",
    title: "현대차, 신형 전기차 예약 판매 10만대 돌파... 글로벌 생산량 확대",
    sentiment: "positive",
    reason:
      "현대자동차의 신형 전기차 모델 예약 판매가 글로벌 시장에서 10만대를 돌파했으며, 이에 따라 생산량 확대 계획을 발표함. 전기차 시장에서의 입지 강화와 함께 수익성 개선 효과가 예상됨.",
  },
];

const filterTabs = ["전체", "긍정", "중립", "부정"];

export default function NewsAnalysis() {
  const [activeTab, setActiveTab] = useState("전체");

  const getSentimentIcon = (sentiment: NewsItem["sentiment"]) => {
    switch (sentiment) {
      case "positive":
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case "negative":
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getSentimentColor = (sentiment: NewsItem["sentiment"]) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-800";
      case "negative":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">실시간 뉴스 분석</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200">
            전체
          </button>
          <button className="px-3 py-1 rounded-lg text-sm font-medium bg-[#0A5C2B] text-white">
            관심종목
          </button>
        </div>
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
        {newsItems.map((news, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 hover:border-[#0A5C2B] transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                {getSentimentIcon(news.sentiment)}
                <div>
                  <div className="font-medium text-gray-900">{news.title}</div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{news.source}</span>
                    <span>•</span>
                    <span>{news.time}</span>
                  </div>
                </div>
              </div>
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(
                  news.sentiment,
                )}`}
              >
                {news.sentiment === "positive"
                  ? "매우 긍정적"
                  : news.sentiment === "negative"
                    ? "부정적"
                    : "중립적"}
              </div>
            </div>
            <div className="text-sm text-gray-600">{news.reason}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="text-sm text-[#0A5C2B] hover:text-[#0A5C2B]/80">
          모든 뉴스 보기 →
        </button>
      </div>
    </div>
  );
}
