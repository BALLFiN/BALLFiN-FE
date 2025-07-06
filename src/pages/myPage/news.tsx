import { Star } from 'lucide-react';
import NewsList from '../../components/auth/myPage/news/NewsList';

import NewsHeader from '../../components/auth/myPage/news/NewsHeader';
import useNews from '@/hooks/myPage/useNews';

export default function MyPageNews() {
  const { activeTab, setActiveTab, sortOrder, setSortOrder, filteredItems, toggleFavorite } = useNews([
    { id: '0', company: 'SOCEY', source: '아주경제', date: '2025-05-05', isFavorite: false, isGood: true },
    { id: '1', company: 'JOURNAL', source: '머니투데이', date: '2025-05-04', isFavorite: false, isGood: false },
    { id: '2', company: 'COMPANY 2021', source: 'HERALD', date: '2025-05-03', isFavorite: true, isGood: true },
  ]);
  return (
    <section className="w-full p-6">
      <div className="flex items-center justify-between  mb-8">
        <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Star className="text-yellow-400" size={20} />
          NewsList
        </h1>
      </div>
      <div className="w-[calc(100%-2rem)] bg-white rounded-2xl shadow overflow-hidden px-8 mx-4   ">
        <NewsHeader
          tabs={['최신', '호재', '악재']}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />
        <NewsList items={filteredItems} onToggleFavorite={toggleFavorite} />
      </div>
    </section>
  );
}
