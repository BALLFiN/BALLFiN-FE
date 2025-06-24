export default function NewsTabs() {
  const tab = ['최신', '호재', '악재'];
  return (
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
  );
}
