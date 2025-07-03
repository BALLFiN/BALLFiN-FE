import { NewsItem } from '@/hooks/myPage/useNews';
import { Star } from 'lucide-react';

interface Props {
  items: NewsItem[];

  onToggleFavorite: (id: string) => void;
}
export default function NewsList({ items, onToggleFavorite }: Props) {
  return (
    <div className="py-4 space-y-4  min-h-[40vh] overflow-y-auto   border-gray-400">
      {items.length === 0 && <p className="text-center text-gray-500">등록된 뉴스가 없습니다.</p>}
      {items.map((item, idx) => (
        <div key={item.id}>
          <div className="flex items-center justify-between h-16 px-1">
            <div className="flex items-center ">
              <div className="gap-3 flex-col flex pl-2 ">
                <h3 className="font-bold text-gray-900">{item.company}</h3>
                <p className="text-sm text-gray-500">
                  {item.source} · {item.date}
                </p>
              </div>
            </div>
            <button className="cursor-pointer" onClick={() => onToggleFavorite(item.id)}>
              <Star size={24} className={item.isFavorite ? 'text-yellow-400' : 'text-gray-300'} />
            </button>
          </div>
          {idx < items.length - 1 && <hr className="border-gray-200 mt-2" />}
        </div>
      ))}
    </div>
  );
}

// 즐겨찾기 기능 즐겨찾기 클릭시 ture -false
