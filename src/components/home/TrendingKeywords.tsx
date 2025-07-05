import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Filter } from "lucide-react";

interface Keyword {
  id: string;
  text: string;
  count: number;
  category: "daily" | "weekly";
  relatedStocks?: string[];
  sentiment: "positive" | "negative" | "neutral";
}

const trendingKeywords: Keyword[] = [
  // 금일 급등 키워드
  {
    id: "ai-chip",
    text: "AI 반도체",
    count: 156,
    category: "daily",
    relatedStocks: ["삼성전자", "SK하이닉스", "엔비디아"],
    sentiment: "positive",
  },
  {
    id: "battery",
    text: "배터리",
    count: 142,
    category: "daily",
    relatedStocks: ["LG에너지솔루션", "삼성SDI", "SK온"],
    sentiment: "positive",
  },
  {
    id: "biotech",
    text: "바이오",
    count: 98,
    category: "daily",
    relatedStocks: ["셀트리온", "삼성바이오로직스"],
    sentiment: "neutral",
  },
  {
    id: "metaverse",
    text: "메타버스",
    count: 87,
    category: "daily",
    relatedStocks: ["네이버", "카카오", "페이스북"],
    sentiment: "positive",
  },
  {
    id: "crypto",
    text: "가상화폐",
    count: 76,
    category: "daily",
    relatedStocks: ["업비트", "빗썸"],
    sentiment: "negative",
  },
  // 주간 누적 인기 키워드
  {
    id: "inflation",
    text: "인플레이션",
    count: 234,
    category: "weekly",
    relatedStocks: ["한국은행", "금리"],
    sentiment: "negative",
  },
  {
    id: "fed",
    text: "연준",
    count: 198,
    category: "weekly",
    relatedStocks: ["달러", "환율"],
    sentiment: "neutral",
  },
  {
    id: "china",
    text: "중국",
    count: 167,
    category: "weekly",
    relatedStocks: ["원자재", "수출입"],
    sentiment: "negative",
  },
  {
    id: "energy",
    text: "에너지",
    count: 145,
    category: "weekly",
    relatedStocks: ["원유", "가스", "전력"],
    sentiment: "positive",
  },
  {
    id: "esg",
    text: "ESG",
    count: 123,
    category: "weekly",
    relatedStocks: ["친환경", "탄소중립"],
    sentiment: "positive",
  },
];

type FilterType = "daily" | "weekly" | "all";

// 커스텀 태그 클라우드 컴포넌트
function TagCloud({
  keywords,
  onWordClick,
}: {
  keywords: Keyword[];
  onWordClick: (keyword: Keyword) => void;
}) {
  const maxCount = Math.max(...keywords.map((k) => k.count));
  const minCount = Math.min(...keywords.map((k) => k.count));

  const getFontSize = (count: number) => {
    const minSize = 14;
    const maxSize = 32;
    const ratio = (count - minCount) / (maxCount - minCount);
    return minSize + (maxSize - minSize) * ratio;
  };

  const getColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "#10B981"; // green-600
      case "negative":
        return "#EF4444"; // red-600
      default:
        return "#3B82F6"; // blue-600
    }
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-3 p-4 h-full">
      {keywords.map((keyword) => (
        <button
          key={keyword.id}
          onClick={() => onWordClick(keyword)}
          className="hover:scale-110 transition-transform duration-200 cursor-pointer"
          style={{
            fontSize: `${getFontSize(keyword.count)}px`,
            color: getColor(keyword.sentiment),
            fontWeight: keyword.count > maxCount * 0.7 ? "bold" : "normal",
          }}
          title={`${keyword.text} (${keyword.count}회 언급)\n관련 종목: ${keyword.relatedStocks?.join(", ") || "없음"}`}
        >
          {keyword.text}
        </button>
      ))}
    </div>
  );
}

export default function TrendingKeywords() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterType>("daily");

  const filteredKeywords = useMemo(
    () =>
      trendingKeywords.filter((keyword) =>
        filter === "all" ? true : keyword.category === filter
      ),
    [filter]
  );

  const handleWordClick = (keyword: Keyword) => {
    navigate(`/news/search?keyword=${encodeURIComponent(keyword.text)}`);
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-gray-900">
            실시간 인기뉴스 키워드
          </h2>
        </div>
      </div>

      {/* 필터 버튼 */}
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-4 h-4 text-gray-500" />
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("daily")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === "daily"
                ? "bg-[#0A5C2B] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            금일 급등
          </button>
          <button
            onClick={() => setFilter("weekly")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === "weekly"
                ? "bg-[#0A5C2B] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            주간 누적
          </button>
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === "all"
                ? "bg-[#0A5C2B] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            전체
          </button>
        </div>
      </div>

      {/* 태그 클라우드 */}
      <div className="h-64 flex items-center justify-center">
        {filteredKeywords.length > 0 ? (
          <TagCloud keywords={filteredKeywords} onWordClick={handleWordClick} />
        ) : (
          <div className="text-gray-500 text-center">
            <p>선택된 필터에 해당하는 키워드가 없습니다.</p>
            <p className="text-sm mt-1">다른 필터를 선택해보세요.</p>
          </div>
        )}
      </div>

      {/* 설명 */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          키워드를 클릭하면 관련 뉴스와 종목 분석을 확인할 수 있습니다
        </p>
        <div className="flex justify-center gap-4 mt-2 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            긍정적
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            부정적
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            중립적
          </span>
        </div>
      </div>
    </div>
  );
}
