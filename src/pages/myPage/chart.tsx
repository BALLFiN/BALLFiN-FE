import { Star } from 'lucide-react';

export default function MyPageChart() {
  return (
    <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Star className="text-yellow-400" size={20} />
          ChartList
        </h2>
      </div>
    </section>
  );
}
