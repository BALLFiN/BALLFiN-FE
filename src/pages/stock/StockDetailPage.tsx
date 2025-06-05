import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StockHeader from "@/components/stockDetail/StockHeader";
import StockInfo from "@/components/stockDetail/StockInfo";
import StockChart from "@/components/stockDetail/StockChart";
import StockNews from "@/components/stockDetail/StockNews";

interface StockDetail {
  id: number;
  name: string;
  code: string;
  price: number;
  change: number;
  score: number;
  sentiment: "positive" | "negative" | "neutral";
  newsCount: number;
  prediction: {
    targetPrice: number;
    confidence: number;
    recommendation: "buy" | "sell" | "hold";
  };
}

interface HistoricalData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ma5?: number;
  ma20?: number;
}

interface NewsItem {
  id: number;
  title: string;
  source: string;
  date: string;
  sentiment: "positive" | "negative" | "neutral";
  url: string;
}

export default function StockDetailPage() {
  const { code } = useParams<{ code: string }>();
  const [stock, setStock] = useState<StockDetail | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showMA, setShowMA] = useState(true);
  const [timeRange, setTimeRange] = useState<"1d" | "1w" | "1m" | "3m" | "1y">(
    "1m",
  );
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    // TODO: API 호출로 대체
    const mockStock: StockDetail = {
      id: 1,
      name: "삼성전자",
      code: "005930",
      price: 75000,
      change: 2.5,
      score: 75,
      sentiment: "positive",
      newsCount: 12,
      prediction: {
        targetPrice: 80000,
        confidence: 85,
        recommendation: "buy",
      },
    };

    const mockHistoricalData: HistoricalData[] = Array.from(
      { length: 30 },
      (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        open: 70000 + Math.random() * 10000,
        high: 75000 + Math.random() * 10000,
        low: 65000 + Math.random() * 10000,
        close: 70000 + Math.random() * 10000,
        volume: Math.floor(Math.random() * 1000000),
        ma5: 72000 + Math.random() * 5000,
        ma20: 71000 + Math.random() * 3000,
      }),
    );

    const mockNews: NewsItem[] = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      title: `삼성전자, ${i + 1}분기 실적 발표... 시장 예상치 상회`,
      source: "한국경제",
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      sentiment: ["positive", "negative", "neutral"][
        Math.floor(Math.random() * 3)
      ] as any,
      url: "#",
    }));

    setStock(mockStock);
    setHistoricalData(mockHistoricalData);
    setNews(mockNews);
  }, [code]);

  if (!stock) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <StockHeader
        name={stock.name}
        code={stock.code}
        isFavorite={isFavorite}
        onToggleFavorite={() => setIsFavorite(!isFavorite)}
      />
      <div className="mt-8">
        <StockInfo
          price={stock.price}
          change={stock.change}
          prediction={stock.prediction}
          sentiment={stock.sentiment}
          score={stock.score}
          newsCount={stock.newsCount}
        />
      </div>
      <div className="mt-8">
        <StockChart
          data={historicalData}
          showMA={showMA}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          onToggleMA={() => setShowMA(!showMA)}
        />
      </div>
      <div className="mt-8">
        <StockNews news={news} />
      </div>
    </div>
  );
}
