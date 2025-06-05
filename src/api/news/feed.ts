import axios from "axios";
import { NewsItem } from "./types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export interface MyFeedParams {
  limit?: number;
}

interface MyFeedResponse {
  results: NewsItem[];
  total: number;
}

export const getMyFeed = async (
  params: MyFeedParams = {},
): Promise<NewsItem[]> => {
  try {
    const requestUrl = `${API_URL}/news/my-feed`;
    const requestParams = {
      limit: params.limit || 20,
    };

    const tokenKey = "access_token";
    let token = localStorage.getItem(tokenKey);
    if (token && !token.startsWith("Bearer ")) {
      token = `Bearer ${token}`;
    }

    console.log("API 요청 정보:", {
      url: requestUrl,
      params: requestParams,
      env: {
        VITE_API_URL: import.meta.env.VITE_API_URL,
        NODE_ENV: import.meta.env.NODE_ENV,
      },
      headers: {
        Authorization: token,
      },
    });

    const response = await axios.get<MyFeedResponse>(requestUrl, {
      params: requestParams,
      headers: {
        Authorization: token,
      },
    });

    console.log("API 응답:", {
      status: response.status,
      data: response.data,
      headers: response.headers,
    });

    return response.data.results;
  } catch (error) {
    console.error("API 에러 상세:", {
      error,
      isAxiosError: axios.isAxiosError(error),
      response: axios.isAxiosError(error)
        ? {
            status: error.response?.status,
            data: error.response?.data,
            headers: error.response?.headers,
          }
        : null,
    });

    if (axios.isAxiosError(error)) {
      // 404 Not Found - 즐겨찾기 종목이 없는 경우
      if (error.response?.status === 404) {
        const detail = error.response.data?.detail;
        if (typeof detail === "string" && detail.includes("즐겨찾기")) {
          throw new Error(detail);
        }
        throw new Error("요청한 리소스를 찾을 수 없습니다.");
      }

      // 422 Validation Error - 이메일 형식이 잘못된 경우
      if (error.response?.status === 422) {
        const detail = error.response.data?.detail;
        if (Array.isArray(detail) && detail.length > 0) {
          throw new Error(detail[0].msg || "잘못된 사용자 이메일입니다.");
        }
        throw new Error("잘못된 사용자 이메일입니다.");
      }

      // 서버 에러 응답이 있는 경우
      if (error.response?.data) {
        throw new Error(
          error.response.data.message || "뉴스 피드를 불러오는데 실패했습니다.",
        );
      }
    }
    throw new Error("뉴스 피드를 불러오는데 실패했습니다.");
  }
};
