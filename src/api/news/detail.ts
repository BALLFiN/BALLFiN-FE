import axios from "axios";
import { NewsItem } from "./types";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const getNewsDetail = async (newsId: string): Promise<NewsItem> => {
  try {
    const response = await axios.get<NewsItem>(`${API_URL}/news/${newsId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("해당 뉴스를 찾을 수 없습니다.");
      }
      if (error.response?.status === 422) {
        throw new Error("잘못된 뉴스 ID입니다.");
      }
    }
    throw new Error("뉴스 상세 정보를 불러오는데 실패했습니다.");
  }
};
