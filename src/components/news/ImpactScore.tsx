import { useState, useEffect, useRef } from "react";

interface ImpactScoreProps {
  score?: number;
}

const ImpactScore = ({ score }: ImpactScoreProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [progressDone, setProgressDone] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!score) return;
    let start: number | null = null;
    const duration = 900; // ms, 약간 더 여유롭게
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = easeOutCubic(progress);
      setAnimatedScore(eased * score);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setAnimatedScore(score);
        setProgressDone(true);
      }
    };
    setAnimatedScore(0);
    setProgressDone(false);
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [score]);

  if (!score) return null;

  const getScoreGradient = (score: number) => {
    if (score >= 8)
      return "bg-gradient-to-r from-red-500 via-pink-500 to-purple-500";
    if (score >= 6)
      return "bg-gradient-to-r from-orange-400 via-orange-500 to-red-500";
    if (score >= 4)
      return "bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400";
    return "bg-gradient-to-r from-green-400 via-green-500 to-yellow-300";
  };

  const getScoreText = (score: number) => {
    if (score >= 8) return "매우 높음";
    if (score >= 6) return "높음";
    if (score >= 4) return "보통";
    return "낮음";
  };

  return (
    <div className="relative">
      <div
        className="w-full bg-gray-200 rounded-full h-3 mb-2"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div
          className={`h-3 rounded-full transition-all duration-300 ${getScoreGradient(score)}`}
          style={{ width: `${(animatedScore / 10) * 100}%` }}
        ></div>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600 font-medium">Impact Score</span>
        <span className="font-bold text-gray-900">
          {progressDone ? score : Math.round(animatedScore)}/10
        </span>
      </div>

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-10">
          Impact Score: {score}/10 ({getScoreText(score)})
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </div>
  );
};

export default ImpactScore;
