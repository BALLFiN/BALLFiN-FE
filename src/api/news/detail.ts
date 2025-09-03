import { axiosInstance } from "@/lib/axiosInstance";
import { NewsItem } from "./types";
import { isAxiosError } from "axios";

export const getNewsDetail = async (newsId: string): Promise<NewsItem> => {
  try {
    const response = await axiosInstance.get<NewsItem>(`/api/news/${newsId}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
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
