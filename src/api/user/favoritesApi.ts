import { axiosInstance } from "@/lib/axiosInstance";

// 즐겨찾기 목록 조회
export const getFavorites = async (): Promise<string[]> => {
  try {
    const response = await axiosInstance.get("/api/user/favorites");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 즐겨찾기 추가
export const addFavorite = async (tickerOrCompany: string): Promise<string> => {
  try {
    const response = await axiosInstance.post("/api/user/favorites", {
      ticker_or_company: tickerOrCompany,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 즐겨찾기 제거
export const removeFavorite = async (
  tickerOrCompany: string
): Promise<string> => {
  try {
    const response = await axiosInstance.delete("/api/user/favorites", {
      data: {
        ticker_or_company: tickerOrCompany,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
