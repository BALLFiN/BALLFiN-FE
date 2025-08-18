import { useNavigate } from "react-router-dom";
import { StockItem } from "@/api/stock";
import { Star, ChevronRight } from "lucide-react";

interface StockListProps {
  stocks: StockItem[];
  favoriteStocks: string[];
  onToggleFavorite: (stockCode: string) => void;
  favoritesLoading?: boolean;
}

export default function StockList({
  stocks,
  favoriteStocks,
  onToggleFavorite,
  favoritesLoading = false,
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
    <div className="overflow-hidden">
      {/* 데스크톱: 테이블형 리스트 유지 */}
      <div className="hidden lg:block">
        {/* 헤더 */}
        <div className="grid grid-cols-9 gap-4 px-6 py-3 text-xs font-semibold text-gray-600 tracking-wider border-b border-black/10">
          <div className="col-span-1">관심</div>
          <div className="col-span-2">종목명</div>
          <div className="col-span-1 text-right">현재가</div>
          <div className="col-span-1 text-right">전일대비</div>
          <div className="col-span-1 text-right">등락률</div>
          <div className="col-span-1 text-right">거래량</div>
          <div className="col-span-1 text-right">거래대금</div>
          <div className="col-span-1 text-right">시가총액</div>
        </div>
        {/* 바디 */}
        <div className="divide-y divide-black/10">
          {stocks.slice(0, 20).map((stock) => (
            <div
              key={stock.id}
              className="grid grid-cols-9 gap-4 px-6 py-4 hover:bg-black/5 cursor-pointer transition-colors"
              onClick={() => handleViewDetail(stock.code)}
            >
              {/* 관심 */}
              <div className="col-span-1 flex items-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(stock.code);
                  }}
                  disabled={favoritesLoading}
                  aria-pressed={favoriteStocks.includes(stock.code)}
                  className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                    favoriteStocks.includes(stock.code)
                      ? "text-amber-500"
                      : "text-gray-400 hover:bg-black/10"
                  } ${favoritesLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <Star
                    size={18}
                    strokeWidth={1.75}
                    className={
                      favoriteStocks.includes(stock.code)
                        ? "text-amber-500"
                        : ""
                    }
                    fill={
                      favoriteStocks.includes(stock.code)
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>
              </div>

              {/* 종목명 */}
              <div className="col-span-2">
                <div className="font-semibold text-gray-900">{stock.name}</div>
                <div className="text-sm text-gray-500">{stock.code}</div>
              </div>

              {/* 현재가 */}
              <div className="col-span-1 text-right">
                <div className="font-semibold text-gray-900">
                  {safeNumber(stock.price, "원")}
                </div>
              </div>

              {/* 전일대비 */}
              <div className="col-span-1 text-right">
                <div
                  className={`font-medium flex items-center justify-end gap-1 ${
                    stock.change >= 0 ? "text-red-600" : "text-blue-600"
                  }`}
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={
                      stock.change >= 0 ? "text-red-600" : "text-blue-600"
                    }
                    style={{
                      transform:
                        stock.change >= 0 ? "rotate(0deg)" : "rotate(180deg)",
                    }}
                  >
                    <path d="M12 2L4 18L20 18L12 2Z" />
                  </svg>
                  <span>
                    {stock.change >= 0 ? "+" : ""}
                    {stock.change.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* 등락률 */}
              <div className="col-span-1 text-right">
                <div
                  className={`font-medium ${
                    (stock.changePercent ?? 0) >= 0
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                >
                  {(stock.changePercent ?? 0) >= 0 ? "+" : ""}
                  {(stock.changePercent ?? 0).toFixed(2)}%
                </div>
              </div>

              {/* 거래량 */}
              <div className="col-span-1 text-right">
                <div className="text-sm text-gray-700">
                  {formatVolume(stock.volume)}
                </div>
              </div>

              {/* 거래대금 */}
              <div className="col-span-1 text-right">
                <div className="text-sm text-gray-700">
                  {formatVolume(stock.volume * stock.price)}
                </div>
              </div>

              {/* 시가총액 */}
              <div className="col-span-1 text-right">
                <div className="text-sm text-gray-700">
                  {formatVolume(stock.volume * stock.price * 0.1)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 모바일: iOS 느낌의 리스트 */}
      <div className="lg:hidden divide-y divide-black/10">
        {stocks.slice(0, 20).map((stock) => (
          <div
            key={stock.id}
            role="button"
            tabIndex={0}
            onClick={() => handleViewDetail(stock.code)}
            className="group flex items-center gap-3 px-4 py-4 hover:bg-black/5 active:bg-black/10 transition-colors cursor-pointer select-none"
          >
            {/* Star accessory */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(stock.code);
              }}
              disabled={favoritesLoading}
              aria-pressed={favoriteStocks.includes(stock.code)}
              className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                favoriteStocks.includes(stock.code)
                  ? "text-amber-500"
                  : "text-gray-400 hover:bg-black/10"
              } ${favoritesLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <Star
                size={18}
                strokeWidth={1.75}
                className={
                  favoriteStocks.includes(stock.code) ? "text-amber-500" : ""
                }
                fill={
                  favoriteStocks.includes(stock.code) ? "currentColor" : "none"
                }
              />
            </button>

            {/* Main info */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <div className="truncate text-[15px] font-semibold text-gray-900">
                  {stock.name}
                </div>
                <span className="flex-shrink-0 text-[12px] text-gray-500">
                  {stock.code}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-4 text-[12px] text-gray-500">
                <span>거래량 {formatVolume(stock.volume)}</span>
                <span>거래대금 {formatVolume(stock.volume * stock.price)}</span>
              </div>
            </div>

            {/* Price & change */}
            <div className="text-right mr-1">
              <div className="text-[15px] font-semibold text-gray-900">
                {safeNumber(stock.price, "원")}
              </div>
              <div
                className={`flex items-center justify-end gap-1 text-[12px] font-medium ${
                  (stock.changePercent ?? 0) >= 0
                    ? "text-red-600"
                    : "text-blue-600"
                }`}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={
                    (stock.changePercent ?? 0) >= 0
                      ? "text-red-600"
                      : "text-blue-600"
                  }
                  style={{
                    transform:
                      (stock.changePercent ?? 0) >= 0
                        ? "rotate(0deg)"
                        : "rotate(180deg)",
                  }}
                >
                  <path d="M12 2L4 18L20 18L12 2Z" />
                </svg>
                <span>
                  {(stock.changePercent ?? 0) >= 0 ? "+" : ""}
                  {(stock.changePercent ?? 0).toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Chevron */}
            <span className="pointer-events-none h-8 w-8 rounded-full flex items-center justify-center text-gray-400 group-hover:text-gray-500">
              <ChevronRight size={18} strokeWidth={2} />
            </span>
          </div>
        ))}
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
