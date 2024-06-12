import "@testing-library/jest-dom";

import React from "react";
import { render, fireEvent } from "../../../shared/utils/customRender";

import TablePagination from "../TablePagination/TablePagination";

describe("TablePagination component", () => {
  const renderTablePagination = (
    currentPage: number,
    totalPages: number,
    onPageChange: jest.Mock
  ) => {
    return render(
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    );
  };

  test("renders correctly", () => {
    const mockOnPageChange = jest.fn();
    const { getByRole } = renderTablePagination(1, 5, mockOnPageChange);

    expect(getByRole("button", { name: /1/i })).toBeInTheDocument();
    expect(getByRole("button", { name: /2/i })).toBeInTheDocument();
    expect(getByRole("button", { name: /3/i })).toBeInTheDocument();
    expect(getByRole("button", { name: /4/i })).toBeInTheDocument();
    expect(getByRole("button", { name: /5/i })).toBeInTheDocument();
  });

  test("disables previous button on first page", () => {
    const mockOnPageChange = jest.fn();
    const { getByTestId } = renderTablePagination(1, 5, mockOnPageChange);

    expect(getByTestId("left-page-btn")).toBeDisabled();
  });

  test("disables next button on last page", () => {
    const mockOnPageChange = jest.fn();
    const { getByTestId } = renderTablePagination(5, 5, mockOnPageChange);

    expect(getByTestId("right-page-btn")).toBeDisabled();
  });

  test("calls onPageChange with correct value when page number is clicked", () => {
    const mockOnPageChange = jest.fn();
    const { getByRole } = renderTablePagination(1, 5, mockOnPageChange);

    fireEvent.click(getByRole("button", { name: /3/i }));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  test("calls onPageChange with correct value when next button is clicked", () => {
    const mockOnPageChange = jest.fn();
    const { getByTestId } = renderTablePagination(1, 5, mockOnPageChange);

    fireEvent.click(getByTestId("right-page-btn"));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  test("calls onPageChange with correct value when previous button is clicked", () => {
    const mockOnPageChange = jest.fn();
    const { getByTestId } = renderTablePagination(3, 5, mockOnPageChange);

    fireEvent.click(getByTestId("left-page-btn"));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });
});
