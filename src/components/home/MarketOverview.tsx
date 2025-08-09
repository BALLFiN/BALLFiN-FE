import { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import Modal from "@/components/common/Modal";
// Loading skeleton은 이 컴포넌트에서 간단히 렌더링합니다.
import { getAllMarketInfo, MarketAllResponse } from "@/api/market";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface MarketStat {
  id: string;
  title: string;
  value: string;
  unit: string;
  change: {
    value: string;
    percentage: string;
    isPositive: boolean;
  };
  sparklineData: number[];
  description: string;
  detailedInfo?: {
    currentMeaning: string;
    ranges: ReadonlyArray<{
      range: string;
      meaning: string;
    }>;
  };
}

// API 키와 화면 메타데이터 매핑
const STAT_METADATA = {
  kospi: {
    id: "korean-market",
    title: "한국 주식시장",
    unit: "pt (KOSPI)",
    description:
      "한국 종합주가지수(KOSPI)와 기술주 중심의 KOSDAQ 지수를 포함한 한국 주식시장의 전반적인 움직임을 나타냅니다. KOSPI는 대형주 중심, KOSDAQ은 IT, 바이오 등 혁신기업들의 성과를 반영합니다.",
    detailedInfo: {
      currentMeaning:
        "KOSPI 3,100pt 돌파로 상승 모멘텀 강화, 대형주 중심의 상승세 지속",
      ranges: [
        { range: "2,800pt 이하", meaning: "저평가 구간, 매수 기회로 간주" },
        { range: "2,800~3,000pt", meaning: "적정 수준, 안정적인 투자 환경" },
        { range: "3,000~3,200pt", meaning: "상승 추세, 모멘텀 주의" },
        { range: "3,200pt 이상", meaning: "고평가 우려, 수익 실현 고려" },
      ],
    },
  },
  nasdaq: {
    id: "nasdaq",
    title: "나스닥 지수",
    unit: "pt",
    description:
      "미국 기술주 중심의 주가지수로 글로벌 IT 기업들의 성과를 나타냅니다.",
    detailedInfo: {
      currentMeaning:
        "AI 반도체 수요 증가로 기술주 상승세 지속, 글로벌 IT 섹터 호조",
      ranges: [
        { range: "15,000pt 이하", meaning: "기술주 조정, 매수 기회" },
        { range: "15,000~16,000pt", meaning: "적정 수준, 안정적 성장" },
        { range: "16,000~17,000pt", meaning: "강세 지속, AI 테마 주목" },
        { range: "17,000pt 이상", meaning: "고평가 우려, 수익 실현 고려" },
      ],
    },
  },
  usd_krw: {
    id: "exchange-rate",
    title: "원/달러 환율",
    unit: "원",
    description:
      "원화 대비 달러화의 가치를 나타내며, 수출입과 자본이동에 영향을 줍니다.",
    detailedInfo: {
      currentMeaning: "원화 강세로 수출 경쟁력 악화 우려, 수입 물가 하락 효과",
      ranges: [
        { range: "1,200원 이하", meaning: "원화 과강세, 수출업계 부담" },
        { range: "1,200~1,300원", meaning: "적정 수준, 수출입 균형" },
        { range: "1,300~1,400원", meaning: "원화 약세, 수출 경쟁력 향상" },
        { range: "1,400원 이상", meaning: "원화 과약세, 수입 물가 상승" },
      ],
    },
  },
  oil: {
    id: "wti",
    title: "WTI 원유",
    unit: "$",
    description:
      "서부텍사스산 원유 가격으로 글로벌 에너지 시장의 동향을 반영합니다.",
    detailedInfo: {
      currentMeaning: "중동 정세 불안과 수요 증가로 원유 가격 상승세 지속",
      ranges: [
        {
          range: "60달러 이하",
          meaning: "저유가, 소비자 혜택, 산업 비용 절감",
        },
        { range: "60~80달러", meaning: "적정 수준, 안정적 에너지 시장" },
        { range: "80~100달러", meaning: "고유가, 인플레이션 압박" },
        { range: "100달러 이상", meaning: "초고유가, 경제 성장 저해" },
      ],
    },
  },
  vix: {
    id: "vix",
    title: "VIX 지수",
    unit: "",
    description: "변동성 지수로 시장의 불확실성과 투자자 심리를 나타냅니다.",
    detailedInfo: {
      currentMeaning:
        "VIX 20 이하로 시장이 매우 안정적임을 의미, 투자자 심리 양호",
      ranges: [
        { range: "20 이하", meaning: "시장이 매우 안정적임을 의미" },
        { range: "20~30", meaning: "평균 수준의 변동성" },
        { range: "30~40", meaning: "높은 변동성, 투자자 불안 심화" },
        {
          range: "40 이상",
          meaning:
            "시장의 공포 심리가 극에 달해 주가가 바닥을 다질 가능성도 있음",
        },
      ],
    },
  },
  interest_rate: {
    id: "interest-rate",
    title: "한국은행 기준금리",
    unit: "%",
    description:
      "한국은행이 설정하는 기준금리로 통화정책의 방향성을 나타냅니다.",
    detailedInfo: {
      currentMeaning: "금리 동결로 안정적 통화정책 유지, 인플레이션 관리 중점",
      ranges: [
        { range: "3.0% 이하", meaning: "확장적 통화정책, 투자/소비 촉진" },
        { range: "3.0~3.5%", meaning: "중립적 통화정책, 경제 안정" },
        { range: "3.5~4.0%", meaning: "긴축적 통화정책, 인플레이션 억제" },
        { range: "4.0% 이상", meaning: "강력한 긴축, 경제 침체 우려" },
      ],
    },
  },
} as const;

interface MarketModalContentProps {
  data: MarketStat;
}

const MarketModalContent = ({ data }: MarketModalContentProps) => {
  const chartData = {
    labels: ["5일 전", "4일 전", "3일 전", "2일 전", "오늘"],
    datasets: [
      {
        label: data.title,
        data: data.sparklineData,
        borderColor: data.change.isPositive ? "#10B981" : "#EF4444",
        backgroundColor: data.change.isPositive
          ? "rgba(16, 185, 129, 0.1)"
          : "rgba(239, 68, 68, 0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  return (
    <>
      <div className="mb-4">
        <div className="text-2xl font-bold text-gray-900 mb-2">
          {data.value} {data.unit}
        </div>
        <div
          className={`flex items-center gap-1.5 ${
            data.change.isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {data.change.isPositive ? (
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-b-[10px] border-b-green-600 border-r-[6px] border-r-transparent"></div>
          ) : (
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-t-[10px] border-t-red-600 border-r-[6px] border-r-transparent"></div>
          )}
          <span className="text-sm font-medium">
            {data.change.percentage} ({data.change.value})
          </span>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">5일 추세</h3>
        <div className="h-32">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">설명</h3>
        <p className="text-sm text-gray-600 mb-4">{data.description}</p>

        {data.detailedInfo && (
          <>
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <h4 className="text-sm font-medium text-blue-800 mb-1">
                현재 수치의 의미
              </h4>
              <p className="text-sm text-blue-700">
                {data.detailedInfo.currentMeaning}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                수치별 해석
              </h4>
              <div className="space-y-2">
                {data.detailedInfo.ranges.map((range, idx) => (
                  <div key={idx} className="flex gap-2 text-sm">
                    <span className="font-medium text-[#0A5C2B] min-w-[80px]">
                      {range.range}:
                    </span>
                    <span className="text-gray-600">{range.meaning}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default function MarketOverview() {
  const [selectedStat, setSelectedStat] = useState<MarketStat | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState<MarketStat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const formatNumber = (num: number, fractionDigits = 2) =>
    num.toLocaleString("ko-KR", {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });

  const formatSigned = (num: number, fractionDigits = 2) => {
    const sign = num > 0 ? "+" : num < 0 ? "-" : "";
    return `${sign}${formatNumber(Math.abs(num), fractionDigits)}`;
  };

  const formatPercent = (num: number) => {
    const sign = num > 0 ? "+" : num < 0 ? "-" : "";
    return `${sign}${Math.abs(num).toFixed(2)}%`;
  };

  const buildSparkline = (
    items: Array<{ date: string; price?: number; rate?: number }> = []
  ) => {
    const sorted = [...items].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const lastFive = sorted.slice(-5);
    return lastFive.map((d) =>
      typeof d.price === "number" ? d.price : (d.rate ?? 0)
    );
  };

  const mapResponseToStats = (resp: MarketAllResponse): MarketStat[] => {
    if (
      !resp ||
      typeof resp !== "object" ||
      !resp.data ||
      typeof resp.data !== "object"
    ) {
      throw new Error("잘못된 응답 형식");
    }
    const result: MarketStat[] = [];
    const { data } = resp;

    // 주가지수/환율/원유/VIX
    (["kospi", "nasdaq", "usd_krw", "oil", "vix"] as const).forEach((key) => {
      const quote = data[key] as any;
      if (!quote) return;
      const meta = STAT_METADATA[key];
      const valueNumber: number = quote.price;
      const changeNumber: number = quote.change;
      const changePercentNumber: number = quote.change_percent;
      const sparkline = buildSparkline(
        Array.isArray(quote.historical_data) ? quote.historical_data : []
      );

      result.push({
        id: meta.id,
        title: meta.title,
        unit: meta.unit,
        value: formatNumber(valueNumber, key === "usd_krw" ? 2 : 2),
        change: {
          value: formatSigned(changeNumber, 2),
          percentage: formatPercent(changePercentNumber),
          isPositive: changeNumber >= 0,
        },
        sparklineData: sparkline,
        description: meta.description,
        detailedInfo: meta.detailedInfo,
      });
    });

    // 기준금리
    const ir = data["interest_rate"] as any;
    if (ir) {
      const meta = STAT_METADATA["interest_rate"];
      const history = Array.isArray(ir.historical_data)
        ? ir.historical_data
        : [];
      const sorted = [...history].sort(
        (a: any, b: any) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      const last = sorted[sorted.length - 1]?.rate ?? 0;
      const prev = sorted[sorted.length - 2]?.rate ?? last;
      const change = last - prev;
      const changePct = prev !== 0 ? (change / prev) * 100 : 0;
      const sparkline = buildSparkline(history);

      result.push({
        id: meta.id,
        title: meta.title,
        unit: meta.unit,
        value: formatNumber(last, 2),
        change: {
          value: formatSigned(change, 2),
          percentage: formatPercent(changePct),
          isPositive: change >= 0,
        },
        sparklineData: sparkline,
        description: meta.description,
        detailedInfo: meta.detailedInfo,
      });
    }

    return result;
  };

  const fetchAll = async () => {
    try {
      setLoading(true);
      setError(null);
      const resp = await getAllMarketInfo();
      // eslint-disable-next-line no-console
      console.debug("[MarketOverview] /info/all 응답:", resp);
      const mapped = mapResponseToStats(resp);
      if (!mapped.length) {
        throw new Error("데이터 항목이 비어있음");
      }
      setStats(mapped);
      // eslint-disable-next-line no-console
      console.debug("[MarketOverview] 매핑된 카드 수:", mapped.length);
    } catch (e: any) {
      // eslint-disable-next-line no-console
      console.error("[MarketOverview] /info/all 요청 실패:", e?.response ?? e);
      setError("시세 정보를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleCardClick = (stat: MarketStat) => {
    setSelectedStat(stat);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStat(null);
  };

  const content = useMemo(() => {
    if (loading) {
      const LOADING_KEYS = [
        "kospi",
        "nasdaq",
        "usd_krw",
        "oil",
        "vix",
        "interest_rate",
      ] as const;
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {LOADING_KEYS.map((key) => {
            const meta = STAT_METADATA[key];
            return (
              <div
                key={meta.id}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100 min-w-0"
              >
                <div className="text-xs text-gray-500 mb-2 truncate">
                  {meta.title}
                </div>
                <div className="mb-2 animate-pulse">
                  <div className="h-5 w-24 bg-gray-200 rounded" />
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-12 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    if (error) {
      return (
        <div className="p-4 bg-red-50 rounded-lg">
          <div className="text-sm text-red-600 mb-2">{error}</div>
          <button
            type="button"
            onClick={fetchAll}
            className="text-xs px-3 py-1.5 bg-red-600 text-white rounded"
          >
            다시 시도
          </button>
        </div>
      );
    }
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer min-w-0"
            onClick={() => handleCardClick(stat)}
          >
            <div className="text-xs text-gray-500 mb-2 truncate">
              {stat.title}
            </div>
            <div className="text-lg font-bold text-gray-900 mb-2 truncate">
              {stat.value} {stat.unit}
            </div>
            <div
              className={`flex items-center gap-1 ${
                stat.change.isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {stat.change.isPositive ? (
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-b-[8px] border-b-green-600 border-r-[4px] border-r-transparent flex-shrink-0"></div>
              ) : (
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-t-[8px] border-t-red-600 border-r-[4px] border-r-transparent flex-shrink-0"></div>
              )}
              <span className="text-xs font-medium truncate">
                {stat.change.percentage}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }, [loading, error, stats]);

  return (
    <>
      {content}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedStat?.title}
        size="md"
      >
        {selectedStat && <MarketModalContent data={selectedStat} />}
      </Modal>
    </>
  );
}
