import { useState } from 'react';
import PriceVolumeChart from './PriceVolumeChart';
import StockChartHeader from './StockChartHeader';

interface StockChartProps {
  data: HistoricalData[];
}
export type HistoricalData = {
  date: string;
  close: number;
  volume: number;
};
export type TimeRangePT = '1m' | '5m' | '15m' | '30m' | '1h' | '1d' | '1w' | '1M' | '3M' | '1y';

export default function StockChartPrice({ data }: StockChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRangePT>('1d');
  const [showMA, setShowMA] = useState({ ma5: true, ma20: true, ma60: false, ma120: false });

  const handleToggleMA = (key: keyof typeof showMA) => {
    setShowMA((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 max-w-6xl mx-auto">
      <StockChartHeader
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        showMA={showMA}
        onToggleMA={handleToggleMA}
      />
      <PriceVolumeChart data={data} timeRange={timeRange} showMA={showMA} />
    </div>
  );
}
