import { Stock } from '@/hooks/myPage/useCharts';
import { BarChart2, Star } from 'lucide-react';

export interface ChartTableProps {
  stocks: Stock[];
  selectedIds: string[];
  onSelect: (id: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void; // 추가
  onToggleFav: (id: string) => void;
}

export default function ChartTable({ stocks, selectedIds, onSelect, onSelectAll, onToggleFav }: ChartTableProps) {
  const allChecked = stocks.length > 0 && selectedIds.length === stocks.length;

  return (
    <div className="overflow-y-auto max-h-[60vh]">
      <table className="min-w-full border-collapse">
        <thead className="sticky top-0 z-10">
          <tr className="bg-gray-50">
            <th className="w-12 px-2 py-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600"
                checked={allChecked}
                onChange={(e) => onSelectAll(e.target.checked)}
              />
            </th>
            <th className="w-24 px-2 py-3 text-left">코드</th>
            <th className="w-48 px-2 py-3 text-left">종목명</th>
            <th className="w-24 px-2 py-3 text-center">차트</th>
            <th className="w-32 px-2 py-3 text-right">현재가</th>
            <th className="w-32 px-2 py-3 text-right">등락률</th>
            <th className="w-20 px-2 py-3 text-center">즐겨찾기</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((s, _) => {
            const checked = selectedIds.includes(s.id);
            return (
              <tr key={s.id} className="hover:bg-gray-50 h-12">
                <td className="px-2 py-2 text-center">
                  <input type="checkbox" checked={checked} onChange={(e) => onSelect(s.id, e.target.checked)} />
                </td>
                <td className="px-2 py-2">{s.code}</td>
                <td className="px-2 py-2 font-medium">{s.name}</td>
                <td className="px-2 py-2 text-center">
                  <button onClick={() => console.log(`Show chart for ${s.name}`)}>
                    <BarChart2 size={16} />
                  </button>
                </td>
                <td className="px-2 py-2 text-right">{s.price.toLocaleString()}</td>
                <td className={`px-2 py-2 text-right ${s.change >= 0 ? 'text-red-500' : 'text-blue-500'}`}>
                  {s.change >= 0 ? '+' : ''}
                  {s.change.toFixed(2)}%
                </td>
                <td className="px-2 py-2 text-center">
                  <button onClick={() => onToggleFav(s.id)}>
                    <Star size={24} className={s.isFavorite ? 'text-yellow-400' : 'text-gray-300'} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
