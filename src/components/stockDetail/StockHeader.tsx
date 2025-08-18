import { ArrowLeft, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStockInfoByCode } from "@/api/stock";

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

  // 로컬 표시 상태 (초깃값은 부모에서 받은 값 사용)
  const [displayName, setDisplayName] = useState<string>("");
  const [price, setPrice] = useState<number>(currentPrice);
  const [diffAmount, setDiffAmount] = useState<number>(changeAmount);
  const [diffPercent, setDiffPercent] = useState<number>(changePercent);
  const [prevVol, setPrevVol] = useState<number | undefined>(previousVolume);
  const [currVol, setCurrVol] = useState<number | undefined>(currentVolume);
  const [tradingAmt, setTradingAmt] = useState<number | undefined>(
    tradingAmount
  );
  const [w52High, setW52High] = useState<
    { price: number; date: string } | undefined
  >(week52High);
  const [w52Low, setW52Low] = useState<
    { price: number; date: string } | undefined
  >(week52Low);
  const [upLimit, setUpLimit] = useState<number | undefined>(upperLimit);
  const [downLimit, setDownLimit] = useState<number | undefined>(lowerLimit);

  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchDetail = async () => {
      try {
        const data = await getStockInfoByCode(code);
        if (!isMounted || !data) return;

        // 한글 키 매핑
        const apiPrice =
          typeof data["현재가"] === "number" ? data["현재가"] : undefined;
        const apiName =
          typeof data["기업명"] === "string" ? data["기업명"] : undefined;
        const apiDiffPercent =
          typeof data["등락"] === "number" ? data["등락"] : undefined;
        const apiDiffAmount =
          typeof data["전일대비"] === "number" ? data["전일대비"] : undefined;
        const apiPrevVol =
          typeof data["전일거래량"] === "number"
            ? data["전일거래량"]
            : undefined;
        const apiCurrVol =
          typeof data["거래량"] === "number" ? data["거래량"] : undefined;
        const apiTradingAmtUnit =
          typeof data["거래대금"] === "number" ? data["거래대금"] : undefined; // 억원 단위로 가정
        const apiW52High =
          typeof data["52주최고"] === "number" ? data["52주최고"] : undefined;
        const apiW52HighDate =
          typeof data["최고일"] === "string" ? data["최고일"] : undefined;
        const apiW52Low =
          typeof data["52주최저"] === "number" ? data["52주최저"] : undefined;
        const apiW52LowDate =
          typeof data["최저일"] === "string" ? data["최저일"] : undefined;
        const apiUpper =
          typeof data["상한가"] === "number" ? data["상한가"] : undefined;
        const apiLower =
          typeof data["하한가"] === "number" ? data["하한가"] : undefined;

        if (apiPrice !== undefined) setPrice(apiPrice);
        if (apiName) setDisplayName(apiName);
        if (apiDiffAmount !== undefined) setDiffAmount(apiDiffAmount);
        if (apiDiffPercent !== undefined) setDiffPercent(apiDiffPercent);
        if (apiPrevVol !== undefined) setPrevVol(apiPrevVol);
        if (apiCurrVol !== undefined) setCurrVol(apiCurrVol);
        // 표시부에서 억원 단위 표기를 위해 원 단위로 변환해두고 기존 포맷 유지(1억 = 100,000,000)
        if (apiTradingAmtUnit !== undefined)
          setTradingAmt(apiTradingAmtUnit * 100_000_000);
        if (apiW52High !== undefined && apiW52HighDate)
          setW52High({ price: apiW52High, date: apiW52HighDate });
        if (apiW52Low !== undefined && apiW52LowDate)
          setW52Low({ price: apiW52Low, date: apiW52LowDate });
        if (apiUpper !== undefined) setUpLimit(apiUpper);
        if (apiLower !== undefined) setDownLimit(apiLower);
      } catch (_) {
        // 실패 시 부모가 준 값 그대로 사용
        if (!displayName) setDisplayName(name);
        setPrice(currentPrice);
        setDiffAmount(changeAmount);
        setDiffPercent(changePercent);
        setPrevVol(previousVolume);
        setCurrVol(currentVolume);
        setTradingAmt(tradingAmount);
        if (week52High) setW52High(week52High);
        if (week52Low) setW52Low(week52Low);
        setUpLimit(upperLimit);
        setDownLimit(lowerLimit);
      } finally {
        if (isMounted) setApiLoaded(true);
      }
    };
    fetchDetail();
    return () => {
      isMounted = false;
    };
  }, [code]);

  const isPositive = diffAmount >= 0;

  return (
    <div className="bg-white p-6 ">
      <div className="flex items-center justify-between">
        {/* 왼쪽 영역: 뒤로가기 + 종목 정보 + 현재가 + 즐겨찾기 */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate(-1)}
            className="p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>

          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {displayName || name}
              </h1>
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
              <div className="text-center cursor-default">
                <div className="text-2xl font-bold text-gray-900">
                  {apiLoaded ? (
                    price.toLocaleString() + "원"
                  ) : (
                    <span className="inline-block w-24 h-6 bg-gray-200 rounded animate-pulse" />
                  )}
                </div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <div
                    className={`w-0 h-0 border-l-4 border-r-4 ${
                      isPositive
                        ? "border-b-6 border-b-red-500 border-l-transparent border-r-transparent"
                        : "border-t-6 border-t-blue-500 border-l-transparent border-r-transparent"
                    }`}
                  />
                  {apiLoaded ? (
                    <span
                      className={`text-sm font-medium ${isPositive ? "text-red-500" : "text-blue-500"}`}
                    >
                      {isPositive ? "+" : ""}
                      {diffAmount.toLocaleString()}원 ({diffPercent.toFixed(2)}
                      %)
                    </span>
                  ) : (
                    <span className="inline-block w-40 h-4 bg-gray-200 rounded animate-pulse" />
                  )}
                </div>
              </div>

              {/* Hover 시 추가 정보 */}
              {isHovered && (
                <div className="absolute top-full left-0 mt-3 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-10 min-w-[400px] ">
                  <div className="grid grid-cols-2 gap-4 text-sm ">
                    {/* 거래량 정보 */}
                    <div className="space-y-2">
                      <div className="font-medium text-gray-700 mb-2">
                        거래량 정보
                      </div>
                      {prevVol && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">전일거래량:</span>
                          <span className="font-medium">
                            {prevVol.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {currVol && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">거래량:</span>
                          <span className="font-medium">
                            {currVol.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {tradingAmt && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">거래금:</span>
                          <span className="font-medium">
                            {(tradingAmt / 100000000).toFixed(1)}억원
                          </span>
                        </div>
                      )}
                    </div>

                    {/* 52주 정보 */}
                    <div className="space-y-2">
                      <div className="font-medium text-gray-700 mb-2">
                        52주 정보
                      </div>
                      {w52High && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">52주최고:</span>
                          <span className="font-medium text-red-600">
                            {w52High.price.toLocaleString()}원
                          </span>
                        </div>
                      )}
                      {w52High && (
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">최고일:</span>
                          <span className="text-gray-500">{w52High.date}</span>
                        </div>
                      )}
                      {w52Low && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">52주최저:</span>
                          <span className="font-medium text-blue-600">
                            {w52Low.price.toLocaleString()}원
                          </span>
                        </div>
                      )}
                      {w52Low && (
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">최저일:</span>
                          <span className="text-gray-500">{w52Low.date}</span>
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
                          {upLimit && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">상한가:</span>
                              <span className="font-medium text-red-600">
                                {upLimit.toLocaleString()}원
                              </span>
                            </div>
                          )}
                          {downLimit && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">하한가:</span>
                              <span className="font-medium text-blue-600">
                                {downLimit.toLocaleString()}원
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

            {/* 구분선 */}
            <div className="w-px h-8 bg-gray-200"></div>

            {/* 즐겨찾기 */}
            <button
              onClick={onToggleFavorite}
              className={`p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
                isFavorite ? "text-yellow-500" : "text-gray-400"
              }`}
            >
              <Star size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
