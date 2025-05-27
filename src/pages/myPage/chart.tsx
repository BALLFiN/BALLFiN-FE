import { Star } from 'lucide-react';

export default function MyPageChart() {
  const favoriteStocks = [
    { name: '삼성전자', code: '005930', change: '+2.5%' },
    { name: 'SK하이닉스', code: '000660', change: '+1.8%' },
    { name: 'NAVER', code: '035420', change: '-0.5%' },
  ];

  return (
    <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Star className="text-yellow-400" size={20} />
          즐겨찾기 종목
        </h2>
        <button className="text-sm text-[#0A5C2B] hover:underline">전체보기</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {favoriteStocks.map((stock, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg hover:border-[#0A5C2B] transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-medium">{stock.name}</span>
              <span className={`text-sm ${stock.change.startsWith('+') ? 'text-red-500' : 'text-blue-500'}`}>
                {stock.change}
              </span>
            </div>
            <p className="text-sm text-gray-600">{stock.code}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
