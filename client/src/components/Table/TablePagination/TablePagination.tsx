import React, { ReactElement, ReactNode } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

import { PagePagination } from "@/shared/types/PagedResult";

import TablePaginationStyles, {
  PaginationButton,
  PaginationButtonIcon,
} from "./TablePagination.styles";

interface ITablePagination {
  currentPage: PagePagination["pageNumber"];
  totalPages: PagePagination["totalPages"];
  onPageChange: (page: number) => void;
}

const TablePagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: ITablePagination): ReactElement => {
  const renderPageNumbers = (): ReactNode => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <PaginationButton
          key={i}
          role="button"
          isCurrentPage={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </PaginationButton>
      );
    }

    return pageNumbers;
  };
  return (
    <TablePaginationStyles>
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        data-testid="left-page-btn"
      >
        <PaginationButtonIcon>
          <ChevronLeftIcon />
        </PaginationButtonIcon>
      </PaginationButton>
      {renderPageNumbers()}
      <PaginationButton
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        data-testid="right-page-btn"
      >
        <PaginationButtonIcon>
          <ChevronRightIcon />
        </PaginationButtonIcon>
      </PaginationButton>
    </TablePaginationStyles>
  );
};

export default TablePagination;
