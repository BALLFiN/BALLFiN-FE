export interface StockItem {
  id: number;
  name: string;
  code: string;
  price: number;
  change: number;
}

export interface StockSearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}
