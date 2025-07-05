import { Search as SearchIcon } from 'lucide-react';
import { useState } from 'react';

export interface ChartSearchProps {
  onAdd: (query: string) => void;
}

export default function ChartSearch({ onAdd }: ChartSearchProps) {
  const [q, setQ] = useState('');
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          className="w-full border rounded pl-10 pr-4 py-2 focus:ring-2 focus:ring-green-600"
          placeholder="종목명 또는 코드 검색"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={() => {
          onAdd(q);
          setQ('');
        }}
      >
        추가
      </button>
    </div>
  );
}
