import { useState } from "react";
import NewsList from "../../components/news/NewsList";
import NewsAnalysis from "../../components/news/NewsAnalysis";

interface NewsItem {
  id: number;
  title: string;
  source: string;
  date: string;
  impact: "positive" | "negative" | "neutral";
  summary: string;
  analysis: string;
}

const mockNews: NewsItem[] = [
  {
    id: 1,
    title: "삼성전자, 2분기 실적 전망 상향 조정... 반도체 부문 회복세",
    source: "한국경제",
    date: "2024-03-20",
    impact: "positive",
    summary:
      "삼성전자가 2분기 실적 전망을 상향 조정했다. 반도체 부문의 회복세가 예상보다 빠르게 진행되고 있다는 분석이다.",
    analysis:
      "이 뉴스는 삼성전자의 실적 개선을 시사하는 긍정적인 신호입니다. 반도체 시장의 회복세가 예상보다 빠르게 진행되고 있어 주가 상승 요인으로 작용할 수 있습니다. 특히 메모리 반도체 가격의 상승세가 지속되고 있어 수익성 개선이 기대됩니다.",
  },
  {
    id: 2,
    title: "네이버, AI 서비스 투자 확대... 2분기 영업이익 하락 전망",
    source: "매일경제",
    date: "2024-03-20",
    impact: "negative",
    summary:
      "네이버가 AI 서비스 개발을 위한 투자를 확대하면서 단기적으로 영업이익이 하락할 것으로 전망된다.",
    analysis:
      "이 뉴스는 네이버의 단기 실적 악화를 시사하는 부정적인 신호입니다. AI 서비스 개발을 위한 투자 확대는 장기적인 성장을 위한 전략이지만, 단기적으로는 영업이익 하락을 야기할 수 있습니다. 투자자들은 장기적 관점에서의 성장성과 단기 실적 악화 사이의 균형을 고려해야 합니다.",
  },
  {
    id: 3,
    title: "현대차, 전기차 신모델 출시... 시장 반응 긍정적",
    source: "조선비즈",
    date: "2024-03-19",
    impact: "positive",
    summary:
      "현대차가 새로운 전기차 모델을 출시했으며, 초기 시장 반응이 매우 긍정적이다.",
    analysis:
      "이 뉴스는 현대차의 전기차 경쟁력 강화를 시사하는 긍정적인 신호입니다. 새로운 모델의 성공적인 출시는 전기차 시장에서의 시장점유율 확대와 수익성 개선을 기대할 수 있게 합니다. 특히 긍정적인 초기 반응은 향후 판매 실적 상승으로 이어질 가능성이 높습니다.",
  },
];

export default function NewsPage() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const handleNewsClick = (news: NewsItem) => {
    if (selectedNews?.id === news.id) {
      setSelectedNews(null);
    } else {
      setSelectedNews(news);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* 뉴스 목록 */}
      <div
        className={`pt-16 fixed top-0 left-0 w-full h-full bg-white transition-all duration-500 ease-in-out ${
          selectedNews ? "w-1/2" : "w-full"
        }`}
      >
        <NewsList
          news={mockNews}
          selectedNews={selectedNews}
          onNewsClick={handleNewsClick}
        />
      </div>

      {/* 뉴스 상세 */}
      <div
        className={`pt-16 fixed top-0 right-0 w-1/2 h-full bg-gray-50 transition-all duration-500 ease-in-out transform ${
          selectedNews ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <NewsAnalysis news={selectedNews} />
      </div>
    </div>
  );
}
