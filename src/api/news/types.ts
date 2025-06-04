export interface NewsItem {
  id: string;
  link: string;
  press: string;
  published_at: string;
  title: string;
  image_url: string;
  related_companies: string[];
  views: number;
  summary: string;
  impact: "positive" | "negative" | "neutral";
  analysis: string;
  content: string;
}

export interface NewsSearchParams {
  keyword?: string;
  sort_by?: "relevance" | "date" | "views";
  start_date?: string;
  end_date?: string;
  impact?: "positive" | "negative" | "neutral";
  limit?: number;
  offset?: number;
}

export interface NewsSearchResponse {
  results: NewsItem[];
  total: number;
}
