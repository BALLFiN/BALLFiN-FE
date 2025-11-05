import { axiosInstance } from "@/lib/axiosInstance";
import { NewsSearchParams } from "./types";

export const searchNews = async (params: NewsSearchParams): Promise<any> => {
  try {
    // 요청 파라미터 디버그 로그 (개발 환경에서만 노출)
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.debug("[searchNews] params", params);
    }
    const response = await axiosInstance.get("/api/news/search", {
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
    // 서버가 보낸 메시지가 있다면 함께 출력
    // eslint-disable-next-line no-console
    console.error(
      "뉴스 검색 중 오류 발생:",
      (error as any)?.response?.status,
      (error as any)?.response?.data || error
    );
    throw error;
  }
};
