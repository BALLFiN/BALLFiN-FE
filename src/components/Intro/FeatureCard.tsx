import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  stats: string;
}

export const FeatureCard = ({
  icon,
  title,
  description,
  stats,
}: FeatureCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="text-sm text-[#0A5C2B] font-medium">{stats}</div>
    </div>
  );
};
