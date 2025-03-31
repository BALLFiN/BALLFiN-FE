import { LucideIcon } from "lucide-react";

interface AIModelData {
  label: string;
  value: string;
}

interface AIModel {
  icon: LucideIcon;
  title: string;
  data: AIModelData[];
}

interface AIModelCardProps {
  model: AIModel;
}

export const AIModelCard = ({ model }: AIModelCardProps) => {
  const { icon: Icon, title, data } = model;

  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-6 h-6 text-[#0A5C2B]" />
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index}>
            <div className="text-sm text-gray-600">{item.label}</div>
            <div className="font-medium">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
