import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StockItem {
  id: number;
  name: string;
  code: string;
  price: number;
  change: number;
  sentiment: "positive" | "negative" | "neutral";
}

interface StockListProps {
  stocks: StockItem[];
  favoriteStocks: number[];
  onToggleFavorite: (stockId: number) => void;
}

export default function StockList({
  stocks,
  favoriteStocks,
  onToggleFavorite,
}: StockListProps) {
  const navigate = useNavigate();

  const handleViewDetail = (stockCode: string) => {
    navigate(`/stock/${stockCode}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              종목
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              현재가
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              변동률
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              액션
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {stocks.slice(0, 10).map((stock) => (
            <tr key={stock.id} className="hover:bg-gray-50">
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="font-medium">{stock.name}</div>
                <div className="text-sm text-gray-500">{stock.code}</div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                {stock.price.toLocaleString()}원
              </td>
              <td
                className={`px-4 py-4 whitespace-nowrap ${
                  stock.change >= 0 ? "text-red-500" : "text-blue-500"
                }`}
              >
                {stock.change >= 0 ? "+" : ""}
                {stock.change}%
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleViewDetail(stock.code)}
                    className="px-2 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 text-gray-700"
                  >
                    조회
                  </button>
                  <button
                    onClick={() => onToggleFavorite(stock.id)}
                    className={`p-1 rounded-full hover:bg-gray-100 ${
                      favoriteStocks.includes(stock.id)
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }`}
                  >
                    <Star size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
