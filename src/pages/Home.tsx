import NewsSummary from "@/components/home/NewsSummary";
import StockSummary from "@/components/home/StockSummary";
import BotButton from "@/components/chat/BotButton";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NewsSummary />
        <StockSummary />
      </div>
      <BotButton />
    </div>
  );
};

export default Home;
