import { axiosInstance } from "@/lib/axiosInstance";
import { NewsSearchParams } from "./types";

export const searchNews = async (params: NewsSearchParams): Promise<any> => {
  try {
    const response = await axiosInstance.get("/news/search", {
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
