export enum NewsSortOption {
  Date = 'Date',
  Rating = 'Rating',
}

export interface NewsFilterForm {
  ascendedSort: boolean;
  search: string;
  sortType: NewsSortOption;
}

export const FilterDebounceTime = 200;
