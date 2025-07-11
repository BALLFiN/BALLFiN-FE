import { ArrowLeft, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface StockHeaderProps {
  name: string;
  code: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  currentPrice: number;
  changeAmount: number;
  changePercent: number;
  previousVolume?: number;
  currentVolume?: number;
  tradingAmount?: number;
  week52High?: {
    price: number;
    date: string;
  };
  week52Low?: {
    price: number;
    date: string;
  };
  upperLimit?: number;
  lowerLimit?: number;
}

export default function StockHeader({
  name,
  code,
  isFavorite,
  onToggleFavorite,
  currentPrice,
  changeAmount,
  changePercent,
  previousVolume,
  currentVolume,
  tradingAmount,
  week52High,
  week52Low,
  upperLimit,
  lowerLimit,
}: StockHeaderProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const isPositive = changeAmount >= 0;

  return (
    <div className="bg-white p-6 ">
      <div className="flex items-center justify-between">
        {/* 왼쪽 영역: 뒤로가기 + 종목 정보 + 현재가 */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate(-1)}
            className="p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>

          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
              <p className="text-gray-500 text-sm">{code}</p>
            </div>

            {/* 구분선 */}
            <div className="w-px h-8 bg-gray-200"></div>

            {/* 현재가 정보 */}
            <div
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {currentPrice.toLocaleString()}원
                </div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <div
                    className={`w-0 h-0 border-l-4 border-r-4 ${
                      isPositive
                        ? "border-b-6 border-b-red-500 border-l-transparent border-r-transparent"
                        : "border-t-6 border-t-blue-500 border-l-transparent border-r-transparent"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      isPositive ? "text-red-500" : "text-blue-500"
                    }`}
                  >
                    {isPositive ? "+" : ""}
                    {changeAmount.toLocaleString()}원 (
                    {changePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>

              {/* Hover 시 추가 정보 */}
              {isHovered && (
                <div className="absolute top-full left-0 mt-3 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-10 min-w-[400px]">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {/* 거래량 정보 */}
                    <div className="space-y-2">
                      <div className="font-medium text-gray-700 mb-2">
                        거래량 정보
                      </div>
                      {previousVolume && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">전일거래량:</span>
                          <span className="font-medium">
                            {previousVolume.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {currentVolume && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">거래량:</span>
                          <span className="font-medium">
                            {currentVolume.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {tradingAmount && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">거래금:</span>
                          <span className="font-medium">
                            {(tradingAmount / 1000000000).toFixed(1)}억원
                          </span>
                        </div>
                      )}
                    </div>

                    {/* 52주 정보 */}
                    <div className="space-y-2">
                      <div className="font-medium text-gray-700 mb-2">
                        52주 정보
                      </div>
                      {week52High && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">52주최고:</span>
                          <span className="font-medium text-red-600">
                            {week52High.price.toLocaleString()}원
                          </span>
                        </div>
                      )}
                      {week52High && (
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">최고일:</span>
                          <span className="text-gray-500">
                            {week52High.date}
                          </span>
                        </div>
                      )}
                      {week52Low && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">52주최저:</span>
                          <span className="font-medium text-blue-600">
                            {week52Low.price.toLocaleString()}원
                          </span>
                        </div>
                      )}
                      {week52Low && (
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">최저일:</span>
                          <span className="text-gray-500">
                            {week52Low.date}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* 가격 제한 */}
                    {(upperLimit || lowerLimit) && (
                      <div className="col-span-2 space-y-2 mt-2 pt-2 border-t border-gray-200">
                        <div className="font-medium text-gray-700">
                          가격 제한
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {upperLimit && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">상한가:</span>
                              <span className="font-medium text-red-600">
                                {upperLimit.toLocaleString()}원
                              </span>
                            </div>
                          )}
                          {lowerLimit && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">하한가:</span>
                              <span className="font-medium text-blue-600">
                                {lowerLimit.toLocaleString()}원
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 오른쪽 영역: 즐겨찾기 */}
        <button
          onClick={onToggleFavorite}
          className={`p-3 rounded-lg hover:bg-gray-50 transition-colors ${
            isFavorite ? "text-yellow-500" : "text-gray-400"
          }`}
        >
          <Star size={20} />
        </button>
      </div>
    </div>
  );
}
