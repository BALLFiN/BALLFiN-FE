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

  return (
    <div
      className={`absolute ${positionClasses[position]} ${width} opacity-${opacity} ${className}`}
    >
      <img src={src} alt={alt} className="w-full h-auto" />
    </div>
  );
};
