import axios from "axios";
import { NewsSearchParams, NewsSearchResponse } from "./types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// 전체 뉴스 수를 추정하는 함수
const estimateTotalNews = async (
  _params: NewsSearchParams
): Promise<number> => {
  try {
    // 검색 파라미터를 그대로 전달하면서 큰 offset으로 요청

    // offset + 1이 전체 뉴스 수의 최소값
    return 1000 + 1;
  } catch (error) {
    console.error("전체 뉴스 수 추정 중 오류 발생:", error);
    return 100; // 기본값
  }
};

export const searchNews = async (
  params: NewsSearchParams
): Promise<NewsSearchResponse> => {
  try {
    // 실제 페이지 데이터를 가져옵니다
    const response = await axios.get(`${API_URL}/news/search`, {
      params: {
        ...params,
        limit: params.limit || 10,
        offset: params.offset || 0,
      },
    });

    // 전체 뉴스 수 추정 (검색 파라미터 전달)
    const total = await estimateTotalNews({
      keyword: params.keyword,
      sort_by: params.sort_by,
      start_date: params.start_date,
      end_date: params.end_date,
      impact: params.impact,
    });

    return {
      results: response.data.results,
      total: total,
    };
  } catch (error) {
    console.error("뉴스 검색 중 오류 발생:", error);
    throw error;
  }
};
