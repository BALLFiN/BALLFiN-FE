import { useState } from 'react';
import { Star, ChevronUp, ChevronDown, Trash2, Search as SearchIcon, BarChart2 } from 'lucide-react';

interface Stock {
  id: string;
  code: string;
  name: string;
  price: number;
  change: number;
  isFavorite: boolean;
}

export default function MyPageChart() {
  // 예시 초기 데이터
  const [stocks, setStocks] = useState<Stock[]>([
    { id: '1', code: '005930', name: '삼성전자', price: 59100, change: 2.25, isFavorite: true },
    { id: '2', code: '000660', name: 'SKT', price: 88800, change: -0.75, isFavorite: false },
    { id: '3', code: '005931', name: '삼성', price: 59100, change: 0.25, isFavorite: true },
    { id: '4', code: '000661', name: 'SK하이닉스', price: 88800, change: -9.75, isFavorite: false },
    { id: '5', code: '005932', name: '삼성화재', price: 59100, change: 1.25, isFavorite: true },
    { id: '6', code: '000662', name: 'KT', price: 88800, change: -5.75, isFavorite: false },
    { id: '7', code: '005933', name: '삼성bio', price: 59100, change: 4.25, isFavorite: true },
    { id: '8', code: '000663', name: 'T1', price: 88800, change: 3.75, isFavorite: false },
    { id: '9', code: '005934', name: '삼성물류', price: 59100, change: 7.25, isFavorite: true },
    { id: '10', code: '000665', name: '한화', price: 88800, change: -1.75, isFavorite: false },
    { id: '11', code: '005935', name: '삼성생명', price: 59100, change: 0.25, isFavorite: true },
    { id: '12', code: '000666', name: '농심', price: 88800, change: 0.75, isFavorite: false },
  ]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // 체크박스 선택 토글
  const handleSelect = (id: string, checked: boolean) => {
    setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)));
  };

  // 즐겨찾기 토글
  const handleToggleFavorite = (id: string) => {
    setStocks((prev) => prev.map((s) => (s.id === id ? { ...s, isFavorite: !s.isFavorite } : s)));
  };

  // 추가
  const handleAdd = () => {
    console.log('추가');
  };
  // 삭제
  const handleDelete = (id: string[]) => {
    console.log(id, '삭제');
  };

  // 순서 변경 헬퍼
  const reorder = (id: string) => {
    console.log(id, '위치 변경');
  };

  const disabled = selectedIds.length === 0;
  const btnClass = `px-2  hover:bg-gray-100 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  return (
    <section className="p-6  w-full h-full">
      {/* 상단 타이틀 */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Star className="text-yellow-400" size={20} />
          ChartList
        </h2>
      </div>

      <div className="w-[calc(100%-2rem)] h-auto  bg-white rounded-2xl shadow overflow-hidden px-8 mx-4  ">
        <div className="flex flex-col gap-5">
          <div className="flex gap-7 mt-5">
            {/* 툴바 */}
            <div className="flex items-center gap-2  px-4 py-3 rounded w-2/5 ">
              <div className=" flex w-full ">
                <div className="flex justify-between max-w-4/5  ">
                  <button className={btnClass} onClick={() => reorder('top')} disabled={disabled} title="맨 위로 이동">
                    <div className="text-lg">버튼</div>
                  </button>
                  <button className={btnClass} onClick={() => reorder('up')} disabled={disabled} title="위로 이동">
                    <ChevronUp size={24} />
                  </button>
                  <button className={btnClass} onClick={() => reorder('down')} disabled={disabled} title="아래로 이동">
                    <ChevronDown size={24} />
                  </button>
                  <button
                    className={btnClass}
                    onClick={() => reorder('bottom')}
                    disabled={disabled}
                    title="맨 아래로 이동"
                  >
                    <div>버튼 </div>
                  </button>
                </div>
                <button
                  className={`mx-auto ${btnClass} text-red-600`}
                  onClick={() => handleDelete(selectedIds)}
                  disabled={disabled}
                  title="삭제"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            </div>

            {/* 검색 & 추가 */}
            <div className="flex items-center gap-2 mt-4 mb-6 w-full">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="종목명 또는 코드 검색"
                  className="w-full border border-gray-300 rounded pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-800"
                />
              </div>
              <button onClick={handleAdd} className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-900">
                추가
              </button>
            </div>
          </div>
          {/* 차트 리스트 테이블 */}
          <div className="overflow-y-auto max-h-[60vh]">
            <table className="min-w-full border-collapse ">
              <thead className=" sticky top-0 z-10">
                <tr className="bg-gray-50">
                  <th className="w-12 px-2 py-3">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-green-600"
                      onChange={(e) => setSelectedIds(e.target.checked ? stocks.map((s) => s.id) : [])}
                      checked={selectedIds.length === stocks.length && stocks.length > 0}
                    />
                  </th>
                  <th className="w-24 px-2 py-3 text-left">코드</th>
                  <th className="w-48 px-2 py-3 text-left">종목명</th>
                  <th className="w-24 px-2 py-3 text-center">차트</th>
                  <th className="w-32 px-2 py-3 text-right">현재가</th>
                  <th className="w-32 px-2 py-3 text-right">등락률</th>
                  <th className="w-20 px-2 py-3 text-center">즐겨찾기</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((s) => {
                  const checked = selectedIds.includes(s.id);
                  return (
                    <tr key={s.id} className="hover:bg-gray-50 h-12">
                      <td className="px-2 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => handleSelect(s.id, e.target.checked)}
                        />
                      </td>
                      <td className="px-2 py-2">{s.code}</td>
                      <td className="px-2 py-2 font-medium">{s.name}</td>
                      <td className="px-2 py-2 text-center">
                        <button>
                          <BarChart2 size={16} />
                        </button>
                      </td>
                      <td className="px-2 py-2 text-right">{s.price.toLocaleString()}</td>
                      <td className={`px-2 py-2 text-right ${s.change >= 0 ? 'text-red-500' : 'text-blue-500'}`}>
                        {s.change >= 0 ? '+' : ''}
                        {s.change.toFixed(2)}%
                      </td>
                      <td className="px-2 py-2 text-center">
                        <button className="cursor-pointer" onClick={() => handleToggleFavorite(s.id)}>
                          <Star size={24} className={s.isFavorite ? 'text-yellow-400' : 'text-gray-300'} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
