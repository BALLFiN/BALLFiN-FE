import { useQuery } from "@tanstack/react-query";
import { searchStockData, StockSearchParams } from "@/api/stock";

export const useStockSearch = (params: StockSearchParams) => {
  return useQuery({
    queryKey: ["stockSearch", params],
    queryFn: () => searchStockData(params),
    enabled: !!params.stock_codes,
    staleTime: 1 * 60 * 1000, // 1분
    gcTime: 5 * 60 * 1000, // 5분
  });
};
