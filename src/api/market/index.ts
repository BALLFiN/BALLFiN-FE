import { axiosInstance } from "@/lib/axiosInstance";

export interface MarketAllResponse {
  timestamp: string;
  total_symbols: number;
  data: {
    kospi?: QuoteWithHistory;
    nasdaq?: QuoteWithHistory;
    usd_krw?: QuoteWithHistory;
    oil?: QuoteWithHistory;
    vix?: QuoteWithHistory;
    interest_rate?: InterestRateWithHistory;
    [key: string]: unknown;
  };
}

export interface QuoteWithHistory {
  name: string;
  symbol: string;
  price: number;
  change: number;
  change_percent: number;
  volume: number;
  historical_data: Array<{ date: string; price: number }>;
  timestamp: string;
}

export interface InterestRateWithHistory {
  name: string;
  rate: number;
  historical_data: Array<{ date: string; rate: number }>;
}

export const getAllMarketInfo = async () => {
  const { data } = await axiosInstance.get<MarketAllResponse>("/api/info/all");
  return data;
};
