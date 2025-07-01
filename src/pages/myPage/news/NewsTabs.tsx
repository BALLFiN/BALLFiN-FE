import { useState } from 'react';

export default function NewsTabs() {
  const [activeTab, setActiveTab] = useState('최신');
  const tabs = ['최신', '호재', '악재'];
  return (
    <div>
      {/* 탭 */}
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
    </div>
  );
}
