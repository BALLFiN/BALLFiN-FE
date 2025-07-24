import { TimeRangePT } from '@/components/stockDetail/chart';

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

export interface HistoricalData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ma5?: number;
  ma20?: number;
  ma60?: number;
  ma120?: number;
}
