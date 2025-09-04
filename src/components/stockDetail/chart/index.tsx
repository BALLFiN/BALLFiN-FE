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
  const [loading, setLoading] = useState(false); // 초기에는 로딩하지 않음
  const [isTransitioning, setIsTransitioning] = useState(false); // 전환 애니메이션 상태

  const handleToggleMA = useCallback((key: keyof typeof showMA) => {
    setShowMA((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  // timeRange -> API period/count 매핑 (최적화: 데이터 양 줄임)
  const { period, count } = useMemo(() => {
    switch (timeRange) {
      case "1w":
        return { period: "W" as const, count: 50 }; // 50주로 줄임
      case "1mo":
        return { period: "M" as const, count: 24 }; // 24개월로 줄임
      case "1y":
        return { period: "M" as const, count: 24 }; // 24개월로 줄임
      default:
        return { period: "D" as const, count: 30 }; // 30일로 줄임
    }
  }, [timeRange]);

  // 부모에서 받은 데이터를 우선 사용하고, 시간대 변경 시에만 추가 API 호출
  useEffect(() => {
    // 부모에서 받은 초기 데이터 설정
    if (data.length > 0) {
      setRemoteData(data);
      setLoading(false);
    }
  }, [data]);

  // 시간대 변경 시에만 추가 API 호출
  useEffect(() => {
    if (timeRange === "1d") {
      // 기본 일봉은 부모 데이터 사용하고 로딩 완료
      setLoading(false);
      setIsTransitioning(false);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setIsTransitioning(true);

        // 부드러운 전환을 위한 약간의 지연
        await new Promise((resolve) => setTimeout(resolve, 100));

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

        // 데이터 설정 후 약간의 지연으로 부드러운 전환
        await new Promise((resolve) => setTimeout(resolve, 200));
      } catch {
        if (!cancelled) {
          // API 실패 시 기본 데이터 사용
          setRemoteData(data.length > 0 ? data : []);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          setIsTransitioning(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [code, period, count, timeRange, data]); // data 의존성 다시 추가

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-[650px] flex flex-col">
      <StockChartHeader
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        showMA={showMA}
        onToggleMA={handleToggleMA}
      />
      <div className="flex-1 relative">
        {isLoading || loading ? (
          <div className="h-[500px] bg-gray-100 rounded animate-pulse" />
        ) : (
          <div
            className={`transition-opacity duration-300 ${isTransitioning ? "opacity-50" : "opacity-100"}`}
          >
            <PriceVolumeChart
              data={remoteData}
              timeRange={timeRange}
              showMA={showMA}
            />
          </div>
        )}

        {/* 전환 중 오버레이 */}
        {isTransitioning && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded">
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">차트 업데이트 중...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default StockChartPrice;
