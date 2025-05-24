import axios from "axios";

export interface NewsItem {
  id: string;
  link: string;
  press: string;
  published_at: string;
  title: string;
  image_url: string;
  related_companies: string;
  views: number;
  summary: string;
  impact: "positive" | "negative" | "neutral";
  analysis: string;
  content: string;
}

export interface NewsSearchParams {
  keyword?: string;
  impact?: "positive" | "negative";
  sort_by?: "relevance" | "newest" | "oldest" | "views";
  start_date?: string;
  end_date?: string;
  limit?: number;
  offset?: number;
}

export interface NewsSearchResponse {
  results: NewsItem[];
  total: number;
}

export const searchNews = async (
  params: NewsSearchParams
): Promise<NewsSearchResponse> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/news/search`,
    { params }
  );
  return response.data;
};
