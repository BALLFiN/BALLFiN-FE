import { useState } from "react";
import { Clock, Star, TrendingUp, TrendingDown, MoveRight } from "lucide-react";
import { Listbox } from "@headlessui/react";
import { Fragment } from "react";

interface NewsFilterProps {
  onSortChange: (sort: string) => void;
  onDateRangeChange: (range: { start: string; end: string }) => void;
  onImpactFilterChange: (impacts: string[]) => void;
  showOnlyFavorites?: boolean;
  onShowOnlyFavoritesChange?: (show: boolean) => void;
}

export default function NewsFilter({
  onSortChange,
  onDateRangeChange,
  onImpactFilterChange,
  showOnlyFavorites,
  onShowOnlyFavoritesChange,
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

    // 한국 시간 기준으로 현재 날짜 설정
    const today = new Date();
    const koreanTime = new Date(today.getTime() + 9 * 60 * 60 * 1000); // UTC+9
    let startDate = new Date(koreanTime);
    let endDate = new Date(koreanTime);

    switch (range) {
      case "today":
        break;
      case "week":
        startDate.setDate(koreanTime.getDate() - 7);
        break;
      case "month":
        startDate.setMonth(koreanTime.getMonth() - 1);
        break;
      case "year":
        startDate.setFullYear(koreanTime.getFullYear() - 1);
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

    // 날짜를 YYYY-MM-DD 형식으로 변환
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    // 날짜 범위 변경 즉시 적용
    onDateRangeChange({
      start: formattedStartDate,
      end: formattedEndDate,
    });
  };

  // 커스텀 날짜 변경 시 즉시 적용
  const handleCustomDateChange = (type: "start" | "end", value: string) => {
    if (type === "start") {
      setCustomStartDate(value);
    } else {
      setCustomEndDate(value);
    }

    if (customStartDate && customEndDate) {
      onDateRangeChange({
        start: customStartDate,
        end: customEndDate,
      });
    }
  };

  const handleImpactChange = (impact: string) => {
    setSelectedImpact(impact);
    if (impact === "all") {
      onImpactFilterChange([]);
    } else {
      onImpactFilterChange([impact]);
    }
  };

  const dateOptions = [
    { value: "all", label: "전체" },
    { value: "today", label: "오늘" },
    { value: "week", label: "지난 1주" },
    { value: "month", label: "지난 1달" },
    { value: "year", label: "올해" },
    { value: "custom", label: "직접 설정" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-6">
      {/* 정렬 버튼 그룹 */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-700">정렬</span>
        <div className="flex gap-2">
          <button
            onClick={() => handleSortChange("relevance")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              sortBy === "relevance"
                ? "bg-[#0A5C2B] text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            연관도순
          </button>
          <button
            onClick={() => handleSortChange("newest")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              sortBy === "newest"
                ? "bg-[#0A5C2B] text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            <Clock className="w-4 h-4" />
            최신순
          </button>
          <button
            onClick={() => handleSortChange("oldest")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              sortBy === "oldest"
                ? "bg-[#0A5C2B] text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            <Clock className="w-4 h-4 rotate-180" />
            오래된순
          </button>
        </div>
      </div>

      {/* 관심기업 토글 버튼 */}
      {typeof showOnlyFavorites === "boolean" && onShowOnlyFavoritesChange && (
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">관심기업</span>
          <button
            onClick={() => onShowOnlyFavoritesChange(!showOnlyFavorites)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              showOnlyFavorites
                ? "bg-[#0A5C2B] text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            <Star className="w-4 h-4" />
            {showOnlyFavorites ? "관심기업만" : "전체 보기"}
          </button>
        </div>
      )}

      {/* 영향 필터 버튼 그룹 */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-700">영향</span>
        <div className="flex gap-2">
          <button
            onClick={() => handleImpactChange("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              selectedImpact === "all"
                ? "bg-[#0A5C2B] text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            전체
          </button>
          <button
            onClick={() => handleImpactChange("positive")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              selectedImpact === "positive"
                ? "bg-red-500 text-white shadow-md hover:bg-red-600"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            호재
          </button>
          <button
            onClick={() => handleImpactChange("neutral")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              selectedImpact === "neutral"
                ? "bg-gray-500 text-white shadow-md hover:bg-gray-600"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            <MoveRight className="w-4 h-4" />
            중립
          </button>
          <button
            onClick={() => handleImpactChange("negative")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              selectedImpact === "negative"
                ? "bg-blue-500 text-white shadow-md hover:bg-blue-600"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            <TrendingDown className="w-4 h-4" />
            악재
          </button>
        </div>
      </div>
      {/* 날짜 필터 */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-700">기간</span>
        <div className="flex items-center gap-2 min-w-[140px]">
          <div className="relative w-full">
            <Listbox value={dateRange} onChange={handleDateRangeChange}>
              <Listbox.Button className="pl-4 pr-10 py-2 rounded-lg text-sm font-medium border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0A5C2B] bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200 cursor-pointer w-full text-left">
                {dateOptions.find((opt) => opt.value === dateRange)?.label}
              </Listbox.Button>
              <Listbox.Options className="absolute right-0 mt-2 w-full bg-white shadow-lg rounded-lg z-50 border border-gray-200 focus:outline-none focus:ring-0">
                {dateOptions.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    value={option.value}
                    as={Fragment}
                  >
                    {({
                      active,
                      selected,
                    }: {
                      active: boolean;
                      selected: boolean;
                    }) => (
                      <li
                        className={`list-none px-4 py-2 cursor-pointer ${
                          active ? "bg-gray-100" : ""
                        } ${selected ? "font-bold text-[#0A5C2B]" : ""}`}
                      >
                        {option.label}
                      </li>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>
          {dateRange === "custom" && (
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={customStartDate}
                onChange={(e) =>
                  handleCustomDateChange("start", e.target.value)
                }
                className="px-3 py-2 rounded-lg text-sm font-medium border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0A5C2B] focus:border-transparent bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200"
              />
              <span className="text-gray-500">~</span>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => handleCustomDateChange("end", e.target.value)}
                className="px-3 py-2 rounded-lg text-sm font-medium border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0A5C2B] focus:border-transparent bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
