import { axiosInstance } from "@/lib/axiosInstance";

export interface StockItem {
  id: number;
  name: string;
  code: string;
  price: number;
  close: number;
  high: number;
  low: number;
  change: number;
  changePercent?: number;
  change_percent?: number;
  volume: number;
  score: number;
  sentiment: "positive" | "negative" | "neutral";
  newsCount: number;
  prediction: {
    targetPrice: number;
    confidence: number;
    recommendation: "buy" | "sell" | "hold";
  };
}

export interface StockListResponse {
  data: StockItem[];
  message: string;
  status: number;
}

// 정렬 기준 타입 정의
export type SortBy =
  | "market_cap_desc"
  | "market_cap_asc"
  | "change_percent_desc"
  | "change_percent_asc"
  | "volume_desc"
  | "volume_asc";

// 새로운 API 응답 인터페이스
interface CompanyData {
  corp_name: string;
  stock_code: string;
  current_price: number;
  change: number;
  change_percent: number;
  week_52_high: number;
  week_52_low: number;
  volume: number;
  market_cap_billion: number;
}

export const getStockList = async (
  sortBy: SortBy = "market_cap_desc"
): Promise<StockListResponse> => {
  try {
    // 새로운 /info/companies API 사용
    const response = await axiosInstance.get("/info/companies", {
      params: {
        sort_by: sortBy,
      },
    });

    console.log("API 응답 전체:", response);
    console.log("API 응답 데이터:", response.data);

    // API 응답을 StockItem 형태로 변환
    const companiesData: CompanyData[] = response.data;
    if (!Array.isArray(companiesData)) {
      console.warn("API 응답 데이터가 예상과 다릅니다:", response.data);
      throw new Error("API 응답 데이터가 올바르지 않습니다.");
    }

    // 각 회사 데이터를 StockItem 형태로 변환
    const stockItems: StockItem[] = companiesData.map((company, index) => ({
      id: index + 1,
      name: company.corp_name,
      code: company.stock_code,
      price: company.current_price,
      close: company.current_price,
      high: company.week_52_high,
      low: company.week_52_low,
      change: company.change,
      changePercent: company.change_percent,
      change_percent: company.change_percent,
      volume: company.volume,
      score: Math.floor(Math.random() * 100), // 임시 점수
      sentiment: getRandomSentiment(),
      newsCount: Math.floor(Math.random() * 20),
      prediction: {
        targetPrice: Math.floor(
          company.current_price * (1 + (Math.random() - 0.5) * 0.2)
        ),
        confidence: Math.random(),
        recommendation: getRandomRecommendation(),
      },
    }));

    return {
      data: stockItems,
      message: "주식 목록을 성공적으로 가져왔습니다.",
      status: 200,
    };
  } catch (error) {
    console.error("주식 목록 가져오기 실패:", error);
    console.error("에러 상세:", {
      message: error instanceof Error ? error.message : "Unknown error",
      response:
        error instanceof Error && "response" in error
          ? error.response
          : "No response",
    });
    throw error;
  }
};

// 랜덤 감정 생성
const getRandomSentiment = (): "positive" | "negative" | "neutral" => {
  const sentiments = ["positive", "negative", "neutral"];
  return sentiments[Math.floor(Math.random() * sentiments.length)] as
    | "positive"
    | "negative"
    | "neutral";
};

// 랜덤 추천 생성
const getRandomRecommendation = (): "buy" | "sell" | "hold" => {
  const recommendations = ["buy", "sell", "hold"];
  return recommendations[Math.floor(Math.random() * recommendations.length)] as
    | "buy"
    | "sell"
    | "hold";
};
