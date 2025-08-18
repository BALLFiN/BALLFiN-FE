import { axiosInstance } from "@/lib/axiosInstance";

// 원본 응답은 한글 키를 사용하므로 그대로 반환하고, 컴포넌트에서 매핑합니다.
export type RawStockInfoResponse = Record<string, any>;

export const getStockInfoByCode = async (
  stockCode: string
): Promise<RawStockInfoResponse> => {
  const { data } = await axiosInstance.get(`/info/stock/${stockCode}`);
  return data;
};
