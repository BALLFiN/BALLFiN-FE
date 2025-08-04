import { useState } from "react";
import PriceVolumeChart from "./PriceVolumeChart";
import StockChartHeader from "./StockChartHeader";

interface StockChartProps {
  data: HistoricalData[];
}
export type HistoricalData = {
  date: string;
  close: number;
  volume: number;
};
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

export default function StockChartPrice({ data }: StockChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRangePT>("1d");
  const [showMA, setShowMA] = useState({
    ma5: true,
    ma20: true,
    ma60: false,
    ma120: false,
  });

  const handleToggleMA = (key: keyof typeof showMA) => {
    setShowMA((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-[650px] flex flex-col">
      <StockChartHeader
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        showMA={showMA}
        onToggleMA={handleToggleMA}
      />
      <div className="flex-1">
        <PriceVolumeChart data={data} timeRange={timeRange} showMA={showMA} />
      </div>
    </div>
  );
}
