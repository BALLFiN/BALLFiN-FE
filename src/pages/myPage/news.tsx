import { Star } from 'lucide-react';
import NewsList from './news/NewsList';
import NewsTabs from './news/NewsTabs';
import NewsFilter from './news/NewsFilter';

export default function MyPageNews() {
  return (
    <section className="w-full px-8 pt-8">
      <div className="flex items-center justify-between  mb-8">
        <h1 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Star className="text-yellow-400" size={20} />
          NewsList
        </h1>
      </div>
      <div className="w-[calc(100%-2rem)] bg-white rounded-2xl shadow overflow-hidden px-8 mx-4   ">
        {/* ── 탭 & 필터 ───────────────────────────── */}
        <div className="pt-6">
          <div className="flex justify-between items-center">
            {/* 탭 */}
            <NewsTabs />
            {/* 기업선택 + 정렬 */}
            <NewsFilter />
          </div>
        </div>
        <hr className=" border-gray-400 border mt-4" />
        {/* ── 뉴스 리스트 ───────────────────────────── */}
        <NewsList />

        {/* ── 하단 hr ───────────────────────────── */}
      </div>
    </section>
  );
}
