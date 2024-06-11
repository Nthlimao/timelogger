export type PagedColumns = {
  id: string;
  header: string;
  hasSort?: boolean;
};

export type PagePagination = {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
};

export type PageResult<T> = {
  items: T[];
  columns: PagedColumns[];
} & PagePagination;

export type PageQueryParams = {
  sortDirection?: "desc" | "asc";
  sortBy?: string;
  page?: number;
  limit?: number;
};
