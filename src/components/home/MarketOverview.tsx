import { TrendingUp, TrendingDown } from "lucide-react";

interface MarketStat {
  title: string;
  value: string;
  change: {
    value: string;
    percentage: string;
    isPositive: boolean;
  };
}

const marketStats: MarketStat[] = [
  {
    title: "KOSPI 지수",
    value: "3,104.28",
    change: {
      value: "+36.78",
      percentage: "+1.2%",
      isPositive: true,
    },
  },
  {
    title: "KOSDAQ 지수",
    value: "842.46",
    change: {
      value: "-4.21",
      percentage: "-0.5%",
      isPositive: false,
    },
  },
  {
    title: "S&P 500",
    value: "5,276.42",
    change: {
      value: "+42.32",
      percentage: "+0.8%",
      isPositive: true,
    },
  },
  {
    title: "원/달러 환율",
    value: "1,328.50",
    change: {
      value: "-3.75",
      percentage: "-0.3%",
      isPositive: false,
    },
  },
];

export default function MarketOverview() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketStats.map((stat, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 hover:shadow-md transition-all duration-300 border border-gray-100"
          >
            <div className="text-sm text-gray-500 mb-2">{stat.title}</div>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {stat.value}
            </div>
            <div
              className={`flex items-center gap-1.5 ${stat.change.isPositive ? "text-green-600" : "text-red-600"}`}
            >
              {stat.change.isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">
                {stat.change.percentage} ({stat.change.value})
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
