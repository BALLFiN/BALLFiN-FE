import { NewsItem } from "../../mock/newsData";

export interface NewsListProps {
  news: NewsItem[];
  selectedNews: NewsItem | null;
  onNewsClick: (news: NewsItem) => void;
}

export interface NewsFilterProps {
  onSortChange: (sort: string) => void;
  onDateRangeChange: (range: { start: string; end: string }) => void;
  onImpactFilterChange: (impacts: string[]) => void;
}

export interface NewsCardProps {
  item: NewsItem;
  isSelected: boolean;
  onClick: (item: NewsItem) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
