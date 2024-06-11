import { ReactElement, ReactNode } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

import TablePaginationStyles, {
  PaginationButton,
  PaginationButtonIcon,
} from "./TablePagination.styles";
import { PagePagination } from "@/shared/types/PagedResult";

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
      >
        <PaginationButtonIcon>
          <ChevronLeftIcon />
        </PaginationButtonIcon>
      </PaginationButton>
      {renderPageNumbers()}
      <PaginationButton
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <PaginationButtonIcon>
          <ChevronRightIcon />
        </PaginationButtonIcon>
      </PaginationButton>
    </TablePaginationStyles>
  );
};

export default TablePagination;
