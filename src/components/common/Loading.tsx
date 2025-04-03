import { useEffect, useState } from "react";

export default function Loading() {
  const [currentLetter, setCurrentLetter] = useState(0);
  const text = "Loading";
  const letters = text.split("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLetter((prev) => (prev + 1) % letters.length);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <style>
        {`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-15px);
            }
          }
        `}
      </style>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {letters.map((letter, index) => (
            <span
              key={index}
              className={`text-4xl font-shrikhand transition-all duration-200 ${
                index === currentLetter
                  ? "text-[#0A5C2B] scale-125"
                  : "text-gray-300 scale-100"
              }`}
            >
              {letter}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((num) => (
            <img
              key={num}
              src={`/assets/FinBung_${num}.svg`}
              alt={`FinBung ${num}`}
              className="w-8 h-8"
              style={{
                animation: `bounce 0.8s ease-in-out infinite`,
                animationDelay: `${num * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
