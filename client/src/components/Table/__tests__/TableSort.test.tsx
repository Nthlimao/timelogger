import "@testing-library/jest-dom";

import React from "react";
import { render, fireEvent } from "../../../shared/utils/customRender";
import TableSort from "../TableSort/TableSort";

describe("TableSort component", () => {
  const renderTableSort = (
    id: string,
    hasSort: boolean,
    handleSort: jest.Mock
  ) => {
    return render(
      <TableSort id={id} hasSort={hasSort} handleSort={handleSort}>
        Sortable Column
      </TableSort>
    );
  };

  test("renders correctly", () => {
    const mockHandleSort = jest.fn();
    const { getByText } = renderTableSort("test-id", true, mockHandleSort);

    expect(getByText("Sortable Column")).toBeInTheDocument();
  });

  test('calls handleSort with "asc" on first click', () => {
    const mockHandleSort = jest.fn();
    const { getByText } = renderTableSort("test-id", true, mockHandleSort);

    fireEvent.click(getByText("Sortable Column"));

    expect(mockHandleSort).toHaveBeenCalledWith("asc", "test-id");
  });

  test('calls handleSort with "desc" on second click', () => {
    const mockHandleSort = jest.fn();
    const { getByText } = renderTableSort("test-id", true, mockHandleSort);

    fireEvent.click(getByText("Sortable Column"));
    fireEvent.click(getByText("Sortable Column"));

    expect(mockHandleSort).toHaveBeenCalledWith("desc", "test-id");
  });

  test("calls handleSort with undefined on third click", () => {
    const mockHandleSort = jest.fn();
    const { getByText } = renderTableSort("test-id", true, mockHandleSort);

    fireEvent.click(getByText("Sortable Column"));

    fireEvent.click(getByText("Sortable Column"));

    fireEvent.click(getByText("Sortable Column"));

    expect(mockHandleSort).toHaveBeenCalledWith(undefined, undefined);
  });

  test("does not call handleSort if hasSort is false", () => {
    const mockHandleSort = jest.fn();
    const { getByText } = renderTableSort("test-id", false, mockHandleSort);

    fireEvent.click(getByText("Sortable Column"));

    expect(mockHandleSort).not.toHaveBeenCalled();
  });
});
