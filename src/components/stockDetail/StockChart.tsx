import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface HistoricalData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ma5?: number;
  ma20?: number;
}

interface StockChartProps {
  data: HistoricalData[];
  showMA: boolean;
  timeRange: "1d" | "1w" | "1m" | "3m" | "1y";
  onTimeRangeChange: (range: "1d" | "1w" | "1m" | "3m" | "1y") => void;
  onToggleMA: () => void;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold">{label}</p>
        <p className="text-red-500">
          시가: {payload[0].payload.open.toLocaleString()}원
        </p>
        <p className="text-red-500">
          고가: {payload[0].payload.high.toLocaleString()}원
        </p>
        <p className="text-blue-500">
          저가: {payload[0].payload.low.toLocaleString()}원
        </p>
        <p className="text-gray-700">
          종가: {payload[0].payload.close.toLocaleString()}원
        </p>
        <p className="text-gray-500">
          거래량: {payload[0].payload.volume.toLocaleString()}
        </p>
        {payload[0].payload.ma5 && (
          <>
            <p className="text-purple-500">
              MA5: {payload[0].payload.ma5.toLocaleString()}원
            </p>
            <p className="text-green-500">
              MA20: {payload[0].payload.ma20.toLocaleString()}원
            </p>
          </>
        )}
      </div>
    );
  }
  return null;
};

export default function StockChart({
  data,
  showMA,
  timeRange,
  onTimeRangeChange,
  onToggleMA,
}: StockChartProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">가격 차트</h2>
          <button
            onClick={onToggleMA}
            className={`px-3 py-1 rounded text-sm ${
              showMA
                ? "bg-[#0A5C2B] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            이동평균선
          </button>
        </div>
        <div className="flex gap-2">
          {["1d", "1w", "1m", "3m", "1y"].map((range) => (
            <button
              key={range}
              onClick={() => onTimeRangeChange(range as any)}
              className={`px-3 py-1 rounded ${
                timeRange === range
                  ? "bg-[#0A5C2B] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" orientation="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine yAxisId="left" y={0} stroke="#666" />
            {showMA && (
              <>
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="ma5"
                  stroke="#8b5cf6"
                  dot={false}
                  strokeWidth={1}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="ma20"
                  stroke="#22c55e"
                  dot={false}
                  strokeWidth={1}
                />
              </>
            )}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="volume"
              stroke="#26a69a"
              dot={false}
              strokeWidth={2}
              opacity={0.7}
            />
            {data.map((item, index) => (
              <g key={index}>
                <line
                  x1={index * (100 / data.length)}
                  y1={item.open}
                  x2={index * (100 / data.length)}
                  y2={item.close}
                  stroke={item.close >= item.open ? "#ef4444" : "#3b82f6"}
                  strokeWidth={2}
                />
                <line
                  x1={index * (100 / data.length)}
                  y1={item.high}
                  x2={index * (100 / data.length)}
                  y2={item.low}
                  stroke={item.close >= item.open ? "#ef4444" : "#3b82f6"}
                  strokeWidth={1}
                />
              </g>
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
