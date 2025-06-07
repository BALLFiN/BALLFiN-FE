import axios from "axios";
import { NewsSearchParams } from "./types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const searchNews = async (params: NewsSearchParams): Promise<any> => {
  try {
    const response = await axios.get(`${API_URL}/news/search`, {
      params: {
        keyword: params.keyword,
        impact: params.impact,
        sort_by: params.sort_by,
        start_date: params.start_date,
        end_date: params.end_date,
        page: params.page,
        limit: params.limit,
      },
    });

    return response.data;
  } catch (error) {
    console.error("뉴스 검색 중 오류 발생:", error);
    throw error;
  }
};
