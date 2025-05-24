import { ArrowLeft, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StockHeaderProps {
  name: string;
  code: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function StockHeader({
  name,
  code,
  isFavorite,
  onToggleFavorite,
}: StockHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-gray-500">{code}</p>
        </div>
      </div>
      <button
        onClick={onToggleFavorite}
        className={`p-2 rounded-full hover:bg-gray-100 ${
          isFavorite ? "text-yellow-500" : "text-gray-400"
        }`}
      >
        <Star size={24} />
      </button>
    </div>
  );
}
