import { axiosInstance } from "@/lib/axiosInstance";

export interface RelatedCompanyDTO {
  corp_name: string;
  stock_code: string;
  current_price: number;
  change: number;
  change_percent: number;
  week_52_high: number;
  week_52_low: number;
  volume: number;
  market_cap_billion: number;
}

export async function getRelatedCompanies(
  stockCode: string,
  sort_by = "market_cap_desc"
) {
  const { data } = await axiosInstance.get<RelatedCompanyDTO[]>(
    `/info/related-companies/${stockCode}`,
    { params: { sort_by } }
  );
  return data;
}
