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
export type TimeRangePT = '1m' | '5m' | '30m' | '1h' | '6h' | '1d' | '1w' | '1mo' | '1y';

export const miniteTable: { key: TimeRangePT; label: string }[] = [
  { key: '1m', label: '1분' },
  { key: '5m', label: '5분' },
  { key: '30m', label: '30분' },
  { key: '1h', label: '1시간' },
  { key: '6h', label: '6시간' },
];
export const dayTable: { key: TimeRangePT; label: string }[] = [
  { key: '1d', label: '일봉' },
  { key: '1w', label: '주봉' },
  { key: '1mo', label: '월봉' },
  { key: '1y', label: '연봉' },
];
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
