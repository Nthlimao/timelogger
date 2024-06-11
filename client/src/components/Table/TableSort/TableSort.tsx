import { ReactElement, ReactNode, useState } from "react";

import { PageQueryParams } from "@/shared/types/PagedResult";
import TableSortStyles, { ChevronSort } from "./TableSort.styles";

interface ITableSort {
  id: string;
  children: ReactNode;
  hasSort?: boolean;
  handleSort: (
    sortDirection: PageQueryParams["sortDirection"],
    sortBy: PageQueryParams["sortBy"]
  ) => void;
}

const TableSort = ({
  children,
  id,
  hasSort = false,
  handleSort,
}: ITableSort): ReactElement => {
  const [sort, setSort] = useState<"asc" | "desc" | undefined>();

  const onClickSort = () => {
    if (hasSort) {
      if (sort && sort === "asc") {
        setSort("desc");
        handleSort("desc", id);
      } else if (sort && sort === "desc") {
        setSort(undefined);
        handleSort(undefined, undefined);
      } else {
        setSort("asc");
        handleSort("asc", id);
      }
    }
  };

  return (
    <TableSortStyles onClick={onClickSort}>
      {children}
      {hasSort && <ChevronSort direction={sort} />}
    </TableSortStyles>
  );
};

export default TableSort;
