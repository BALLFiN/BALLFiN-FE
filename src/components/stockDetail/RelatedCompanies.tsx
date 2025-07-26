import { useNavigate } from "react-router-dom";
import { TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";

interface RelatedCompany {
  id: number;
  name: string;
  code: string;
  currentPrice: number;
  changeAmount: number;
  changePercent: number;
}

interface RelatedCompaniesProps {
  currentStockCode: string;
}

const mockRelatedCompanies: RelatedCompany[] = [
  {
    id: 1,
    name: "SK하이닉스",
    code: "000660",
    currentPrice: 120000,
    changeAmount: 2000,
    changePercent: 1.69,
  },
  {
    id: 2,
    name: "LG에너지솔루션",
    code: "373220",
    currentPrice: 450000,
    changeAmount: -5000,
    changePercent: -1.1,
  },
  {
    id: 3,
    name: "삼성SDI",
    code: "006400",
    currentPrice: 380000,
    changeAmount: 8000,
    changePercent: 2.15,
  },
  {
    id: 4,
    name: "LG전자",
    code: "066570",
    currentPrice: 98000,
    changeAmount: -1200,
    changePercent: -1.21,
  },
  {
    id: 5,
    name: "LG디스플레이",
    code: "034220",
    currentPrice: 15000,
    changeAmount: 300,
    changePercent: 2.04,
  },
  {
    id: 6,
    name: "LG유플러스",
    code: "032640",
    currentPrice: 12000,
    changeAmount: 100,
    changePercent: 0.84,
  },
  {
    id: 7,
    name: "KT",
    code: "030200",
    currentPrice: 32000,
    changeAmount: -400,
    changePercent: -1.23,
  },
  {
    id: 8,
    name: "현대자동차",
    code: "005380",
    currentPrice: 185000,
    changeAmount: -1200,
    changePercent: -0.65,
  },
  {
    id: 9,
    name: "기아",
    code: "000270",
    currentPrice: 85000,
    changeAmount: 1500,
    changePercent: 1.8,
  },
  {
    id: 10,
    name: "현대건설",
    code: "000720",
    currentPrice: 45000,
    changeAmount: 800,
    changePercent: 1.81,
  },
  {
    id: 11,
    name: "포스코홀딩스",
    code: "005490",
    currentPrice: 420000,
    changeAmount: -3000,
    changePercent: -0.71,
  },
];

export default function RelatedCompanies({
  currentStockCode,
}: RelatedCompaniesProps) {
  const navigate = useNavigate();

  const handleCompanyClick = (code: string) => {
    navigate(`/stock/${code}`);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + "B";
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toLocaleString();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">관련기업</h3>

      <div className="space-y-3">
        {mockRelatedCompanies.map((company) => (
          <div
            key={company.id}
            onClick={() => handleCompanyClick(company.code)}
            className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-[#0A5C2B] hover:bg-[#0A5C2B]/5 cursor-pointer transition-all duration-200 group"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-gray-900 truncate">
                  {company.name}
                </h4>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  {company.code}
                </span>
                <ArrowUpRight
                  size={12}
                  className="text-gray-400 group-hover:text-[#0A5C2B] transition-colors"
                />
              </div>
            </div>

            <div className="text-right">
              <div className="font-medium text-gray-900">
                {company.currentPrice.toLocaleString()}
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${
                  company.changePercent > 0
                    ? "text-red-500"
                    : company.changePercent < 0
                      ? "text-blue-500"
                      : "text-gray-500"
                }`}
              >
                {company.changePercent > 0 ? (
                  <TrendingUp size={12} />
                ) : company.changePercent < 0 ? (
                  <TrendingDown size={12} />
                ) : null}
                <span>
                  {company.changePercent > 0 ? "+" : ""}
                  {company.changePercent.toFixed(2)}%
                </span>
              </div>
              <div
                className={`text-xs ${
                  company.changeAmount > 0
                    ? "text-red-500"
                    : company.changeAmount < 0
                      ? "text-blue-500"
                      : "text-gray-500"
                }`}
              >
                {company.changeAmount > 0 ? "+" : ""}
                {formatNumber(company.changeAmount)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
