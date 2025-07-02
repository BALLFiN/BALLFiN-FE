import { useState } from 'react';

export default function NewsHeader() {
  const [activeTab, setActiveTab] = useState('최신');
  const tabs = ['최신', '호재', '악재'];
  return (
    <section>
      <div className="flex justify-between items-center pt-6">
        <div className="flex gap-8 text-lg font-medium pl-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 ${
                activeTab === tab
                  ? 'text-green-800 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-green-800 hover:border-b-2 hover:border-green-600'
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
          <select className="border border-gray-300 rounded px-2 py-1 text-sm">
            <option>내림</option>
            <option>올림</option>
          </select>
        </div>
      </div>
    </section>
  );
}

// fitler + tabs = news header 로 변경
// tabs filter 디자인 변경
// 최신 , 호재  ,악재 data 변경
