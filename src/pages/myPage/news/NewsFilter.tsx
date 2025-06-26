export default function NewsTabs() {
  return (
    /* 기업선택 + 정렬 */
    <div>
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
  );
}
