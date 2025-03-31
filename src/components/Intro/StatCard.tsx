import { useEffect, useState, useRef } from "react";

interface StatCardProps {
  value: string;
  label: string;
}

export const StatCard = ({ value, label }: StatCardProps) => {
  const [displayValue, setDisplayValue] = useState("0");
  const [isVisible, setIsVisible] = useState(false);
  const numberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (numberRef.current) {
      observer.observe(numberRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
    const duration = 1500;
    const steps = 60;
    const increment = numericValue / steps;
    const interval = duration / steps;

    let currentValue = 0;
    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= numericValue) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        if (value.includes("M")) {
          setDisplayValue(`${(currentValue / 1000000).toFixed(1)}M+`);
        } else if (value.includes("%")) {
          setDisplayValue(`${currentValue.toFixed(1)}%`);
        } else {
          setDisplayValue(`${Math.floor(currentValue).toLocaleString()}+`);
        }
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div
      ref={numberRef}
      className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 w-full"
    >
      <div className="text-3xl font-bold text-[#0A5C2B] mb-2 text-center">
        {displayValue}
      </div>
      <div className="text-base text-gray-600 text-center">{label}</div>
    </div>
  );
};
