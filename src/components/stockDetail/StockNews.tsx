import { Link } from "react-router-dom";
import { useEffect, useState, useMemo, useCallback, memo } from "react";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  sentiment: "positive" | "negative" | "neutral";
}

interface StockNewsProps {
  news: NewsItem[];
}

const StockNews = memo(function StockNews({ news }: StockNewsProps) {
  // 메모이제이션된 감정 색상 함수
  const getSentimentColor = useCallback((sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-500";
      case "negative":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  }, []);

  // 메모이제이션된 감정 텍스트 함수
  const getSentimentText = useCallback((sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "긍정";
      case "negative":
        return "부정";
      default:
        return "중립";
    }
  }, []);

  // 반응형 임계값 최적화
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 768px)").matches
      : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    if (mq.addEventListener) {
      mq.addEventListener("change", handler);
    } else if ((mq as any).addListener) {
      (mq as any).addListener(handler);
    }
    setIsDesktop(mq.matches);
    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener("change", handler);
      } else if ((mq as any).removeListener) {
        (mq as any).removeListener(handler);
      }
    };
  }, []);

  const maxTitleLength = useMemo(() => (isDesktop ? 18 : 12), [isDesktop]);

  // 뉴스 아이템 렌더링 최적화
  const newsItems = useMemo(() => {
    return news.map((item) => {
      const isLongTitle = (item.title?.length || 0) >= maxTitleLength;
      const sentimentColor = getSentimentColor(item.sentiment);
      const sentimentText = getSentimentText(item.sentiment);

      return (
        <Link
          key={item.id}
          to={`/news/${item.id}`}
          className="block p-4 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <div className="grid grid-cols-[1fr_auto] items-start gap-3 mb-2">
            <h3
              className="font-medium text-gray-900 leading-snug min-w-0"
              style={
                isLongTitle
                  ? {
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                    }
                  : undefined
              }
            >
              {item.title}
            </h3>
            <span
              className={`text-sm whitespace-nowrap shrink-0 ${sentimentColor}`}
            >
              {sentimentText}
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>{item.source}</span>
            <span>{item.date}</span>
          </div>
        </Link>
      );
    });
  }, [news, maxTitleLength, getSentimentColor, getSentimentText]);

  return <div className="space-y-4">{newsItems}</div>;
});

export default StockNews;
