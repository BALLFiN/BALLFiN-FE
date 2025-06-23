import { Star } from 'lucide-react';

export default function MyPageNews() {
  const items = [
    { id: '0', title: 'title', source: 'source', date: '2025.06.01' },
    { id: '1', title: 'title', source: 'source', date: '2025.06.01' },
    { id: '2', title: 'title', source: 'source', date: '2025.06.01' },
  ];
  const tab = ['최신', '호재', '악재'];
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
            <nav className="flex gap-8 text-lg font-medium pl-4">
              {tab.map((label, idx) => (
                <button
                  key={idx}
                  className="pb-2 text-gray-600 hover:text-green-800 hover:border-b-2 hover:border-green-600"
                >
                  {label}
                </button>
              ))}
            </nav>

            {/* 기업선택 + 정렬 */}
            <div className="flex items-center space-x-4">
              <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                <option>전체보기</option>
                <option>삼성전자</option>
                <option>SK하이닉스</option>
                <option>NAVER</option>
              </select>
              <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                <option>내림</option>
                <option>올림</option>
              </select>
            </div>
          </div>
        </div>
        <hr className=" border-gray-400 border mt-4" />
        {/* ── 뉴스 리스트 ───────────────────────────── */}
        <div className="py-4 space-y-4  min-h-[40vh] overflow-y-auto">
          {items.length === 0 && <p className="text-center text-gray-500">등록된 뉴스가 없습니다.</p>}

          {items.map((item, idx) => (
            <div key={item.id}>
              <div className="flex items-center justify-between h-16 px-1">
                <div className="flex items-center ">
                  <div className="gap-3 flex-col flex pl-2 ">
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">
                      {item.source} · {item.date}
                    </p>
                  </div>
                </div>
                <button className="p-1 text-gray-400 hover:text-yellow-500">★</button>
              </div>
              {idx < items.length - 1 && <hr className="border-gray-200 mt-2" />}
            </div>
          ))}
        </div>

        {/* ── 하단 hr ───────────────────────────── */}
      </div>
    </section>
  );
}
