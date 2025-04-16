import { Clock } from "lucide-react";

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  source: string;
}

interface NewsTimelineProps {
  events: TimelineEvent[];
}

export default function NewsTimeline({ events }: NewsTimelineProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Time Line</h3>
      <div className="space-y-6">
        {events.map((event, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 bg-[#0A5C2B] rounded-full" />
              {index !== events.length - 1 && (
                <div className="w-0.5 h-full bg-gray-200" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <Clock className="w-4 h-4" />
                <span>{event.time}</span>
                <span>•</span>
                <span>{event.source}</span>
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">
                {event.title}
              </h4>
              <p className="text-sm text-gray-600">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
