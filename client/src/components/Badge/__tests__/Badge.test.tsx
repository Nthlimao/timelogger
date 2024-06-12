import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "../../../shared/utils/customRender";
import Badge from "../Badge";

describe("Badge component", () => {
  test("renders children correctly", () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
  });

  test("applies correct appearance class", () => {
    render(<Badge appearance="success">Success Badge</Badge>);
    const badgeElement = screen.getByText("Success Badge");
    expect(badgeElement).toHaveStyle("background-color: #22c55e1a");
  });

  test("applies correct size class", () => {
    render(<Badge size="small">Small Badge</Badge>);
    const badgeElement = screen.getByText("Small Badge");
    expect(badgeElement).toHaveStyle("padding: 2px 4px;");
  });
});
