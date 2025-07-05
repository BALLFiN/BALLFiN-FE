import { Search as SearchIcon } from 'lucide-react';
import { useState } from 'react';

export interface ChartSearchProps {
  onAdd: (query: string) => void;
}

export default function ChartSearch({ onAdd }: ChartSearchProps) {
  const [q, setQ] = useState('');
  return (
    <div className="flex items-center gap-2 mt-4 mb-6 w-full">
      <div className="relative flex-1">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="종목명 또는 코드 검색"
          className="w-full border border-gray-300 rounded pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-800"
        />
      </div>
      <button
        onClick={() => {
          onAdd(q);
          setQ('');
        }}
        className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-900"
      >
        추가
      </button>
    </div>
  );
}
