import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

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
  const url = `${API_URL}/news/by-company/${stockCode}`;
  const { data } = await axios.get<CompanyNewsResponse>(url, {
    params: { limit },
  });
  return data.results;
}
