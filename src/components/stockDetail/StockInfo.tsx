interface StockInfoProps {
  price: number;
  change: number;
}

export default function StockInfo({ price, change }: StockInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold mb-2">현재가</h3>
        <div className="text-2xl font-bold">{price.toLocaleString()}원</div>
        <div
          className={`text-sm ${
            change >= 0 ? "text-red-500" : "text-blue-500"
          }`}
        >
          {change >= 0 ? "+" : ""}
          {change.toFixed(2)}%
        </div>
      </div>
    </div>
  );
}
