import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
} from "recharts";
import { HistoricalData } from "@/config/chart";

interface StockChartProps {
  data: HistoricalData[];
  showMA: {
    ma5: boolean;
    ma20: boolean;
    ma60: boolean;
    ma120: boolean;
  };
  timeRange:
    | "1m"
    | "5m"
    | "15m"
    | "30m"
    | "1h"
    | "1d"
    | "1w"
    | "1m"
    | "3m"
    | "1y";
  onTimeRangeChange: (
    range: "1m" | "5m" | "15m" | "30m" | "1h" | "1d" | "1w" | "1m" | "3m" | "1y"
  ) => void;
  onToggleMA: (maType: "ma5" | "ma20" | "ma60" | "ma120") => void;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-900">{label}</p>
        <div className="space-y-1 mt-2">
          <p className="text-sm">
            <span className="text-gray-600">시가:</span>
            <span className="ml-2 font-medium">
              {data.open?.toLocaleString()}원
            </span>
          </p>
          <p className="text-sm">
            <span className="text-gray-600">고가:</span>
            <span className="ml-2 font-medium text-red-500">
              {data.high?.toLocaleString()}원
            </span>
          </p>
          <p className="text-sm">
            <span className="text-gray-600">저가:</span>
            <span className="ml-2 font-medium text-blue-500">
              {data.low?.toLocaleString()}원
            </span>
          </p>
          <p className="text-sm">
            <span className="text-gray-600">종가:</span>
            <span className="ml-2 font-medium">
              {data.close?.toLocaleString()}원
            </span>
          </p>
          <p className="text-sm">
            <span className="text-gray-600">거래량:</span>
            <span className="ml-2 font-medium">
              {data.volume?.toLocaleString()}
            </span>
          </p>
          {data.ma5 && (
            <div className="border-t pt-2 mt-2">
              <p className="text-sm">
                <span className="text-gray-600">MA5:</span>
                <span className="ml-2 font-medium text-purple-500">
                  {data.ma5?.toLocaleString()}원
                </span>
              </p>
              <p className="text-sm">
                <span className="text-gray-600">MA20:</span>
                <span className="ml-2 font-medium text-green-500">
                  {data.ma20?.toLocaleString()}원
                </span>
              </p>
              <p className="text-sm">
                <span className="text-gray-600">MA60:</span>
                <span className="ml-2 font-medium text-orange-500">
                  {data.ma60?.toLocaleString()}원
                </span>
              </p>
              <p className="text-sm">
                <span className="text-gray-600">MA120:</span>
                <span className="ml-2 font-medium text-blue-500">
                  {data.ma120?.toLocaleString()}원
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

// 주가 차트 컴포넌트 (꺾은선)
const PriceChart = ({
  data,
  showMA,
}: {
  data: HistoricalData[];
  showMA: { ma5: boolean; ma20: boolean; ma60: boolean; ma120: boolean };
}) => {
  return (
    <div className="h-[300px] mb-4">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getMonth() + 1}/${date.getDate()}`;
            }}
          />
          <YAxis
            domain={["dataMin - 1000", "dataMax + 1000"]}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip content={<CustomTooltip />} />

          {/* 주가 꺾은선 (빨간색) */}
          <Line
            type="monotone"
            dataKey="close"
            stroke="#ef4444"
            strokeWidth={2}
            dot={false}
            name="주가"
          />

          {/* 이동평균선들 */}
          {showMA.ma5 && (
            <Line
              type="monotone"
              dataKey="ma5"
              stroke="#8b5cf6"
              dot={false}
              strokeWidth={1.5}
              name="MA5"
            />
          )}
          {showMA.ma20 && (
            <Line
              type="monotone"
              dataKey="ma20"
              stroke="#22c55e"
              dot={false}
              strokeWidth={1.5}
              name="MA20"
            />
          )}
          {showMA.ma60 && (
            <Line
              type="monotone"
              dataKey="ma60"
              stroke="#f97316"
              dot={false}
              strokeWidth={1.5}
              name="MA60"
            />
          )}
          {showMA.ma120 && (
            <Line
              type="monotone"
              dataKey="ma120"
              stroke="#3b82f6"
              dot={false}
              strokeWidth={1.5}
              name="MA120"
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

// 거래량 차트 컴포넌트
const VolumeChart = ({ data }: { data: HistoricalData[] }) => {
  return (
    <div className="h-[150px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getMonth() + 1}/${date.getDate()}`;
            }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-2 border border-gray-200 rounded shadow">
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-sm text-gray-600">
                      거래량: {payload[0].value?.toLocaleString()}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar
            dataKey="volume"
            fill="#26a69a"
            opacity={0.7}
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default function StockChart({
  data,
  showMA,
  timeRange,
  onTimeRangeChange,
  onToggleMA,
}: StockChartProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-900">가격 차트</h2>

          {/* 이동평균선 토글 버튼들 */}
          <div className="flex gap-2">
            <button
              onClick={() => onToggleMA("ma5")}
              className={`px-2 py-1 rounded text-xs transition-colors ${
                showMA.ma5
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              MA5
            </button>
            <button
              onClick={() => onToggleMA("ma20")}
              className={`px-2 py-1 rounded text-xs transition-colors ${
                showMA.ma20
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              MA20
            </button>
            <button
              onClick={() => onToggleMA("ma60")}
              className={`px-2 py-1 rounded text-xs transition-colors ${
                showMA.ma60
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              MA60
            </button>
            <button
              onClick={() => onToggleMA("ma120")}
              className={`px-2 py-1 rounded text-xs transition-colors ${
                showMA.ma120
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              MA120
            </button>
          </div>
        </div>
      </div>

      {/* 시간 범위 선택 */}
      <div className="flex gap-2 mb-6">
        {/* 분봉 */}
        <div className="flex gap-1">
          {[
            { key: "1m", label: "1분" },
            { key: "5m", label: "5분" },
            { key: "15m", label: "15분" },
            { key: "30m", label: "30분" },
            { key: "1h", label: "1시간" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => onTimeRangeChange(key as any)}
              className={`px-2 py-1 rounded text-xs transition-colors ${
                timeRange === key
                  ? "bg-[#0A5C2B] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 일봉 이상 */}
        <div className="flex gap-1 ml-2">
          {[
            { key: "1d", label: "일봉" },
            { key: "1w", label: "주봉" },
            { key: "1m", label: "월봉" },
            { key: "3m", label: "3개월" },
            { key: "1y", label: "연봉" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => onTimeRangeChange(key as any)}
              className={`px-2 py-1 rounded text-xs transition-colors ${
                timeRange === key
                  ? "bg-[#0A5C2B] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 주가 차트 */}
      <PriceChart data={data} showMA={showMA} />

      {/* 거래량 차트 */}
      <VolumeChart data={data} />

      {/* 범례 */}
      <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-red-500"></div>
          <span>주가</span>
        </div>
        {showMA.ma5 && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-purple-500"></div>
            <span>MA5</span>
          </div>
        )}
        {showMA.ma20 && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-green-500"></div>
            <span>MA20</span>
          </div>
        )}
        {showMA.ma60 && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-orange-500"></div>
            <span>MA60</span>
          </div>
        )}
        {showMA.ma120 && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-blue-500"></div>
            <span>MA120</span>
          </div>
        )}
      </div>
    </div>
  );
}
