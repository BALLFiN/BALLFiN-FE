interface StockInfoProps {
  price: number;
  change: number;
  prediction: {
    targetPrice: number;
    confidence: number;
    recommendation: "buy" | "sell" | "hold";
  };
  sentiment: "positive" | "negative" | "neutral";
  score: number;
  newsCount: number;
}

export default function StockInfo({
  price,
  change,
  prediction,
  sentiment,
  score,
  newsCount,
}: StockInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold mb-2">현재가</h3>
        <div className="text-2xl font-bold">{price.toLocaleString()}원</div>
        <div
          className={`text-sm ${
            change >= 0 ? "text-red-500" : "text-blue-500"
          }`}
        >
          {change >= 0 ? "+" : ""}
          {change.toFixed(2)}%
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold mb-2">예측 정보</h3>
        <div className="flex items-center gap-2 mb-2">
          <div className="text-xl font-bold">
            {prediction.targetPrice.toLocaleString()}원
          </div>
          <div className="text-sm text-gray-500">
            (신뢰도: {Math.round(prediction.confidence * 100)}%)
          </div>
        </div>
        <div
          className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${
            prediction.recommendation === "buy"
              ? "bg-green-100 text-green-800"
              : prediction.recommendation === "sell"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
          }`}
        >
          {prediction.recommendation === "buy"
            ? "매수"
            : prediction.recommendation === "sell"
              ? "매도"
              : "관망"}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold mb-2">시장 심리</h3>
        <div className="flex items-center gap-2 mb-2">
          <div
            className={`w-3 h-3 rounded-full ${
              sentiment === "positive"
                ? "bg-green-500"
                : sentiment === "negative"
                  ? "bg-red-500"
                  : "bg-gray-500"
            }`}
          />
          <div className="text-xl font-bold">{score}</div>
        </div>
        <div className="text-sm text-gray-500">{newsCount}개의 관련 뉴스</div>
      </div>
    </div>
  );
}
