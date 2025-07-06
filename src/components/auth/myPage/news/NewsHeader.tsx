import { SortOrder, TabKey } from '@/hooks/myPage/useNews';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  tabs: TabKey[];
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  sortOrder: SortOrder;
  onSortChange: (order: SortOrder) => void;
}
export default function NewsHeader({ tabs, activeTab, onTabChange, sortOrder, onSortChange }: Props) {
  return (
    <section className="border-gray-400 border-b pt-4">
      <div className="flex justify-between items-center ">
        <div className="flex gap-8 text-xl  pl-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`pb-2 cursor-pointer ${
                activeTab === tab
                  ? 'text-green-800 border-b-2 border-green-600 font-semibold'
                  : 'text-gray-600 hover:text-green-800 hover:border-b-2 hover:border-green-600 font-medium'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <select className="border border-gray-300 rounded px-2 py-1 text-sm">
            <option>전체보기</option>
            <option>삼성전자</option>
            <option>SK하이닉스</option>
            <option>NAVER</option>
          </select>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSortChange('내림')}
              title="최신순"
              className={sortOrder === '내림' ? 'text-green-600' : 'text-gray-400 hover:text-green-600'}
            >
              <ChevronDown size={20} />
            </button>
            <button
              onClick={() => onSortChange('오름')}
              title="오래된순"
              className={sortOrder === '오름' ? 'text-green-600' : 'text-gray-400 hover:text-green-600'}
            >
              <ChevronUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// tabs filter 디자인 변경 금요일 예정
