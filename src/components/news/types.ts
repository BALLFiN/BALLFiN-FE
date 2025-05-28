import { NewsItem } from "../../api/news/index";

export interface NewsListProps {
  selectedNews: NewsItem | null;
  onNewsClick: (news: NewsItem) => void;
}

export interface NewsFilterProps {
  onSortChange: (sort: string) => void;
  onDateRangeChange: (range: { start: string; end: string }) => void;
  onImpactFilterChange: (impacts: string[]) => void;
  showOnlyFavorites: boolean;
  onShowOnlyFavoritesChange: (show: boolean) => void;
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
