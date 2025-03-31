import { motion } from "framer-motion";

interface FinBungImageProps {
  src: string;
  alt: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  opacity?: number;
  width?: string;
  className?: string;
}

export const FinBungImage = ({
  src,
  alt,
  position,
  opacity = 10,
  width = "w-1/4",
  className = "",
}: FinBungImageProps) => {
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  };

  const initialPosition = {
    "top-left": { x: -100, y: -100 },
    "top-right": { x: 100, y: -100 },
    "bottom-left": { x: -100, y: 100 },
    "bottom-right": { x: 100, y: 100 },
  };

  return (
    <motion.div
      initial={initialPosition[position]}
      animate={{ x: 0, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`absolute ${positionClasses[position]} ${width} opacity-${opacity} ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-auto"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};
