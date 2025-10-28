import { useNavigate, useParams } from "react-router-dom";
import { TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import { useEffect, useState, useMemo, useCallback, memo } from "react";
import Pagination from "@/components/news/Pagination";
import { getRelatedCompanies } from "@/api/stock";

interface RelatedCompany {
  id: number;
  name: string;
  code: string;
  currentPrice: number;
  changeAmount: number;
  changePercent: number;
}

const RelatedCompanies = memo(function RelatedCompanies() {
  const navigate = useNavigate();
  const { code } = useParams<{ code: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [companies, setCompanies] = useState<RelatedCompany[]>([]);

  // 메모이제이션된 핸들러들
  const handleCompanyClick = useCallback(
    (code: string) => {
      navigate(`/stock/${code}`);
    },
    [navigate]
  );

  const formatNumber = useCallback((num: number) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + "B";
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toLocaleString();
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // 데이터 변환 함수 메모이제이션
  const transformCompanyData = useCallback(
    (rawData: any[]): RelatedCompany[] => {
      return rawData.map((r, idx) => ({
        id: idx + 1,
        name: r.corp_name,
        code: r.stock_code,
        currentPrice: r.current_price,
        changeAmount: r.change,
        changePercent: r.change_percent,
      }));
    },
    []
  );

  // 최적화된 데이터 로드
  useEffect(() => {
    let cancelled = false;
    const abortController = new AbortController();

    const loadCompanies = async () => {
      if (!code) return;

      const startTime = performance.now();
      setLoading(true);
      setError(null);

      try {
        const list = await getRelatedCompanies(code, "market_cap_desc");
        if (cancelled) return;

        const mapped = transformCompanyData(list);
        setCompanies(mapped);

        const endTime = performance.now();
        console.log(
          `🏢 관련회사 로딩 완료: ${(endTime - startTime).toFixed(2)}ms`
        );
      } catch (e: any) {
        if (!cancelled) {
          console.error("관련회사 로딩 실패:", e);
          setError(e?.message || "관련 기업을 불러오지 못했습니다.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadCompanies();

    return () => {
      cancelled = true;
      abortController.abort();
    };
  }, [code, transformCompanyData]);

  // 페이지네이션 계산 최적화
  const { totalPages, currentCompanies } = useMemo(() => {
    const total = Math.ceil(companies.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const current = companies.slice(start, end);
    return { totalPages: total, currentCompanies: current };
  }, [companies, currentPage, itemsPerPage]);

  // 로딩 스켈레톤 최적화
  const loadingSkeleton = useMemo(
    () => (
      <div className="space-y-3">
        {Array.from({ length: itemsPerPage }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 rounded-lg border border-gray-100"
          >
            <div className="flex-1 min-w-0">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="text-right">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-3 w-12 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    ),
    [itemsPerPage]
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">관련기업</h3>
      {loading ? (
        loadingSkeleton
      ) : error ? (
        <div className="text-sm text-red-500">{error}</div>
      ) : (
        <div className="space-y-3">
          {currentCompanies.map((company) => (
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
      )}

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
});

export default RelatedCompanies;
