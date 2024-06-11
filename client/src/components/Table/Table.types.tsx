import { PageQueryParams, PagePagination } from "@/shared/types/PagedResult";

export interface Column {
  id: string;
  header: string;
  sort?: boolean;
  hasSort?: boolean;
}

export interface Data {
  [key: string]: any;
}

export interface TableProps {
  columns: Column[];
  data: Data[];
  pagination?: PagePagination;
  handlePagination?: (page: number) => void;
  handleItemPage?: (item: Data) => void;
  handleSort?: (
    sortDirection: PageQueryParams["sortDirection"],
    sortBy: PageQueryParams["sortBy"]
  ) => void;
}
