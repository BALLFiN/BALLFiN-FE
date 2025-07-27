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

export const getStockList = async (): Promise<StockListResponse> => {
  try {
    // /stock/search API를 사용해서 전체 주식 데이터 가져오기
    const response = await axiosInstance.get("/stock/search", {
      params: {
        stock_codes:
          "005930,000660,035420,035720,051910,000270,006400,068270,207940,373220", // 데이터가 있는 주요 KOSPI 종목들
        period: "D",
        count: 30,
        sort_by: "newest",
      },
    });

    console.log("API 응답 전체:", response);
    console.log("API 응답 데이터:", response.data);

    // API 응답을 StockItem 형태로 변환
    // 실제 API 응답 구조: response.data.stocks (객체)
    const stocksData = response.data?.stocks;
    if (!stocksData || typeof stocksData !== "object") {
      console.warn("API 응답 데이터가 예상과 다릅니다:", response.data);
      throw new Error("API 응답 데이터가 올바르지 않습니다.");
    }

    // 각 종목별로 최신 데이터 추출
    const stockItems: StockItem[] = [];
    let id = 1;

    Object.entries(stocksData).forEach(([code, stockData]: [string, any]) => {
      // 에러가 있는 종목은 건너뛰기
      if (stockData.error) {
        console.warn(`종목 ${code} 데이터 없음:`, stockData.error);
        return;
      }

      // candles 배열에서 최신 데이터 가져오기
      if (
        stockData.candles &&
        Array.isArray(stockData.candles) &&
        stockData.candles.length > 0
      ) {
        const latestCandle = stockData.candles[0]; // 최신 데이터 (newest 정렬)

        stockItems.push({
          id: id++,
          name: getStockNameByCode(code),
          code: code,
          price: latestCandle.close,
          close: latestCandle.close,
          high: latestCandle.high,
          low: latestCandle.low,
          change: latestCandle.change || 0,
          changePercent: latestCandle.change_percent || 0,
          volume: latestCandle.volume,
          score: Math.floor(Math.random() * 100), // 임시 점수
          sentiment: getRandomSentiment(),
          newsCount: Math.floor(Math.random() * 20),
          prediction: {
            targetPrice: Math.floor(
              latestCandle.close * (1 + (Math.random() - 0.5) * 0.2)
            ),
            confidence: Math.random(),
            recommendation: getRandomRecommendation(),
          },
        });
      }
    });

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

// 주식 코드별 이름 매핑
const getStockNameByCode = (code: string): string => {
  const stockNames: { [key: string]: string } = {
    "005930": "삼성전자",
    "000660": "SK하이닉스",
    "005380": "현대자동차",
    "066570": "LG전자",
    "035420": "NAVER",
    "035720": "카카오",
    "051910": "LG화학",
    "005490": "POSCO홀딩스",
    "000270": "기아",
    "105560": "KB금융",
    "006400": "삼성SDI",
    "051900": "LG생활건강",
    "068270": "셀트리온",
    "207940": "삼성바이오로직스",
    "323410": "카카오뱅크",
    "373220": "LG에너지솔루션",
    "086790": "하나금융지주",
  };
  return stockNames[code] || code;
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
