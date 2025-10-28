import { useEffect, useMemo, useState, memo, useCallback } from "react";
import PriceVolumeChart from "./PriceVolumeChart";
import StockChartHeader from "./StockChartHeader";
import type { HistoricalData } from "@/config/chart";
import { getStockChart } from "@/api/stock";

interface StockChartProps {
  code: string;
  data?: HistoricalData[];
  isLoading?: boolean;
}
export type TimeRangePT =
  | "1m"
  | "5m"
  | "30m"
  | "1h"
  | "6h"
  | "1d"
  | "1w"
  | "1mo"
  | "1y";

const StockChartPrice = memo(function StockChartPrice({
  code,
  data = [],
  isLoading = false,
}: StockChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRangePT>("1d");
  const [showMA, setShowMA] = useState({
    ma5: true,
    ma20: true,
    ma60: false,
    ma120: false,
  });
  const [remoteData, setRemoteData] = useState<HistoricalData[]>(data);
  const [loading, setLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 메모이제이션된 핸들러들
  const handleToggleMA = useCallback((key: keyof typeof showMA) => {
    setShowMA((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleTimeRangeChange = useCallback((newTimeRange: TimeRangePT) => {
    setTimeRange(newTimeRange);
  }, []);

  // timeRange -> API period/count 매핑 (최적화: 데이터 양 줄임)
  const { period, count } = useMemo(() => {
    switch (timeRange) {
      case "1w":
        return { period: "W" as const, count: 50 };
      case "1mo":
        return { period: "M" as const, count: 24 };
      case "1y":
        return { period: "M" as const, count: 24 };
      default:
        return { period: "D" as const, count: 180 };
    }
  }, [timeRange]);

  // 부모에서 받은 데이터를 우선 사용하고, 시간대 변경 시에만 추가 API 호출
  useEffect(() => {
    if (data.length > 0) {
      setRemoteData(data);
      setLoading(false);
    }
  }, [data]);

  // 시간대 변경 시 추가 API 호출 (초고속 버전)
  useEffect(() => {
    let cancelled = false;
    const abortController = new AbortController();

    const loadChartData = async () => {
      const startTime = performance.now();
      try {
        setLoading(true);
        setIsTransitioning(true);

        // 지연 제거 - 즉시 API 호출
        const res = await getStockChart(code, period, count);
        if (cancelled) return;

        const mapped: HistoricalData[] = res.candles.map((c) => ({
          date: c.date,
          open: c.open,
          high: c.high,
          low: c.low,
          close: c.close,
          volume: c.volume,
        }));

        setRemoteData(mapped);

        // 즉시 로딩 상태 해제
        setLoading(false);
        setIsTransitioning(false);

        const endTime = performance.now();
        console.log(
          `⚡ 차트 업데이트 완료: ${(endTime - startTime).toFixed(2)}ms`
        );
      } catch (error) {
        if (!cancelled) {
          console.error("차트 데이터 로딩 실패:", error);
          setRemoteData(data.length > 0 ? data : []);
          setLoading(false);
          setIsTransitioning(false);
        }
      }
    };

    loadChartData();

    return () => {
      cancelled = true;
      abortController.abort();
    };
  }, [code, period, count, timeRange, data]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-[650px] flex flex-col">
      <StockChartHeader
        timeRange={timeRange}
        onTimeRangeChange={handleTimeRangeChange}
        showMA={showMA}
        onToggleMA={handleToggleMA}
      />
      <div className="flex-1 relative">
        {isLoading || loading ? (
          <div className="h-[500px] bg-gray-100 rounded animate-pulse" />
        ) : (
          <div
            className={`transition-opacity duration-150 ${isTransitioning ? "opacity-70" : "opacity-100"}`}
          >
            <PriceVolumeChart
              data={remoteData}
              timeRange={timeRange}
              showMA={showMA}
            />
          </div>
        )}

        {/* 전환 중 오버레이 - 빠른 표시 */}
        {isTransitioning && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 rounded transition-opacity duration-100">
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs">업데이트 중...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default StockChartPrice;
