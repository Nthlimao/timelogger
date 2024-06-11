import { ReactElement } from "react";

import { PageQueryParams } from "@/shared/types/PagedResult";
import { TableProps } from "./Table.types";
import TableSort from "./TableSort/TableSort";

import TableStyles, {
  TableBody,
  TableFooter,
  TableHeader,
  TableWrapper,
} from "./Table.styles";
import TablePagination from "./TablePagination/TablePagination";

const Table = ({
  columns,
  data,
  pagination,
  handleSort,
  handlePagination,
}: TableProps): ReactElement => {
  const handleColumnSort = (
    sortDirection: PageQueryParams["sortDirection"],
    sortBy: PageQueryParams["sortBy"]
  ) => {
    handleSort && handleSort(sortDirection, sortBy);
  };

  return (
    <TableWrapper>
      <TableStyles>
        <TableHeader>
          <tr>
            {columns.map((column) => (
              <th key={column.id}>
                <TableSort
                  id={column.id}
                  hasSort={column.hasSort}
                  handleSort={handleColumnSort}
                >
                  {column.header}
                </TableSort>
              </th>
            ))}
          </tr>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={column.id}>{row[column.id]}</td>
              ))}
            </tr>
          ))}
        </TableBody>
      </TableStyles>
      {pagination && handlePagination && (
        <TableFooter>
          <p>
            Showing <b>{pagination?.pageSize}</b> of{" "}
            <b>{pagination?.totalItems}</b> results.
          </p>
          <TablePagination
            currentPage={pagination.pageNumber}
            totalPages={pagination.totalPages}
            onPageChange={handlePagination}
          />
        </TableFooter>
      )}
    </TableWrapper>
  );
};

export default Table;
