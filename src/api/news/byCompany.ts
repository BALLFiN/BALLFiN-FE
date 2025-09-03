import { axiosInstance } from "@/lib/axiosInstance";

export interface CompanyNewsItemDTO {
  id: string;
  press: string;
  title: string;
  published_at: string;
  impact: "positive" | "negative" | "neutral";
}

export interface CompanyNewsResponse {
  results: CompanyNewsItemDTO[];
}

export async function getNewsByCompany(stockCode: string, limit = 10) {
  const { data } = await axiosInstance.get<CompanyNewsResponse>(
    `/api/news/by-company/${stockCode}`,
    {
      params: { limit },
    }
  );
  return data.results;
}
