export interface StockItem {
  id: number;
  name: string;
  code: string;
  price: number;
  close: number; // 종가
  high: number; // 고가
  low: number; // 저가
  change: number; // 변동
  changePercent: number; // 변동 %
  volume: number; // 거래량
  score?: number;
  sentiment?: "positive" | "negative" | "neutral";
  newsCount?: number;
  prediction?: {
    targetPrice: number;
    confidence: number;
    recommendation: "buy" | "sell" | "hold";
  };
  isFavorite?: boolean;
}

export interface StockSearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
  allStocks?: StockItem[];
}
