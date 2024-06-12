import "@testing-library/jest-dom";

import React from "react";
import { render, fireEvent } from "../../../shared/utils/customRender";

import Table from "../Table";

describe("Table component", () => {
  const columns = [
    { id: "title", header: "Title", hasSort: true },
    { id: "timeSpent", header: "Time Spent", hasSort: false },
  ];

  const data = [
    { title: "Project 001", timeSpent: 25 },
    { title: "Project 002", timeSpent: 30 },
  ];

  const pagination = {
    pageNumber: 1,
    totalPages: 2,
    pageSize: 10,
    totalItems: 20,
  };

  const mockHandleSort = jest.fn();
  const mockHandlePagination = jest.fn();
  const mockHandleItemPage = jest.fn();

  const renderTable = () => {
    return render(
      <Table
        columns={columns}
        data={data}
        pagination={pagination}
        handleSort={mockHandleSort}
        handlePagination={mockHandlePagination}
        handleItemPage={mockHandleItemPage}
      />
    );
  };

  test("renders table with columns and data", () => {
    const { getByText } = renderTable();

    expect(getByText("Title")).toBeInTheDocument();
    expect(getByText("Time Spent")).toBeInTheDocument();
    expect(getByText("Project 001")).toBeInTheDocument();
    expect(getByText("Project 002")).toBeInTheDocument();
  });

  test("calls handleSort on column header click", () => {
    const { getByText } = renderTable();

    fireEvent.click(getByText("Title"));
    expect(mockHandleSort).toHaveBeenCalledWith("asc", "title");
  });

  test("calls handlePagination on pagination button click", () => {
    const { getByRole } = renderTable();

    fireEvent.click(getByRole("button", { name: /2/i }));
    expect(mockHandlePagination).toHaveBeenCalledWith(2);
  });

  test("calls handleItemPage on item click in first column", () => {
    const { getByText } = renderTable();

    fireEvent.click(getByText("Project 001"));
    expect(mockHandleItemPage).toHaveBeenCalledWith(data[0]);
  });
});
