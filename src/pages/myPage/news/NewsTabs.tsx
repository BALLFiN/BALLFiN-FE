export default function NewsTabs() {
  const tab = ['최신', '호재', '악재'];
  return (
    <div>
      {/* 탭 */}
      <nav className="flex gap-8 text-lg font-medium pl-4">
        {tab.map((label, idx) => (
          <button key={idx} className="pb-2 text-gray-600 hover:text-green-800 hover:border-b-2 hover:border-green-600">
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}
