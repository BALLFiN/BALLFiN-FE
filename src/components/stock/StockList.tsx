import { useNavigate } from "react-router-dom";
import { StockItem } from "./types";

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

  const safeNumber = (value: number | undefined | null, suffix = "") =>
    value !== undefined && value !== null
      ? value.toLocaleString() + suffix
      : "-";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              즐겨찾기
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              종목
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              종가
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              고가
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              저가
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              변동
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              변동 %
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              거래량
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {stocks.slice(0, 10).map((stock) => (
            <tr key={stock.id} className="hover:bg-gray-50 cursor-pointer">
              <td className="px-4 py-4 whitespace-nowrap">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(stock.id);
                  }}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    favoriteStocks.includes(stock.id)
                      ? "bg-yellow-400 border-yellow-500 text-yellow-900"
                      : "bg-white border-gray-300 text-gray-400 hover:border-yellow-400"
                  }`}
                >
                  ★
                </button>
              </td>
              <td
                className="px-4 py-4 whitespace-nowrap"
                onClick={() => handleViewDetail(stock.code)}
              >
                <div className="font-medium text-blue-700 hover:underline">
                  {stock.name}
                </div>
                <div className="text-sm text-gray-500">{stock.code}</div>
              </td>
              <td
                className="px-4 py-4 whitespace-nowrap"
                onClick={() => handleViewDetail(stock.code)}
              >
                {safeNumber(stock.close, "원")}
              </td>
              <td
                className="px-4 py-4 whitespace-nowrap"
                onClick={() => handleViewDetail(stock.code)}
              >
                {safeNumber(stock.high, "원")}
              </td>
              <td
                className="px-4 py-4 whitespace-nowrap"
                onClick={() => handleViewDetail(stock.code)}
              >
                {safeNumber(stock.low, "원")}
              </td>
              <td
                className={`px-4 py-4 whitespace-nowrap ${stock.change >= 0 ? "text-red-500" : "text-blue-500"}`}
                onClick={() => handleViewDetail(stock.code)}
              >
                {stock.change !== undefined && stock.change !== null
                  ? (stock.change >= 0 ? "+" : "") + stock.change
                  : "-"}
              </td>
              <td
                className={`px-4 py-4 whitespace-nowrap ${stock.changePercent >= 0 ? "text-red-500" : "text-blue-500"}`}
                onClick={() => handleViewDetail(stock.code)}
              >
                {stock.changePercent !== undefined &&
                stock.changePercent !== null
                  ? (stock.changePercent >= 0 ? "+" : "") +
                    stock.changePercent +
                    "%"
                  : "-"}
              </td>
              <td
                className="px-4 py-4 whitespace-nowrap"
                onClick={() => handleViewDetail(stock.code)}
              >
                {safeNumber(stock.volume)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
