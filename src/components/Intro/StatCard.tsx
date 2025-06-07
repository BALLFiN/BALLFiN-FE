import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  value: string;
  label: string;
  index: number;
}

export const StatCard = ({ value, label, index }: StatCardProps) => {
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
      { threshold: 0.1 },
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
    <motion.div
      ref={numberRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 w-full"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-3xl font-bold text-[#0A5C2B] mb-2 text-center"
      >
        {displayValue}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-base text-gray-600 text-center"
      >
        {label}
      </motion.div>
    </motion.div>
  );
};
