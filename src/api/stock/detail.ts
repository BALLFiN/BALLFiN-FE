import { axiosInstance } from "@/lib/axiosInstance";

// 원본 응답은 한글 키를 사용하므로 그대로 반환하고, 컴포넌트에서 매핑합니다.
export type RawStockInfoResponse = Record<string, any>;

export const getStockInfoByCode = async (
  stockCode: string
): Promise<RawStockInfoResponse> => {
  const { data } = await axiosInstance.get(`/api/info/stock/${stockCode}`);
  return data;
};

// 차트 데이터 타입 및 API
export interface StockChartCandle {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type StockChartPeriod = "D" | "W" | "M";

export interface StockChartResponse {
  stock_code: string;
  period: StockChartPeriod;
  count: number;
  candles: StockChartCandle[];
}

export async function getStockChart(
  stockCode: string,
  period: StockChartPeriod,
  count: number
): Promise<StockChartResponse> {
  const { data } = await axiosInstance.get<StockChartResponse>(
    `/api/stock/chart/${encodeURIComponent(stockCode)}`,
    { params: { period, count } }
  );
  return data;
}
