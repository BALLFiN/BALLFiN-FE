import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Filter } from "lucide-react";
import { ResponsiveTreeMap } from "@nivo/treemap";

interface CompanyInfo {
  corp_name: string;
  stock_code: string;
  current_price: number;
  change: number;
  change_percent: number;
  week_52_high: number;
  week_52_low: number;
  volume: number;
  market_cap_billion: number;
}

type SortBy =
  | "market_cap_desc"
  | "market_cap_asc"
  | "change_percent_desc"
  | "change_percent_asc"
  | "volume_desc"
  | "volume_asc";

// API 호출 함수
const getCompanies = async (
  sortBy: SortBy = "market_cap_desc"
): Promise<CompanyInfo[]> => {
  try {
    const response = await fetch(`/info/companies?sort_by=${sortBy}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }
};

// 감정에 따른 색상 매핑
const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case "positive":
      return "#FCA5A5"; // 연한 빨강 (양수)
    case "negative":
      return "#93C5FD"; // 연한 파랑 (음수)
    default:
      return "rgba(255, 255, 255, 0.3)"; // 투명한 흰색 (변화 미비)
  }
};

// 커스텀 툴팁 컴포넌트
const CustomTooltip = ({ node }: any) => {
  return (
    <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-2xl border border-gray-200/50 min-w-[280px] animate-fadeIn">
      {/* 헤더 */}
      <div className="border-b border-gray-100 pb-3 mb-3">
        <div className="font-bold text-lg text-gray-900">{node.data.name}</div>
        <div className="text-sm text-gray-500">
          종목코드: {node.data.stockCode}
        </div>
      </div>

      {/* 가격 정보 */}
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">현재가</div>
          <div className="font-semibold text-lg text-gray-900">
            {node.data.currentPrice?.toLocaleString()}원
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">등락률</div>
          <div
            className={`font-semibold text-lg ${
              node.data.changePercent > 0
                ? "text-emerald-600"
                : node.data.changePercent < 0
                  ? "text-red-600"
                  : "text-gray-600"
            }`}
          >
            {node.data.changePercent > 0 ? "+" : ""}
            {node.data.changePercent?.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* 상태 표시 */}
      <div className="flex items-center justify-center gap-2 pt-2 border-t border-gray-100">
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: getSentimentColor(node.data.sentiment) }}
        ></div>
        <span className="text-sm font-medium text-gray-700">
          {node.data.sentiment === "positive"
            ? "상승"
            : node.data.sentiment === "negative"
              ? "하락"
              : "변동없음"}
        </span>
      </div>
    </div>
  );
};

export default function TrendingKeywords() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<SortBy>("market_cap_desc");
  const [companies, setCompanies] = useState<CompanyInfo[]>([]);
  const [allCompanies, setAllCompanies] = useState<
    Record<SortBy, CompanyInfo[]>
  >({
    market_cap_desc: [],
    market_cap_asc: [],
    change_percent_desc: [],
    change_percent_asc: [],
    volume_desc: [],
    volume_asc: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        setLoading(true);
        setError(null);

        // 3가지 필터링 상태에 대한 데이터를 병렬로 로딩
        const [marketCapData, changePercentData, volumeData] =
          await Promise.all([
            getCompanies("market_cap_desc"),
            getCompanies("change_percent_desc"),
            getCompanies("volume_desc"),
          ]);

        setAllCompanies({
          market_cap_desc: marketCapData,
          market_cap_asc: marketCapData,
          change_percent_desc: changePercentData,
          change_percent_asc: changePercentData,
          volume_desc: volumeData,
          volume_asc: volumeData,
        });

        // 초기 필터에 맞는 데이터 설정
        setCompanies(marketCapData);
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        console.error("Error fetching companies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCompanies();
  }, []);

  // 필터 변경 시 해당 데이터로 업데이트
  useEffect(() => {
    if (allCompanies[filter] && allCompanies[filter].length > 0) {
      setCompanies(allCompanies[filter]);
    }
  }, [filter, allCompanies]);

  const treeMapData = useMemo(() => {
    if (companies.length === 0) return null;

    // 등락률 변동 기준일 때는 절댓값으로 정렬
    let sortedCompanies = [...companies];
    if (filter === "change_percent_desc") {
      sortedCompanies.sort(
        (a, b) => Math.abs(b.change_percent) - Math.abs(a.change_percent)
      );
    }

    return {
      name: "주식",
      children: sortedCompanies.slice(0, 20).map((company) => ({
        name: company.corp_name,
        loc: company.market_cap_billion,
        sentiment:
          company.change_percent > 0
            ? "positive"
            : company.change_percent < 0
              ? "negative"
              : "neutral",
        stockCode: company.stock_code,
        currentPrice: company.current_price,
        changePercent: company.change_percent,
        volume: company.volume,
      })),
    };
  }, [companies, filter]);

  const handleNodeClick = (node: any) => {
    if (node.data.stockCode) {
      navigate(`/stock/${node.data.stockCode}`);
    }
  };

  return (
    <div className="rounded-3xl border border-white/70 bg-white/70 backdrop-blur-md shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 my-2">
        <h2 className="text-[17px] font-semibold text-gray-900">
          주식 시장 현황
        </h2>
      </div>

      {/* 필터 버튼 */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-gray-500" />
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("market_cap_desc")}
              className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors cursor-pointer ${
                filter === "market_cap_desc"
                  ? "bg-[#0A5C2B] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              시가총액 높은순
            </button>
            <button
              onClick={() => setFilter("change_percent_desc")}
              className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors cursor-pointer ${
                filter === "change_percent_desc"
                  ? "bg-[#0A5C2B] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              등락률 변동 큰순
            </button>
            <button
              onClick={() => setFilter("volume_desc")}
              className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors cursor-pointer ${
                filter === "volume_desc"
                  ? "bg-[#0A5C2B] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              거래량 많은순
            </button>
          </div>
        </div>

        {/* TreeMap */}
        <div className="h-64 [&_g]:cursor-pointer">
          {loading ? (
            <div className="h-full p-4">
              {/* 스켈레톤 헤더 */}
              <div className="flex items-center justify-between mb-4">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
              </div>

              {/* 스켈레톤 그리드 */}
              <div className="bg-gray-200 rounded-lg animate-pulse h-48"></div>
            </div>
          ) : error ? (
            <div className="h-full flex items-center justify-center text-red-500 text-center">
              <div>
                <p>{error}</p>
              </div>
            </div>
          ) : treeMapData && companies.length > 0 ? (
            <ResponsiveTreeMap
              data={treeMapData}
              identity="name"
              value="loc"
              valueFormat=".0f"
              margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
              labelSkipSize={12}
              labelTextColor={{ from: "color", modifiers: [["darker", 1.2]] }}
              parentLabelPosition="left"
              parentLabelTextColor={{
                from: "color",
                modifiers: [["darker", 2]],
              }}
              borderColor={{ from: "color", modifiers: [["darker", 0.1]] }}
              colors={(node: any) => getSentimentColor(node.data.sentiment)}
              nodeOpacity={0.8}
              borderWidth={1}
              animate={true}
              tooltip={CustomTooltip}
              onClick={handleNodeClick}
              enableParentLabel={false}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 text-center">
              <div>
                <p>데이터가 없습니다.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 설명 */}
      <div className="px-4 py-3 border-t border-black/10">
        <p className="text-[12px] text-gray-500 text-center">
          주식을 클릭하면 상세 정보를 확인할 수 있습니다
        </p>
        <div className="flex justify-center gap-4 mt-2 text-[11px] text-gray-400">
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[#FCA5A5]"></div>
            상승
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[#93C5FD]"></div>
            하락
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-white/30"></div>
            변동없음
          </span>
        </div>
      </div>
    </div>
  );
}
