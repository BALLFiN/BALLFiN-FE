import { useQuery } from "@tanstack/react-query";
import { getStockList } from "@/api/stock";

export const useStockList = () => {
  return useQuery({
    queryKey: ["stockList"],
    queryFn: getStockList,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};
