import { useMemo, useState } from 'react';

export type TabKey = '최신' | '호재' | '악재';
export type SortOrder = '내림' | '오름';

export interface NewsItem {
  id: string;
  company: string;
  source: string;
  date: string;
  isFavorite: boolean;
  isGood: boolean;
}

export default function useNews(initialItems: NewsItem[] = []) {
  const [activeTab, setActiveTab] = useState<TabKey>('최신');
  const [sortOrder, setSortOrder] = useState<SortOrder>('내림');
  const [items, setItems] = useState<NewsItem[]>(initialItems);

  /** 즐겨찾기 토글 */
  const toggleFavorite = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, isFavorite: !i.isFavorite } : i)));
  };

  /** 탭·필터·정렬 적용된 뉴스 목록 */
  const filteredItems = useMemo(() => {
    let list = items;
    // 호재/악재 필터
    if (activeTab === '호재') list = list.filter((e) => e.isGood);
    else if (activeTab === '악재') list = list.filter((e) => !e.isGood);
    // 날짜 정렬
    list = [...list].sort((a, b) => {
      const ta = new Date(a.date).getTime();
      const tb = new Date(b.date).getTime();
      return sortOrder === '내림' ? tb - ta : ta - tb;
    });
    return list;
  }, [items, activeTab, sortOrder]);

  return { activeTab, setActiveTab, sortOrder, setSortOrder, filteredItems, toggleFavorite, setItems };
}
