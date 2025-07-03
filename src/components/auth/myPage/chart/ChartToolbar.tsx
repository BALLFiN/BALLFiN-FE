import { ChevronUp, ChevronDown, Trash2 } from 'lucide-react';

export interface ChartToolbarProps {
  disabled: boolean;
  onReorder: (action: 'top' | 'up' | 'down' | 'bottom') => void;
  onDelete: () => void;
}

export default function ChartToolbar({ disabled, onReorder, onDelete }: ChartToolbarProps) {
  const btnClass = `px-2 hover:bg-gray-100 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  return (
    <div className="flex items-center gap-2  px-4 py-3 rounded w-2/5">
      <div className="flex justify-between max-w-4/5 ">
        <button className={btnClass} disabled={disabled} onClick={() => onReorder('top')} title="맨 위로 이동">
          {/* MoveToTop icon if needed */}
          <ChevronDown size={20} className="rotate-180" />
        </button>
        <button className={btnClass} disabled={disabled} onClick={() => onReorder('up')} title="위로 이동">
          <ChevronUp size={20} />
        </button>
        <button className={btnClass} disabled={disabled} onClick={() => onReorder('down')} title="아래로 이동">
          <ChevronDown size={20} />
        </button>
        <button className={btnClass} disabled={disabled} onClick={() => onReorder('bottom')} title="맨 아래로 이동">
          <ChevronUp size={20} className="rotate-180" />
        </button>
      </div>
      <button className={`${btnClass} ml-auto text-red-600`} disabled={disabled} onClick={onDelete} title="삭제">
        <Trash2 size={20} />
      </button>
    </div>
  );
}
