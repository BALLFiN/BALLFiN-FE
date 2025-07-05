import { ChartTable } from '@/components/auth/myPage/chart';
import ChartHeader from '@/components/auth/myPage/chart/ChartHeader';
import { useChart } from '@/hooks/myPage/useCharts';
import { Star } from 'lucide-react';

export default function MyPageChart() {
  const { stocks, selectedIds, onAdd, onSelect, onToggleFav, onReorder, onDelete, onSelectAll } = useChart();

  return (
    <section className="p-6 w-full h-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Star className="text-yellow-400" size={20} />
          ChartList
        </h2>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <ChartHeader disabled={selectedIds.length === 0} onAdd={onAdd} onReorder={onReorder} onDelete={onDelete} />
        <ChartTable
          stocks={stocks}
          selectedIds={selectedIds}
          onSelect={onSelect}
          onToggleFav={onToggleFav}
          onSelectAll={onSelectAll}
        />
      </div>
    </section>
  );
}
