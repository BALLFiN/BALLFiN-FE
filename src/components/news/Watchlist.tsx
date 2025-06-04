import { Star, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { getMyFeed } from "../../api/news/feed";

interface Company {
  name: string;
  code: string;
}

interface WatchlistProps {
  onCompanySelect: (company: Company | null) => void;
  selectedCompany: Company | null;
}

export default function Watchlist({
  onCompanySelect,
  selectedCompany,
}: WatchlistProps) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // /news/my-feed에서 뉴스 받아와서 관련 기업 추출
    getMyFeed({ limit: 100 }).then((newsList) => {
      // 모든 뉴스의 related_companies를 flat하게 모으고 중복 제거
      const allCompanies = newsList
        .flatMap((news) => news.related_companies || [])
        .filter(Boolean);
      const uniqueCompanies = Array.from(new Set(allCompanies));
      // 이름/코드 분리 (예시: "삼성전자(005930)" 형식이면 분리, 아니면 이름만)
      const companyObjs: Company[] = uniqueCompanies.map((item) => {
        const match = item.match(/(.+)[(]([0-9A-Za-z]+)[)]/);
        if (match) {
          return { name: match[1], code: match[2] };
        } else {
          return { name: item, code: item };
        }
      });
      setCompanies(companyObjs);
    });
  }, []);

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.code.includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCompanies = filteredCompanies.slice(startIndex, endIndex);

  return (
    <div className="flex-[0.8] bg-white rounded-xl border border-gray-200 shadow-lg flex flex-col h-full">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
        <div className="p-6 flex items-center gap-2">
          <div className="bg-gradient-to-r from-[#0A5C2B] to-[#0A5C2B]/80 p-2 rounded-lg shadow-md">
            <Star className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-[#0A5C2B] to-[#0A5C2B]/80 bg-clip-text text-transparent">
            관심기업
          </h3>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-50">
        <div className="p-6 space-y-4">
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="기업명 또는 종목코드 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5C2B] focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          <div className="flex-1 space-y-4 mb-6">
            {currentCompanies.length > 0 ? (
              currentCompanies.map((company, index) => (
                <div
                  key={index}
                  onClick={() =>
                    onCompanySelect(
                      company === selectedCompany ? null : company
                    )
                  }
                  className={`p-4 rounded-lg border transition-colors duration-200 cursor-pointer ${
                    company === selectedCompany
                      ? "border-[#0A5C2B] bg-[#0A5C2B]/5"
                      : "border-gray-200 hover:border-[#0A5C2B]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-medium ${company === selectedCompany ? "text-[#0A5C2B]" : ""}`}
                    >
                      {company.name}
                    </span>
                    <span
                      className={`text-sm ${company === selectedCompany ? "text-[#0A5C2B]" : "text-gray-500"}`}
                    >
                      {company.code}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                {searchQuery
                  ? "검색 결과가 없습니다."
                  : "관심기업을 추가해보세요."}
              </div>
            )}
          </div>
        </div>
      </div>
      {filteredCompanies.length > 0 && (
        <div className="sticky bottom-0 z-10 bg-white border-t pt-4 mt-auto flex items-center justify-between">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 text-[#0A5C2B]" />
          </button>
          <span className="text-sm text-gray-600">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage >= totalPages}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5 text-[#0A5C2B]" />
          </button>
        </div>
      )}
    </div>
  );
}
