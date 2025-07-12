import { useNavigate } from "react-router-dom";
import { StockItem } from "./types";
import { Star } from "lucide-react";

interface StockListProps {
  stocks: StockItem[];
  favoriteStocks: number[];
  onToggleFavorite: (stockId: number) => void;
}

export default function StockList({
  stocks,
  favoriteStocks,
  onToggleFavorite,
}: StockListProps) {
  const navigate = useNavigate();

  const handleViewDetail = (stockCode: string) => {
    navigate(`/stock/${stockCode}`);
  };

  const safeNumber = (value: number | undefined | null, suffix = "") =>
    value !== undefined && value !== null
      ? value.toLocaleString() + suffix
      : "-";

  const formatVolume = (volume: number) => {
    if (volume >= 1000000000) {
      return (volume / 1000000000).toFixed(1) + "B";
    } else if (volume >= 1000000) {
      return (volume / 1000000).toFixed(1) + "M";
    } else if (volume >= 1000) {
      return (volume / 1000).toFixed(1) + "K";
    }
    return volume.toLocaleString();
  };

  return (
    <div className="bg-whiteborder border-gray-200 overflow-hidden">
      {/* 테이블 헤더 */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="hidden lg:grid grid-cols-9 gap-4 px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
          <div className="col-span-1">관심</div>
          <div className="col-span-2">종목명</div>
          <div className="col-span-1 text-right">현재가</div>
          <div className="col-span-1 text-right">전일대비</div>
          <div className="col-span-1 text-right">등락률</div>
          <div className="col-span-1 text-right">거래량</div>
          <div className="col-span-1 text-right">거래대금</div>
          <div className="col-span-1 text-right">시가총액</div>
        </div>
        {/* 모바일 헤더 */}
        <div className="lg:hidden px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
          주식 목록
        </div>
      </div>

      {/* 테이블 바디 */}
      <div>
        {stocks.slice(0, 20).map((stock) => (
          <div
            key={stock.id}
            className="hidden lg:grid grid-cols-9 gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => handleViewDetail(stock.code)}
          >
            {/* 관심종목 */}
            <div className="col-span-1 flex items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(stock.id);
                }}
                className={`p-1 rounded-full transition-colors ${
                  favoriteStocks.includes(stock.id)
                    ? "text-yellow-500 hover:text-yellow-600"
                    : "text-gray-400 hover:text-yellow-500"
                }`}
              >
                <Star
                  size={16}
                  fill={
                    favoriteStocks.includes(stock.id) ? "currentColor" : "none"
                  }
                />
              </button>
            </div>

            {/* 종목명 */}
            <div className="col-span-2">
              <div className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                {stock.name}
              </div>
              <div className="text-sm text-gray-500">{stock.code}</div>
            </div>

            {/* 현재가 */}
            <div className="col-span-1 text-right">
              <div className="font-bold text-lg text-gray-900">
                {safeNumber(stock.price, "원")}
              </div>
            </div>

            {/* 전일대비 */}
            <div className="col-span-1 text-right">
              <div
                className={`font-semibold flex items-center justify-end gap-1 ${
                  stock.change >= 0 ? "text-red-600" : "text-blue-600"
                }`}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={
                    stock.change >= 0 ? "text-red-600" : "text-blue-600"
                  }
                  style={{
                    transform:
                      stock.change >= 0 ? "rotate(0deg)" : "rotate(180deg)",
                  }}
                >
                  <path d="M12 2L4 18L20 18L12 2Z" fill="currentColor" />
                </svg>
                {stock.change >= 0 ? "+" : ""}
                {stock.change.toFixed(1)}
              </div>
            </div>

            {/* 등락률 */}
            <div className="col-span-1 text-right">
              <div
                className={`font-semibold ${
                  stock.changePercent >= 0 ? "text-red-600" : "text-blue-600"
                }`}
              >
                {stock.changePercent >= 0 ? "+" : ""}
                {stock.changePercent.toFixed(2)}%
              </div>
            </div>

            {/* 거래량 */}
            <div className="col-span-1 text-right">
              <div className="text-sm text-gray-700">
                {formatVolume(stock.volume)}
              </div>
            </div>

            {/* 거래대금 (추정) */}
            <div className="col-span-1 text-right">
              <div className="text-sm text-gray-700">
                {formatVolume(stock.volume * stock.price)}
              </div>
            </div>

            {/* 시가총액 (추정) */}
            <div className="col-span-1 text-right">
              <div className="text-sm text-gray-700">
                {formatVolume(stock.volume * stock.price * 0.1)}
              </div>
            </div>
          </div>
        ))}

        {/* 모바일 카드 뷰 */}
        <div className="lg:hidden">
          {stocks.slice(0, 20).map((stock) => (
            <div
              key={stock.id}
              className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleViewDetail(stock.code)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(stock.id);
                    }}
                    className={`p-1 rounded-full transition-colors ${
                      favoriteStocks.includes(stock.id)
                        ? "text-yellow-500"
                        : "text-gray-400 hover:text-yellow-500"
                    }`}
                  >
                    <Star
                      size={16}
                      fill={
                        favoriteStocks.includes(stock.id)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {stock.name}
                    </div>
                    <div className="text-sm text-gray-500">{stock.code}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-gray-900">
                    {safeNumber(stock.price, "원")}
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      stock.changePercent >= 0
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                  >
                    {stock.changePercent >= 0 ? "+" : ""}
                    {stock.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-500">거래량</div>
                  <div className="font-medium">
                    {formatVolume(stock.volume)}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">거래대금</div>
                  <div className="font-medium">
                    {formatVolume(stock.volume * stock.price)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 결과 없음 */}
      {stocks.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
}
