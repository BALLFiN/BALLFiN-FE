import { Clock, X } from "lucide-react";
import { useState } from "react";
import Watchlist from "./Watchlist";

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  source: string;
  sentiment: "neutral" | "positive" | "negative";
}

interface Company {
  name: string;
  code: string;
}

interface NewsTimelineProps {
  events: TimelineEvent[];
  onEventClick?: (event: TimelineEvent) => void;
}

export default function NewsTimeline({
  events,
  onEventClick,
}: NewsTimelineProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const filteredEvents = selectedCompany
    ? events.filter((event) => event.title.includes(selectedCompany.name))
    : events;

  return (
    <div className="flex gap-6 w-full h-[calc(95vh-12rem)]">
      <div className="flex-[1.2] bg-white p-6 rounded-xl border border-gray-200 shadow-lg overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-[#0A5C2B] to-[#0A5C2B]/80 p-2 rounded-lg shadow-md">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold bg-gradient-to-r from-[#0A5C2B] to-[#0A5C2B]/80 bg-clip-text text-transparent">
                실시간 타임라인
              </h3>
              {selectedCompany && (
                <div className="flex items-center gap-2 bg-[#0A5C2B]/5 px-3 py-1.5 rounded-full">
                  <span className="text-sm font-medium text-[#0A5C2B]">
                    {selectedCompany.name}
                  </span>
                  <button
                    onClick={() => setSelectedCompany(null)}
                    className="p-1 hover:bg-[#0A5C2B]/10 rounded-full transition-colors duration-200"
                  >
                    <X className="w-3 h-3 text-[#0A5C2B]" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {filteredEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-[#0A5C2B]/5 p-4 rounded-full mb-4">
                <Clock className="w-8 h-8 text-[#0A5C2B]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                즐겨찾기한 종목이 없습니다
              </h3>
              <p className="text-gray-500 max-w-md">
                관심 있는 종목을 즐겨찾기에 추가하면 관련 뉴스를 실시간으로
                확인할 수 있습니다.
              </p>
            </div>
          ) : (
            filteredEvents.map((event, index) => (
              <div
                key={index}
                className={`flex gap-4 p-3 rounded-lg cursor-pointer will-change-transform ${
                  hoveredIndex === index
                    ? "bg-gray-50 scale-[1.02]"
                    : "hover:bg-gray-50"
                } ${
                  event.sentiment === "positive"
                    ? "hover:border-l-4 hover:border-l-red-500"
                    : event.sentiment === "negative"
                      ? "hover:border-l-4 hover:border-l-blue-500"
                      : "hover:border-l-4 hover:border-l-[#0A5C2B]"
                } transition-all duration-200 ease-out`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => onEventClick?.(event)}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-3 h-3 rounded-full shadow-md transition-transform duration-200 ${
                      hoveredIndex === index ? "scale-125" : ""
                    } ${
                      event.sentiment === "positive"
                        ? "bg-gradient-to-br from-red-400 to-red-600"
                        : event.sentiment === "negative"
                          ? "bg-gradient-to-br from-blue-400 to-blue-600"
                          : "bg-gradient-to-br from-[#0A5C2B] to-[#0A5C2B]/80"
                    }`}
                  />
                  <div
                    className={`w-0.5 h-[calc(100%+1rem)] transition-colors duration-200 ${
                      event.sentiment === "positive"
                        ? "bg-blue-200"
                        : event.sentiment === "negative"
                          ? "bg-red-200"
                          : "bg-[#0A5C2B]/20"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                    <span className="font-medium">{event.time}</span>
                    <span>•</span>
                    <span className="text-[#0A5C2B] font-medium">
                      {event.source}
                    </span>
                  </div>
                  <h4
                    className={`text-base font-semibold transition-colors duration-200 ${
                      hoveredIndex === index
                        ? "text-[#0A5C2B]"
                        : "text-gray-900"
                    }`}
                  >
                    {event.title}
                  </h4>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Watchlist
        onCompanySelect={setSelectedCompany}
        selectedCompany={selectedCompany}
      />
    </div>
  );
}
