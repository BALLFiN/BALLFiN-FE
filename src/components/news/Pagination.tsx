import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginationProps } from "./types";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // 표시할 페이지 번호 계산
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // 전체 페이지가 5개 이하면 모두 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 현재 페이지 주변의 페이지 번호만 표시
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + maxVisiblePages - 1);

      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg transition-colors ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-600 hover:bg-gray-100"
        }`}
        aria-label="이전 페이지"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentPage === page
              ? "bg-[#0A5C2B] text-white font-medium"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg transition-colors ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-600 hover:bg-gray-100"
        }`}
        aria-label="다음 페이지"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
