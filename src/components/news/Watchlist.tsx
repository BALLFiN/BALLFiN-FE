import { Star, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Company {
  name: string;
  code: string;
}

interface WatchlistProps {
  onCompanySelect: (company: Company | null) => void;
  selectedCompany: Company | null;
}

const mockCompanies: Company[] = [
  { name: "삼성전자", code: "005930" },
  { name: "SK하이닉스", code: "000660" },
  { name: "네이버", code: "035420" },
  { name: "카카오", code: "035720" },
  { name: "LG에너지솔루션", code: "373220" },
  { name: "현대차", code: "005380" },
  { name: "기아", code: "000270" },
  { name: "POSCO홀딩스", code: "005490" },
  { name: "LG화학", code: "051910" },
  { name: "삼성바이오로직스", code: "207940" },
];

export default function Watchlist({
  onCompanySelect,
  selectedCompany,
}: WatchlistProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredCompanies = mockCompanies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.code.includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCompanies = filteredCompanies.slice(startIndex, endIndex);

  return (
    <div className="flex-[0.8] bg-white p-6 rounded-xl border border-gray-200 shadow-lg overflow-y-auto flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-[#0A5C2B] to-[#0A5C2B]/80 p-2 rounded-lg shadow-md">
            <Star className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-[#0A5C2B] to-[#0A5C2B]/80 bg-clip-text text-transparent">
            관심기업
          </h3>
        </div>
      </div>

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
                onCompanySelect(company === selectedCompany ? null : company)
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
            {searchQuery ? "검색 결과가 없습니다." : "관심기업이 없습니다."}
          </div>
        )}
      </div>

      {filteredCompanies.length > 0 && (
        <div className="flex items-center justify-between border-t pt-4 mt-auto">
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
