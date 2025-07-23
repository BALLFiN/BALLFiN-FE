import { dayTable, miniteTable, TimeRangePT } from '.';

interface StockChartHeader {
  timeRange: TimeRangePT;
  onTimeRangeChange: (r: TimeRangePT) => void;
  showMA: Record<'ma5' | 'ma20' | 'ma60' | 'ma120', boolean>;
  onToggleMA: (maType: 'ma5' | 'ma20' | 'ma60' | 'ma120') => void;
}
export default function StockChartHeader({ showMA, timeRange, onTimeRangeChange, onToggleMA }: StockChartHeader) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-900">가격 차트</h2>

          {/* 이동평균선 토글 버튼들 */}
          <div className="flex gap-2">
            <button
              onClick={() => onToggleMA('ma5')}
              className={`px-2 py-1 rounded text-xs transition-colors ${
                showMA.ma5 ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              MA5
            </button>
            <button
              onClick={() => onToggleMA('ma20')}
              className={`px-2 py-1 rounded text-xs transition-colors ${
                showMA.ma20 ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              MA20
            </button>
            <button
              onClick={() => onToggleMA('ma60')}
              className={`px-2 py-1 rounded text-xs transition-colors ${
                showMA.ma60 ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              MA60
            </button>
            <button
              onClick={() => onToggleMA('ma120')}
              className={`px-2 py-1 rounded text-xs transition-colors ${
                showMA.ma120 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
          {miniteTable.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => onTimeRangeChange(key as any)}
              className={`px-2 py-1 rounded text-xs transition-colors ${
                timeRange === key ? 'bg-[#0A5C2B] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 일봉 이상 */}
        <div className="flex gap-1 ml-2">
          {dayTable.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => onTimeRangeChange(key)}
              className={`px-2 py-1 rounded text-xs transition-colors ${
                timeRange === key ? 'bg-[#0A5C2B] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
