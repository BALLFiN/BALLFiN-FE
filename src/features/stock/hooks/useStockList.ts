import { useQuery } from "@tanstack/react-query";
import { getStockList, SortBy } from "@/api/stock";

export const useStockList = (sortBy: SortBy = "market_cap_desc") => {
  return useQuery({
    queryKey: ["stockList", sortBy],
    queryFn: () => getStockList(sortBy),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};
