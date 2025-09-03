import { useEffect, useMemo, useState } from "react";
import PriceVolumeChart from "./PriceVolumeChart";
import StockChartHeader from "./StockChartHeader";
import type { HistoricalData } from "@/config/chart";
import { getStockChart } from "@/api/stock";

interface StockChartProps {
  code: string;
  data?: HistoricalData[];
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

export default function StockChartPrice({ code, data = [] }: StockChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRangePT>("1d");
  const [showMA, setShowMA] = useState({
    ma5: true,
    ma20: true,
    ma60: false,
    ma120: false,
  });
  const [remoteData, setRemoteData] = useState<HistoricalData[]>(data);
  const [loading, setLoading] = useState(false);

  const handleToggleMA = (key: keyof typeof showMA) => {
    setShowMA((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // timeRange -> API period/count 매핑
  const { period, count } = useMemo(() => {
    switch (timeRange) {
      case "1w":
        return { period: "W" as const, count: 500 }; // 최대 범위
      case "1mo":
        return { period: "M" as const, count: 500 }; // 최대 범위
      case "1y":
        return { period: "M" as const, count: 500 }; // 최대 범위
      default:
        return { period: "D" as const, count: 500 }; // 최대 범위
    }
  }, [timeRange]);

  // API 연동: 코드/기간 변경 시 fetch
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
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
      } catch {
        if (!cancelled) setRemoteData(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [code, period, count]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-[650px] flex flex-col">
      <StockChartHeader
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        showMA={showMA}
        onToggleMA={handleToggleMA}
      />
      <div className="flex-1">
        {loading ? (
          <div className="h-[500px] bg-gray-100 rounded animate-pulse" />
        ) : (
          <PriceVolumeChart
            data={remoteData}
            timeRange={timeRange}
            showMA={showMA}
          />
        )}
      </div>
    </div>
  );
}
