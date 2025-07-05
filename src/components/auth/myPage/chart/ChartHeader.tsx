import ChartSearch from './ChartSearch';
import ChartToolbar from './ChartToolbar';

export default function ChartHeader({
  disabled,
  onAdd,
  onReorder,
  onDelete,
}: {
  disabled: boolean;
  onAdd: (q: string) => void;
  onReorder: (a: 'top' | 'up' | 'down' | 'bottom') => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex gap-7 mt-5 ">
      <ChartToolbar disabled={disabled} onReorder={onReorder} onDelete={onDelete} />
      <div className=" w-full pr-5">
        <ChartSearch onAdd={onAdd} />
      </div>
    </div>
  );
}
