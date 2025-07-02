export default function NewsList() {
  const items = [
    { id: '0', title: 'title', source: 'source', date: '2025.06.01' },
    { id: '1', title: 'title', source: 'source', date: '2025.06.01' },
    { id: '2', title: 'title', source: 'source', date: '2025.06.01' },
  ];

  return (
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
  );
}

// 즐겨찾기 기능 즐겨찾기 클릭시 ture -false
