import { axiosInstance } from "@/lib/axiosInstance";

export interface StockCandleData {
  stock_code: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  change: number;
  change_percent: number;
}

export interface StockSearchParams {
  stock_codes: string;
  period?: "D" | "W" | "M";
  count?: number;
  sort_by?: "newest" | "oldest" | "volume";
}

export interface StockSearchResponse {
  data: StockCandleData[];
  message: string;
  status: number;
}

export const searchStockData = async (
  params: StockSearchParams
): Promise<StockSearchResponse> => {
  try {
    const response = await axiosInstance.get("/api/stock/search", { params });
    return response.data;
  } catch (error) {
    console.error("주식 검색 중 오류 발생:", error);
    // 에러 발생 시 빈 데이터 반환
    return {
      data: [],
      message: "검색 중 오류가 발생했습니다.",
      status: 500,
    };
  }
};
