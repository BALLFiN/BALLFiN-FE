import { Star } from "lucide-react";
import { NewsItem } from "../../mock/newsData";

interface PersonalizedFeedProps {
  news: NewsItem[];
  interests: string[];
}

export default function PersonalizedFeed({
  news,
  interests,
}: PersonalizedFeedProps) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Personalized News Feed
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">관심 분야:</span>
          <div className="flex gap-2">
            {interests.map((interest, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-[#0A5C2B]/10 text-[#0A5C2B] rounded-full"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {news.map((item) => (
          <div
            key={item.id}
            className="group p-4 rounded-lg border border-gray-100 hover:border-[#0A5C2B]/20 cursor-pointer transition-all duration-300"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                  {item.summary}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{item.source}</span>
                  <span>•</span>
                  <span>{item.date}</span>
                </div>
              </div>
              <div className="w-20 h-20 rounded-lg overflow-hidden">
                <img
                  src={item.imageUrl || "https://via.placeholder.com/80x80"}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
