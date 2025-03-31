import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

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
  index: number;
}

export const AIModelCard = ({ model, index }: AIModelCardProps) => {
  const { icon: Icon, title, data } = model;

  return (
    <motion.div
      initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-sm p-8"
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center gap-3 mb-4"
      >
        <Icon className="w-6 h-6 text-[#0A5C2B]" />
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </motion.div>
      <div className="space-y-4">
        {data.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
          >
            <div className="text-sm text-gray-600">{item.label}</div>
            <div className="font-medium">{item.value}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
