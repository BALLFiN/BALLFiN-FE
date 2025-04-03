import { useState } from "react";
import { Calendar, Filter } from "lucide-react";

interface NewsFilterProps {
  onSortChange: (sort: string) => void;
  onDateRangeChange: (range: { start: string; end: string }) => void;
  onImpactFilterChange: (impacts: string[]) => void;
}

export default function NewsFilter({
  onSortChange,
  onDateRangeChange,
  onImpactFilterChange,
}: NewsFilterProps) {
  const [sortBy, setSortBy] = useState("relevance");
  const [dateRange, setDateRange] = useState("all");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [selectedImpact, setSelectedImpact] = useState("all");

  const handleSortChange = (value: string) => {
    setSortBy(value);
    onSortChange(value);
  };

  const handleDateRangeChange = (range: string) => {
    setDateRange(range);
    const today = new Date();
    let startDate = new Date();
    let endDate = new Date();

    switch (range) {
      case "today":
        break;
      case "week":
        startDate.setDate(today.getDate() - 7);
        break;
      case "month":
        startDate.setMonth(today.getMonth() - 1);
        break;
      case "year":
        startDate.setFullYear(today.getFullYear() - 1);
        break;
      case "custom":
        if (customStartDate && customEndDate) {
          onDateRangeChange({
            start: customStartDate,
            end: customEndDate,
          });
        }
        return;
      default:
        onDateRangeChange({
          start: "",
          end: "",
        });
        return;
    }

    onDateRangeChange({
      start: startDate.toISOString().split("T")[0],
      end: endDate.toISOString().split("T")[0],
    });
  };

  const handleImpactChange = (impact: string) => {
    setSelectedImpact(impact);
    if (impact === "all") {
      onImpactFilterChange([]);
    } else {
      onImpactFilterChange([impact]);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* 정렬 */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
          정렬
        </span>
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5C2B] focus:border-transparent"
        >
          <option value="relevance">연관도순</option>
          <option value="newest">최신순</option>
          <option value="oldest">오래된순</option>
        </select>
      </div>

      {/* 날짜 필터 */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
          기간
        </span>
        <select
          value={dateRange}
          onChange={(e) => handleDateRangeChange(e.target.value)}
          className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5C2B] focus:border-transparent"
        >
          <option value="all">전체</option>
          <option value="today">오늘</option>
          <option value="week">지난 1주</option>
          <option value="month">지난 1달</option>
          <option value="year">올해</option>
          <option value="custom">직접 설정</option>
        </select>

        {dateRange === "custom" && (
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e.target.value)}
              className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5C2B] focus:border-transparent"
            />
            <span>~</span>
            <input
              type="date"
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e.target.value)}
              className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5C2B] focus:border-transparent"
            />
            <button
              onClick={() => handleDateRangeChange("custom")}
              className="px-3 py-1 bg-[#0A5C2B] text-white rounded-lg hover:bg-[#0A5C2B]/90 transition-colors"
            >
              적용
            </button>
          </div>
        )}
      </div>

      {/* 영향 필터 */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
          영향
        </span>
        <select
          value={selectedImpact}
          onChange={(e) => handleImpactChange(e.target.value)}
          className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5C2B] focus:border-transparent"
        >
          <option value="all">전체</option>
          <option value="positive">호재</option>
          <option value="negative">악재</option>
        </select>
      </div>
    </div>
  );
}
