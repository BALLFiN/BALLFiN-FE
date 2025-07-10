interface NewsItem {
  id: number;
  title: string;
  source: string;
  date: string;
  sentiment: "positive" | "negative" | "neutral";
  url: string;
}

interface StockNewsProps {
  news: NewsItem[];
}

export default function StockNews({ news }: StockNewsProps) {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-500";
      case "negative":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="space-y-4">
      {news.map((item) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-gray-900">{item.title}</h3>
            <span className={`text-sm ${getSentimentColor(item.sentiment)}`}>
              {item.sentiment === "positive"
                ? "긍정"
                : item.sentiment === "negative"
                  ? "부정"
                  : "중립"}
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>{item.source}</span>
            <span>{item.date}</span>
          </div>
        </a>
      ))}
    </div>
  );
}
